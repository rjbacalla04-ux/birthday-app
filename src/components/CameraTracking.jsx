import { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

const CameraTracking = ({ onFingerMove }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handLandmarkerRef = useRef(null);
  const lastVideoTimeRef = useRef(-1); 
  const runningMode = "VIDEO";

  // Na-fix ang 'use-before-define' sa pamamagitan ng pag-wrap sa useCallback
  const startWebcam = useCallback(async (predictLoopFunction) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictLoopFunction);
      }
    } catch (err) {
      console.error("Webcam Access Denied:", err);
      setError("Hindi ma-access ang iyong camera. Paki-allow po.");
    }
  }, []);

  useEffect(() => {
    // Ginawang local para sa ligtas na cleanup closure
    let activeStream = null;

    const predictLoop = async () => {
      if (!videoRef.current || !canvasRef.current || !handLandmarkerRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let startTimeMs = performance.now();
      
      if (lastVideoTimeRef.current !== video.currentTime) {
        lastVideoTimeRef.current = video.currentTime;
        
        const results = handLandmarkerRef.current.detectForVideo(video, startTimeMs);
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (results.landmarks && results.landmarks.length > 0) {
          const handPoints = results.landmarks[0]; 
          const indexFingerTip = handPoints[8];   

          const screenX = canvas.width - (indexFingerTip.x * canvas.width);
          const screenY = indexFingerTip.y * canvas.height;

          if (onFingerMove) {
            onFingerMove({ x: screenX, y: screenY, canvasWidth: canvas.width, canvasHeight: canvas.height });
          }

          context.beginPath();
          context.arc(screenX, screenY, 8, 0, 2 * Math.PI);
          context.fillStyle = "#3b82f6"; 
          context.fill();
        }
      }

      requestAnimationFrame(predictLoop);
    };

    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
        );
        
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: runningMode,
          numHands: 1
        });

        handLandmarkerRef.current = landmarker;
        setIsLoading(false);
        
        await startWebcam(predictLoop);
        if (videoRef.current) {
          activeStream = videoRef.current.srcObject;
        }
      } catch (err) {
        console.error("MediaPipe Initialization Failed:", err);
        setError("Hindi ma-load ang AI tracking module.");
        setIsLoading(false);
      }
    };

    initMediaPipe();

    // Safe Cleanup gamit ang local variable closure
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onFingerMove, startWebcam]); // Kompleto ang dependencies ngayon

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-xs font-mono text-gray-400">Loading Google AI Model...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-950/80 text-red-200 text-xs p-4 text-center z-20">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute w-full h-full object-cover scale-x-[-1] opacity-30"
      />

      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute w-full h-full object-cover z-10"
      />
    </div>
  );
};

export default CameraTracking;
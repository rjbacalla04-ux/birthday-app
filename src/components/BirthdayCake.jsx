import { useState, useEffect, useRef, useCallback } from 'react';

const BirthdayCake = ({ isLit, setIsLit, isBlown, setIsBlown }) => {
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  const checkBlow = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const update = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const averageVolume = sum / bufferLength;
      setVolume(Math.round(averageVolume));

      const blowThreshold = 65; 

      if (averageVolume > blowThreshold && isLit && !isBlown) {
        setIsLit(false); 
        if (setIsBlown) setIsBlown(true); 
      }

      requestAnimationFrame(update);
    };

    update();
  }, [setIsLit, isLit, isBlown, setIsBlown]);

  const initAudio = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256; 
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      checkBlow();
    } catch (err) {
      console.error("Hindi ma-access ang mic:", err);
    }
  }, [checkBlow]);

  useEffect(() => {
    initAudio();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [initAudio]);

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full select-none">
      {/* Mic Volume HUD */}
      <div className="mb-6 text-[10px] text-slate-400 tracking-wider uppercase font-mono">
        Mic Input: <span className="font-bold text-blue-400">{volume}</span> / Threshold: 65
      </div>

      {/* 8-BIT PIXEL ART ENGINE */}
      <div 
        className="relative flex flex-col items-center scale-[1.5] my-6"
        style={{ imageRendering: 'pixelated' }}
      >
        
        {/* 3 SHADED CANDLES */}
        <div className="flex gap-4 justify-center items-end h-10 relative z-20 translate-y-[1px]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center w-2 relative">
              
              {/* Pixelated Flame Animation */}
              {isLit && (
                <div 
                  className="w-1.5 h-3 bg-[#f57373] relative -bottom-[1px] animate-pulse flex items-center justify-center"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.25s'
                  }}
                >
                  <div className="w-[2px] h-1.5 bg-[#fff7d6]"></div>
                </div>
              )}

              {/* Shaded Candle Body */}
              <div className="w-[6px] h-6 bg-[#fff7d6] border-l border-[#ffffff] border-r border-[#e9ddad] relative">
                {/* 🧵 MITSA / WICK (Laging present pero walang lumilipad na cross/smoke kapag patay) */}
                <div className="w-[2px] h-[3px] bg-slate-500 absolute -top-[3px] left-[1px]"></div>
                <div className="w-full h-[2px] bg-[#f57373]/70 absolute top-1.5"></div>
                <div className="w-full h-[2px] bg-[#f57373]/70 absolute top-3.5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* TOP TIER */}
        <div className="w-20 h-8 bg-[#fff7d6] relative z-10 shadow-[inset_-3px_0_0_#e9ddad]">
          <div className="w-full h-2.5 bg-[#f57373]"></div>
          <div className="w-full flex justify-between absolute top-2.5 left-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-5 h-[3px] bg-[#f57373]"></div>
                <div className="w-3 h-[2px] bg-[#d95d5d]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM TIER */}
        <div className="w-32 h-11 bg-[#fff7d6] -mt-[1px] relative z-0 shadow-[inset_-4px_0_0_#e9ddad] border-t border-[#e9ddad]">
          <div className="w-full h-3.5 bg-[#f57373] relative">
            <div className="absolute top-[3px] left-3 w-1 h-1 bg-[#ffbebe]"></div>
            <div className="absolute top-[3px] left-11 w-1 h-1 bg-[#ffbebe]"></div>
            <div className="absolute top-[3px] right-11 w-1 h-1 bg-[#ffbebe]"></div>
            <div className="absolute top-[3px] right-3 w-1 h-1 bg-[#ffbebe]"></div>
          </div>
          <div className="w-full flex justify-between absolute top-3.5 left-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-[21px] h-[4px] bg-[#f57373]"></div>
                <div className="w-[11px] h-[2px] bg-[#d95d5d]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* THE PIXEL PLATE */}
        <div className="w-40 h-2 bg-[#dcdcdc] relative z-10 flex flex-col justify-between shadow-[inset_0_-1px_0_#b5b5b5]">
          <div className="w-full h-[2px] bg-[#c8c8c8] mt-auto"></div>
          <div className="absolute -left-[3px] bottom-0 w-[3px] h-[3px] bg-[#b5b5b5]"></div>
          <div className="absolute -right-[3px] bottom-0 w-[3px] h-[3px] bg-[#b5b5b5]"></div>
        </div>

      </div>
    </div>
  );
};

export default BirthdayCake;
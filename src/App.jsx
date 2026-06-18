import { useState, useCallback, useEffect } from 'react';
import BirthdayCake from './components/BirthdayCake.jsx';
import CameraTracking from './components/CameraTracking.jsx';
import confetti from 'canvas-confetti';

export default function App() {
  const [fingerPos, setFingerPos] = useState({ x: 50, y: 40 });
  const [isLit, setIsLit] = useState(false);
  const [isBlown, setIsBlown] = useState(false); 
  const [showLetter, setShowLetter] = useState(false); 

  const targetXMin = 42;
  const targetXMax = 58;
  const targetYMin = 70; 
  const targetYMax = 74; 

  const handleFingerMove = useCallback((data) => {
    if (isBlown) return; 

    const percentX = (data.x / data.canvasWidth) * 100;
    const percentY = (data.y / data.canvasHeight) * 100 * 1.5; 
    
    setFingerPos({ x: percentX, y: percentY });

    if (percentX > targetXMin && percentX < targetXMax && percentY > targetYMin && percentY < targetYMax) {
      setIsLit(true);
    }
  }, [isBlown]);

  useEffect(() => {
    if (isBlown) {
      confetti({
        particleCount: 150,
        spread: 85,
        origin: { y: 0.6 }
      });

      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const frameInterval = setInterval(() => {
        if (Date.now() > animationEnd) return clearInterval(frameInterval);
        confetti({ particleCount: 30, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 30, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
      }, 400);

      const timer = setTimeout(() => {
        clearInterval(frameInterval);
        setShowLetter(true); 
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearInterval(frameInterval);
      };
    }
  }, [isBlown]);

  if (showLetter) {
    return (
      <div className="w-full min-h-screen bg-[#1c140e] flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-fade-in">
        <div 
          className="w-full max-w-xl aspect-[3/4] md:aspect-[4/5] bg-contain bg-no-repeat bg-center p-12 md:p-24 flex flex-col items-center justify-center relative drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] animate-scroll-up"
          style={{ backgroundImage: "url('/image_a3d725.jpg')" }}
        >
          <div className="w-full max-h-[75%] overflow-y-auto pr-2 custom-scroll text-center flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-serif text-[#4a2e12] font-black tracking-wide mb-4 uppercase border-b-2 border-[#4a2e12]/20 pb-1">
              📜 A SPECIAL MESSAGE FOR YOU 
            </h2>

            <div className="space-y-4 text-xs md:text-sm font-serif text-[#3a220b] leading-relaxed italic font-semibold text-justify">
              <p className="font-bold text-left not-italic text-[#e6ca97]/50">Dear,&nbsp; Allyssa!</p>
              <p>   
                This is the second time na babati ako sa birthday mo. parang kailan lang at ganto na akong babati sayo hehe. Salamat sa Panginoon, dahil blessing na magkaroon ng pagkakataon na makilala ka. Thank you din sayo, sa mga natutunan ko sa isang taon na nakakausap ka. Hindi mo siguro alam, pero may mga bagay na naituro at naipaalala mo sa akin.              </p>
              <p>
                May the Lord always keep you safe—pag malungkot ka, pag pagod ka, or kahit pag mag isa ka. Alam ko na mahirap ang battle mo dyan pero sufficient ang Lord sa season ng buhay mo na 'to ngayon.               </p>
              <p>
                Continue to honor God in whatever you do and love Him more deeply each day. Nawa patuloy mong makita ang faithfulness Niya sa bawat sitwasyon
                <br /><br />  
                 Malakas ka, Allyssa. Alam ng Panginoon kung ano ang kaya mong harapin at kung saan ka Niya dinadala.
                Ito ang prayer ko para sa'yo sa birthday mo, na sa panibagong taon ng buhay mo, mas lalo kang mapalapit sa Panginoon at mas makilala mo pa Siya sa mas malalim na paraan.              </p>
              <p>God bless you, Allyssa. Enjoy your day, and praise God for another year of His faithfulness in your life! ❤︎ˎˊ˗ </p>
              <p className="pt-4 font-bold text-right not-italic  text-[#e6ca97]/50">
                Warmest regards,<br />
                <span className="text-base font-black text-[#4a2e12] not-italic block mt-1">RJ</span>
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scrollUp { from { transform: translateY(40px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
          .animate-scroll-up { animation: scrollUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #4a2e12; border-radius: 10px; }
        `}</style>
      </div>
    );
  }

  return (
    /* ✨ FIX: Idinagdag ang cursor-none para piliting itago ang operating system cursor / crosshair */
    <div className="w-full min-h-screen bg-[#f9f6ee] flex flex-col items-center p-4 select-none font-sans overflow-y-auto">
      <header className="text-center mt-8 mb-6">
        <h1 className="text-5xl md:text-6xl font-normal text-[#2b4c7e] tracking-wider font-pixel drop-shadow-[2px_2px_0px_rgba(0,32,176,0.1)]">
          Happy Birthday!
        </h1>
      </header>

      {/* ✨ FIX: Nilagyan din dito ng cursor-none para sigurado sa active tracking box */}
      <div className="w-full max-w-md bg-transparent flex flex-col items-center relative my-auto">
        <div className="w-full aspect-[4/3] bg-slate-950 rounded-t-2xl overflow-hidden relative shadow-md border-t-2 border-x-2 border-[#fffdf9]/20 z-10">
          <CameraTracking onFingerMove={handleFingerMove} />
        </div>

        <div className="w-full bg-[#fcfbfe] rounded-b-2xl shadow-md border-b-2 border-x-2 border-slate-100 relative flex flex-col items-center justify-end pt-12 pb-0 min-h-[180px] z-10 overflow-hidden">
          <div className="z-20 translate-y-[8px]">
            <BirthdayCake isLit={isLit} setIsLit={setIsLit} isBlown={isBlown} setIsBlown={setIsBlown} />
          </div>
          <div className="w-full h-14 bg-[#0020b0] z-10 shadow-lg"></div>
        </div>

        {!isBlown && (
          <div 
            className="absolute pointer-events-none z-50 transition-all duration-75 ease-out"
            style={{ 
              left: `${fingerPos.x}%`, 
              top: `${fingerPos.y}%`,
              transform: 'translate(-50%, -15%)',
              imageRendering: 'pixelated'
            }}
          >
            <img 
              src="https://media.giphy.com/media/IKxGXoVnzc82wuvIyT/giphy.gif" 
              alt="Pixel Lit Match" 
              className="w-12 h-12 object-contain filter drop-shadow-[0_2px_4px_rgba(251,146,60,0.4)]"
            />
          </div>
        )}
      </div>

      <footer className="text-center mt-8 mb-6 max-w-sm">
        <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide leading-relaxed">
          Use your hands to light the cake,<br />
          <span className="text-[#0020b0]/60 font-semibold">then blow out the candles!</span>
        </p>
      </footer>
    </div>    
  );
}
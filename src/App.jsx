import { useState, useCallback } from 'react';
import BirthdayCake from './components/BirthdayCake.jsx';
import CameraTracking from './components/CameraTracking.jsx';

export default function App() {
  const [fingerPos, setFingerPos] = useState({ x: 50, y: 40 });
  const [isLit, setIsLit] = useState(false);

  // MGA CONFIGURATION (Dito lang natin binawasan ang Y para umakyat ang zone)
  const targetXMin = 42;
  const targetXMax = 58;
  const targetYMin = 70; // Mula sa dating nasa body, itinaas natin dito para sa kandila
  const targetYMax = 74; // Sakop hanggang sa mitsa ng kandila

  const handleFingerMove = useCallback((data) => {
    const percentX = (data.x / data.canvasWidth) * 100;
    const percentY = (data.y / data.canvasHeight) * 100 * 1.5; 
    
    setFingerPos({ x: percentX, y: percentY });

    // Saktong collision detector para sa tapat ng mga kandila
    if (percentX > targetXMin && percentX < targetXMax && percentY > targetYMin && percentY < targetYMax) {
      setIsLit(true);
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f9f6ee] flex flex-col items-center p-4 select-none font-sans overflow-y-auto">
      
      {/* HEADER */}
      <header className="text-center mt-8 mb-6">
        <h1 className="text-5xl md:text-6xl font-normal text-[#2b4c7e] tracking-wider font-pixel drop-shadow-[2px_2px_0px_rgba(0,32,176,0.1)]">
          Happy Birthday!
        </h1>
      </header>

      <div className="w-full max-w-md bg-transparent flex flex-col items-center relative my-auto">
        
        {/* UPPER: CAMERA PANEL */}
        <div className="w-full aspect-[4/3] bg-slate-950 rounded-t-2xl overflow-hidden relative shadow-md border-t-2 border-x-2 border-[#fffdf9]/20 z-10">
          <CameraTracking onFingerMove={handleFingerMove} />
        </div>

        {/* LOWER: CAKE STAGE */}
        <div className="w-full bg-[#fcfbfe] rounded-b-2xl shadow-md border-b-2 border-x-2 border-slate-100 relative flex flex-col items-center justify-end pt-12 pb-0 min-h-[180px] z-10 overflow-hidden">
          
          {/* Detailed Pixel Cake */}
          <div className="z-20 translate-y-[8px]">
            <BirthdayCake isLit={isLit} setIsLit={setIsLit} />
          </div>

          {/* Solid Blue Table Base */}
          <div className="w-full h-14 bg-[#0020b0] z-10 shadow-lg"></div>
        </div>

        {/* FLOATING GIPHY MATCHSTICK */}
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

      </div>

      {/* FOOTER */}
      <footer className="text-center mt-8 mb-6 max-w-sm">
        <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide leading-relaxed">
          Use your hands to light the cake,<br />
          <span className="text-[#0020b0]/60 font-semibold">then blow out the candles!</span>
        </p>
      </footer>

    </div>
  );
}
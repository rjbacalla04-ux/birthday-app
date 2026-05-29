import { useState } from 'react';
import BirthdayCake from './components/BirthdayCake.jsx';
import CameraTracking from './components/CameraTracking.jsx';

export default function App() {
  const [fingerPos, setFingerPos] = useState({ x: 0, y: 0 });
  const [isLit, setIsLit] = useState(false);

  const handleFingerMove = (data) => {
    const percentX = (data.x / data.canvasWidth) * 100;
    const percentY = (data.y / data.canvasHeight) * 100;
    
    setFingerPos({ x: percentX, y: percentY });

    // Collision Detection para sa kandila
    if (percentX > 42 && percentX < 58 && percentY > 58 && percentY < 88) {
      setIsLit(true);
    }
  };

  return (
    // Pinalitan ng bg-[#f9f6ee] para sa napakagandang beige-cream canvas
    <div className="min-h-screen bg-[#f9f6ee] flex flex-col items-center justify-between font-sans text-slate-700 select-none overflow-x-hidden">
      
      {/* HEADER */}
      <header className="text-center mt-14 mb-4">
        <h1 className="text-5xl md:text-6xl font-normal text-[#2b4c7e] tracking-wider font-pixel drop-shadow-[2px_2px_0px_rgba(0,32,176,0.1)]">
          Happy Birthday!
        </h1>
      </header>

      {/* MAIN SCREEN CANVAS */}
      <main className="w-full max-w-md flex flex-col items-center flex-grow justify-center relative px-4">
        
        {/* WEBCAM VIEW */}
        <div className="w-full aspect-[4/3] bg-slate-950 overflow-hidden relative rounded-2xl shadow-md border-2 border-[#fffdf9]/60">
          <CameraTracking onFingerMove={handleFingerMove} />
        </div>

        {/* BOTTOM STAGE: Dito magbe-blend ang cake sa bagong background */}
        <div className="w-full relative flex flex-col items-center justify-end pt-12 pb-0 min-h-[200px]">
          
          {/* Ang Detailed Pixel Cake Component */}
          <div className="z-10 translate-y-[8px]">
            <BirthdayCake isLit={isLit} setIsLit={setIsLit} />
          </div>

          {/* SOLID BLUE TABLE */}
          <div className="w-[115%] h-14 bg-[#0020b0] rounded-t-xl z-0 shadow-lg shadow-blue-950/15"></div>

          {/* CUTE MATCHSTICK POINTER */}
          <div 
            className="absolute pointer-events-none transition-all duration-75 ease-out z-30"
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

      </main>

      {/* FOOTER */}
      <footer className="text-center mb-10 px-6 max-w-sm">
        <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide leading-relaxed">
          Use your hands to light the cake,<br />
          <span className="text-[#0020b0]/60 font-semibold">then blow out the candles!</span>
        </p>
      </footer>

    </div>
  );
}
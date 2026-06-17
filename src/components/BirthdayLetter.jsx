export default function BirthdayLetter() {
  return (
    <div className="w-full min-h-screen bg-[#f9f6ee] flex flex-col items-center justify-center p-6 font-sans text-slate-700 animate-fade-in">
      <div className="w-full max-w-xl bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        
        {/* Decorative Pixel Ribbons / Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <header className="text-center mb-8">
          <h2 className="text-3xl font-normal text-[#2b4c7e] font-pixel tracking-wide">
            A Special Message for You
          </h2>
          <div className="text-[10px] text-slate-400 font-mono mt-1">From: RJ L. Bacalla</div>
        </header>

        {/* ANG LETTER CONTENT */}
        <article className="space-y-4 text-sm md:text-base leading-relaxed font-normal text-slate-600 font-mono">
          <p className="font-bold text-[#0020b0]">Dear Allyssa,</p>
          
          <p>
            Happy, happy birthday po! Gawa ko po itong munting web app na ito bilang regalo at pasasalamat sa lahat ng tulong, tiwala, at gabay na ibinibigay niyo sa akin. 
          </p>
          
          <p>
            Napakalaking inspirasyon po para sa akin ang makita kung paano niyo pinatatakbo ang inyong negosyo nang may husay at puso sa nakalipas na mga taon. Maraming salamat po sa pagiging isang ehemplo at mabuting mentor sa isang aspiring developer na katulad ko.
          </p>

          <p>
            Sana po ay nagustuhan niyo ang munting interactive game na ito! Ipinapanalangin ko po ang inyong mabuting kalusugan, kaligayahan, at patuloy na tagumpay sa inyong buhay at mga negosyo. 
          </p>
          
          <p className="pt-4 font-bold text-[#2b4c7e]">
            Best regards po,<br />
            <span className="font-pixel text-xl text-[#0020b0]">RJ</span>
          </p>
        </article>

        {/* Footer Design inside Letter */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span>Created with React & AI Tracking</span>
          <span>May 2026</span>
        </div>

      </div>
    </div>
  );
}
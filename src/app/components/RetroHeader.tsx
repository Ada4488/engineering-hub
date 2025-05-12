export default function RetroHeader() {
  return (
    <header className="window flex items-center justify-between p-4 mb-6">
      <div className="flex items-center gap-3">
        <img src="/window.svg" alt="Retro Logo" className="w-8 h-8" />
        <h1 className="text-xl font-pressStart tracking-widest">Engineering Hub</h1>
      </div>
      <span className="text-xs font-pressStart text-[#00f]">Retro 90's Edition</span>
    </header>
  );
} 
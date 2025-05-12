import Image from 'next/image';

export default function RetroHeader() {
  return (
    <header className="window flex items-center justify-between p-4 mb-6">
      <div className="flex items-center gap-3">
        <Image src="/window.svg" alt="Retro Logo" width={32} height={32} />
        <h1 className="text-xl font-pressStart tracking-widest">Engineering Hub</h1>
      </div>
      <span className="text-xs font-pressStart text-[#00f]">Retro 90&apos;s Edition</span>
    </header>
  );
} 
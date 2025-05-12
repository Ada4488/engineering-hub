import Image from 'next/image';

export default function RetroHeader() {
  return (
    <header className="window flex flex-col items-center justify-center p-4 mb-6">
      <div className="mb-2">
        <Image
          src="https://i.pinimg.com/originals/2e/7d/2e/2e7d2e2e7d2e7d2e7d2e7d2e7d2e7d2e.jpg"
          alt="90s Anime Aesthetic"
          width={120}
          height={120}
          className="rounded-full border-4 border-black shadow-lg"
        />
      </div>
      <div className="flex items-center gap-3">
        <Image src="/window.svg" alt="Retro Logo" width={32} height={32} />
        <h1 className="text-xl font-pressStart tracking-widest">Engineering Hub</h1>
      </div>
    </header>
  );
} 
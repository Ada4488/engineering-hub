import Image from 'next/image';

export default function RetroHeader() {
  return (
    <header className="window flex flex-row items-center justify-center p-4 mb-6 bg-transparent border-none shadow-none">
      <Image
        src="/computer.png"
        alt="Retro Computer"
        width={48}
        height={48}
        className="mr-4"
      />
      <h1 className="header-title m-0">Engineering Hub</h1>
    </header>
  );
} 


export const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 bg-grid-technical-fade opacity-[0.035]" />

      <div className="absolute top-[-12%] left-[-8%] w-[72vw] md:w-[52vw] h-[72vw] md:h-[52vw] rounded-full bg-[radial-gradient(circle,_rgba(77,160,255,0.14)_0%,_rgba(77,160,255,0.05)_45%,_transparent_72%)]" />

      <div className="absolute bottom-[4%] right-[-12%] w-[68vw] md:w-[48vw] h-[68vw] md:h-[48vw] rounded-full bg-[radial-gradient(circle,_rgba(28,217,192,0.12)_0%,_rgba(28,217,192,0.04)_46%,_transparent_72%)]" />

      <div className="absolute top-[34%] left-[28%] w-[32vw] h-[32vw] rounded-full hidden lg:block bg-[radial-gradient(circle,_rgba(255,188,92,0.1)_0%,_rgba(255,188,92,0.03)_45%,_transparent_72%)]" />

      <div className="absolute inset-0 bg-vignette opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/15 opacity-80" />
    </div>
  );
};

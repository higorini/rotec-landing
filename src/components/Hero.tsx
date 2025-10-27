import Image from "next/image";

export default function Hero() {
  return (
    
    <section className="relative mx-[calc(50%-50vw)] w-screen min-h-[100svh]">
      
      <div className="absolute inset-0">
        <Image
          src="/images/Hero.jpg" 
          alt="Equipe ROTEC em operação de limpeza técnica"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-black/40" />
      </div>

      
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <p className="uppercase tracking-[0.10em] lg:tracking-[0.20em] text-3xl sm:text-xl lg:text-4xl opacity-95">
              Fundada em 1993
            </p>

            
            <h1 className="mt-2 font-display font-extrabold tracking-wider text-5xl sm:text-6xl lg:text-7xl">
              ROTEC SERVICE
            </h1>

            <p className="mt-4 text-xl sm:text-base lg:text-2xl opacity-95">
              Na arte de desentupir e realizar limpeza técnica com segurança, agilidade e eficiência.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/90 px-8 py-3 text-2xl sm:text-xl lg:text-4xl font-semibold hover:bg-white/10 active:scale-[0.99] transition"
              >
                Veja mais
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

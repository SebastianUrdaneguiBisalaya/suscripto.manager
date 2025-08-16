import Link from "next/link";
import InfiniteScroll from "@/components/infinite-scroll";
import ScrollFadeText from "@/components/scroll-fade-text";
import BentoGrid from "@/components/bento-grid";

export default function LandingPage() {
  return (
    <div className="min-h-screen max-w-6xl w-full h-full p-4 sm:p-8 flex flex-col gap-8 overflow-x-hidden">
      <header
        id="header-landing-page"
        className="flex flex-row justify-between items-center"
      >
        <p className="font-sora text-lg sm:text-2xl font-semibold text-white-cream">
          suscripto
        </p>
        <Link href="/home/dashboard"
          className="relative font-geist text-base sm:text-lg font-normal bg-none outline-none border-none cursor-pointer text-white
            [&::after]:content-[''] 
            [&::after]:absolute [&::after]:bottom-0 [&::after]:left-0 
            [&::after]:h-0.5 [&::after]:w-0 [&::after]:bg-white
            [&::after]:transition-all [&::after]:duration-300 [&::after]:ease-in-out
            hover:[&::after]:w-full"
        >
          Iniciar sesión
        </Link>
      </header>
      <main
        id="main-landing-page"
        className="h-full w-full flex flex-col justify-center items-center gap-8 py-8"
      >
        <section
          id="hero-landing-page"
          className="mask-fade-top-bottom bg-[url('/grid.svg')] bg-cover bg-center w-full flex flex-col justify-center items-center gap-8 px-2 py-6"
        >
          <h1
            className="text-3xl sm:text-5xl font-bold font-sora text-center max-w-2xl text-white-cream animate-blurred-fade-in"
          >
            Controla tus suscripciones en un solo lugar
          </h1>
          <p
            className="font-geist font-normal text-base sm:text-lg text-center max-w-xl text-white-cream animate-blurred-fade-in duration-200"
          >
            Registra, organiza y recibe recordatorios antes de cada cobro. <br/> <span className="font-semibold">No vuelvas a pagar por algo que no usas.</span>
          </p>
          <Link href="/home/dashboard"
            className="relative font-sora font-semibold text-sm sm:text-base text-center w-fit px-4 py-3 cursor-pointer bg-white text-black shadow-[3px_3px_0px_rgba(255,255,255,0.8)] border border-black
            overflow-hidden
            [&::after]:content-['']
            [&::after]:absolute [&::after]:inset-0
            [&::after]:bg-blue-600
            [&::after]:scale-x-0
            [&::after]:origin-left
            [&::after]:transition-transform [&::after]:duration-300 [&::after]:ease-in-out
            hover:[&::after]:scale-x-100 hover:[&::after]:origin-right
            hover:text-white
            hover:shadow-[3px_3px_0px_rgba(0,102,255,0.4)]
            animate-blurred-fade-in duration-400
            "
          >
            <span className="relative z-10">
              Empezar gratis
            </span>
          </Link>
          <InfiniteScroll />
        </section>
        <section
          id="section-features"
          className="w-full flex flex-col items-center gap-8 px-2 py-6"
        >
          <div className="w-full flex flex-col gap-4 items-center max-w-2xl">
            <span className="font-geist text-gray-300 px-4 py-3 rounded-3xl bg-[rgba(255,255,255,0.05)] border border-gray-500 text-sm">
              Características
            </span>
            <h2 className="font-sora text-lg sm:text-2xl text-white-cream text-center font-semibold">Control y seguimiento de tus suscripciones</h2>
            <p className="font-geist text-base sm:text-lg text-gray-300 text-center">Registra y organiza tus suscripciones, recibe alertas de cobros y accede a estadísticas claras para gestionar mejor tus gastos.</p>
          </div>
          <BentoGrid />
        </section>
        <section
          id="section-about"
          className="w-full flex flex-col items-center gap-8 px-2 py-6"
        >
          <ScrollFadeText text="Como muchos, tenía un problema personal: mis suscripciones estaban por todas partes. Era un caos llevar el control de los cobros, saber qué cuentas seguían activas o decidir si realmente necesitaba todas esas herramientas. De ahí surgió la idea de suscripto.manager, una solución práctica para organizar y tomar mejores decisiones sobre mis gastos." />
        </section>
      </main>
      <footer
        id="footer-landing-page"
        className="h-full w-full flex flex-col justify-center items-center gap-8 py-8"
      >
        <p className="font-sora text-xs text-gray-300 font-normal text-center w-full px-4 py-2">
          Desarrollado con 💙 por <a className="font-semibold underline" href="https://sebastianurdanegui.vercel.app/" target="_blank" rel="noreferrer">Sebastian Marat Urdanegui Bisalaya</a>
        </p>
      </footer>
    </div>
  )
}
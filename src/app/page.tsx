import InfiniteScroll from "@/components/infinite-scroll";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen max-w-6xl w-full h-full p-8 flex flex-col gap-8">
      <header
        id="header-landing-page"
        className="flex flex-row justify-between items-center"
      >
        <p className="font-sora text-lg sm:text-2xl font-semibold">
          suscripto
        </p>
        <Link href="/home"
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
        className="h-full bg-[url('/grid.svg')] bg-cover bg-center w-full flex flex-col justify-center items-center mask-fade-top-bottom py-8"
      >
        <section
          id="hero-landing-page"
          className="w-full flex flex-col justify-center items-center gap-8 px-2 py-6"
        >
          <h1
            className="text-3xl sm:text-5xl font-bold font-sora text-center max-w-2xl"
          >
            Controla tus suscripciones en un solo lugar
          </h1>
          <p
            className="font-geist font-normal text-base sm:text-lg text-center max-w-2xl"
          >
            Registra, organiza y recibe recordatorios antes de cada cobro. Conecta con <span className="font-semibold underline">Google Calendar</span> y no vuelvas a pagar por algo que no usas.
          </p>
          <Link href="/home"
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
            "
          >
            <span className="relative z-10">
              Empezar gratis
            </span>
          </Link>
          <InfiniteScroll />
        </section>
      </main>
      <footer
        id="footer-landing-page"
        className=""
      >
        <p className="font-sora text-xs text-gray-300 font-normal text-center w-full px-4 py-2">
          Desarrollado con 💙 por <a className="font-semibold underline" href="https://sebastianurdanegui.vercel.app/" target="_blank" rel="noreferrer">Sebastian Marat Urdanegui Bisalaya</a>
        </p>
      </footer>
    </div>
  )
}
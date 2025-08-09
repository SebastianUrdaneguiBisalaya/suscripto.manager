import InfiniteScroll from "@/components/infinite-scroll";

export default function LandingPage() {
  return (
    <div className="min-h-screen max-w-6xl w-full h-full p-8 flex flex-col gap-8">
      <header
        id="header-landing-page"
        className="flex flex-row justify-between items-center"
      >
        <p className="font-sora text-2xl font-semibold">
          suscripto
        </p>
        <button
          className="font-geist text-lg cursor-pointer font-normal"
        >
          Iniciar sesión
        </button>
      </header>
      <main
        id="main-landing-page"
        className="h-full bg-[url('/grid.svg')] bg-cover bg-center w-full flex flex-col justify-center items-center mask-fade-top-bottom px-4 py-8"
      >
        <section
          id="hero-landing-page"
          className="w-full flex flex-col justify-center items-center gap-8 p-2"
        >
          <h1
            className="text-5xl font-bold font-sora text-center max-w-2xl"
          >
            Controla tus suscripciones en un solo lugar
          </h1>
          <p
            className="font-geist font-normal text-lg text-center max-w-2xl"
          >
            Registra, organiza y recibe recordatorios antes de cada cobro. Conecta con Google Calendar y no vuelvas a pagar por algo que no usas.
          </p>
          <button
            className="font-sora font-semibold text-base text-center w-fit px-4 py-3 cursor-pointer rounded-lg bg-white text-black"
          >
            Empezar gratis
          </button>
          <InfiniteScroll />
        </section>
      </main>
      <footer
        id="footer-landing-page"
        className=""
      >

      </footer>
    </div>
  )
}
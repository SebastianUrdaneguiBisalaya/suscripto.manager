export default function DashboardPage() {
  return (
    <main
      className="flex flex-col gap-8 w-full h-full"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="font-sora text-2xl font-bold text-left text-white-cream">Dashboard</h1>
        <button
          className="flex flex-row items-center gap-2 rounded-lg bg-white shadow-[3px_3px_0px_rgba(255,255,255,0.8)] border border-black w-fit px-4 py-3 cursor-pointer"
          type="button"
        >
          <span
            className="flex flex-row items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
          </span>
          <span
            className="font-sora font-semibold text-base text-black"
          >
            Añadir
          </span>
        </button>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-3 gap-8">
        <div className="border border-gray-500 rounded-xl h-48 shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">

        </div>
        <div className="border border-gray-700 rounded-xl h-48 shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">

        </div>
        <div className="lg:col-span-2 border border-gray-700 rounded-xl h-48 shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">

        </div>
        <div className="lg:col-span-2 border border-gray-700 rounded-xl h-48 shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">

        </div>
      </div>

      <div className="w-full">

      </div>

    </main>
  )
}
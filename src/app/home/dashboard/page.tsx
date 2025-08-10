import BarChart from "@/components/bar-chart";
import CardStatistic from "@/components/card-statistic";
import TableSubscription from "@/components/table-subscription";
import { dataBarChart, dataTableSubscription } from "@/constants/data";

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

      <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-8 auto-rows-min items-start grid-flow-row-dense">
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-500 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Suscripciones"
            subtitle="Suma acumulada de tus suscripciones (Últimos 12 meses)"
            value={12}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Suscripciones"
            subtitle="Suma acumulada de tus suscripciones (Últimos 12 meses)"
            value={12}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Suscripciones"
            subtitle="Suma acumulada de tus suscripciones (Últimos 12 meses)"
            value={12}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Suscripciones"
            subtitle="Suma acumulada de tus suscripciones (Últimos 12 meses)"
            value={12}
          />
        </div>
        <div className="sm:col-span-4 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(255,255,255,0.6)] overflow-hidden">
          <TableSubscription
            title="Mis suscripciones"
            subtitle="Lista de suscripciones activas. En esta sección puedes desactivar las suscripciones que no necesites."
            data={dataTableSubscription}
          />
        </div>
        <div className="sm:col-span-4 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">
          <BarChart
            title="Evolución de suscripciones"
            subtitle="Suma acumulada de los egresos de tus suscripciones (Últimos 12 meses)"
            data={dataBarChart}
            dataKey="month"
          />
        </div>
        <div className="sm:col-span-4 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">
          <BarChart
            title="Suscripciones por categoría"
            subtitle="Suma acumulada de los egresos de tus suscripciones por categoría (Últimos 12 meses)"
            data={dataBarChart}
            dataKey="month"
          />
        </div>
      </div>

      <div className="w-full">

      </div>

    </main>
  )
}
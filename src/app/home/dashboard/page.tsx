"use client";

import { useState } from "react";
import BarChart from "@/components/bar-chart";
import CardStatistic from "@/components/card-statistic";
import TableSubscription from "@/components/table-subscription";
import RegisterForm from "@/components/register-form";
import { useDashboardData } from "@/apis/hooks";
import { useUserStore } from "@/store/useUserStore";

interface DataProps {
  statistics: {
    total_pen: number;
    total_usd: number;
    accounts: number;
    platforms: number;
  }[] | null,
  tableSubscription: {
    id: string;
    platforms: {
      platform_name: string;
    };
    amount: number;
    currency: string;
    recurrence: string;
  }[] | null;
  barChart: {
    month: string;
    value: number;
    currency: string;
  }[] | null;
}

export default function DashboardPage() {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [statistics, subscriptions, totalByMonth] = useDashboardData({
    user_id: user?.user_id ?? "",
  });
  
  const data: DataProps = {
    statistics: statistics.isSuccess ? statistics.data.data : null,
    tableSubscription: subscriptions.isSuccess ? subscriptions.data.data : null,
    barChart: totalByMonth.isSuccess ? totalByMonth.data.data : null,
  }

  const toggleRegisterForm = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <main
      className="flex flex-col gap-8 w-full h-full"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="font-sora text-2xl font-bold text-left text-white-cream">Dashboard</h1>
        <button
          className="flex flex-row items-center gap-2 rounded-lg bg-white shadow-[3px_3px_0px_rgba(255,255,255,0.8)] border border-black w-fit px-4 py-3 cursor-pointer"
          type="button"
          onClick={toggleRegisterForm}
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
            title="Gasto total - PEN"
            subtitle="Suma acumulada (en soles)"
            value={data.statistics?.[0]?.total_pen ?? 0}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Gasto total - USD"
            subtitle="Suma acumulada (en dólares)"
            value={data.statistics?.[0]?.total_usd ?? 0}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Plataformas activas"
            subtitle="Cantidad total"
            value={data.statistics?.[0]?.platforms ?? 0}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(0,102,255,0.7)]">
          <CardStatistic
            title="Cuentas activas"
            subtitle="Cantidad total"
            value={data.statistics?.[0]?.accounts ?? 0}
          />
        </div>
        <div className="sm:col-span-4 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(255,255,255,0.6)] overflow-hidden">
          <TableSubscription
            title="Mis suscripciones"
            subtitle="Lista de suscripciones activas. En esta sección puedes desactivar las suscripciones que no necesites."
            data={data.tableSubscription ?? []}
          />
        </div>
        <div className="sm:col-span-4 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">
          <BarChart
            title="Evolución de suscripciones - PEN"
            subtitle="Suma acumulada de los egresos de tus suscripciones en soles (Últimos 12 meses)"
            data={data.barChart ?? []}
            dataKey="month"
            currency="PEN"
          />
        </div>
        <div className="sm:col-span-4 border border-gray-700 rounded-xl shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">
          <BarChart
            title="Evolución de suscripciones - USD"
            subtitle="Suma acumulada de los egresos de tus suscripciones en dólares (Últimos 12 meses)"
            data={data.barChart ?? []}
            dataKey="month"
            currency="USD"
          />
        </div>
      </div>

      <div className="w-full">

      </div>
      <RegisterForm
        isOpen={isOpen}
        toggleRegisterForm={toggleRegisterForm}
      />
    </main>
  )
}
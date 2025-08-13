"use client";

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { formatAmout } from "@/lib/fn";

type BarChartProps = {
	title: string;
    subtitle: string;
	data: {
		month: string;
        value: number;
		currency: string;
	}[];
	dataKey: string;
	currency: string;
}

export default function BarChartComponent({
	title,
    subtitle,
	data,
	dataKey,
	currency,
}: BarChartProps) {
	const filterData = data?.filter((item) => item.currency === currency);
	return (
		<div className="w-full h-full flex flex-col gap-4 p-4 border-1 border-gray-500 rounded-lg">
			<div className="flex flex-row items-center gap-2 pb-2 border-b border-gray-500">
				<span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M3 21q-.425 0-.712-.288T2 20t.288-.712T3 19h18q.425 0 .713.288T22 20t-.288.713T21 21zm1.5-3q-.625 0-1.062-.437T3 16.5v-4q0-.625.438-1.062T4.5 11t1.063.438T6 12.5v4q0 .625-.437 1.063T4.5 18m5 0q-.625 0-1.062-.437T8 16.5v-9q0-.625.438-1.062T9.5 6t1.063.438T11 7.5v9q0 .625-.437 1.063T9.5 18m5 0q-.625 0-1.062-.437T13 16.5v-6q0-.625.438-1.062T14.5 9t1.063.438T16 10.5v6q0 .625-.437 1.063T14.5 18m5 0q-.625 0-1.062-.437T18 16.5v-12q0-.625.438-1.062T19.5 3t1.063.438T21 4.5v12q0 .625-.437 1.063T19.5 18"/></svg>
				</span>
                <h2
                    className="font-sora text-2xl text-white-cream text-left font-semibold"
                >
                    {title}
                </h2>
			</div>
            <p className="font-geist text-sm text-gray-300 font-normal text-left w-full">
                {subtitle}
            </p>
			<div className="aspect-auto h-[250px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						accessibilityLayer
						data={filterData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke="#6a7282"
							strokeWidth={0.2}
						/>
						<XAxis
							dataKey={dataKey}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const [year, month, day] = value.split("-");
								const localDate = new Date(Number(year), Number(month) - 1, Number(day));
								return localDate.toLocaleDateString("es-ES", {
									month: "short",
									day: "numeric",
								})
							}}
							tick={{
								fill: "#99a1af",
								fontSize: 12,
							}}
						/>
						<Tooltip
							content={({ active, payload, label }) => {
								if (active && payload && payload.length) {
									return (
										<div className="bg-black border border-gray-500 rounded-lg p-3 shadow-lg">
											<p className="text-gray-300 text-sm mb-2">
												{`Monto: ${formatAmout(payload[0].payload.value)}`}
											</p>
											{
												payload.map((entry, index) => (
													<div
														key={index}
														className="flex items-center gap-2"
													>
														<div
															className="w-3 h-3 rounded-sm"
															style={{ backgroundColor: entry.color }}
														/>
														<span className="text-gray-300 text-sm capitalize">
															{"Mes"}: {label}
														</span>
													</div>
												))
											}
										</div>
									)
								} 
							}}
							cursor={{ fill: "rgba(49, 48, 49, 0.3)" }}
						/>
						<Bar dataKey="value" fill="#f8f9f6" opacity={0.7} radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
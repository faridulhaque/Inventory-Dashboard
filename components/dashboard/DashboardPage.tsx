"use client";
import { getData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  DashboardData,
  HttpStatus,
} from "@/services/types";
import React, { Suspense, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../others/Loading";

function DashboardPage() {
  const [dbData, setDBData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      const res: ApiResponse<DashboardData> = await getData(APIEnums.dashboard);
      if (res.status === HttpStatus.ok) {
        setDBData(res.data);
      }
    };
    getDashboardData();
  }, []);

  const barData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));

    const label = `${d.getDate()}/${d.getMonth() + 1}`;

    const iso = d.toISOString().split("T")[0];
    const found = dbData?.dailySales.find((s) => s.date === iso);

    return {
      date: label, // shown in chart
      units: found?.units ?? 0,
    };
  });
  const low = dbData?.lowStockPercentage ?? 0;

  const pieData = [
    { name: "Low Stock", value: low },
    { name: "In Stock", value: 100 - low },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <div className="h-auto lg:h-[calc(100vh-100px)] w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 place-items-center bg-base-200 rounded-xl p-4 shadow">
          <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-lg bg-base-100 w-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25Z"
              />
            </svg>
            <span className="font-medium text-base-content">Product</span>
            <span className="text-xl font-bold text-primary">
              {dbData?.productsCount}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-lg bg-base-100 w-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-success"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664"
              />
            </svg>
            <span className="font-medium text-base-content">Units</span>
            <span className="text-xl font-bold text-success">
              {dbData?.totalUnits}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-lg bg-base-100 w-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-warning"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437"
              />
            </svg>
            <span className="font-medium text-base-content">Sold</span>
            <span className="text-xl font-bold text-warning">
              {dbData?.totalSoldUnits}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-lg bg-base-100 w-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182"
              />
            </svg>
            <span className="font-medium text-base-content">Earnings</span>
            <span className="text-xl font-bold text-accent">
              {dbData?.totalEarning}
            </span>
          </div>
        </div>

        <div className="bg-base-200 rounded-xl p-4 shadow flex items-center justify-center">
          <BarChart width={500} height={280} data={barData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Bar dataKey="units" fill="var(--color-primary)" />
            <Tooltip />
          </BarChart>
        </div>

        <div className="bg-base-200 rounded-xl p-4 shadow overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-base-content font-semibold">
                <th>SL</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {dbData?.products?.map((d, i) => (
                <tr
                  key={d.id}
                  className={
                    d.quantity <= d.lowStockAt
                      ? "bg-error/40 text-error-content"
                      : ""
                  }
                >
                  <th>{i + 1}</th>
                  <td>{d.name}</td>
                  <td>{d.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center bg-base-200 rounded-xl p-4 shadow">
          <PieChart width={350} height={350}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    [
                      "var(--color-primary)",
                      "var(--color-secondary)",
                      "var(--color-accent)",
                      "var(--color-success)",
                      "var(--color-warning)",
                      "var(--color-info)",
                    ][index % 6]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </Suspense>
  );
}

export default DashboardPage;

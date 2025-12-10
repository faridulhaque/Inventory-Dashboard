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
  const COLORS = ["#FF5C5C", "#4CAF50"];

  return (
    <Suspense fallback={<Loading></Loading>}>
      <div className="h-[calc(100vh-100px)] w-full grid grid-cols-2 gap-5">
        <div className=" grid grid-cols-2 place-center">
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
              />
            </svg>

            <span>Product</span>
            <span>{dbData?.productsCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>

            <span>Units</span>
            <span>{dbData?.totalUnits}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <span>Sold</span>
            <span>{dbData?.totalSoldUnits}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>Earnings</span>
            <span>{dbData?.totalEarning}</span>
          </div>
        </div>
        <div className=" ">
          <BarChart width={600} height={300} data={barData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Bar dataKey="units" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {dbData?.products?.map((d, i) => (
                  <tr
                    key={d.id}
                    className={`${
                      d.quantity <= d?.lowStockAt ? "bg-red-400" : ""
                    }`}
                  >
                    <th>{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" ">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
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

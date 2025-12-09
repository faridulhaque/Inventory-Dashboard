import Loading from "@/components/others/Loading";
import Sidebar from "@/components/others/Sidebar";
import ProductPage from "@/components/product/ProductPage";
import { ApiResponse, TProduct, TRegisterBody } from "@/services/types";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/product?page=${page}`, {
    next: {
      tags: ["products"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok)
    return (
      <h2 className="text-red-500 text-center text-4xl py-10">
        Failed to load data
      </h2>
    );

  const data: ApiResponse<TProduct[]> = await res.json();

  return (
    <div>
      <Sidebar title="Product">
        <Suspense fallback={<Loading></Loading>}>
          <ProductPage data={data?.data} page={page}></ProductPage>
        </Suspense>
      </Sidebar>
    </div>
  );
}

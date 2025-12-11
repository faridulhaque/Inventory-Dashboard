import Loading from "@/components/others/Loading";
import Sidebar from "@/components/others/Sidebar";
import ProductPage from "@/components/product/ProductPage";
import { ApiResponse, TProduct } from "@/services/types";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const cookieStore = await cookies();
  const rawToken = cookieStore.get("token")?.value;
  const token = rawToken ? decodeURIComponent(rawToken) : "";

  const res = await fetch(`${process.env.BASE_URL}/product?page=${page}`, {
    cache: "no-store",
    next: { tags: ["products"] },
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok)
    return (
      <h2 className="text-red-500 text-center text-4xl py-10">
        Failed to load data. 
      </h2>
    );

  const data: ApiResponse<TProduct[]> = await res.json();

  return (
    <Sidebar title="Product">
      <Suspense fallback={<Loading />}>
        <ProductPage data={data.data} page={page} />
      </Suspense>
    </Sidebar>
  );
}

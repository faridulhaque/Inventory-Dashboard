import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/bg-wc.webp')" }}
      />
      <div className="absolute inset-0 bg-black/60" /> 
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-2xl text-center max-w-md">
          <h1 className="text-3xl font-bold text-primary">
            Welcome to Your Inventory System
          </h1>

          <p className="mt-4 text-white">
            Track stock, monitor sales, and manage your business with clarity.
          </p>

          <Link href="/fe/dashboard" className="btn btn-primary mt-6 w-full">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-2xl">
          Welcome to Next Js App[Lucia auth and Stripe]
        </div>
        <p>
          This is app built with Next Js, Lucia as authentication library and
          Stripe as Payment gateway
        </p>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          Log In
        </Button>
        <Button
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign Up
        </Button>
      </div>
    </main>
  );
}

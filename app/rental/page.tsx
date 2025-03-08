"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Rental() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/rental/info");
  }, [router]);

  return (
    <div></div>
  );
}

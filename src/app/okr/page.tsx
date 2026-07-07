import type { Metadata } from "next";
import OkrForm from "./OkrForm";

export const metadata: Metadata = {
  title: "OKR Calibration",
};

export default function OkrPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <OkrForm />
    </main>
  );
}

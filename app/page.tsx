import { Timer } from "@/components/Timer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-pink-200">
      <Header />
      <Timer />
    </main>
  );
}

import { Timer } from "@/components/Timer";
import Header from "@/components/Header";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-gray-100">
      <PomodoroTimer />
    </main>
  );
}

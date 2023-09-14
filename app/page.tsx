import Footer from "@/components/Footer";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <PomodoroTimer />
      <Footer />
    </div>
  );
}

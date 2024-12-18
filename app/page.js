import Userform from "@/components/form";
import Navbar from "@/components/navbar";
import "./globals.css";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 mt-4">
        <Userform />
      </div>
    </div>
  );
}
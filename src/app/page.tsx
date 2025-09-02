import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-center py-2">
        <h1 className="text-4xl font-bold text-slate-700">
          Job Application Tracker
        </h1>
        <p className="text-slate-500 mt-2">
          Track, Manage, and Succeed in Your Journey
        </p>
      </header>

      <div className="w-full h-64 md:h-54 relative">
        <Image
          src="/images/homePageBanner.svg"
          alt="Job Tracker"
          fill
          className="object-cover rounded-md shadow-md"
          priority
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10">
        {[
          {
            title: "Analytics",
            desc: "Gain insights into your applications and improve your strategy.",
            path: "/employer",
          },
          {
            title: "Track Applications",
            desc: "Keep all your job applications organized in one place.",
            path: "/employer/formList",
          },
          {
            title: "Easy Apply",
            desc: "Apply to jobs quickly with just one click, saving time and effort in the application process.",
            path: "/employee",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.path}
            className="bg-white rounded-2xl shadow-md p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
            <h3 className="text-xl font-semibold text-slate-700">
              {card.title}
            </h3>
            <p className="text-slate-500 mt-3">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

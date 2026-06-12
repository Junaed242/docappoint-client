import Banner from "@/components/Banner";
import TopDoctors from "@/components/TopDoctors";
import { 
  FaHeartPulse, 
  FaBaby, 
  FaBrain, 
  FaBone, 
  FaCalendarCheck, 
  FaUserShield, 
  FaShieldHeart 
} from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-24">
      {/* 1. Hero Banner Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Top Rated Doctors Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <span className="text-xs font-bold uppercase text-primary tracking-widest bg-blue-50 px-4 py-1.5 rounded-full inline-block mb-3">
            Our Specialists
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            Top Rated Doctors
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Experience world-class healthcare with our highly recommended clinical specialists, 
            trusted by thousands of families.
          </p>
        </div>
        <TopDoctors />
      </section>

      {/* 3. ADDITIONAL SECTION 1: Our Specialties*/}
      <section className="bg-slate-50 py-16 px-4 border-y border-slate-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Our Specialties
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto mt-2 text-sm">
              Access certified clinical support across multiple branches of modern medicine.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Cardiology", icon: <FaHeartPulse />, color: "text-red-500 bg-red-50/50" },
              { name: "Pediatrics", icon: <FaBaby />, color: "text-blue-500 bg-blue-50/50" },
              { name: "Neurology", icon: <FaBrain />, color: "text-purple-500 bg-purple-50/50" },
              { name: "Orthopedics", icon: <FaBone />, color: "text-amber-600 bg-amber-50/50" }
            ].map((spec) => (
              <div 
                key={spec.name} 
                className="bg-white p-8 rounded-3xl shadow-sm text-center border border-slate-100/85 hover:border-primary card-hover-effect cursor-pointer flex flex-col items-center gap-3"
              >
                <div className={`p-4 rounded-2xl text-4xl ${spec.color}`}>
                  {spec.icon}
                </div>
                <p className="font-bold text-slate-800 text-lg mt-2">{spec.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ADDITIONAL SECTION 2: Why Choose Us*/}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Why Choose DocAppoint?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            We are dedicated to making clinical appointments easy, secure, and fully customized to your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Expert Physicians",
              desc: "Get diagnosed and treated by board-certified, top-tier clinical professionals with years of experience.",
              icon: <FaShieldHeart />,
              bg: "bg-blue-50 text-primary"
            },
            {
              title: "Instant Scheduling",
              desc: "Skip long phone queue wait times. Secure your desired specialist slot in less than a minute.",
              icon: <FaCalendarCheck />,
              bg: "bg-green-50 text-green-600"
            },
            {
              title: "Secure Health Portals",
              desc: "Manage bookings, update your patient credentials, and cancel appointments through an encrypted user dashboard.",
              icon: <FaUserShield />,
              bg: "bg-purple-50 text-purple-600"
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 border border-slate-100 rounded-3xl shadow-sm bg-white card-hover-effect flex flex-col gap-4"
            >
              <div className={`p-4 w-fit rounded-2xl text-2xl ${feature.bg}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
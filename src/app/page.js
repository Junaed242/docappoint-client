import Banner from "@/components/Banner";
import TopDoctors from "@/components/TopDoctors";

export default function Home() {
  return (
    <div className="flex flex-col gap-15">
      {/* 1. Hero Banner Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Top Rated Doctors Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-16 relative">
          {/* Subtle medical background accent */}
          

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
        
        {/* Dynamic Doctor Fetch Section */}
        <TopDoctors />
      </section>

      {/* 3. Additional Section: Specialties */}
      <section className=" py-16  px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">Our Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                {name: 'Cardiology', icon: '❤️'}, 
                {name: 'Pediatrics', icon: '👶'}, 
                {name: 'Neurology', icon: '🧠'}, 
                {name: 'Orthopedics', icon: '🦴'}
            ].map((spec) => (
              <div key={spec.name} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 hover:border-primary transition-all hover:-translate-y-1 cursor-pointer">
                <span className="text-4xl mb-4 block">{spec.icon}</span>
                <p className="font-bold text-slate-800">{spec.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
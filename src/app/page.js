import Banner from "@/components/Banner";
import TopDoctors from "@/components/TopDoctors";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* 1. Hero Banner Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Top Rated Doctors Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Top Rated Doctors
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Experience world-class healthcare with our most highly recommended specialists, 
            rated by thousands of satisfied patients.
          </p>
        </div>
        
        {/* Dynamic Data Fetching Section */}
        <TopDoctors />
      </section>

      {/* 3. Additional Section: Specialties */}
      <section className="bg-slate-50 py-16 -mx-4 px-4">
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
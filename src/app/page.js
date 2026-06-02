import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Banner Section */}
      <section>
        <Banner />
      </section>

      {/* Top Rated Doctors Section (Placeholder for now) */}
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
        
        <div className="flex justify-center italic text-slate-400">
          Doctor cards will appear here after we connect the backend...
        </div>
      </section>

      {/* Additional Section 1: Specialties */}
      <section className="bg-slate-50 py-16 -mx-4 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics'].map((spec) => (
              <div key={spec} className="bg-white p-6 rounded-xl shadow-sm text-center border border-slate-100 hover:border-primary transition-colors cursor-pointer">
                <p className="font-bold text-slate-800">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
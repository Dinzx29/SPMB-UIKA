import Navbar from './Navbar';
import Footer from './Footer'; // 🔥 Import komponen Footer

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col font-sans">
      <Navbar />
      
      {/* flex-1 memastikan konten mengambil sisa ruang kosong, 
          sehingga footer tetap berada di paling bawah */}
      <main className="flex-1 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
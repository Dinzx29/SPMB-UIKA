const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Warna background diubah menjadi hijau gelap
    <footer className="bg-[#047857] text-white w-full mt-auto py-4">
      <div className="max-w-[1700px] mx-auto px-6 text-center">
        <p className="text-[14px] font-normal text-emerald-100">
          © {currentYear} <strong className="font-semibold text-white">SPMB UIKA</strong> All Right Reserved, Powered by <strong className="font-semibold text-white">Universitas Ibn Khaldun</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
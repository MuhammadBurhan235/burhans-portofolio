interface MainbarProps {
  selectedNavbar: string;
  selectedSidebar: string;
}

function Mainbar({ selectedNavbar, selectedSidebar }: MainbarProps) {
  return (
    <main className="flex-1 p-4">
      <h1 className="text-3xl font-bold">{selectedNavbar}</h1>
      <p className="mt-2">
        Menampilkan halaman: <b>{selectedSidebar}</b>
      </p>

      {selectedSidebar === "Home" && (
        <div className="mt-6">
          <h1 className="text-white text-2xl font-semibold text-center mt-8">
            Layanan Aspirasi dan Pengaduan Online Rakyat
          </h1>
          <p className="text-white text-center text-sm">
            Sampaikan laporan Anda langsung kepada instansi pemerintah
            berwenang.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full max-w-xl mx-auto">
            <h2 className="text-lg font-semibold text-center">
              Sampaikan Laporan Anda
            </h2>

            <div className="mt-4">
              <p className="text-sm font-medium">Pilih Klasifikasi Laporan</p>
              <div className="flex justify-between border border-gray-300 rounded-lg mt-2 overflow-hidden">
                <label className="flex items-center flex-1 justify-center py-3 cursor-pointer">
                  <input type="radio" name="kategori" className="hidden" />
                  <span className="text-blue-500 font-medium">PENGADUAN</span>
                </label>
                <label className="flex items-center flex-1 justify-center py-3 bg-blue-500 text-white font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="kategori"
                    className="hidden"
                    defaultChecked
                  />
                  <span>PENGADUAN</span>
                </label>
                <label className="flex items-center flex-1 justify-center py-3 cursor-pointer">
                  <input type="radio" name="kategori" className="hidden" />
                  <span className="text-blue-500 font-medium">
                    PERMINTAAN INFORMASI
                  </span>
                </label>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar{" "}
              <a href="#" className="text-blue-500 underline">
                Lihat Panduan
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Mainbar;

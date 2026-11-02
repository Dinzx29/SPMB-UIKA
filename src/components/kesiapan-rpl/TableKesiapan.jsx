import React from 'react';

const TableKesiapan = ({
  data,
  selectedIds,
  onToggleSelect,
  onToggleSelectFaculty,
  onToggleSelectAll,
  onViewDetail,
  onDeleteProdi
}) => {
  // Hitung total prodi untuk master checkbox
  const allProdiIds = data.flatMap(f => f.prodiList.map(p => p.id));
  const isAllSelected = allProdiIds.length > 0 && allProdiIds.every(id => selectedIds.includes(id));
  const isIndeterminate = allProdiIds.some(id => selectedIds.includes(id)) && !isAllSelected;

  return (
    <div className="w-full bg-white rounded-none shadow-sm border border-[#e2e8f0] overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1050px]">
        {/* HEADER TABEL BIRU SESUAI PERSIS FOTO */}
        <thead>
          <tr className="bg-[#004b87] text-white text-[13px] font-bold">
            <th className="py-3 px-3 text-center w-[46px] border-r border-[#003d70]">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={el => { if (el) el.indeterminate = isIndeterminate; }}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded-sm border-gray-300 text-[#004b87] focus:ring-0 cursor-pointer align-middle"
              />
            </th>
            <th className="py-3 px-4 text-center border-r border-[#003d70]">
              Unit
            </th>
            <th className="py-3 px-3 text-center w-[110px] border-r border-[#003d70]">
              Kurikulum
            </th>
            <th className="py-3 px-3 text-center w-[210px] border-r border-[#003d70] leading-tight">
              Mata Kuliah Konversi<br />RPL
            </th>
            <th className="py-3 px-3 text-center w-[230px] border-r border-[#003d70]">
              SKS Mata Kuliah Kurikulum
            </th>
            <th className="py-3 px-3 text-center w-[120px] border-r border-[#003d70] leading-tight">
              Status<br />CPMK
            </th>
            <th className="py-3 px-3 text-center w-[90px]">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody className="text-[13px] text-gray-700">
          
          {/* LEVEL 1: UNIVERSITAS IBN KHALDUN (BARIS PUTIH BERSIH) */}
          <tr className="bg-white font-bold border-b border-[#e2e8f0]">
            <td className="py-2.5 px-3 text-center border-r border-[#e2e8f0]">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded-sm border-gray-300 text-[#004b87] focus:ring-0 cursor-pointer align-middle"
              />
            </td>
            <td className="py-2.5 px-4 font-bold text-gray-900 border-r border-[#e2e8f0]">
              Universitas Ibn Khaldun
            </td>
            <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
            <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
            <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
            <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
            <td className="py-2.5 px-3"></td>
          </tr>

          {/* LEVEL 2 & 3: FAKULTAS & PRODI (SEMUA FAKULTAS LENGKAP SAMPAI GIZI / FIK) */}
          {data.map((fakultas) => {
            const facultyProdiIds = fakultas.prodiList.map(p => p.id);
            const isFacultyAllSelected = facultyProdiIds.length > 0 && facultyProdiIds.every(id => selectedIds.includes(id));
            const isFacultyIndeterminate = facultyProdiIds.some(id => selectedIds.includes(id)) && !isFacultyAllSelected;

            return (
              <React.Fragment key={fakultas.fakultasId}>
                
                {/* BARIS FAKULTAS: LATAR BELAKANG BIRU MUDA LEMBUT (#eef6fc) PERSIS FOTO */}
                <tr className="bg-[#eef6fc] font-bold border-b border-[#e2e8f0]">
                  <td className="py-2.5 px-3 text-center border-r border-[#e2e8f0]">
                    <input
                      type="checkbox"
                      checked={isFacultyAllSelected}
                      ref={el => { if (el) el.indeterminate = isFacultyIndeterminate; }}
                      onChange={() => onToggleSelectFaculty(fakultas.fakultasId)}
                      className="w-4 h-4 rounded-sm border-gray-300 text-[#004b87] focus:ring-0 cursor-pointer align-middle"
                    />
                  </td>
                  <td className="py-2.5 px-6 font-bold text-gray-900 border-r border-[#e2e8f0]">
                    {fakultas.fakultasNama}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
                  <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
                  <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
                  <td className="py-2.5 px-3 border-r border-[#e2e8f0]"></td>
                  <td className="py-2.5 px-3"></td>
                </tr>

                {/* BARIS PROGRAM STUDI: LATAR BELAKANG PUTIH DENGAN INDENTASI MASUK */}
                {fakultas.prodiList.map((prodi) => {
                  const isChecked = selectedIds.includes(prodi.id);

                  return (
                    <tr
                      key={prodi.id}
                      className={`border-b border-[#e2e8f0] transition-colors ${
                        isChecked ? 'bg-blue-50/60' : 'bg-white hover:bg-gray-50/70'
                      }`}
                    >
                      {/* Checkbox Prodi */}
                      <td className="py-2.5 px-3 text-center border-r border-[#e2e8f0] align-middle">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleSelect(prodi.id)}
                          className="w-4 h-4 rounded-sm border-gray-300 text-[#004b87] focus:ring-0 cursor-pointer align-middle"
                        />
                      </td>

                      {/* Nama Program Studi (Menjorok ke dalam pl-12) */}
                      <td className="py-2.5 px-4 pl-12 font-normal text-gray-800 border-r border-[#e2e8f0] align-middle">
                        {prodi.nama}
                      </td>

                      {/* Kurikulum */}
                      <td className="py-2.5 px-3 text-center text-gray-700 border-r border-[#e2e8f0] align-middle">
                        {prodi.kurikulum || ''}
                      </td>

                      {/* Mata Kuliah Konversi RPL */}
                      <td className="py-2.5 px-3 text-center text-gray-800 border-r border-[#e2e8f0] align-middle">
                        {prodi.mataKuliahKonversi || '0 Mata Kuliah (0 SKS)'}
                      </td>

                      {/* SKS Mata Kuliah Kurikulum (3 Badges Persis Foto) */}
                      <td className="py-2 px-3 text-center border-r border-[#e2e8f0] align-middle">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Badge Total SKS (Oranye) */}
                            <span className="bg-[#f39c12] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] leading-tight">
                              Total: {prodi.sksTotal} SKS
                            </span>
                            {/* Badge Wajib SKS (Biru) */}
                            <span className="bg-[#337ab7] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] leading-tight">
                              Wajib: {prodi.sksWajib} SKS
                            </span>
                          </div>
                          {/* Badge Pilihan SKS (Cyan / Biru Muda) */}
                          <span className="bg-[#5bc0de] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] leading-tight">
                            Pilihan: {prodi.sksPilihan} SKS
                          </span>
                        </div>
                      </td>

                      {/* Status CPMK (Badge Merah / Hijau) */}
                      <td className="py-2.5 px-3 text-center border-r border-[#e2e8f0] align-middle">
                        {prodi.statusCpmk === 'Sudah Terisi' ? (
                          <span className="bg-[#00a65a] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] inline-block">
                            Sudah Terisi
                          </span>
                        ) : (
                          <span className="bg-[#dd4b39] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] inline-block">
                            Belum Terisi
                          </span>
                        )}
                      </td>

                      {/* Tombol Aksi (Mata Cyan & Tong Sampah Merah Persis Foto) */}
                      <td className="py-2.5 px-3 text-center align-middle">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Tombol Lihat (Cyan) */}
                          <button
                            onClick={() => onViewDetail(prodi)}
                            title="Lihat Detail CPMK"
                            className="bg-[#00c0ef] hover:bg-[#00acd6] text-white p-1 rounded-[2px] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          {/* Tombol Hapus (Merah) */}
                          <button
                            onClick={() => onDeleteProdi(prodi.id)}
                            title="Hapus Data"
                            className="bg-[#dd4b39] hover:bg-[#d73925] text-white p-1 rounded-[2px] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              </React.Fragment>
            );
          })}

          {data.length === 0 && (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-500 border-b border-[#e2e8f0]">
                Tidak ada data kesiapan RPL yang cocok dengan filter yang dipilih.
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default TableKesiapan;

import React from 'react';
import SearchableSelect from '../ui/SearchableSelect';
import {
  PERIODE_OPTIONS,
  TAHUN_KURIKULUM_OPTIONS,
  JENJANG_OPTIONS,
  STATUS_CPMK_OPTIONS,
  UNIT_OPTIONS
} from '../../data/kesiapanData';

const FilterSection = ({
  periode,
  setPeriode,
  tahunKurikulum,
  setTahunKurikulum,
  jenjang,
  setJenjang,
  statusCpmk,
  setStatusCpmk,
  unit,
  setUnit
}) => {
  return (
    <div className="w-full bg-white border-t-[3px] border-t-[#d97706] rounded-md p-6 shadow-sm relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">

        {/* Kolom Kiri: Baris 1 - Periode Akademik */}
        <div className="flex items-center gap-4 relative z-50">
          <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
            Periode Akademik
          </label>
          <div className="relative w-full max-w-[360px]">
            <SearchableSelect
              options={PERIODE_OPTIONS}
              value={periode}
              onChange={setPeriode}
              placeholder="Pilih Periode..."
            />
          </div>
        </div>

        {/* Kolom Kanan: Baris 1 - Tahun Kurikulum */}
        <div className="flex items-center gap-4 relative z-50">
          <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
            Tahun Kurikulum
          </label>
          <div className="relative w-full max-w-[360px]">
            <SearchableSelect
              options={TAHUN_KURIKULUM_OPTIONS}
              value={tahunKurikulum}
              onChange={setTahunKurikulum}
              placeholder="Pilih Tahun Kurikulum..."
            />
          </div>
        </div>

        {/* Kolom Kiri: Baris 2 - Jenjang Pendidikan */}
        <div className="flex items-center gap-4 relative z-40">
          <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
            Jenjang Pendidikan
          </label>
          <div className="relative w-full max-w-[360px]">
            <SearchableSelect
              options={JENJANG_OPTIONS}
              value={jenjang}
              onChange={setJenjang}
              placeholder="Pilih Jenjang..."
            />
          </div>
        </div>

        {/* Kolom Kanan: Baris 2 - Status CPMK */}
        <div className="flex items-center gap-4 relative z-40">
          <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
            Status CPMK
          </label>
          <div className="relative w-full max-w-[360px]">
            <SearchableSelect
              options={STATUS_CPMK_OPTIONS}
              value={statusCpmk}
              onChange={setStatusCpmk}
              placeholder="Pilih Status CPMK..."
            />
          </div>
        </div>

        {/* Kolom Kiri: Baris 3 - Unit */}
        <div className="flex items-center gap-4 relative z-30">
          <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
            Unit
          </label>
          <div className="relative w-full max-w-[360px]">
            <SearchableSelect
              options={UNIT_OPTIONS}
              value={unit}
              onChange={setUnit}
              placeholder="Pilih Unit..."
            />
          </div>
        </div>

        {/* Kolom Kanan: Baris 3 (Kosong untuk layout 2 kolom rapi) */}
        <div className="hidden md:block"></div>

      </div>
    </div>
  );
};

export default FilterSection;


import React from 'react';

const KoalaEmptyIllustration = ({ className = "w-[280px] h-auto" }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Floating Snoring Z Z Z */}
      <text x="216" y="44" fontFamily="sans-serif" fontSize="19" fontWeight="bold" fill="#475569">Z</text>
      <text x="202" y="68" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#64748b">z</text>
      <text x="190" y="86" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#94a3b8">z</text>

      {/* Tree Branch Horizontal Lines */}
      {/* Upper branch line */}
      <path
        d="M20 126 C 90 124, 210 124, 298 126"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Lower branch line */}
      <path
        d="M20 152 C 100 150, 220 150, 298 152"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Branch Bark Texture Lines */}
      <path
        d="M40 138 C 55 146, 70 142, 82 144"
        stroke="#475569"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M52 148 C 62 158, 76 153, 86 156"
        stroke="#475569"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M92 131 C 102 139, 118 135, 128 137"
        stroke="#475569"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M175 148 C 185 156, 198 152, 206 155"
        stroke="#475569"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Koala Body (Back curve and rear) */}
      <path
        d="M150 92 C 180 86, 228 102, 234 136 C 236 152, 228 162, 216 162 C 204 162, 202 152, 203 138 C 204 128, 198 123, 192 123 L 148 123 Z"
        fill="#cbd5e1"
        stroke="#334155"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Rear Leg Hanging Creases / Toes */}
      <path d="M214 150 L 214 158" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M222 150 L 222 158" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />

      {/* Front Leg/Paw Resting on Branch */}
      <path
        d="M108 123 C 104 138, 114 152, 126 152 C 136 152, 140 140, 140 126 Z"
        fill="#cbd5e1"
        stroke="#334155"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M118 142 L 118 149" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M125 142 L 125 149" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />

      {/* Left Front Paw Tucked (Under Chin) */}
      <path
        d="M72 126 C 62 126, 56 120, 66 112 C 76 104, 94 112, 98 123 Z"
        fill="#cbd5e1"
        stroke="#334155"
        strokeWidth="2.2"
      />

      {/* Left Ear (Behind Head) */}
      <circle cx="90" cy="78" r="21" fill="#cbd5e1" stroke="#334155" strokeWidth="2.2" />
      <circle cx="90" cy="78" r="13" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />

      {/* Right Ear (Top of Head) */}
      <circle cx="160" cy="68" r="21" fill="#cbd5e1" stroke="#334155" strokeWidth="2.2" />
      <circle cx="160" cy="68" r="13" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />

      {/* Koala Head (Pure White) */}
      <path
        d="M94 112 C 84 96, 94 76, 124 76 C 154 76, 168 96, 160 116 C 152 131, 108 133, 94 112 Z"
        fill="#ffffff"
        stroke="#334155"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Closed Smiling Eyes */}
      <path
        d="M106 97 C 109 100, 114 100, 117 97"
        stroke="#334155"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M132 97 C 135 100, 140 100, 143 97"
        stroke="#334155"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Big Dark Nose */}
      <ellipse cx="125" cy="106" rx="9.5" ry="13.5" fill="#1e293b" />
      {/* Tiny White Nose Reflection Dot */}
      <ellipse cx="123" cy="101" rx="2" ry="3" fill="#ffffff" opacity="0.3" />
    </svg>
  );
};

export default KoalaEmptyIllustration;


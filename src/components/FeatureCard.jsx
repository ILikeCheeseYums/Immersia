import React from 'react';

export default function FeatureCard({ iconSrc, title, description, hoverBorderColor }) {
  return (
    <div className={`bg-[#1a1d24] p-6 rounded-xl border border-white/5 ${hoverBorderColor} transition-colors`}>
      <img src={iconSrc} alt="" className="w-8 h-8 mb-4 pointer-events-none" />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}


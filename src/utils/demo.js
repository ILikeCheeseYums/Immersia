/**
 * Generates lightweight, procedural SVG data URL scenes for instant demo testing.
 */

function createSvgScene({ title, subtitle, color, isPanorama = false }) {
  const width = isPanorama ? 2048 : 1024;
  const height = 512;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="sky" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#181c24"/>
        <stop offset="100%" stop-color="#0a0c10"/>
      </radialGradient>
      <linearGradient id="floor" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#12151c"/>
        <stop offset="100%" stop-color="#07080a"/>
      </linearGradient>
      <linearGradient id="gridGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.1"/>
        <stop offset="50%" stop-color="${color}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    
    <!-- Background Sky -->
    <rect width="${width}" height="${height}" fill="url(#sky)" />
    
    <!-- Perspective Floor -->
    <polygon points="0,${height * 0.55} ${width},${height * 0.55} ${width},${height} 0,${height}" fill="url(#floor)" />
    
    <!-- Floor Grid Lines -->
    <g stroke="${color}" stroke-width="1.5" opacity="0.35">
      ${Array.from({ length: 15 })
        .map((_, i) => {
          const x = (i / 14) * width;
          return `<line x1="${width / 2}" y1="${height * 0.55}" x2="${x}" y2="${height}" />`;
        })
        .join("")}
      ${[0.6, 0.68, 0.78, 0.9, 1.0]
        .map((ratio) => {
          const y = height * ratio;
          return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" />`;
        })
        .join("")}
    </g>

    <!-- Center Horizon Landmark -->
    <circle cx="${width / 2}" cy="${height * 0.52}" r="36" fill="${color}" opacity="0.2" />
    <circle cx="${width / 2}" cy="${height * 0.52}" r="18" fill="${color}" opacity="0.5" />
    <circle cx="${width / 2}" cy="${height * 0.52}" r="6" fill="#ffffff" />

    <!-- Typography -->
    <text x="${width / 2}" y="${height * 0.32}" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="32" font-weight="bold" letter-spacing="1">
      ${title}
    </text>
    <text x="${width / 2}" y="${height * 0.40}" text-anchor="middle" fill="${color}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="16" font-weight="600" letter-spacing="2">
      ${subtitle}
    </text>
    ${
      isPanorama
        ? `<text x="${width / 4}" y="${height * 0.35}" text-anchor="middle" fill="#8ab4f8" font-size="18" opacity="0.7">← Drag to rotate 360° →</text>
           <text x="${(width * 3) / 4}" y="${height * 0.35}" text-anchor="middle" fill="#8ab4f8" font-size="18" opacity="0.7">← Drag to rotate 360° →</text>`
        : ""
    }
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getDemoTourImages() {
  return [
    {
      id: "1A-F",
      step: 1,
      branch: "A",
      turn: "F",
      name: "1A-F.svg",
      image: createSvgScene({
        title: "Station 1: Grand Entrance",
        subtitle: "CLICK FORWARD CHEVRON TO PROCEED",
        color: "#1a73e8",
        isPanorama: false,
      }),
      isPanorama: false,
    },
    {
      id: "2A-F",
      step: 2,
      branch: "A",
      turn: "F",
      name: "2A-F.svg",
      image: createSvgScene({
        title: "Station 2: Central Corridor",
        subtitle: "NAVIGATE TO 360° PANORAMA AHEAD",
        color: "#34a853",
        isPanorama: false,
      }),
      isPanorama: false,
    },
    {
      id: "3A-pano",
      step: 3,
      branch: "A",
      turn: "F",
      name: "3A-pano.svg",
      image: createSvgScene({
        title: "Station 3: 360° Panoramic Observatory",
        subtitle: "FULL 360° ROTATION WRAPAROUND",
        color: "#ea4335",
        isPanorama: true,
      }),
      isPanorama: true,
    },
  ];
}


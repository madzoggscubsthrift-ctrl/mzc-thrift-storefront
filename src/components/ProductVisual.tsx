import React from 'react';

interface ProductVisualProps {
  category: string;
  colorScheme: 'plum' | 'teal' | 'pink' | 'neutral';
  itemId?: string;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  category,
  colorScheme,
  itemId = '',
  className = '',
}) => {
  // Brand colors
  const plum = '#624150';
  const lightPlum = '#8a5e71';
  const teal = '#669199';
  const pink = '#fbceca';

  // Render bespoke boutique vector flat-lay based on item type
  const renderItemIllustration = () => {
    // 1. Footwear: Natural Rubber Puddle Wellies / Shoes
    if (category === 'Footwear') {
      return (
        <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          {/* Shadow */}
          <ellipse cx="80" cy="142" rx="48" ry="8" fill="#624150" fillOpacity="0.08" />
          {/* Left Boot */}
          <g transform="translate(32, 24)">
            {/* Grab handle */}
            <path d="M 24 16 C 24 4 40 4 40 16" fill="none" stroke={pink} strokeWidth="4" strokeLinecap="round" />
            {/* Boot shaft */}
            <path d="M 20 18 L 22 75 C 22 84 14 96 6 102 L 6 108 L 48 108 L 48 94 L 44 18 Z" fill={teal} />
            {/* Top rim accent */}
            <rect x="19" y="16" width="26" height="4" rx="2" fill={plum} />
            {/* Sole & heel */}
            <path d="M 4 108 L 48 108 L 48 114 L 38 114 L 38 111 L 18 111 L 18 114 L 4 114 Z" fill="#2d3748" />
            {/* MZC Cub logo stamp on boot */}
            <circle cx="32" cy="50" r="7" fill={pink} />
            <circle cx="29" cy="46" r="2.2" fill={plum} />
            <circle cx="35" cy="46" r="2.2" fill={plum} />
            <circle cx="32" cy="51" r="3" fill={plum} />
          </g>
          {/* Right Boot (slightly offset) */}
          <g transform="translate(68, 28)">
            <path d="M 24 16 C 24 4 40 4 40 16" fill="none" stroke={pink} strokeWidth="4" strokeLinecap="round" />
            <path d="M 20 18 L 22 75 C 22 84 14 96 6 102 L 6 108 L 48 108 L 48 94 L 44 18 Z" fill="#527c83" />
            <rect x="19" y="16" width="26" height="4" rx="2" fill={plum} />
            <path d="M 4 108 L 48 108 L 48 114 L 38 114 L 38 111 L 18 111 L 18 114 L 4 114 Z" fill="#2d3748" />
            <circle cx="32" cy="50" r="7" fill={pink} />
            <circle cx="29" cy="46" r="2.2" fill={plum} />
            <circle cx="35" cy="46" r="2.2" fill={plum} />
            <circle cx="32" cy="51" r="3" fill={plum} />
          </g>
        </svg>
      );
    }

    // 2. Toys & Books: Artisan Wooden Animal Blocks or Vintage Books
    if (category === 'Toys & Books') {
      if (itemId.includes('12')) {
        // Hardcover vintage book set
        return (
          <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
            <ellipse cx="80" cy="138" rx="46" ry="7" fill="#624150" fillOpacity="0.08" />
            {/* Stacked books */}
            <g transform="translate(42, 34)">
              {/* Bottom Book */}
              <rect x="0" y="70" width="76" height="18" rx="3" fill={teal} />
              <rect x="0" y="72" width="72" height="14" rx="2" fill="#faf7f2" />
              <rect x="0" y="70" width="10" height="18" rx="2" fill="#4f7178" />
              {/* Middle Book */}
              <rect x="4" y="46" width="72" height="18" rx="3" fill={lightPlum} />
              <rect x="4" y="48" width="68" height="14" rx="2" fill="#faf7f2" />
              <rect x="4" y="46" width="10" height="18" rx="2" fill={plum} />
              {/* Top Open / Angled Book */}
              <rect x="8" y="20" width="66" height="20" rx="3" fill={plum} />
              <rect x="18" y="24" width="48" height="12" rx="1" fill="#fffaf5" />
              {/* Foil star on top cover */}
              <path d="M 42 27 L 44 30 L 48 30 L 45 32 L 46 36 L 42 33 L 38 36 L 39 32 L 36 30 L 40 30 Z" fill={pink} />
            </g>
          </svg>
        );
      }

      // Wooden Bear Blocks
      return (
        <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          <ellipse cx="80" cy="140" rx="46" ry="7" fill="#624150" fillOpacity="0.08" />
          <g transform="translate(40, 26)">
            {/* Wooden Base block */}
            <rect x="0" y="74" width="80" height="24" rx="4" fill="#e8cfa8" stroke="#d4b486" strokeWidth="2" />
            {/* Wood grain details */}
            <path d="M 12 86 Q 40 82 68 86" stroke="#d4b486" strokeWidth="1.5" fill="none" />
            {/* Middle Arch / Tree block */}
            <polygon points="12,74 28,40 44,74" fill={teal} />
            {/* Wooden Cub Head Block */}
            <g transform="translate(42, 34)">
              {/* Ears */}
              <circle cx="6" cy="6" r="6" fill="#dfbe91" />
              <circle cx="28" cy="6" r="6" fill="#dfbe91" />
              <circle cx="6" cy="6" r="3" fill={pink} />
              <circle cx="28" cy="6" r="3" fill={pink} />
              {/* Head */}
              <rect x="0" y="8" width="34" height="32" rx="6" fill="#dfbe91" stroke="#caa273" strokeWidth="1.5" />
              {/* Face */}
              <circle cx="9" cy="20" r="2" fill={plum} />
              <circle cx="25" cy="20" r="2" fill={plum} />
              <ellipse cx="17" cy="27" rx="6" ry="4" fill="#fff7ec" />
              <polygon points="15,25 19,25 17,27" fill={plum} />
            </g>
          </g>
        </svg>
      );
    }

    // 3. Outerwear: Rain Parka or Reversible Vest
    if (category === 'Outerwear') {
      return (
        <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          <ellipse cx="80" cy="142" rx="48" ry="7" fill="#624150" fillOpacity="0.08" />
          <g transform="translate(24, 20)">
            {/* Hood */}
            <path d="M 38 28 C 38 10 74 10 74 28 Z" fill={colorScheme === 'plum' ? lightPlum : teal} />
            <path d="M 44 26 C 44 16 68 16 68 26 Z" fill={pink} />
            {/* Jacket Body */}
            <path d="M 28 32 L 8 68 L 24 74 L 32 50 L 32 108 L 80 108 L 80 50 L 88 74 L 104 68 L 84 32 Z" fill={colorScheme === 'plum' ? plum : teal} />
            {/* Collar & placket */}
            <rect x="52" y="32" width="8" height="76" fill={colorScheme === 'plum' ? lightPlum : '#4a7279'} />
            {/* Brass snaps */}
            <circle cx="56" cy="42" r="2" fill="#ffd166" />
            <circle cx="56" cy="58" r="2" fill="#ffd166" />
            <circle cx="56" cy="74" r="2" fill="#ffd166" />
            <circle cx="56" cy="90" r="2" fill="#ffd166" />
            {/* Deep Patch Pockets */}
            <rect x="36" y="80" width="14" height="16" rx="2" fill={colorScheme === 'plum' ? lightPlum : '#4a7279'} />
            <rect x="62" y="80" width="14" height="16" rx="2" fill={colorScheme === 'plum' ? lightPlum : '#4a7279'} />
            <path d="M 36 80 L 50 80" stroke={pink} strokeWidth="2" />
            <path d="M 62 80 L 76 80" stroke={pink} strokeWidth="2" />
          </g>
        </svg>
      );
    }

    // 4. Baby & Toddler Rompers / Dresses
    if (colorScheme === 'pink' || category === 'Baby') {
      return (
        <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          <ellipse cx="80" cy="142" rx="46" ry="7" fill="#624150" fillOpacity="0.08" />
          <g transform="translate(32, 22)">
            {/* Romper / One-piece body */}
            <path
              d="M 32 18 C 38 24 58 24 64 18 L 82 38 L 72 48 L 62 36 L 62 88 L 76 104 L 62 108 L 48 92 L 34 108 L 20 104 L 34 88 L 34 36 L 24 48 L 14 38 Z"
              fill={colorScheme === 'pink' ? '#f5b5b0' : plum}
            />
            {/* Delicate rib lines */}
            <line x1="42" y1="36" x2="42" y2="84" stroke={colorScheme === 'pink' ? '#e29791' : lightPlum} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="48" y1="36" x2="48" y2="84" stroke={colorScheme === 'pink' ? '#e29791' : lightPlum} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="54" y1="36" x2="54" y2="84" stroke={colorScheme === 'pink' ? '#e29791' : lightPlum} strokeWidth="1" strokeDasharray="3 3" />
            {/* Wooden buttons or zip */}
            <circle cx="48" cy="34" r="2.5" fill="#e8cfa8" stroke="#caa273" strokeWidth="1" />
            <circle cx="48" cy="46" r="2.5" fill="#e8cfa8" stroke="#caa273" strokeWidth="1" />
            <circle cx="48" cy="58" r="2.5" fill="#e8cfa8" stroke="#caa273" strokeWidth="1" />
            {/* Contrast neckline rib */}
            <path d="M 32 18 C 38 24 58 24 64 18" fill="none" stroke={colorScheme === 'pink' ? plum : pink} strokeWidth="3" />
          </g>
        </svg>
      );
    }

    // 5. Dungarees / Denim / Corduroy (Default Toddler / Little Kids)
    return (
      <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
        <ellipse cx="80" cy="142" rx="46" ry="7" fill="#624150" fillOpacity="0.08" />
        <g transform="translate(34, 20)">
          {/* Inner Shirt Sleeves */}
          <path d="M 24 24 L 6 36 L 14 46 L 26 38 Z" fill="#faf7f2" />
          <path d="M 68 24 L 86 36 L 78 46 L 66 38 Z" fill="#faf7f2" />
          <path d="M 30 18 C 36 22 56 22 62 18" fill="none" stroke={teal} strokeWidth="4" />
          {/* Dungaree Straps */}
          <rect x="28" y="16" width="9" height="34" rx="2" fill={plum} />
          <rect x="55" y="16" width="9" height="34" rx="2" fill={plum} />
          {/* Brass buckles */}
          <rect x="27" y="38" width="11" height="6" rx="2" fill="#ffd166" />
          <rect x="54" y="38" width="11" height="6" rx="2" fill="#ffd166" />
          {/* Dungaree Bib & Trousers */}
          <path d="M 24 42 L 68 42 L 72 60 L 74 108 L 52 108 L 46 72 L 40 108 L 18 108 L 20 60 Z" fill={plum} />
          {/* Kangaroo Chest Pocket */}
          <path d="M 36 50 L 56 50 L 54 64 L 38 64 Z" fill={lightPlum} />
          {/* Whimsical embroidered acorn / star on pocket */}
          <circle cx="46" cy="57" r="2.5" fill={pink} />
          {/* Gentle side brass buttons */}
          <circle cx="21" cy="58" r="2" fill="#ffd166" />
          <circle cx="71" cy="58" r="2" fill="#ffd166" />
          {/* Turn-up cuffs */}
          <rect x="18" y="102" width="22" height="6" rx="1" fill={lightPlum} />
          <rect x="52" y="102" width="22" height="6" rx="1" fill={lightPlum} />
        </g>
      </svg>
    );
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {renderItemIllustration()}
    </div>
  );
};

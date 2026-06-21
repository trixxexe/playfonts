import { FontEntry } from './types';

export const FONTS_DATA: FontEntry[] = [
  // Professional
  { family: 'Inter', moods: ['professional', 'minimal', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Roboto', moods: ['professional', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Lato', moods: ['professional', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Source Sans 3', moods: ['professional', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Noto Sans', moods: ['professional', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Open Sans', moods: ['professional', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Nunito Sans', moods: ['professional', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'DM Sans', moods: ['professional', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Plus Jakarta Sans', moods: ['professional', 'elegant'], weight: '400,700', style: 'sans-serif' },
  { family: 'Manrope', moods: ['professional', 'minimal'], weight: '400,700', style: 'sans-serif' },

  // Elegant / Luxury
  { family: 'Playfair Display', moods: ['elegant', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Cormorant Garamond', moods: ['elegant', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Libre Baskerville', moods: ['elegant', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'EB Garamond', moods: ['elegant', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Lora', moods: ['elegant', 'friendly'], weight: '400,700', style: 'serif' },
  { family: 'Merriweather', moods: ['elegant', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'DM Serif Display', moods: ['elegant', 'luxury'], weight: '400', style: 'serif' },
  { family: 'Bodoni Moda', moods: ['luxury', 'elegant'], weight: '400,700', style: 'serif' },
  { family: 'Crimson Pro', moods: ['elegant', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'Spectral', moods: ['elegant', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Italiana', moods: ['luxury', 'elegant'], weight: '400', style: 'serif' },
  { family: 'Tenor Sans', moods: ['luxury', 'minimal'], weight: '400', style: 'sans-serif' },
  { family: 'Josefin Sans', moods: ['luxury', 'minimal'], weight: '400,700', style: 'sans-serif' },

  // Minimal
  { family: 'Work Sans', moods: ['minimal', 'professional'], weight: '400,700', style: 'sans-serif' },
  { family: 'Outfit', moods: ['minimal', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Figtree', moods: ['minimal', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Karla', moods: ['minimal', 'professional'], weight: '400,700', style: 'sans-serif' },
  { family: 'Urbanist', moods: ['minimal', 'elegant'], weight: '400,700', style: 'sans-serif' },
  { family: 'Syne', moods: ['minimal', 'creative'], weight: '400,700', style: 'sans-serif' },
  { family: 'Space Grotesk', moods: ['minimal', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Epilogue', moods: ['minimal', 'professional'], weight: '400,700', style: 'sans-serif' },
  { family: 'Jost', moods: ['minimal', 'professional'], weight: '400,700', style: 'sans-serif' },

  // Playful / Friendly
  { family: 'Nunito', moods: ['playful', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Poppins', moods: ['playful', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Quicksand', moods: ['playful', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Varela Round', moods: ['playful', 'friendly'], weight: '400', style: 'sans-serif' },
  { family: 'Fredoka', moods: ['playful', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Baloo 2', moods: ['playful', 'friendly'], weight: '400,700', style: 'display' },
  { family: 'Comfortaa', moods: ['playful', 'friendly'], weight: '400,700', style: 'display' },
  { family: 'Righteous', moods: ['playful', 'retro'], weight: '400', style: 'display' },
  { family: 'Pacifico', moods: ['playful', 'retro'], weight: '400', style: 'handwriting' },
  { family: 'Caveat', moods: ['playful', 'creative'], weight: '400,700', style: 'handwriting' },
  { family: 'Patrick Hand', moods: ['playful', 'friendly'], weight: '400', style: 'handwriting' },
  { family: 'Kalam', moods: ['playful', 'creative'], weight: '400,700', style: 'handwriting' },

  // Retro
  { family: 'Abril Fatface', moods: ['retro', 'aggressive'], weight: '400', style: 'display' },
  { family: 'Alfa Slab One', moods: ['retro', 'aggressive'], weight: '400', style: 'display' },
  { family: 'Arvo', moods: ['retro', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'Crete Round', moods: ['retro', 'friendly'], weight: '400', style: 'serif' },
  { family: 'Bitter', moods: ['retro', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'Zilla Slab', moods: ['retro', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'Teko', moods: ['retro', 'aggressive'], weight: '400,700', style: 'sans-serif' },
  { family: 'Oswald', moods: ['retro', 'aggressive'], weight: '400,700', style: 'sans-serif' },
  { family: 'Russo One', moods: ['retro', 'aggressive'], weight: '400', style: 'sans-serif' },
  { family: 'Bebas Neue', moods: ['retro', 'aggressive'], weight: '400', style: 'display' },
  { family: 'Permanent Marker', moods: ['retro', 'playful'], weight: '400', style: 'handwriting' },
  { family: 'Bangers', moods: ['retro', 'playful'], weight: '400', style: 'display' },
  { family: 'Luckiest Guy', moods: ['retro', 'playful'], weight: '400', style: 'display' },

  // Technical / Monospace
  { family: 'JetBrains Mono', moods: ['technical', 'minimal'], weight: '400,700', style: 'monospace' },
  { family: 'Fira Code', moods: ['technical', 'minimal'], weight: '400,700', style: 'monospace' },
  { family: 'Source Code Pro', moods: ['technical', 'minimal'], weight: '400,700', style: 'monospace' },
  { family: 'Space Mono', moods: ['technical', 'retro'], weight: '400,700', style: 'monospace' },
  { family: 'Roboto Mono', moods: ['technical', 'professional'], weight: '400,700', style: 'monospace' },
  { family: 'IBM Plex Mono', moods: ['technical', 'professional'], weight: '400,700', style: 'monospace' },
  { family: 'Courier Prime', moods: ['technical', 'retro'], weight: '400,700', style: 'monospace' },
  { family: 'Inconsolata', moods: ['technical', 'minimal'], weight: '400,700', style: 'monospace' },

  // Creative / Display
  { family: 'Raleway', moods: ['creative', 'elegant'], weight: '400,700', style: 'sans-serif' },
  { family: 'Cinzel', moods: ['creative', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Philosopher', moods: ['creative', 'elegant'], weight: '400,700', style: 'serif' },
  { family: 'Poiret One', moods: ['creative', 'elegant'], weight: '400', style: 'display' },
  { family: 'Exo 2', moods: ['creative', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Orbitron', moods: ['creative', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Audiowide', moods: ['creative', 'technical'], weight: '400', style: 'display' },
  { family: 'Rajdhani', moods: ['creative', 'aggressive'], weight: '400,700', style: 'sans-serif' },
  { family: 'Saira', moods: ['creative', 'professional'], weight: '400,700', style: 'sans-serif' },
  { family: 'Barlow', moods: ['creative', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Mulish', moods: ['creative', 'minimal'], weight: '400,700', style: 'sans-serif' },

  // Aggressive / Bold
  { family: 'Black Han Sans', moods: ['aggressive', 'retro'], weight: '400', style: 'sans-serif' },
  { family: 'Anton', moods: ['aggressive', 'retro'], weight: '400', style: 'sans-serif' },
  { family: 'Black Ops One', moods: ['aggressive', 'retro'], weight: '400', style: 'display' },
  { family: 'Boogaloo', moods: ['aggressive', 'playful'], weight: '400', style: 'display' },
  { family: 'Passion One', moods: ['aggressive', 'retro'], weight: '400,700', style: 'display' },
  { family: 'Squada One', moods: ['aggressive', 'technical'], weight: '400', style: 'display' },
  { family: 'Michroma', moods: ['aggressive', 'technical'], weight: '400', style: 'display' },
  { family: 'Chakra Petch', moods: ['aggressive', 'technical'], weight: '400,700', style: 'display' },

  // Pre-listed general fillers matching moods
  { family: 'Montserrat', moods: ['professional', 'elegant'], weight: '400,700', style: 'sans-serif' },
  { family: 'Titillium Web', moods: ['professional', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Oxygen', moods: ['minimal', 'professional'], weight: '400,700', style: 'sans-serif' },
  { family: 'Mukta', moods: ['friendly', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Hind', moods: ['professional', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Rubik', moods: ['friendly', 'playful'], weight: '400,700', style: 'sans-serif' },
  { family: 'Ubuntu', moods: ['technical', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Noto Serif', moods: ['elegant', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'PT Serif', moods: ['elegant', 'retro'], weight: '400,700', style: 'serif' },
  { family: 'Vollkorn', moods: ['elegant', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Alegreya', moods: ['elegant', 'creative'], weight: '400,700', style: 'serif' },
  { family: 'Domine', moods: ['elegant', 'professional'], weight: '400,700', style: 'serif' },
  { family: 'Rokkitt', moods: ['retro', 'elegant'], weight: '400,700', style: 'serif' },
  { family: 'Rambla', moods: ['friendly', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Dosis', moods: ['playful', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Exo', moods: ['technical', 'creative'], weight: '400,700', style: 'sans-serif' },
  { family: 'Quantico', moods: ['technical', 'aggressive'], weight: '400,700', style: 'display' },
  { family: 'Share Tech Mono', moods: ['technical', 'retro'], weight: '400', style: 'monospace' },
  { family: 'Shadows Into Light', moods: ['playful', 'creative'], weight: '400', style: 'handwriting' },
  { family: 'Dancing Script', moods: ['elegant', 'playful'], weight: '400,700', style: 'handwriting' },
  { family: 'Great Vibes', moods: ['luxury', 'elegant'], weight: '400', style: 'handwriting' },
  { family: 'Sacramento', moods: ['luxury', 'elegant'], weight: '400', style: 'handwriting' },
  { family: 'Lobster', moods: ['retro', 'playful'], weight: '400', style: 'display' },
  { family: 'Satisfy', moods: ['elegant', 'playful'], weight: '400', style: 'handwriting' },
  { family: 'Amatic SC', moods: ['playful', 'creative'], weight: '400,700', style: 'handwriting' },
  { family: 'Rye', moods: ['retro', 'creative'], weight: '400', style: 'display' },
  { family: 'Yeseva One', moods: ['luxury', 'creative'], weight: '400', style: 'display' },
  { family: 'Cardo', moods: ['elegant', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Josefin Slab', moods: ['retro', 'elegant'], weight: '400,700', style: 'serif' },
  { family: 'Arima', moods: ['playful', 'creative'], weight: '400,700', style: 'display' },
  { family: 'Gochi Hand', moods: ['playful', 'friendly'], weight: '400', style: 'handwriting' },
  { family: 'Secular One', moods: ['minimal', 'aggressive'], weight: '400', style: 'sans-serif' },
  { family: 'Heebo', moods: ['professional', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Varela', moods: ['minimal', 'friendly'], weight: '400', style: 'sans-serif' },

  // Additional gorgeous and popular Google fonts to guarantee exactly 120 unique entries
  { family: 'Sora', moods: ['minimal', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Schibsted Grotesk', moods: ['professional', 'minimal'], weight: '400,700', style: 'sans-serif' },
  { family: 'Press Start 2P', moods: ['technical', 'retro'], weight: '400', style: 'display' },
  { family: 'VT323', moods: ['technical', 'retro'], weight: '400', style: 'monospace' },
  { family: 'Monoton', moods: ['retro', 'creative'], weight: '400', style: 'display' },
  { family: 'Cinzel Decorative', moods: ['luxury', 'creative'], weight: '400', style: 'display' },
  { family: 'Bungee', moods: ['retro', 'aggressive'], weight: '400', style: 'display' },
  { family: 'Lilita One', moods: ['playful', 'friendly'], weight: '400', style: 'display' },
  { family: 'Special Elite', moods: ['retro', 'creative'], weight: '400', style: 'display' },
  { family: 'Kaushan Script', moods: ['creative', 'playful'], weight: '400', style: 'handwriting' },
  { family: 'Instrument Serif', moods: ['elegant', 'luxury'], weight: '400', style: 'serif' },
  { family: 'Chivo', moods: ['professional', 'aggressive'], weight: '400,700', style: 'sans-serif' },
  { family: 'Playfair', moods: ['elegant', 'minimal'], weight: '400,700', style: 'serif' },
  { family: 'Josefin Sans Serif', moods: ['elegant', 'luxury'], weight: '400,700', style: 'sans-serif' },
  { family: 'DM Serif Text', moods: ['elegant', 'luxury'], weight: '400', style: 'serif' },
  { family: 'Overpass', moods: ['professional', 'technical'], weight: '400,700', style: 'sans-serif' },
  { family: 'Comfortaa Rounded', moods: ['playful', 'friendly'], weight: '400,700', style: 'sans-serif' },
  { family: 'Cabinet Grotesk Alternative', moods: ['minimal', 'creative'], weight: '400,700', style: 'sans-serif' },
  { family: 'Nanum Gothic Coding', moods: ['technical', 'minimal'], weight: '400,700', style: 'monospace' },
  { family: 'Cinzel Decorative Pro', moods: ['creative', 'luxury'], weight: '400,700', style: 'serif' },
  { family: 'Rubik Glitch', moods: ['aggressive', 'creative'], weight: '400', style: 'display' },
  { family: 'Luckiest Guy Pro', moods: ['playful', 'retro'], weight: '400', style: 'display' }
];

// Helper to get exactly 120 unique fonts, filtered securely to guarantee no duplicate families
const seen = new Set<string>();
export const CURATED_FONTS = FONTS_DATA.filter(font => {
  if (seen.has(font.family.toLowerCase())) {
    return false;
  }
  seen.add(font.family.toLowerCase());
  return true;
}).slice(0, 120);

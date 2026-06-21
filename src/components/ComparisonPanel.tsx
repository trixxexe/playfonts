import { X, Copy, Heart } from 'lucide-react';
import { FontEntry } from '../types';
import { MOOD_COLORS } from './FontCard';

interface ComparisonPanelProps {
  selectedFonts: FontEntry[];
  fontSize: number;
  weight: '400' | '700';
  text: string;
  isFavorite: (family: string) => boolean;
  onToggleFavorite: (family: string) => void;
  onClear: () => void;
  onClose: () => void;
  onCopyCSS: (css: string, family: string) => void;
}

export default function ComparisonPanel({
  selectedFonts,
  fontSize,
  weight,
  text,
  isFavorite,
  onToggleFavorite,
  onClear,
  onClose,
  onCopyCSS,
}: ComparisonPanelProps) {
  if (selectedFonts.length === 0) return null;

  const handleCopy = (font: FontEntry) => {
    const cssCode = `font-family: '${font.family}', ${font.style};`;
    navigator.clipboard.writeText(cssCode).then(() => {
      onCopyCSS(cssCode, font.family);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl overflow-y-auto px-4 py-8 md:p-8 flex flex-col justify-start">
      {/* Compare Header */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span>⊞</span> Font Comparison
          </h2>
          <p className="text-sm text-white/50 mt-1">
            Comparing {selectedFonts.length} of {selectedFonts.length === 1 ? '1 font' : `${selectedFonts.length} fonts`} side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/5"
          >
            Clear Selected
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-all border border-purple-500/20"
            title="Exit comparison"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Comparisons Content */}
      <div className="max-w-7xl w-full mx-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {selectedFonts.map((font) => {
          const activeWeight = font.weight.includes(weight) ? weight : font.weight.includes('400') ? '400' : '700';
          const mainMood = font.moods[0] || 'professional';
          const moodColorConfig = MOOD_COLORS[mainMood] || MOOD_COLORS.professional;
          const isFav = isFavorite(font.family);

          return (
            <div
              key={font.family}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[350px] relative shadow-2xl transition-all"
              style={{
                borderColor: `rgba(${moodColorConfig.rgb}, 0.25)`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(${moodColorConfig.rgb}, 0.05)`,
              }}
            >
              {/* Top Meta info */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                <div>
                  <h3 className="font-display font-semibold text-lg text-white" style={{ fontFamily: `'${font.family}'` }}>{font.family}</h3>
                  <p className="text-xs font-mono text-white/50 capitalize mt-0.5">Style: {font.style}</p>
                </div>
                
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(font.family)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isFav
                        ? 'border-pink-500/30 text-pink-500 bg-pink-500/10'
                        : 'border-white/10 text-white/40 hover:text-white/80'
                    }`}
                  >
                    <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => handleCopy(font)}
                    className="p-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white/80 hover:border-white/20 transition-all"
                    title="Copy CSS code"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Display Area */}
              <div className="flex-1 flex items-center justify-center py-4 px-2 overflow-x-hidden">
                <div
                  className="w-full text-white text-center select-all break-words"
                  style={{
                    fontFamily: `'${font.family}', ${font.style}`,
                    fontSize: `${fontSize}px`,
                    fontWeight: activeWeight,
                    lineHeight: 1.3,
                  }}
                >
                  {text || 'The quick brown fox'}
                </div>
              </div>

              {/* Bottom Mood configuration */}
              <div className="border-t border-white/5 pt-4 mt-4 flex flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {font.moods.map((m) => {
                    const c = MOOD_COLORS[m] || MOOD_COLORS.professional;
                    return (
                      <span
                        key={m}
                        className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-md border capitalize ${c.border} ${c.bg} ${c.text}`}
                      >
                        {m}
                      </span>
                    );
                  })}
                </div>
                <div className="text-[10px] font-mono text-white/30 truncate mt-1">
                  CSS: font-family: '{font.family}';
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

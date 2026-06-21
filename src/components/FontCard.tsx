import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Copy, Check } from 'lucide-react';
import { FontEntry } from '../types';

export const MOOD_COLORS: Record<string, { hex: string; rgb: string; border: string; bg: string; text: string }> = {
  professional: { hex: '#6366f1', rgb: '99,102,241', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
  playful: { hex: '#f472b6', rgb: '244,114,182', border: 'border-pink-500/30', bg: 'bg-pink-500/10', text: 'text-pink-400' },
  elegant: { hex: '#d4a574', rgb: '212,165,116', border: 'border-[#d4a574]/30', bg: 'bg-[#d4a574]/15', text: 'text-[#d4a574]' },
  aggressive: { hex: '#ef4444', rgb: '239,68,68', border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-400' },
  minimal: { hex: '#94a3b8', rgb: '148,163,184', border: 'border-slate-500/30', bg: 'bg-slate-500/10', text: 'text-slate-400' },
  retro: { hex: '#f97316', rgb: '249,115,22', border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-400' },
  technical: { hex: '#22d3ee', rgb: '34,211,238', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  friendly: { hex: '#4ade80', rgb: '74,222,128', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  luxury: { hex: '#a855f7', rgb: '168,85,247', border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  creative: { hex: '#fb923c', rgb: '251,146,60', border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

interface FontCardProps {
  key?: string;
  font: FontEntry;
  fontSize: number;
  weight: '400' | '700';
  text: string;
  isFavorite: boolean;
  onToggleFavorite: (family: string) => void;
  compareMode: boolean;
  isSelectedForCompare: boolean;
  onToggleCompare: (family: string) => void;
  onCopyCSS: (css: string, family: string) => void;
  index: number;
}

export default function FontCard({
  font,
  fontSize,
  weight,
  text,
  isFavorite,
  onToggleFavorite,
  compareMode,
  isSelectedForCompare,
  onToggleCompare,
  onCopyCSS,
  index,
}: FontCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine actual target font weight for rendering
  const activeWeight = font.weight.includes(weight) ? weight : font.weight.includes('400') ? '400' : '700';

  // IntersectionObserver to lazy load fonts
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch / Inject Font CSS upon visible
  useEffect(() => {
    if (!isVisible) return;

    const formattedWeight = font.weight.includes('700') ? '400;700' : '400';
    const encoded = encodeURIComponent(font.family);
    const url = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${formattedWeight}&display=swap`;
    const linkId = `gfont-${font.family.replace(/\s+/g, '-').toLowerCase()}`;

    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }

    let active = true;
    if ('fonts' in document) {
      document.fonts
        .load(`16px '${font.family}'`)
        .then(() => {
          if (active) setIsFontLoaded(true);
        })
        .catch(() => {
          setTimeout(() => {
            if (active) setIsFontLoaded(true);
          }, 350);
        });
    } else {
      setIsFontLoaded(true);
    }

    return () => {
      active = false;
    };
  }, [isVisible, font.family, font.weight]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cssCode = `font-family: '${font.family}', ${font.style};`;
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      onCopyCSS(cssCode, font.family);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCardClick = () => {
    if (compareMode) {
      onToggleCompare(font.family);
    }
  };

  // Border brightness overlay glow on hover
  const mainMood = font.moods[0] || 'professional';
  const moodColorConfig = MOOD_COLORS[mainMood];

  const hoverStyle = !isFontLoaded
    ? {}
    : {
        borderColor: `rgba(${moodColorConfig.rgb}, 0.35)`,
        boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(${moodColorConfig.rgb}, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
      };

  const activeCompareStyle = isSelectedForCompare
    ? {
        borderColor: `rgba(${moodColorConfig.rgb}, 0.8)`,
        boxShadow: `0 0 25px rgba(${moodColorConfig.rgb}, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
        transform: 'scale(1.01)',
      }
    : {};

  return (
    <motion.div
      ref={cardRef}
      id={`font-card-${font.family.replace(/\s+/g, '-').toLowerCase()}`}
      onClick={handleCardClick}
      className={`font-card relative overflow-hidden group p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 ${
        compareMode ? 'cursor-pointer select-none' : 'cursor-default'
      }`}
      style={{
        ...activeCompareStyle,
      }}
      whileHover={compareMode ? {} : hoverStyle}
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.015, 0.25), duration: 0.25, ease: 'easeOut' }}
    >
      {/* Favorite and Selection Indicators */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {compareMode && (
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelectedForCompare
                ? 'bg-purple-500 border-purple-400 scale-110 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                : 'border-white/25 bg-black/20 group-hover:border-white/50'
            }`}
          >
            {isSelectedForCompare && <Check size={12} className="text-white stroke-[3.5]" />}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(font.family);
          }}
          className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 bg-black/25 backdrop-blur-md border ${
            isFavorite
              ? 'border-pink-500/40 text-pink-500 bg-pink-500/10'
              : 'border-white/10 text-white/40 hover:text-white/80 hover:border-white/20'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} className="transition-colors duration-300" />
        </button>
      </div>

      {/* Primary font rendering area */}
      <div className="flex-1 min-h-[80px] flex items-center py-2">
        {!isFontLoaded ? (
          <div className="w-full flex flex-col gap-2">
            <div className="h-8 shimmer-loader rounded-md w-11/12" />
            <div className="h-4 shimmer-loader rounded-md w-2/3 opacity-50" />
          </div>
        ) : (
          <div
            className="text-white hover:text-white transition-all w-full text-left"
            style={{
              fontFamily: `'${font.family}', ${font.style}`,
              fontSize: `${fontSize}px`,
              fontWeight: activeWeight,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              wordBreak: 'break-word',
            }}
          >
            {text || 'The quick brown fox'}
          </div>
        )}
      </div>

      {/* Information Row */}
      <div className="border-t border-white/5 pt-4 mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-display font-semibold text-sm tracking-tight text-white/95">
              {font.family}
            </span>
            <span className="text-[11px] font-mono text-white/50 capitalize">
              Style: <span className="text-white/70 font-sans text-[11px]">{font.style === 'sans-serif' ? 'Sans-serif' : font.style}</span>
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
            title="Copy CSS Rule"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span className="text-[10px] font-mono">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Mood badges */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {font.moods.map((mood) => {
            const cfg = MOOD_COLORS[mood] || MOOD_COLORS.professional;
            return (
              <span
                key={mood}
                className={`text-[9.5px] font-medium px-2 py-0.5 rounded-md border capitalize ${cfg.border} ${cfg.bg} ${cfg.text}`}
              >
                {mood}
              </span>
            );
          })}
        </div>

        {/* Small Specimen Row */}
        <div
          className="text-white/30 text-[11px] tracking-wider mt-1 truncate select-none font-medium"
          style={{
            fontFamily: isFontLoaded ? `'${font.family}', ${font.style}` : 'sans-serif',
            fontWeight: activeWeight,
          }}
        >
          Aa Bb Cc 1 2 3 !@#
        </div>
      </div>
    </motion.div>
  );
}

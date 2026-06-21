import { useState, useEffect } from 'react';
import { CURATED_FONTS } from './fontsData';
import FontCard from './components/FontCard';
import ComparisonPanel from './components/ComparisonPanel';
import Toast from './components/Toast';
import { FontEntry, Mood, FontStyle } from './types';
import { Heart, Sparkles } from 'lucide-react';

const PRESETS = [
  'The quick brown fox',
  'Hello, World!',
  'PLAYFONTS',
  '0123456789',
  'Type your name'
];

const MOODS: { mood: Mood; label: string; rgb: string; hex: string }[] = [
  { mood: 'professional', label: 'Professional', rgb: '99,102,241', hex: '#6366f1' },
  { mood: 'playful', label: 'Playful', rgb: '244,114,182', hex: '#f472b6' },
  { mood: 'elegant', label: 'Elegant', rgb: '212,165,116', hex: '#d4a574' },
  { mood: 'aggressive', label: 'Aggressive', rgb: '239,68,68', hex: '#ef4444' },
  { mood: 'minimal', label: 'Minimal', rgb: '148,163,184', hex: '#94a3b8' },
  { mood: 'retro', label: 'Retro', rgb: '249,115,22', hex: '#f97316' },
  { mood: 'technical', label: 'Technical', rgb: '34,211,238', hex: '#22d3ee' },
  { mood: 'friendly', label: 'Friendly', rgb: '74,222,128', hex: '#4ade80' },
  { mood: 'luxury', label: 'Luxury', rgb: '168,85,247', hex: '#a855f7' },
  { mood: 'creative', label: 'Creative', rgb: '251,146,60', hex: '#fb923c' },
];

const STYLES: { value: 'all' | FontStyle; label: string }[] = [
  { value: 'all', label: 'All Styles' },
  { value: 'sans-serif', label: 'Sans-serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'display', label: 'Display' },
  { value: 'handwriting', label: 'Handwriting' },
];

export default function App() {
  // Real-time Text States
  const [rawInput, setRawInput] = useState('The quick brown fox');
  const [debouncedInput, setDebouncedInput] = useState('The quick brown fox');

  // Interactive Configuration States
  const [fontSize, setFontSize] = useState(32);
  const [weight, setWeight] = useState<'400' | '700'>('400');
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<'all' | FontStyle>('all');
  const [sortBy, setSortBy] = useState<'mood' | 'alphabetical' | 'style' | 'random'>('mood');
  const [randomShuffleKey, setRandomShuffleKey] = useState(1);

  // Favorites States
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  // Comparison States
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCompareFonts, setSelectedCompareFonts] = useState<string[]>([]);
  const [isViewingComparison, setIsViewingComparison] = useState(false);

  // Clock Ticker States
  const [time, setTime] = useState('');
  const [tz, setTz] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Debounce Text Input Update
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(rawInput);
    }, 150);
    return () => clearTimeout(handler);
  }, [rawInput]);

  // Live Clock Trigger
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      const timezone = now.toLocaleTimeString('en', { timeZoneName: 'short' }).split(' ').pop() || '';
      setTime(formattedTime);
      setTz(timezone);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Show Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Toggle Favorite Mode
  const handleToggleFavorite = (family: string) => {
    if (favorites.includes(family)) {
      setFavorites((prev) => prev.filter((f) => f !== family));
      triggerToast(`Removed ${family} from favorites!`);
    } else {
      if (favorites.length >= 20) {
        triggerToast('Maximum 20 favorites exceeded! ⚠️');
        return;
      }
      setFavorites((prev) => [...prev, family]);
      triggerToast(`Saved ${family} to favorites! ♥`);
    }
  };

  // Toggle Compare Mode list Selection
  const handleToggleCompare = (family: string) => {
    const isMobile = window.innerWidth < 768;
    const limit = isMobile ? 2 : 4;

    if (selectedCompareFonts.includes(family)) {
      setSelectedCompareFonts((prev) => prev.filter((f) => f !== family));
    } else {
      if (selectedCompareFonts.length >= limit) {
        triggerToast(`Compare limit reached! (${limit} fonts max on this screen)`);
        return;
      }
      setSelectedCompareFonts((prev) => [...prev, family]);
    }
  };

  // Mood Picker Helper
  const handleToggleMood = (mood: Mood) => {
    setSelectedMoods((prev) => {
      if (prev.includes(mood)) {
        return prev.filter((m) => m !== mood);
      } else {
        return [...prev, mood];
      }
    });
  };

  // Render Filter logic
  const filteredFonts = CURATED_FONTS.filter((font) => {
    // Favorites filtering
    if (activeTab === 'favorites' && !favorites.includes(font.family)) {
      return false;
    }

    // Mood union selection logic
    if (selectedMoods.length > 0) {
      const match = font.moods.some((m) => selectedMoods.includes(m));
      if (!match) return false;
    }

    // Style filter logic
    if (selectedStyle !== 'all' && font.style !== selectedStyle) {
      return false;
    }

    return true;
  });

  // Sort logic applied
  const getSortedFonts = (list: FontEntry[]) => {
    const result = [...list];
    if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.family.localeCompare(b.family));
    } else if (sortBy === 'style') {
      const styleOrder = { 'serif': 1, 'sans-serif': 2, 'monospace': 3, 'display': 4, 'handwriting': 5 };
      result.sort((a, b) => {
        const orderA = styleOrder[a.style] || 99;
        const orderB = styleOrder[b.style] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return a.family.localeCompare(b.family);
      });
    } else if (sortBy === 'random') {
      // Linear Congruential random generator seeded consistently
      const rng = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      let seed = randomShuffleKey;
      result.sort(() => rng(seed++) - 0.5);
    } else {
      // Sort by mood active matching strength
      if (selectedMoods.length > 0) {
        result.sort((a, b) => {
          const countA = a.moods.filter((m) => selectedMoods.includes(m)).length;
          const countB = b.moods.filter((m) => selectedMoods.includes(m)).length;
          if (countA !== countB) return countB - countA;
          return a.family.localeCompare(b.family);
        });
      }
    }
    return result;
  };

  const finalFontsToRender = getSortedFonts(filteredFonts);

  // Get matching Font objects for currently compared selection
  const comparedFontsObjects = CURATED_FONTS.filter((f) => selectedCompareFonts.includes(f.family));

  return (
    <div className="relative min-h-screen pb-24 z-10 font-sans">
      {/* Background orbs */}
      <div className="bg-orbs-container">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
      </div>

      {/* STICKY GLASS HEADER */}
      <header className="sticky top-0 z-40 bg-[#000000]/30 backdrop-blur-3xl border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.35)]">
              <span className="text-white font-mono font-black text-sm">▶</span>
            </div>
            <span className="font-mono font-bold tracking-[0.165em] text-white text-base md:text-lg select-none">
              PLAYFONTS
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => {
                setActiveTab('all');
                setCompareMode(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all ${
                activeTab === 'all' && !compareMode
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-white/60 hover:text-white/90 border border-transparent'
              }`}
            >
              Explore
            </button>

            <button
              id="favorites-nav-btn"
              onClick={() => {
                setActiveTab('favorites');
                setCompareMode(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                activeTab === 'favorites' && !compareMode
                  ? 'bg-pink-500/18 text-pink-400 border border-pink-500/30 shadow-[0_0_10px_rgba(244,114,182,0.1)]'
                  : 'text-white/60 hover:text-white/90 border border-transparent'
              }`}
            >
              <Heart size={12} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
              <span>Favorites ({favorites.length})</span>
            </button>

            <button
              id="compare-nav-btn"
              onClick={() => {
                setCompareMode(!compareMode);
                setActiveTab('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                compareMode
                  ? 'bg-purple-500/18 text-purple-400 border border-purple-500/30'
                  : 'text-white/60 hover:text-white/90 border border-transparent'
              }`}
            >
              <span className="text-[14px]">⊞</span>
              <span>Compare</span>
            </button>
          </div>

          {/* Clock Pill */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full select-none" id="clock-pill">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/70 tracking-tight">
              {time} <span className="text-white/40">{tz}</span>
            </span>
          </div>
        </div>
      </header>

      {/* CORE FRAME LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-8">
        {/* LIQUID GLASS INPUT CARD */}
        <section className="glass-input-card p-6 md:p-8 flex flex-col gap-6" id="input-controls-section">
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#a855f7]/80 flex items-center gap-2 font-bold">
              <Sparkles size={12} /> Live Specimen Renderer
            </div>
            <textarea
              id="text-renderer-input"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Type anything to specimen preview..."
              className="w-full bg-transparent text-white border-0 focus:outline-none text-xl sm:text-2xl md:text-3xl font-normal resize-none placeholder-white/20 h-20"
            />
          </div>

          {/* Core Preset Quick Chips */}
          <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-4">
            <span className="text-xs font-mono text-white/40 select-none mr-1">Presets:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setRawInput(preset)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  rawInput === preset
                    ? 'bg-white/12 text-white border-white/20 shadow-md'
                    : 'bg-white/3 border-white/8 text-white/50 hover:bg-white/6 hover:text-white/80'
                }`}
              >
                {preset === 'Type your name' ? 'Type your name' : preset}
              </button>
            ))}
          </div>

          {/* Dynamic properties sliders & parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t border-white/5 pt-5">
            {/* Font Size range selector */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-white/60 font-mono">
                <span className="font-medium">Font size</span>
                <span className="text-purple-400 font-bold">{fontSize}px</span>
              </div>
              <input
                id="font-size-slider"
                type="range"
                min="16"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Thickness / Weight Button Toggle */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-white/60 font-mono text-left">Weight rendering</span>
              <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  id="weight-regular-btn"
                  onClick={() => setWeight('400')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    weight === '400'
                      ? 'bg-purple-500/80 text-white shadow-md'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Regular (400)
                </button>
                <button
                  id="weight-bold-btn"
                  onClick={() => setWeight('700')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    weight === '700'
                      ? 'bg-purple-500/80 text-white shadow-md'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Bold (700)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON STATUS FLOAT PILL */}
        {compareMode && (
          <div
            id="compare-status-pill"
            className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/35 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_10px_35px_rgba(168,85,247,0.15)] animate-fade-in"
          >
            <div className="text-left w-full">
              <h4 className="text-sm font-semibold text-purple-200">⊞ Multi-compare Mode active</h4>
              <p className="text-xs text-white/60 mt-0.5">
                {selectedCompareFonts.length === 0
                  ? 'Select up to 4 fonts below to compare them side-by-side'
                  : `Selected: ${selectedCompareFonts.join(', ')}`}
              </p>
            </div>
            <div className="flex gap-2 shrink-0 w-full md:w-auto">
              <button
                disabled={selectedCompareFonts.length === 0}
                onClick={() => setIsViewingComparison(true)}
                className="flex-1 md:flex-initial px-5 py-2 text-xs font-bold bg-[#a855f7] hover:bg-[#b063f8] disabled:opacity-40 disabled:hover:bg-[#a855f7] text-white rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                View Comparison ({selectedCompareFonts.length})
              </button>
              <button
                onClick={() => setSelectedCompareFonts([])}
                className="px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/5"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* HORIZONTAL SCROLLABLE MOOD FILTER */}
        <section className="flex flex-col gap-4 border-b border-white/5 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold font-mono tracking-wider text-white/55 uppercase text-left">
              Filter by personality mood
            </h3>
            {selectedMoods.length > 0 && (
              <button
                onClick={() => setSelectedMoods([])}
                className="text-xs text-[#fb923c] hover:underline font-mono text-left"
              >
                Clear All Mood Filters ({selectedMoods.length})
              </button>
            )}
          </div>

          {/* Custom style mapping for mood pills to give them custom color active highlights */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* "All" button */}
            <button
              onClick={() => setSelectedMoods([])}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0 cursor-pointer ${
                selectedMoods.length === 0
                  ? 'bg-white/15 text-white border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                  : 'bg-white/4 border-white/8 text-white/45 hover:bg-white/8 hover:text-white/80'
              }`}
            >
              All Moods
            </button>

            {/* List of custom mood buttons */}
            {MOODS.map(({ mood, label, rgb, hex }) => {
              const isActive = selectedMoods.includes(mood);
              return (
                <button
                  key={mood}
                  onClick={() => handleToggleMood(mood)}
                  className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0 cursor-pointer"
                  style={
                    isActive
                      ? {
                          backgroundColor: `rgba(${rgb}, 0.18)`,
                          borderColor: `rgba(${rgb}, 0.45)`,
                          boxShadow: `0 0 16px rgba(${rgb}, 0.25)`,
                          color: hex,
                        }
                      : {
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          borderColor: 'rgba(255, 255, 255, 0.08)',
                          color: 'rgba(255, 255, 255, 0.45)',
                        }
                  }
                >
                  <span className="mr-1.5" style={{ color: hex }}>●</span>
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECONDARY LAYOUT CONTROLS (STYLE FILTER & SORT DROPDOWN) */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4" id="layout-controls">
          {/* Style Filters */}
          <div className="flex flex-wrap gap-2">
            {STYLES.map((styleOpt) => {
              const isActive = selectedStyle === styleOpt.value;
              return (
                <button
                  key={styleOpt.value}
                  onClick={() => setSelectedStyle(styleOpt.value)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all border cursor-pointer capitalize ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-medium'
                      : 'bg-white/4 border-white/5 text-white/50 hover:bg-white/8 hover:text-white/80'
                  }`}
                >
                  {styleOpt.label}
                </button>
              );
            })}
          </div>

          {/* Sort Menu Options */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-white/40">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setSortBy(val);
                  if (val === 'random') {
                    setRandomShuffleKey(Math.floor(Math.random() * 10000) + 1);
                  }
                }}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white/80 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all cursor-pointer font-mono"
              >
                <option value="mood" className="bg-[#0b0617] text-white">Mood Match (Best)</option>
                <option value="alphabetical" className="bg-[#0b0617] text-white">Alphabetical A→Z</option>
                <option value="style" className="bg-[#0b0617] text-white">Style Class</option>
                <option value="random" className="bg-[#0b0617] text-white">Random Shuffle</option>
              </select>
            </div>

            {sortBy === 'random' && (
              <button
                onClick={() => setRandomShuffleKey(Math.floor(Math.random() * 10000) + 1)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
                title="Shuffle again"
              >
                <span className="text-xs font-mono">Shuffle</span>
              </button>
            )}
          </div>
        </section>

        {/* LIVE TOTAL STAT COUNT */}
        <div className="flex items-center justify-between text-xs font-mono text-white/40 mt-2 select-none" id="stats-counter-line">
          <span>
            {activeTab === 'favorites' ? 'Viewing favorited collection' : 'Viewing curated catalog'}
          </span>
          <span>
            Showing {finalFontsToRender.length} of {activeTab === 'favorites' ? favorites.length : CURATED_FONTS.length} fonts matching criteria
          </span>
        </div>

        {/* FONT GRID DISPLAY */}
        {finalFontsToRender.length === 0 ? (
          <div className="font-card py-20 px-8 flex flex-col items-center justify-center gap-4 text-center border border-dashed border-white/10">
            <div className="text-3xl">📭</div>
            <h3 className="text-white/80 font-bold text-lg">No Matching Fonts Found</h3>
            <p className="text-sm text-white/45 max-w-sm">
              Try selection of less restrictive mood parameters, different style classes, or expanding your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedMoods([]);
                setSelectedStyle('all');
                setActiveTab('all');
                setCompareMode(false);
              }}
              className="px-4 py-2 text-xs bg-white/10 hover:bg-white/15 text-white font-mono rounded-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            id="font-preview-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {finalFontsToRender.map((font, idx) => (
              <FontCard
                key={`${font.family}-${randomShuffleKey}`}
                font={font}
                fontSize={fontSize}
                weight={weight}
                text={debouncedInput}
                isFavorite={favorites.includes(font.family)}
                onToggleFavorite={handleToggleFavorite}
                compareMode={compareMode}
                isSelectedForCompare={selectedCompareFonts.includes(font.family)}
                onToggleCompare={handleToggleCompare}
                onCopyCSS={(css, family) => triggerToast(`Copied CSS code for ${family}! 🎉`)}
                index={idx}
              />
            ))}
          </div>
        )}
      </main>

      {/* FULL COMPARISON MODAL */}
      {isViewingComparison && (
        <ComparisonPanel
          selectedFonts={comparedFontsObjects}
          fontSize={fontSize}
          weight={weight}
          text={rawInput} // use instant rawInput in comparison for fast contrasting
          isFavorite={(family) => favorites.includes(family)}
          onToggleFavorite={handleToggleFavorite}
          onClear={() => setSelectedCompareFonts([])}
          onClose={() => setIsViewingComparison(false)}
          onCopyCSS={(css, family) => triggerToast(`Copied CSS for ${family}! `)}
        />
      )}

      {/* TOAST MESSAGE DISPATCHER */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

# PLAYFONTS — The Mood-Driven Type Specimen Playground 🎨✨

PLAYFONTS is a high-performance, single-screen typography tool that renders any custom text sample across **120 Google Fonts simultaneously**. Rather than sorting fonts strictly alphabetically, fonts are filtered and classified by their **visual moods and emotional vibes**.

Developed with React 19, Vite, and designed with an immersive **iOS 18 Liquid Glass** aesthetic, it's a completely frontend-only applet without layout lags.

---

## 🌟 Core Features

### 1. Specimen Render Input
- Real-time glass text area updating preview text instantly (debounced by 150ms to keep execution lightweight and smooth).
- Quick preset chips (`The quick brown fox`, `Hello, World!`, `0123456789`, etc.) to quickly contrast glyph weights.
- Font size slider spanning dynamically from `16px` to `72px`.
- Font weight toggling between **Regular (400)** and **Bold (700)** where supported.

### 2. Personality Mood Filtering (The Core)
- Horizontal category ribbon for 10 custom defined visual moods:
  - **All Moods** (Glass card selector)
  - 💼 **Professional** (Indigo glow)
  - 🌸 **Playful** (Pink glow)
  - ⚜️ **Elegant** (Gold glow)
  - 🏎️ **Aggressive** (Red glow)
  - 📐 **Minimal** (Slate glow)
  - 📀 **Retro** (Orange glow)
  - 🤖 **Technical** (Cyan glow)
  - 🤝 **Friendly** (Green glow)
  - 👑 **Luxury** (Purple glow)
  - 🎨 **Creative** (Amber glow)
- Supports **Union Mode multi-filtering**: select multiple tags to view fonts matching *any* of the active moods.
- Showcases live filter tallies.

### 3. Smart Font Classification filter
- Sub-filters to narrow down standard typographical groups: `Sans-serif`, `Serif`, `Monospace`, `Display`, and `Handwriting`.

### 4. High-Performance IntersectionObserver Lazy Loading
- Built-in lazy observer ensuring we do not fetch or pre-resolve Google Fonts style loads blockades.
- Shimmer skeleton loaders appear instantly on screen entry.
- Direct integration of standard Google CSS API and the modern `document.fonts.load` browser API promises swift loading with no screen flickers.

### 5. Multi-Compare Layout
- Pick and compare up to **4 fonts** (restricted to 2 on smaller/mobile devices).
- Opens an overlay showcasing side-by-side specimening with active toggles.

### 6. Curated Favorites List
- Pin fonts by clicking the Heart button (Maximum of 20 elements).
- Jump to the Favorites collection with a single click.

---

## 🎨 Design Tokens (iOS 18 Liquid Glass Theme)

- **Backdrop Orbs**: 3 fixed, differently sized radial orbs rotating on infinite, asynchronous translate drift paths behind blurred panels.
- **Glass Card Architecture**: Satisfies `-webkit-backdrop-filter` and deep saturates, complete with inner borders and custom gradient glow borders based on the dominant mood tag.
- **Micro-Animations**: Staggered cards enter sequentially based on grid indexing.

---

## 🛠️ Stack & Optimization Guides

- **Framework**: React 19 + TypeScript 5
- **Build System**: Vite 6
- **Animations**: `motion/react` + CSS keyframes
- **Icons**: `lucide-react`
- **Styles**: Tailwind CSS CSS-import
- **API Keys**: No API key or server-side keys are required. Google Fonts loaded dynamically.

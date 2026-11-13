# Samuel Kouřil — Kinetic Portfolio

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live_Site-samuelkouril.com-8A5CFF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://samuelkouril.com/)
[![GitHub](https://img.shields.io/badge/GitHub-godblessamki-4EE0FF?style=for-the-badge&logo=github&logoColor=090A0F)](https://github.com/godblessamki)
[![Tests](https://img.shields.io/badge/Tests-4_Passing-22c55e?style=for-the-badge&logo=node.js&logoColor=white)](file:///Users/samuelkouril/Downloads/samuel-kouřil-—-kinetic-portfolio/src/portfolioLogic.test.js)
[![License](https://img.shields.io/badge/License-MIT-A8B0CD?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>Kinetic software engineering portfolio of Samuel Kouřil</strong><br />
  Showcasing native iOS applications, distributed full-stack .NET architectures, and Formula 1 telemetry engineering.
</p>

[**Explore Live Website »**](https://samuelkouril.com/)

</div>

---

## ⚡ Overview

This repository powers **[samuelkouril.com](https://samuelkouril.com/)**, an interactive, telemetry-themed personal portfolio. Built with an **Obsidian Kinetic** aesthetic, it combines native browser ES modules, custom HTML5 2D Canvas visualizations, and architectural breakdowns of real-world software systems.

### Core Highlights

- **⚡ Kinetic Telemetry Canvas**: Interactive 60fps HTML5 2D canvas with multi-node telemetry wave rendering, mouse/pointer field warping, and seamless domain switching (iOS, Distributed Systems, F1 Telemetry).
- **🎨 Obsidian Kinetic Design**: Dark canvas palette (`#090A0F`), glowing electric violet (`#8A5CFF`) and cyan (`#4EE0FF`) accents, structured with typography from *Syne*, *DM Sans*, and *Space Mono*.
- **🚀 Zero-Bundle Browser Native**: Driven by pure native ES Modules with zero heavy client framework bloat—instant initial load, high performance, and smooth animations.
- **♿ Accessibility & Performance**: Semantic HTML5 landmark structure, skip navigation links, dialog modals with focus management, and automatic `prefers-reduced-motion` compliance.
- **🧪 Unit Tested**: Comprehensive test suite using Node.js built-in `node:test` and `node:assert/strict` test runners.

---

## 🛠️ Featured Engineering Projects

The portfolio features deep-dive architectural breakdowns of three flagship projects:

### 1. [IronTrack (Workout Tracker)](https://github.com/godblessamki/Workout-Tracker)
> **Native iOS · Swift · SwiftUI · SwiftData · MVVM**
- Local-first native Apple workout tracker designed for zero-latency gym-floor logging.
- Deterministic previous-session set recall surfaces personal bests and target weights instantly during active routines.
- Built with strict MVVM separation and SwiftData persistence without cloud latency.

### 2. [UTB.Minute (OrderingSystemMenza)](https://github.com/Mofrus/OrderingSystemMenza)
> **C# · .NET 10 · Blazor WASM · PostgreSQL · Keycloak · .NET Aspire**
- Distributed university canteen ordering system orchestrated with .NET Aspire.
- Concurrency-safe order state transitions utilizing `System.Threading.Channels` over Server-Sent Events (SSE).
- Enterprise-grade transactional locks with Entity Framework Core, PostgreSQL, and Keycloak single sign-on.

### 3. [F1DataCompare](https://github.com/godblessamki/F1DataCompare)
> **Python · Telemetry Analysis · Data Pipelines · Formula 1 API**
- Historical and live race telemetry comparison platform for Formula 1.
- Normalizes sector times, throttle/brake traces, and tire stint degradation curves across drivers and racing seasons.
- Modular Python pipeline for reproducible motorsport performance analytics.

---

## 📁 Repository Structure

```text
├── index.html            # Main semantic HTML entry with custom SVG artwork & modal dialogs
├── favicon.svg           # Custom kinetic Obsidian "SK" vector favicon
├── CNAME                 # Custom domain configuration (samuelkouril.com)
├── package.json          # Project metadata, Vite dev toolchain & test scripts
├── vite.config.ts        # Vite build & local dev server configuration
├── tsconfig.json         # TypeScript compiler configuration
├── public/
│   └── favicon.svg       # Favicon asset bundle
└── src/
    ├── styles.css        # Obsidian Kinetic design tokens, layout & responsive CSS
    ├── main.js           # UI bootstrapping, interactive controls, modal lifecycle
    ├── kineticCanvas.js  # HTML5 2D Canvas telemetry wave & kinetic node simulation
    ├── portfolioData.js  # Structured portfolio projects, telemetry presets & bio data
    ├── portfolioLogic.js # Pure logic functions for filtering, formatting & calculations
    └── portfolioLogic.test.js # Native unit test suite (node:test)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ or later recommended)
- `npm` (comes bundled with Node.js)

### Installation

Clone the repository and install development dependencies:

```bash
git clone https://github.com/godblessamki/portfolio.git
cd portfolio
npm install
```

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open your browser to `http://localhost:3000` to preview changes in real time.

### Run Tests

Run the native Node.js unit test suite:

```bash
npm test
```

### Production Build

Compile and bundle for production distribution:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

This site is deployed continuously via **GitHub Pages** directly from the `main` branch:

- **Custom Domain**: Configured via [`CNAME`](CNAME) as `samuelkouril.com`.
- **Security**: Full HTTPS enforcement enabled with automatic SSL certification.
- **Root-Static Compatibility**: The codebase is engineered to run seamlessly as native static assets on GitHub Pages without requiring server-side rendering.

---

## 👤 Author

**Samuel Kouřil**
- 🎓 **University**: Tomas Bata University in Zlín (UTB)
- 💼 **Upcoming**: Incoming Intern · St. Mary's University (San Antonio, TX)
- 🌐 **Website**: [samuelkouril.com](https://samuelkouril.com/)
- 🐙 **GitHub**: [@godblessamki](https://github.com/godblessamki)
- 📸 **Instagram**: [@godblessamki](https://www.instagram.com/godblessamki/)
- ✉️ **Email**: [samuel.kouril@email.cz](mailto:samuel.kouril@email.cz)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

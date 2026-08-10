/* ===========================================
   TERMINAL PORTFOLIO — Interactions & Animations
   Samuel Kouřil — Personal Portfolio
   =========================================== */

(function () {
  'use strict';

  // ---------- Configuration ----------
  const BOOT_LINES = [
    { text: 'BIOS v3.2.1 — Initializing system...', type: 'default' },
    { text: 'Memory check: 16384 MB OK', type: 'default' },
    { text: 'Detecting storage devices... /dev/sda1 mounted', type: 'default' },
    { text: 'Loading kernel modules.............. done', type: 'success' },
    { text: 'Starting network services... connected', type: 'success' },
    { text: 'Mounting /home/samuel... OK', type: 'success' },
    { text: 'Loading user profile... OK', type: 'success' },
    { text: 'Checking dependencies... all packages up to date', type: 'default' },
    { text: 'WARNING: caffeine levels low', type: 'warn' },
    { text: 'Initializing portfolio renderer... OK', type: 'success' },
    { text: 'Compiling assets.................... done', type: 'success' },
    { text: '[READY] System boot complete.', type: 'success' },
    { text: '', type: 'default' },
    { text: 'Welcome, visitor.', type: 'default' },
  ];

  const TYPING_SPEED = 40;
  const BOOT_LINE_MIN_DELAY = 60;
  const BOOT_LINE_MAX_DELAY = 130;
  const BOOT_LINE_LONG_DELAY = 400;

  // ---------- Utility ----------
  function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ---------- Typing Engine ----------
  function typeText(element, text, speed) {
    speed = speed || TYPING_SPEED;
    return new Promise((resolve) => {
      element.textContent = '';
      let i = 0;

      // Create cursor
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      cursor.textContent = '█';
      element.parentNode.insertBefore(cursor, element.nextSibling);

      function tick() {
        if (i < text.length) {
          element.textContent += text[i];
          i++;
          setTimeout(tick, speed);
        } else {
          // Remove cursor after typing completes
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
          resolve();
        }
      }

      tick();
    });
  }

  // ---------- Boot Sequence ----------
  async function runBootSequence() {
    const bootLog = document.getElementById('boot-log');
    const heroName = document.getElementById('hero-name');
    const heroTagline = document.getElementById('hero-tagline');
    const heroCta = document.getElementById('hero-cta');

    if (!bootLog) return;

    for (let i = 0; i < BOOT_LINES.length; i++) {
      const line = BOOT_LINES[i];
      const lineEl = document.createElement('div');
      lineEl.className = 'boot-line';
      if (line.type !== 'default') {
        lineEl.classList.add(line.type);
      }
      lineEl.textContent = line.text;
      bootLog.appendChild(lineEl);

      // Determine delay
      let delay;
      if (line.text.includes('...') || line.text.includes('..')) {
        delay = BOOT_LINE_LONG_DELAY;
      } else {
        delay = randomDelay(BOOT_LINE_MIN_DELAY, BOOT_LINE_MAX_DELAY);
      }

      await sleep(delay);
      lineEl.classList.add('visible');

      // Scroll boot log to bottom
      bootLog.scrollTop = bootLog.scrollHeight;
    }

    // Wait a moment, then reveal hero content
    await sleep(600);

    if (heroName) heroName.classList.add('revealed');
    if (heroTagline) heroTagline.classList.add('revealed');
    if (heroCta) heroCta.classList.add('revealed');

    // Mark boot as complete
    sessionStorage.setItem('bootComplete', 'true');
  }

  function skipBootSequence() {
    const bootLog = document.getElementById('boot-log');
    const heroName = document.getElementById('hero-name');
    const heroTagline = document.getElementById('hero-tagline');
    const heroCta = document.getElementById('hero-cta');

    if (!bootLog) return;

    // Create all boot lines immediately
    BOOT_LINES.forEach((line) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'boot-line visible';
      if (line.type !== 'default') {
        lineEl.classList.add(line.type);
      }
      lineEl.textContent = line.text;
      bootLog.appendChild(lineEl);
    });

    // Show hero content immediately
    if (heroName) heroName.classList.add('revealed');
    if (heroTagline) heroTagline.classList.add('revealed');
    if (heroCta) heroCta.classList.add('revealed');
  }

  // ---------- Tab Bar Navigation ----------
  function initTabBar() {
    const tabs = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('#hero, #about, #projects, #skills, #contact');

    // Click handlers
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const sectionId = tab.getAttribute('data-section');
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tabs.forEach((tab) => {
              if (tab.getAttribute('data-section') === id) {
                tab.classList.add('active');
              } else {
                tab.classList.remove('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // ---------- Section Reveal (Intersection Observer) ----------
  function initSectionReveal() {
    const terminalWindows = document.querySelectorAll('.terminal-window');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            // Trigger prompt line typing if present and not yet animated
            const promptText = entry.target.querySelector('.prompt-text');
            if (promptText && !promptText.dataset.animated) {
              promptText.dataset.animated = 'true';
              const fullText = promptText.textContent;
              typeText(promptText, fullText, 30);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    terminalWindows.forEach((tw) => {
      // Don't observe the hero terminal (it's always visible)
      if (!tw.closest('#hero')) {
        observer.observe(tw);
      }
    });
  }

  // ---------- Project Card Expansion ----------
  function initProjectCards() {
    const entries = document.querySelectorAll('.project-entry');

    entries.forEach((entry) => {
      entry.addEventListener('click', () => {
        const details = entry.querySelector('.project-details');
        const isExpanded = details.classList.contains('expanded');

        // Collapse all others
        entries.forEach((other) => {
          const otherDetails = other.querySelector('.project-details');
          if (otherDetails && other !== entry) {
            otherDetails.classList.remove('expanded');
          }
        });

        // Toggle this one
        if (isExpanded) {
          details.classList.remove('expanded');
        } else {
          details.classList.add('expanded');

          // Type the cat command if not yet typed
          const catLine = details.querySelector('.project-cat-line');
          if (catLine && !catLine.dataset.animated) {
            catLine.dataset.animated = 'true';
            const fullText = catLine.textContent;
            typeText(catLine, fullText, 25);
          }
        }
      });
    });
  }

  // ---------- CRT Toggle ----------
  function initCrtToggle() {
    const overlay = document.querySelector('.crt-overlay');
    const toggle = document.querySelector('.crt-toggle');

    if (!overlay || !toggle) return;

    // Check saved preference
    const savedPref = localStorage.getItem('crtEnabled');
    if (savedPref === 'false') {
      overlay.classList.add('crt-off');
      toggle.textContent = '[CRT: OFF]';
    }

    toggle.addEventListener('click', () => {
      overlay.classList.toggle('crt-off');
      const isOn = !overlay.classList.contains('crt-off');
      toggle.textContent = isOn ? '[CRT: ON]' : '[CRT: OFF]';
      localStorage.setItem('crtEnabled', isOn ? 'true' : 'false');
    });
  }

  // ---------- Konami Code Easter Egg ----------
  function initKonamiCode() {
    const sequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA',
    ];
    let progress = 0;

    document.addEventListener('keydown', (e) => {
      if (e.code === sequence[progress]) {
        progress++;
        if (progress === sequence.length) {
          // Trigger CRT intensification
          const overlay = document.querySelector('.crt-overlay');
          if (overlay) {
            overlay.classList.remove('crt-off');
            overlay.classList.add('crt-intense');
            setTimeout(() => {
              overlay.classList.remove('crt-intense');
            }, 2000);
          }
          progress = 0;
        }
      } else {
        progress = 0;
      }
    });
  }

  // ---------- Uptime Counter ----------
  function initUptime() {
    const el = document.getElementById('uptime-value');
    if (!el) return;

    const startTime = Date.now();

    function update() {
      const elapsed = Date.now() - startTime;
      const seconds = Math.floor(elapsed / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      const s = seconds % 60;
      const m = minutes % 60;

      el.textContent =
        hours + 'h ' + m + 'm ' + s + 's';
    }

    update();
    setInterval(update, 1000);
  }

  // ---------- Reduced Motion Check ----------
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = prefersReducedMotion();
    const bootDone = sessionStorage.getItem('bootComplete') === 'true';

    // Boot sequence
    if (reducedMotion || bootDone) {
      skipBootSequence();
      // Also immediately reveal all terminal windows
      document.querySelectorAll('.terminal-window').forEach((tw) => {
        tw.classList.add('in-view');
      });
    } else {
      runBootSequence();
    }

    // Init all systems
    initTabBar();
    initSectionReveal();
    initProjectCards();
    initCrtToggle();
    initKonamiCode();
    initUptime();
  });
})();

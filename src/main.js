import { PORTFOLIO_OWNER, PROJECTS, SKILL_CATEGORIES, TELEMETRY_MODES } from './portfolioData.js';
import {
  filterProjects,
  getVisibleSkillCategories,
  formatUptime,
} from './portfolioLogic.js';
import { createKineticCanvas } from './kineticCanvas.js';

/**
 * Render crisp domain-specific architectural SVG artwork for each project card.
 * @param {typeof PROJECTS[number]} project
 */
function renderProjectSvg(project) {
  if (project.id === 'workout-tracker') {
    return `
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet" role="img" aria-label="IronTrack SwiftUI and SwiftData architecture diagram">
        <defs>
          <linearGradient id="g-iron" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8A5CFF" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#4D38F5" stop-opacity="0.06"/>
          </linearGradient>
        </defs>
        <rect width="640" height="400" fill="#090A0F"/>
        <rect x="36" y="42" width="232" height="316" rx="22" fill="#0E1017" stroke="rgba(207,189,255,0.28)"/>
        <rect x="58" y="72" width="110" height="10" rx="5" fill="#CFBDFF"/>
        <rect x="58" y="96" width="188" height="58" rx="12" fill="url(#g-iron)" stroke="rgba(138,92,255,0.35)"/>
        <text x="72" y="120" fill="#FFFFFF" font-family="Space Mono, monospace" font-size="11.5">Bench Press · Prev</text>
        <text x="72" y="141" fill="#4EE0FF" font-family="Space Mono, monospace" font-size="13" font-weight="700">92.5 kg × 6 reps</text>
        <rect x="58" y="170" width="188" height="46" rx="10" fill="#161926"/>
        <rect x="58" y="228" width="188" height="46" rx="10" fill="#161926"/>
        <rect x="58" y="286" width="188" height="44" rx="22" fill="#8A5CFF"/>
        <text x="152" y="313" text-anchor="middle" fill="#FFFFFF" font-family="DM Sans, sans-serif" font-size="14" font-weight="700">Log Active Set</text>
        <path d="M294 117 H594 M294 201 H594 M294 285 H594" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4 6"/>
        <rect x="304" y="84" width="292" height="66" rx="12" fill="#0E1017" stroke="rgba(255,255,255,0.12)"/>
        <text x="324" y="110" fill="#A8B0CD" font-family="Space Mono, monospace" font-size="11.5">SwiftUI View Layer</text>
        <text x="324" y="134" fill="#FFFFFF" font-family="Syne, sans-serif" font-size="15.5" font-weight="700">Zero-Latency Set Input</text>
        <rect x="304" y="168" width="292" height="66" rx="12" fill="#0E1017" stroke="rgba(138,92,255,0.35)"/>
        <text x="324" y="194" fill="#CFBDFF" font-family="Space Mono, monospace" font-size="11.5">MVVM ViewModel</text>
        <text x="324" y="218" fill="#FFFFFF" font-family="Syne, sans-serif" font-size="15.5" font-weight="700">Previous Max Resolver</text>
        <rect x="304" y="252" width="292" height="66" rx="12" fill="#0E1017" stroke="rgba(78,224,255,0.35)"/>
        <text x="324" y="278" fill="#4EE0FF" font-family="Space Mono, monospace" font-size="11.5">SwiftData Store</text>
        <text x="324" y="302" fill="#FFFFFF" font-family="Syne, sans-serif" font-size="15.5" font-weight="700">Local-First Persistence</text>
      </svg>
    `;
  }

  if (project.id === 'ordering-system') {
    return `
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet" role="img" aria-label="UTB.Minute .NET 10 and Blazor WASM distributed system diagram">
        <rect width="640" height="400" fill="#090A0F"/>
        <rect x="36" y="50" width="568" height="300" rx="18" fill="#0E1017" stroke="rgba(255,255,255,0.09)"/>
        <text x="64" y="88" fill="#4EE0FF" font-family="Space Mono, monospace" font-size="11.5">.NET ASPIRE ORCHESTRATION TOPOLOGY</text>
        <rect x="64" y="114" width="154" height="86" rx="12" fill="#161926" stroke="rgba(207,189,255,0.3)"/>
        <text x="78" y="148" fill="#FFFFFF" font-family="Syne, sans-serif" font-size="15" font-weight="700">Blazor WASM</text>
        <text x="78" y="172" fill="#A8B0CD" font-family="Space Mono, monospace" font-size="10.5">SSE Client Stream</text>

        <rect x="243" y="114" width="154" height="86" rx="12" fill="#161926" stroke="rgba(138,92,255,0.5)"/>
        <text x="257" y="148" fill="#FFFFFF" font-family="Syne, sans-serif" font-size="15" font-weight="700">.NET 10 API</text>
        <text x="257" y="172" fill="#CFBDFF" font-family="Space Mono, monospace" font-size="10.5">Threading.Channels</text>

        <rect x="422" y="114" width="154" height="86" rx="12" fill="#161926" stroke="rgba(78,224,255,0.4)"/>
        <text x="436" y="148" fill="#FFFFFF" font-family="Syne, sans-serif" font-size="15" font-weight="700">PostgreSQL</text>
        <text x="436" y="172" fill="#4EE0FF" font-family="Space Mono, monospace" font-size="10.5">EF Core Locking</text>

        <path d="M218 157 H243 M397 157 H422" stroke="#8A5CFF" stroke-width="2"/>

        <rect x="64" y="230" width="512" height="86" rx="12" fill="#090A0F" stroke="rgba(255,255,255,0.08)"/>
        <text x="86" y="262" fill="#A8B0CD" font-family="Space Mono, monospace" font-size="11.5">KEYCLOAK SSO · CONCURRENCY-SAFE ORDER PIPELINE</text>
        <text x="86" y="290" fill="#FFFFFF" font-family="DM Sans, sans-serif" font-size="14.5">Real-time university canteen state broadcast with zero oversell</text>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet" role="img" aria-label="F1DataCompare Formula 1 telemetry comparison chart">
      <rect width="640" height="400" fill="#090A0F"/>
      <rect x="36" y="48" width="568" height="304" rx="18" fill="#0E1017" stroke="rgba(255,255,255,0.09)"/>
      <text x="68" y="86" fill="#4EE0FF" font-family="Space Mono, monospace" font-size="12">TELEMETRY TRACE · SPEED &amp; THROTTLE DELTA</text>
      <path d="M68 260 L138 165 L210 190 L285 118 L360 154 L435 104 L515 170 L570 132" fill="none" stroke="#4EE0FF" stroke-width="3"/>
      <path d="M68 274 L138 182 L210 202 L285 136 L360 164 L435 124 L515 184 L570 148" fill="none" stroke="#8A5CFF" stroke-width="2.5" stroke-dasharray="6 5"/>
      <line x1="68" y1="292" x2="570" y2="292" stroke="rgba(255,255,255,0.12)"/>
      <text x="68" y="324" fill="#A8B0CD" font-family="Space Mono, monospace" font-size="12">Sector 1</text>
      <text x="290" y="324" fill="#A8B0CD" font-family="Space Mono, monospace" font-size="12">Sector 2</text>
      <text x="510" y="324" fill="#A8B0CD" font-family="Space Mono, monospace" font-size="12">Sector 3</text>
    </svg>
  `;
}

function initPointerGlow() {
  const root = document.documentElement;
  let pending = false;
  let latestX = window.innerWidth * 0.5;
  let latestY = window.innerHeight * 0.25;

  window.addEventListener(
    'pointermove',
    (event) => {
      latestX = event.clientX;
      latestY = event.clientY;
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(() => {
          root.style.setProperty('--cursor-x', `${latestX}px`);
          root.style.setProperty('--cursor-y', `${latestY}px`);
          pending = false;
        });
      }
    },
    { passive: true },
  );
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const panel = document.getElementById('mobile-nav-panel');
  if (!toggleBtn || !panel) return;

  const closeMenu = () => {
    panel.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    panel.hidden = isExpanded;
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function initHeroVisualizer() {
  const canvas = document.getElementById('kinetic-canvas');
  const motionBtn = document.getElementById('canvas-motion-toggle');
  const titleEl = document.getElementById('stage-readout-title');
  const captionEl = document.getElementById('stage-readout-caption');
  const labelEl = document.getElementById('stage-readout-label');
  const valueEl = document.getElementById('stage-readout-value');
  const modeButtons = Array.from(document.querySelectorAll('[data-canvas-mode]'));

  const controller = createKineticCanvas(canvas, (paused) => {
    if (!motionBtn) return;
    motionBtn.textContent = paused ? 'Resume Motion' : 'Pause Motion';
    motionBtn.setAttribute('aria-pressed', String(paused));
  });

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modeId = btn.getAttribute('data-canvas-mode');
      const spec = TELEMETRY_MODES.find((item) => item.id === modeId);
      if (!spec) return;

      modeButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      if (titleEl) titleEl.textContent = spec.title;
      if (captionEl) captionEl.textContent = spec.caption;
      if (labelEl) labelEl.textContent = spec.metricLabel;
      if (valueEl) valueEl.textContent = spec.metricValue;

      if (controller) controller.setMode(spec.id);
    });
  });

  if (motionBtn && controller) {
    motionBtn.addEventListener('click', () => {
      controller.togglePaused();
    });
  }
}

function initProjectsAndModal() {
  const grid = document.getElementById('projects-grid');
  const statusLine = document.getElementById('projects-status-line');
  const emptyBox = document.getElementById('projects-empty');
  const resetBtn = document.getElementById('reset-project-filter');
  const filterBtns = Array.from(document.querySelectorAll('[data-project-filter]'));

  const modal = document.getElementById('case-study-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalMeta = document.getElementById('modal-project-meta');
  const modalVisual = document.getElementById('modal-project-visual');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalArch = document.getElementById('modal-project-architecture');
  const modalHighlights = document.getElementById('modal-project-highlights');
  const modalTech = document.getElementById('modal-project-tech');
  const modalSourceLink = document.getElementById('modal-source-link');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');

  let activeFilter = 'all';
  let lastTriggerEl = null;

  function openCaseStudy(projectId, triggerEl) {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project || !modal) return;
    lastTriggerEl = triggerEl || null;

    if (modalMeta) {
      modalMeta.textContent = `${project.index} · ${project.categoryLabel} · ${project.date} · ${project.starsLabel}`;
    }
    if (modalTitle) modalTitle.textContent = `${project.title} (${project.repoName})`;
    if (modalVisual) modalVisual.innerHTML = renderProjectSvg(project);
    if (modalSummary) modalSummary.textContent = project.summary;
    if (modalArch) modalArch.textContent = project.architecture;
    if (modalTech) modalTech.textContent = project.tech.join(' · ');
    if (modalSourceLink) modalSourceLink.setAttribute('href', project.url);

    if (modalHighlights) {
      modalHighlights.innerHTML = '';
      project.highlights.forEach((line) => {
        const li = document.createElement('li');
        li.textContent = line;
        modalHighlights.appendChild(li);
      });
    }

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  }

  function closeCaseStudy() {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCaseStudy);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeCaseStudy);
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeCaseStudy();
    });
  }

  function renderProjects(filterKey) {
    activeFilter = filterKey;
    const filtered = filterProjects(PROJECTS, activeFilter);

    filterBtns.forEach((btn) => {
      const isMatch = btn.getAttribute('data-project-filter') === activeFilter;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    if (statusLine) {
      statusLine.textContent = `Showing ${filtered.length} of ${PROJECTS.length} projects`;
    }

    if (!grid || !emptyBox) return;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyBox.hidden = false;
      return;
    }

    emptyBox.hidden = true;
    grid.innerHTML = filtered
      .map((project, idx) => {
        const featuredClass = idx === 0 && filtered.length > 1 ? ' is-featured' : '';
        return `
          <article class="project-card${featuredClass}" data-project-id="${project.id}">
            <div class="project-visual">
              ${renderProjectSvg(project)}
            </div>
            <div class="project-content">
              <div class="project-meta-line">
                <span>${project.index}</span>
                <span aria-hidden="true">·</span>
                <span>${project.date}</span>
                <span aria-hidden="true">·</span>
                <span>${project.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>${project.starsLabel}</span>
              </div>
              <h3 class="project-title">${project.title}</h3>
              <p class="project-summary">${project.summary}</p>
              <div class="project-stack-section">
                <span class="project-stack-label">Tech Stack</span>
                <ul class="project-tech-badges" aria-label="Technologies used in ${project.title}">
                  ${project.tech.map((tech) => `<li class="tech-badge">${tech}</li>`).join('')}
                </ul>
              </div>
              <div class="project-actions">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-open-case-study="${project.id}"
                >
                  Inspect ${project.title}
                </button>
                <a
                  href="${project.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-secondary"
                >
                  Source Code
                </a>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    grid.querySelectorAll('[data-open-case-study]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-case-study');
        if (id) openCaseStudy(id, btn);
      });
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project-filter') || 'all';
      renderProjects(key);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => renderProjects('all'));
  }

  renderProjects('all');
}

function initSkillsAndUptime() {
  const skillsGrid = document.getElementById('skills-grid');
  const uptimeEl = document.getElementById('uptime-value');
  const skillBtns = Array.from(document.querySelectorAll('[data-skill-filter]'));

  function renderSkills(activeId) {
    const visible = getVisibleSkillCategories(SKILL_CATEGORIES, activeId);

    skillBtns.forEach((btn) => {
      const match = btn.getAttribute('data-skill-filter') === activeId;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-pressed', String(match));
    });

    if (!skillsGrid) return;
    skillsGrid.innerHTML = visible
      .map(
        (cat) => `
          <article class="skill-panel">
            <h3 class="skill-panel-title">${cat.label}</h3>
            <p class="skill-panel-summary">${cat.summary}</p>
            <p class="skill-panel-items">${cat.items.join(' · ')}</p>
          </article>
        `,
      )
      .join('');
  }

  skillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-skill-filter') || 'all';
      renderSkills(key);
    });
  });

  renderSkills('all');

  if (uptimeEl) {
    const startedAt = Date.now();
    const update = () => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      uptimeEl.textContent = formatUptime(elapsedSeconds);
    };
    update();
    window.setInterval(update, 1000);
  }
}

function initContactSection() {
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
          copied = true;
        }
      } catch {
        copied = false;
      }

      if (!copied) {
        try {
          const temp = document.createElement('textarea');
          temp.value = PORTFOLIO_OWNER.email;
          temp.setAttribute('readonly', '');
          temp.style.position = 'fixed';
          temp.style.opacity = '0';
          document.body.appendChild(temp);
          temp.select();
          copied = document.execCommand('copy');
          document.body.removeChild(temp);
        } catch {
          copied = false;
        }
      }

      copyBtn.textContent = copied ? `Copied ${PORTFOLIO_OWNER.email}` : PORTFOLIO_OWNER.email;
      window.setTimeout(() => {
        copyBtn.textContent = 'Copy Email';
      }, 2500);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPointerGlow();
  initMobileMenu();
  initHeroVisualizer();
  initProjectsAndModal();
  initSkillsAndUptime();
  initContactSection();
});

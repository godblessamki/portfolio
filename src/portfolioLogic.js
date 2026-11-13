/**
 * Pure portfolio logic decoupled from DOM manipulation for deterministic unit testing.
 */

/**
 * Filter projects by category key ('all', 'ios', 'fullstack', 'data').
 * @param {Array<{category: string}>} projects
 * @param {string} category
 */
export function filterProjects(projects, category) {
  if (!Array.isArray(projects)) return [];
  if (!category || category === 'all') return projects;
  return projects.filter((project) => project.category === category);
}

/**
 * Resolve the active skill categories to render given a filter key.
 * @param {Array<{id: string}>} categories
 * @param {string} activeId
 */
export function getVisibleSkillCategories(categories, activeId) {
  if (!Array.isArray(categories)) return [];
  if (!activeId || activeId === 'all') return categories;
  const matched = categories.filter((cat) => cat.id === activeId);
  return matched.length > 0 ? matched : categories;
}

/**
 * Format elapsed session seconds as tabular HH:MM:SS.
 * @param {number} totalSeconds
 */
export function formatUptime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0));
  const hours = String(Math.floor(safeSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((safeSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(safeSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

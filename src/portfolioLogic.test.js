import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  getVisibleSkillCategories,
  formatUptime,
} from './portfolioLogic.js';
import { PROJECTS, SKILL_CATEGORIES } from './portfolioData.js';

test('filterProjects returns all projects when category is "all"', () => {
  const result = filterProjects(PROJECTS, 'all');
  assert.equal(result.length, 3);
});

test('filterProjects filters accurately by category', () => {
  const ios = filterProjects(PROJECTS, 'ios');
  assert.equal(ios.length, 1);
  assert.equal(ios[0].title, 'IronTrack');

  const fullstack = filterProjects(PROJECTS, 'fullstack');
  assert.equal(fullstack.length, 1);
  assert.equal(fullstack[0].title, 'UTB.Minute');

  const data = filterProjects(PROJECTS, 'data');
  assert.equal(data.length, 1);
  assert.equal(data[0].title, 'F1DataCompare');

  const empty = filterProjects(PROJECTS, 'nonexistent');
  assert.equal(empty.length, 0);
});

test('getVisibleSkillCategories resolves specific category or all', () => {
  assert.equal(getVisibleSkillCategories(SKILL_CATEGORIES, 'all').length, SKILL_CATEGORIES.length);
  const backend = getVisibleSkillCategories(SKILL_CATEGORIES, 'backend');
  assert.equal(backend.length, 1);
  assert.equal(backend[0].id, 'backend');
});

test('formatUptime formats seconds cleanly with leading zeros', () => {
  assert.equal(formatUptime(0), '00:00:00');
  assert.equal(formatUptime(65), '00:01:05');
  assert.equal(formatUptime(3661), '01:01:01');
  assert.equal(formatUptime(-5), '00:00:00');
});

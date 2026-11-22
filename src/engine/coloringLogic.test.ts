import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyRegionFill,
  computeArtworkStats,
  createDefaultStore,
  findHintTarget,
  findNextIncompleteColorId,
  getContinueArtwork,
  getDailyArtwork,
  hydrateStore,
  isLevelUnlocked,
  pushRecentArtwork,
  serializeStore,
} from './coloringLogic';
import { ALL_ARTWORKS, getArtworksByCategory } from '../data/catalog';

test('applyRegionFill rejects mismatched colorId and accepts exact match', () => {
  const ironMan = getArtworksByCategory('marvel')[0];
  const targetRegion = ironMan.regions[0];
  const wrongColor = ironMan.palette.find((p) => p.id !== targetRegion.colorId)!.id;

  const wrongRes = applyRegionFill(ironMan, [], targetRegion.id, wrongColor);
  assert.equal(wrongRes.ok, false);
  assert.equal(wrongRes.reason, 'wrong-color');
  assert.equal(wrongRes.expectedColorId, targetRegion.colorId);
  assert.equal(wrongRes.nextFilledIds.length, 0);

  const okRes = applyRegionFill(ironMan, [], targetRegion.id, targetRegion.colorId);
  assert.equal(okRes.ok, true);
  assert.equal(okRes.reason, 'filled');
  assert.deepEqual(okRes.nextFilledIds, [targetRegion.id]);

  const dupRes = applyRegionFill(ironMan, okRes.nextFilledIds, targetRegion.id, targetRegion.colorId);
  assert.equal(dupRes.ok, false);
  assert.equal(dupRes.reason, 'already-filled');
});

test('completing every region triggers artwork completion and unlocks level 2', () => {
  const marvelList = getArtworksByCategory('marvel');
  const level1 = marvelList[0];
  const level2 = marvelList[1];

  assert.equal(isLevelUnlocked(level1, marvelList, {}), true);
  assert.equal(isLevelUnlocked(level2, marvelList, {}), false);

  let filled: string[] = [];
  let lastResult = applyRegionFill(level1, filled, level1.regions[0].id, level1.regions[0].colorId);
  filled = lastResult.nextFilledIds;

  for (let i = 1; i < level1.regions.length; i += 1) {
    const region = level1.regions[i];
    lastResult = applyRegionFill(level1, filled, region.id, region.colorId);
    assert.equal(lastResult.ok, true);
    filled = lastResult.nextFilledIds;
  }

  assert.equal(lastResult.isArtworkComplete, true);
  const stats = computeArtworkStats(level1, filled);
  assert.equal(stats.percent, 100);
  assert.equal(stats.isComplete, true);

  const progress = {
    [level1.id]: {
      filledRegionIds: filled,
      updatedAt: Date.now(),
      completedAt: Date.now(),
      strokeCount: filled.length,
    },
  };
  assert.equal(isLevelUnlocked(level2, marvelList, progress), true);
});

test('findHintTarget and findNextIncompleteColorId prioritize selected color then advance', () => {
  const whale = getArtworksByCategory('kids')[3];
  const firstColorId = whale.palette[0].id;
  const regionsOfColor1 = whale.regions.filter((r) => r.colorId === firstColorId);

  const hintBefore = findHintTarget(whale, [], firstColorId);
  assert.ok(hintBefore);
  assert.equal(hintBefore.colorId, firstColorId);

  const filledAllColor1 = regionsOfColor1.map((r) => r.id);
  const nextColor = findNextIncompleteColorId(whale, filledAllColor1, firstColorId);
  assert.notEqual(nextColor, firstColorId);

  const hintAfter = findHintTarget(whale, filledAllColor1, firstColorId);
  assert.ok(hintAfter);
  assert.notEqual(hintAfter.colorId, firstColorId);
});

test('getDailyArtwork is deterministic per date and getContinueArtwork picks latest in-progress piece', () => {
  const d1 = getDailyArtwork(ALL_ARTWORKS, new Date(2026, 10, 22));
  const d2 = getDailyArtwork(ALL_ARTWORKS, new Date(2026, 10, 22));
  assert.equal(d1.id, d2.id);

  const heisenberg = getArtworksByCategory('movies')[0];
  const progress = {
    [heisenberg.id]: {
      filledRegionIds: [heisenberg.regions[0].id],
      updatedAt: 999999999,
      strokeCount: 1,
    },
  };
  const cont = getContinueArtwork(ALL_ARTWORKS, progress, [heisenberg.id]);
  assert.equal(cont.id, heisenberg.id);
});

test('store serialization and hydration preserve progress and gracefully handle invalid JSON', () => {
  const store = createDefaultStore();
  store.introSeen = true;
  store.settings.theme = 'light';
  store.settings.soundEnabled = false;
  store.recentArtworkIds = pushRecentArtwork(store.recentArtworkIds, 'marvel-01');
  store.progressByArtwork['marvel-01'] = {
    filledRegionIds: ['im-bg-top'],
    updatedAt: 123456,
    strokeCount: 1,
  };

  const hydrated = hydrateStore(serializeStore(store));
  assert.equal(hydrated.introSeen, true);
  assert.equal(hydrated.settings.theme, 'light');
  assert.equal(hydrated.settings.soundEnabled, false);
  assert.deepEqual(hydrated.progressByArtwork['marvel-01'].filledRegionIds, ['im-bg-top']);

  const corrupted = hydrateStore('{not valid json');
  assert.equal(corrupted.settings.theme, 'dark');
  assert.equal(corrupted.settings.soundEnabled, true);
});

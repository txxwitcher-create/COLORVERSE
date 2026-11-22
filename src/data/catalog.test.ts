import test from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES } from './categories';
import {
  ALL_ARTWORKS,
  getArtworksByCategory,
  getTotalCatalogArchitectureStats,
  getUpcomingCatalogByCategory,
} from './catalog';

test('catalog exposes exactly six categories with 80-level scalable architecture (480 total)', () => {
  assert.equal(CATEGORIES.length, 6);
  const stats = getTotalCatalogArchitectureStats();
  assert.equal(stats.categoriesCount, 6);
  assert.equal(stats.plannedTotalCount, 480);
  assert.equal(stats.playableCount, 30);

  for (const cat of CATEGORIES) {
    const playable = getArtworksByCategory(cat.id);
    const upcoming = getUpcomingCatalogByCategory(cat.id);
    assert.equal(playable.length, 5, `Expected 5 handcrafted playable levels in ${cat.id}`);
    assert.equal(playable.length + upcoming.length, 80, `Expected 80 total level slots in ${cat.id}`);
  }
});

test('every playable artwork has unique id, valid palette references, non-empty metadata, and meaningful regions', () => {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();

  for (const art of ALL_ARTWORKS) {
    assert.ok(!seenIds.has(art.id), `Duplicate artwork ID: ${art.id}`);
    seenIds.add(art.id);

    assert.ok(!seenTitles.has(art.title), `Duplicate artwork title: ${art.title}`);
    seenTitles.add(art.title);

    assert.ok(art.title.length >= 3);
    assert.ok(art.character.length >= 2);
    assert.ok(art.source.length >= 3);
    assert.ok(art.punchline.length >= 10);
    assert.ok(art.regions.length >= 14, `${art.id} should have >= 14 regions for meaningful colouring`);

    const paletteIds = new Set(art.palette.map((p) => p.id));
    const seenRegionIds = new Set<string>();

    for (const region of art.regions) {
      assert.ok(paletteIds.has(region.colorId), `${art.id}:${region.id} references invalid colorId ${region.colorId}`);
      assert.ok(!seenRegionIds.has(region.id), `Duplicate region ID ${region.id} in ${art.id}`);
      seenRegionIds.add(region.id);
      assert.ok(region.d.trim().length > 10, `Empty path on ${art.id}:${region.id}`);
    }
  }
});

test('iconic required levels (Iron Man, Doctor Doom, Heisenberg, Ragnar) are present with exact identity', () => {
  const titles = new Set(ALL_ARTWORKS.map((a) => a.title));
  assert.ok(titles.has('THE ARMOR AWAKENS'));
  assert.ok(titles.has('THE FACE OF DOOM'));
  assert.ok(titles.has('SAY MY NAME'));
  assert.ok(titles.has('THE KING OF KATTEGAT'));
});

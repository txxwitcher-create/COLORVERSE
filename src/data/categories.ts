import type { CategoryId, CategoryMeta, Difficulty, UpcomingLevelMeta } from '../types/colorverse';

export const CATEGORIES: readonly CategoryMeta[] = [
  {
    id: 'disney',
    name: 'Disney',
    shortName: 'Disney',
    tagline: 'Enchanted castles, timeless wonder, and storybook light.',
    accentHex: '#7C9CFF',
    targetLevels: 80,
    defaultDifficulty: 'Medium',
  },
  {
    id: 'marvel',
    name: 'Marvel',
    shortName: 'Marvel',
    tagline: 'Iconic heroes, legendary armor, and cosmic showdowns.',
    accentHex: '#E0534A',
    targetLevels: 80,
    defaultDifficulty: 'Advanced',
  },
  {
    id: 'movies',
    name: 'Movies & TV Shows',
    shortName: 'Cinema',
    tagline: 'Unforgettable characters and iconic screen moments.',
    accentHex: '#D4AF37',
    targetLevels: 80,
    defaultDifficulty: 'Medium',
  },
  {
    id: 'kids',
    name: 'Kids Art',
    shortName: 'Kids Art',
    tagline: 'Playful creatures, friendly rockets, and joyful colour.',
    accentHex: '#38BFA1',
    targetLevels: 80,
    defaultDifficulty: 'Easy',
  },
  {
    id: 'study',
    name: 'Study Art',
    shortName: 'Study Art',
    tagline: 'Botanical plates, anatomy, astronomy, and earth science.',
    accentHex: '#63B3ED',
    targetLevels: 80,
    defaultDifficulty: 'Advanced',
  },
  {
    id: 'memes',
    name: 'Viral Memes',
    shortName: 'Memes',
    tagline: 'Expressive internet classics rendered in gallery ink.',
    accentHex: '#F09A43',
    targetLevels: 80,
    defaultDifficulty: 'Easy',
  },
] as const;

export function getCategoryMeta(id: CategoryId): CategoryMeta {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

interface ArchiveSeed {
  title: string;
  character: string;
  source: string;
  punchline: string;
}

const ARCHIVE_THEMES: Record<CategoryId, { seeds: ArchiveSeed[]; difficulty: Difficulty }> = {
  disney: {
    difficulty: 'Medium',
    seeds: [
      { title: 'LANTERNS OVER THE HARBOR', character: 'Tower Dreamer', source: 'Kingdom of Corona', punchline: 'A thousand golden lights drifting across midnight water.' },
      { title: 'THE GLASS SLIPPER AT MIDNIGHT', character: 'Royal Ball', source: 'Classic Fairy Tales', punchline: 'Twelve chimes echo as magic lingers on the staircase.' },
      { title: 'VOYAGE BEYOND THE REEF', character: 'Ocean Wayfinder', source: 'Polynesian Legends', punchline: 'Guided by constellations and the call of the tide.' },
      { title: 'WHISPERS OF THE ENCHANTED FOREST', character: 'Autumn Spirits', source: 'Northern Folklore', punchline: 'Amber leaves dancing along ancient stone monoliths.' },
      { title: 'THE TEAPOT AND THE CLOCK', character: 'Castle Keepers', source: 'Enchanted Manor', punchline: 'Warm hospitality woven into a spellbound hall.' },
      { title: 'FLIGHT ABOVE LONDON', character: 'Neverland Voyagers', source: 'Second Star Classics', punchline: 'Golden clock hands turning beneath a velvet sky.' },
      { title: 'UNDERWATER CORAL PALACE', character: 'Tide Singer', source: 'Atlantica Stories', punchline: 'Sunbeams refracting through pearls and sea anemones.' },
      { title: 'THE HUNDRED ACRE MORNING', character: 'Woodland Friends', source: 'Storybook Woods', punchline: 'Honey jars, red balloons, and sunlit oak branches.' },
      { title: 'A HUNDRED SPOTTED PAWS', character: 'London Puppies', source: 'Twilight Walk', punchline: 'Footprints across snowy cobblestones at dusk.' },
      { title: 'THE SWORD IN THE ANVIL', character: 'Young Squire', source: 'Avalon Chronicles', punchline: 'Steel gleaming in a quiet forest clearing.' },
    ],
  },
  marvel: {
    difficulty: 'Advanced',
    seeds: [
      { title: 'THE SHIELD OF LIBERTY', character: 'First Avenger', source: 'Marvel Universe', punchline: 'Vibranium rings echoing through smoke and resolve.' },
      { title: 'SANCTUM OF THE MULTIVERSE', character: 'Master of Mystic Arts', source: 'Bleecker Street', punchline: 'Golden mandalas spinning between fractured realities.' },
      { title: 'THE INFINITY GAUNTLET', character: 'Mad Titan', source: 'Cosmic Saga', punchline: 'Six singularities forged into one inevitable fist.' },
      { title: 'CLAWS IN THE SNOW', character: 'Weapon X', source: 'Mutant Legends', punchline: 'Adamantium steel flashing beneath northern pines.' },
      { title: 'SYMBIOTE IN THE RAIN', character: 'Lethal Protector', source: 'Midnight Skyline', punchline: 'Dark tendrils coiling across rain-slicked gargoyles.' },
      { title: 'SCARLET CHAOS WEAVE', character: 'Chaos Sorceress', source: 'Westview Archives', punchline: 'Crimson hexes bending the fabric of memory.' },
      { title: 'GUARDIANS OF THE NEBULA', character: 'Star Outlaws', source: 'Deep Space', punchline: 'Cassette tape melodies echoing across violet stardust.' },
      { title: 'THE DEVIL OF HELLS KITCHEN', character: 'Blind Guardian', source: 'Rooftop Vigil', punchline: 'Listening to the heartbeat of a sleepless city.' },
      { title: 'THE PHOENIX ASCENDING', character: 'Cosmic Flame', source: 'X-Chronicles', punchline: 'Solar wings unfolding across the edge of creation.' },
      { title: 'EMERALD FURY', character: 'Gamma Giant', source: 'Sakaar Arena', punchline: 'Earth shattering beneath unstoppable emerald might.' },
    ],
  },
  movies: {
    difficulty: 'Medium',
    seeds: [
      { title: 'AN OFFER IN SHADOW', character: 'Don Corleone', source: 'The Godfather', punchline: 'A crimson rose pinned beside quiet absolute power.' },
      { title: 'THE WHITE KNIGHT OF GOTHAM', character: 'Caped Detective', source: 'The Dark Knight', punchline: 'Standing silent above the searchlight and storm.' },
      { title: 'ACROSS THE EVENT HORIZON', character: 'Endurance Pilot', source: 'Interstellar', punchline: 'Gargantua burning like a halo at the edge of time.' },
      { title: 'GLADIATOR OF THE SANDS', character: 'Maximus', source: 'Gladiator', punchline: 'What we do in life echoes through eternity.' },
      { title: 'THE RED PILL AWAKENING', character: 'The One', source: 'The Matrix', punchline: 'Emerald rain parting to reveal the truth beneath.' },
      { title: 'FELLOWSHIP AT THE PASS', character: 'Grey Wizard', source: 'Middle-Earth', punchline: 'Staff glowing bright against the shadow of the mountain.' },
      { title: 'THE GRAND LOBBY CONCIERGE', character: 'Monsieur Gustave', source: 'Grand Budapest', punchline: 'Pastel symmetry, velvet keys, and immaculate poise.' },
      { title: 'THE SHAWSHANK RAIN', character: 'Andy Dufresne', source: 'Shawshank Redemption', punchline: 'Hope is a good thing—maybe the best of things.' },
      { title: 'WINTER AT THE WALL', character: 'Watcher on the Wall', source: 'Seven Kingdoms', punchline: 'Valyrian steel raised against the gathering frost.' },
      { title: 'THE JURASSIC GATEWAY', character: 'Island Expedition', source: 'Jurassic Park', punchline: 'Torches burning beside towering prehistoric silhouettes.' },
    ],
  },
  kids: {
    difficulty: 'Easy',
    seeds: [
      { title: 'SLEEPY PANDA IN BAMBOO', character: 'Mochi the Panda', source: 'Bamboo Grove', punchline: 'Crunchy green stalks and afternoon cloud naps.' },
      { title: 'THE LITTLE RED FIRETRUCK', character: 'Sparky Engine 4', source: 'Sunny Town', punchline: 'Shiny ladders and friendly bells ringing down Main Street.' },
      { title: 'PENGUIN ICE CREAM PARADE', character: 'Pip the Penguin', source: 'Frosty Cove', punchline: 'Three scoops tall on a slippery iceberg slide!' },
      { title: 'STARLIGHT UNICORN MEADOW', character: 'Luna Star', source: 'Rainbow Valley', punchline: 'Galloping across pastel hills after a summer shower.' },
      { title: 'CAPTAIN OCTOPUS SUBMARINE', character: 'Ollie Octo', source: 'Bubble Bay', punchline: 'Eight arms steering through sparkling golden kelp.' },
      { title: 'TREEHOUSE IN THE CLOUDS', character: 'Acorn Club', source: 'Maple Woods', punchline: 'Rope ladders, paper airplanes, and lemonade afternoons.' },
      { title: 'HAPPY BUNNY GARDEN', character: 'Clover Bunny', source: 'Carrot Patch', punchline: 'Big floppy ears peeking over bright orange carrots.' },
      { title: 'CHOO-CHOO MOUNTAIN EXPRESS', character: 'Toby Train', source: 'Valley Rails', punchline: 'Puffing cotton-candy steam across the painted bridge.' },
      { title: 'SUNFLOWER HONEYBEE', character: 'Buzzy Bee', source: 'Golden Meadow', punchline: 'Tiny striped wings collecting sweet summer nectar.' },
      { title: 'LITTLE ASTRONAUT PUPPY', character: 'Astro Bark', source: 'Moon Playground', punchline: 'Bouncing over cheese craters in shiny space boots!' },
    ],
  },
  study: {
    difficulty: 'Advanced',
    seeds: [
      { title: 'THE DOUBLE HELIX', character: 'DNA Molecular Model', source: 'Genetics & Biology', punchline: 'Base pairs spiraling into the blueprint of living code.' },
      { title: 'ARCHITECTURE OF THE COLOSSEUM', character: 'Flavian Amphitheatre', source: 'Ancient History', punchline: 'Travertine arches enduring two millennia of Roman craft.' },
      { title: 'MITOCHONDRIAL CROSS-SECTION', character: 'Cellular Organelle', source: 'Cell Biology', punchline: 'Folded cristae generating the energy of every breath.' },
      { title: 'WATER CYCLE BASIN', character: 'Hydrologic Diagram', source: 'Earth Geography', punchline: 'Evaporation, cloud condensation, and rivers returning to sea.' },
      { title: 'GREAT PYRAMID GEOMETRY', character: 'Giza Plateau', source: 'World Heritage', punchline: 'Limestone precision aligned with the desert stars.' },
      { title: 'PHOTOSYNTHESIS LEAF PLATE', character: 'Chloroplast Anatomy', source: 'Botany', punchline: 'Sunlight woven into glucose inside emerald cells.' },
      { title: 'COMPASS ROSE & MERIDIANS', character: 'Cartography Plate', source: 'Navigation Science', punchline: 'Cardinal bearings guiding voyagers across charted oceans.' },
      { title: 'HUMAN NEURON SYNAPSE', character: 'Nervous System', source: 'Neuroscience', punchline: 'Electric impulses leaping across dendritic branches.' },
      { title: 'CORAL REEF SYMBIOSIS', character: 'Marine Ecosystem', source: 'Oceanography', punchline: 'Living limestone cities sheltering vibrant coastal life.' },
      { title: 'QUARTZ CRYSTAL LATTICE', character: 'Mineralogy Plate', source: 'Geology', punchline: 'Hexagonal prisms sculpted slowly beneath volcanic stone.' },
    ],
  },
  memes: {
    difficulty: 'Easy',
    seeds: [
      { title: 'SIDE-EYE SUSPICION', character: 'Skeptical Puppet', source: 'Reaction Hall of Fame', punchline: 'When someone says the deadline was actually yesterday.' },
      { title: 'PRESS F TO PAY RESPECTS', character: 'Golden Keycap', source: 'Gaming Lore', punchline: 'A ceremonial salute to every fallen save file.' },
      { title: 'HIDING THE PAIN POLITE SMILE', character: 'Coffee Mug Legend', source: 'Stock Photo Classics', punchline: 'Smiling gracefully through mild internal chaos.' },
      { title: 'DRAMATIC SQUIRREL TURN', character: 'Prairie Star', source: '2007 Viral Vault', punchline: 'One sudden glance. Three thunderous violins.' },
      { title: 'KEYBOARD CAT ENCORE', character: 'Virtuoso Tabby', source: 'Early YouTube', punchline: 'Playing you off stage with unmistakable synth style.' },
      { title: 'TWO BUTTONS SWEAT', character: 'Indecisive Hero', source: 'Choice Memes', punchline: 'Both options look reasonable until you read them twice.' },
      { title: 'SURPRISED ELECTRIC MOUSE', character: 'Shocked Mascot', source: 'Reaction Classics', punchline: 'When the completely predictable outcome actually happens.' },
      { title: 'WAIT ITS ALL ART', character: 'Orbit Astronauts', source: 'Cosmic Memes', punchline: 'Always has been—every pixel painted by hand.' },
      { title: 'RAINBOW TOAST VOYAGER', character: 'Pixel Pop Cat', source: '8-Bit Classics', punchline: 'Leaving a neon prism trail across the digital cosmos.' },
      { title: 'SUCCESS SANDCASTLE FIST', character: 'Beach Champion', source: 'Motivational Classics', punchline: 'Small victory, legendary determination.' },
    ],
  },
};

// Generates honest, transparent upcoming level metadata for Levels 06 through 80
// so every category cleanly models the 80-level scalable architecture (480 total)
// without faking missing artwork as playable.
export function buildUpcomingLevels(categoryId: CategoryId, startLevel = 6, endLevel = 80): UpcomingLevelMeta[] {
  const { seeds, difficulty } = ARCHIVE_THEMES[categoryId];
  const editions = ['Volume II', 'Volume III', 'Volume IV', 'Volume V', 'Volume VI', 'Volume VII', 'Volume VIII'];
  const list: UpcomingLevelMeta[] = [];

  for (let level = startLevel; level <= endLevel; level += 1) {
    const offset = level - startLevel;
    const seed = seeds[offset % seeds.length];
    const volumeIdx = Math.floor(offset / seeds.length);
    const editionLabel = editions[volumeIdx] ?? `Volume ${volumeIdx + 2}`;
    const romanParts = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    const suffix = volumeIdx === 0 ? '' : ` · PLATE ${romanParts[volumeIdx] ?? volumeIdx + 1}`;

    list.push({
      id: `${categoryId}-upcoming-${String(level).padStart(2, '0')}`,
      categoryId,
      levelNumber: level,
      title: `${seed.title}${suffix}`,
      character: seed.character,
      source: `${seed.source} · ${editionLabel}`,
      punchline: seed.punchline,
      difficulty,
    });
  }

  return list;
}

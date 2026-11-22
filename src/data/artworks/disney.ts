import type { ArtworkDefinition } from '../../types/colorverse';

export const DISNEY_ARTWORKS: ArtworkDefinition[] = [
  {
    id: 'disney-01',
    categoryId: 'disney',
    levelNumber: 1,
    title: 'CASTLE OF STARLIGHT',
    character: 'Enchanted Kingdom',
    source: 'Fairy Tale Classics',
    punchline: 'Where every spire holds a midnight wish.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0F1530',
    palette: [
      { id: 1, name: 'Midnight Indigo', hex: '#1B2559' },
      { id: 2, name: 'Twilight Violet', hex: '#4C3575' },
      { id: 3, name: 'Royal Sapphire', hex: '#2563EB' },
      { id: 4, name: 'Castle Ivory', hex: '#E8E4DC' },
      { id: 5, name: 'Moonstone Grey', hex: '#B8BCCC' },
      { id: 6, name: 'Wishing Gold', hex: '#F4C44E' },
      { id: 7, name: 'Cloud Lilac', hex: '#7C6FA0' },
    ],
    regions: [
      { id: 'ds-sky-top', colorId: 1, d: 'M 0 0 L 800 0 L 800 440 L 0 440 Z', labelX: 120, labelY: 110 },
      { id: 'ds-sky-mid', colorId: 2, d: 'M 0 440 L 800 440 L 800 760 L 0 760 Z', labelX: 100, labelY: 540 },
      // Wishing Star Arc & Moon
      { id: 'ds-moon', colorId: 6, d: 'M 185 110 C 235 110 272 147 272 197 C 272 247 235 284 185 284 C 135 284 98 247 98 197 C 98 147 135 110 185 110 Z', labelX: 185, labelY: 197 },
      { id: 'ds-arc', colorId: 6, d: 'M 140 310 Q 400 60 680 265 Q 400 105 140 310 Z', labelX: 540, labelY: 165, labelSize: 13 },
      // Castle Spires (Blue Roofs)
      { id: 'ds-roof-main', colorId: 3, d: 'M 400 120 L 456 320 L 344 320 Z', labelX: 400, labelY: 255 },
      { id: 'ds-roof-l1', colorId: 3, d: 'M 255 245 L 306 410 L 204 410 Z', labelX: 255, labelY: 355 },
      { id: 'ds-roof-r1', colorId: 3, d: 'M 545 245 L 596 410 L 494 410 Z', labelX: 545, labelY: 355 },
      { id: 'ds-roof-l2', colorId: 3, d: 'M 150 405 L 195 525 L 105 525 Z', labelX: 150, labelY: 485, labelSize: 13 },
      { id: 'ds-roof-r2', colorId: 3, d: 'M 650 405 L 695 525 L 605 525 Z', labelX: 650, labelY: 485, labelSize: 13 },
      // Castle Towers
      { id: 'ds-tower-main', colorId: 4, d: 'M 350 320 L 450 320 L 460 620 L 340 620 Z', labelX: 400, labelY: 465 },
      { id: 'ds-tower-l1', colorId: 5, d: 'M 212 410 L 298 410 L 305 680 L 205 680 Z', labelX: 255, labelY: 545 },
      { id: 'ds-tower-r1', colorId: 5, d: 'M 502 410 L 588 410 L 595 680 L 495 680 Z', labelX: 545, labelY: 545 },
      { id: 'ds-tower-l2', colorId: 4, d: 'M 115 525 L 185 525 L 190 770 L 110 770 Z', labelX: 150, labelY: 645 },
      { id: 'ds-tower-r2', colorId: 4, d: 'M 615 525 L 685 525 L 690 770 L 610 770 Z', labelX: 650, labelY: 645 },
      // Central Keep & Gatehouse
      { id: 'ds-keep', colorId: 4, d: 'M 260 610 L 540 610 L 560 845 L 240 845 Z', labelX: 315, labelY: 735 },
      { id: 'ds-gate', colorId: 6, d: 'M 352 845 L 352 725 C 352 675 448 675 448 725 L 448 845 Z', labelX: 400, labelY: 765 },
      { id: 'ds-win-top', colorId: 6, d: 'M 380 390 L 420 390 L 420 450 L 380 450 Z', labelX: 400, labelY: 422, labelSize: 12 },
      // Clouds & Reflection Lake
      { id: 'ds-cloud-l', colorId: 7, d: 'M 0 740 C 80 715 190 745 270 815 L 270 905 L 0 905 Z', labelX: 115, labelY: 825 },
      { id: 'ds-cloud-r', colorId: 7, d: 'M 800 740 C 720 715 610 745 530 815 L 530 905 L 800 905 Z', labelX: 685, labelY: 825 },
      { id: 'ds-lake', colorId: 1, d: 'M 0 845 L 800 845 L 800 1000 L 0 1000 Z', labelX: 400, labelY: 930 },
    ],
    detailStrokes: [
      'M 400 95 L 400 120 M 255 220 L 255 245 M 545 220 L 545 245',
      'M 375 845 L 375 725 M 400 845 L 400 710 M 425 845 L 425 725',
      'M 260 635 L 540 635',
    ],
  },
  {
    id: 'disney-02',
    categoryId: 'disney',
    levelNumber: 2,
    title: 'THE ROSE UNDER GLASS',
    character: 'Enchanted Rose',
    source: 'Beauty & The Beast',
    punchline: 'Before the final petal falls, love finds its light.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#131020',
    palette: [
      { id: 1, name: 'Ballroom Midnight', hex: '#1B1733' },
      { id: 2, name: 'Glass Shimmer', hex: '#38467A' },
      { id: 3, name: 'Velvet Crimson', hex: '#C81E3A' },
      { id: 4, name: 'Ruby Heart', hex: '#881337' },
      { id: 5, name: 'Emerald Stem', hex: '#15803D' },
      { id: 6, name: 'Leaf Jade', hex: '#22C55E' },
      { id: 7, name: 'Enchanted Gold', hex: '#EAB308' },
      { id: 8, name: 'Mahogany Base', hex: '#5C2C16' },
    ],
    regions: [
      { id: 'rs-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 95, labelY: 120 },
      // Glass Cloche Dome
      { id: 'rs-dome-l', colorId: 2, d: 'M 190 805 L 190 375 C 190 215 280 140 400 140 L 400 805 Z', labelX: 245, labelY: 320 },
      { id: 'rs-dome-r', colorId: 2, d: 'M 610 805 L 610 375 C 610 215 520 140 400 140 L 400 805 Z', labelX: 555, labelY: 320 },
      { id: 'rs-knob', colorId: 7, d: 'M 400 88 C 424 88 442 106 442 128 C 442 146 424 156 400 156 C 376 156 358 146 358 128 C 358 106 376 88 400 88 Z', labelX: 400, labelY: 124, labelSize: 13 },
      // Golden Glow Halo around Rose
      { id: 'rs-halo', colorId: 7, d: 'M 400 245 C 485 245 545 305 545 390 C 545 475 485 535 400 535 C 315 535 255 475 255 390 C 255 305 315 245 400 245 Z', labelX: 495, labelY: 305 },
      // Stem & Leaves
      { id: 'rs-stem', colorId: 5, d: 'M 386 495 L 414 495 L 420 795 L 380 795 Z', labelX: 400, labelY: 660, labelSize: 13 },
      { id: 'rs-leaf-l', colorId: 6, d: 'M 386 585 C 310 545 255 570 255 620 C 295 650 355 640 386 615 Z', labelX: 318, labelY: 604 },
      { id: 'rs-leaf-r', colorId: 6, d: 'M 414 645 C 490 605 545 630 545 680 C 505 710 445 700 414 675 Z', labelX: 482, labelY: 664 },
      // Layered Rose Petals
      { id: 'rs-petal-outer-l', colorId: 4, d: 'M 305 365 C 290 445 335 495 400 495 L 375 365 Z', labelX: 334, labelY: 432 },
      { id: 'rs-petal-outer-r', colorId: 4, d: 'M 495 365 C 510 445 465 495 400 495 L 425 365 Z', labelX: 466, labelY: 432 },
      { id: 'rs-petal-mid-l', colorId: 3, d: 'M 318 320 C 350 285 395 300 400 355 L 365 465 C 318 438 302 375 318 320 Z', labelX: 348, labelY: 374 },
      { id: 'rs-petal-mid-r', colorId: 3, d: 'M 482 320 C 450 285 405 300 400 355 L 435 465 C 482 438 498 375 482 320 Z', labelX: 452, labelY: 374 },
      { id: 'rs-petal-heart', colorId: 4, d: 'M 400 285 C 440 285 458 335 432 385 L 400 440 L 368 385 C 342 335 360 285 400 285 Z', labelX: 400, labelY: 356 },
      // Fallen Petals
      { id: 'rs-fall-1', colorId: 3, d: 'M 255 750 C 280 730 325 740 335 772 C 305 790 265 785 255 750 Z', labelX: 295, labelY: 764, labelSize: 12 },
      { id: 'rs-fall-2', colorId: 3, d: 'M 470 760 C 495 738 540 748 550 780 C 520 796 480 790 470 760 Z', labelX: 510, labelY: 772, labelSize: 12 },
      // Pedestal Base
      { id: 'rs-base-top', colorId: 7, d: 'M 155 795 L 645 795 L 665 842 L 135 842 Z', labelX: 400, labelY: 820 },
      { id: 'rs-base-wood', colorId: 8, d: 'M 120 842 L 680 842 L 710 925 L 90 925 Z', labelX: 400, labelY: 885 },
      { id: 'rs-table', colorId: 1, d: 'M 0 925 L 800 925 L 800 1000 L 0 1000 Z', labelX: 400, labelY: 965 },
    ],
    detailStrokes: [
      'M 225 360 C 225 265 275 205 340 185',
      'M 378 335 Q 400 315 422 335',
      'M 290 600 L 365 608 M 510 660 L 435 668',
    ],
  },
  {
    id: 'disney-03',
    categoryId: 'disney',
    levelNumber: 3,
    title: 'A WHOLE NEW SKY',
    character: 'Magic Carpet Flight',
    source: 'Agrabah Nights',
    punchline: 'Floating past palace domes under sapphire moons.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0B132B',
    palette: [
      { id: 1, name: 'Agrabah Night', hex: '#14213D' },
      { id: 2, name: 'Sapphire Sky', hex: '#1D4ED8' },
      { id: 3, name: 'Palace Sand', hex: '#E6CCB2' },
      { id: 4, name: 'Dome Gold', hex: '#F59E0B' },
      { id: 5, name: 'Carpet Royal', hex: '#7C3AED' },
      { id: 6, name: 'Tassel Ruby', hex: '#DC2626' },
      { id: 7, name: 'Moon Cream', hex: '#FEF3C7' },
    ],
    regions: [
      { id: 'ag-sky-top', colorId: 1, d: 'M 0 0 L 800 0 L 800 420 L 0 420 Z', labelX: 110, labelY: 100 },
      { id: 'ag-sky-bot', colorId: 2, d: 'M 0 420 L 800 420 L 800 720 L 0 720 Z', labelX: 110, labelY: 540 },
      { id: 'ag-moon', colorId: 7, d: 'M 610 120 C 675 120 725 170 725 235 C 725 300 675 350 610 350 C 545 350 495 300 495 235 C 495 170 545 120 610 120 Z', labelX: 610, labelY: 235 },
      // Magic Carpet Swoop
      { id: 'ag-carpet-outer', colorId: 5, d: 'M 140 385 Q 350 280 565 360 L 495 470 Q 305 405 90 480 Z', labelX: 255, labelY: 390 },
      { id: 'ag-carpet-inner', colorId: 6, d: 'M 195 398 Q 345 326 495 380 L 455 442 Q 315 396 155 450 Z', labelX: 335, labelY: 398 },
      { id: 'ag-carpet-diamond', colorId: 4, d: 'M 335 368 L 395 398 L 335 426 L 275 398 Z', labelX: 335, labelY: 400, labelSize: 12 },
      // Tassels
      { id: 'ag-tassel-1', colorId: 4, d: 'M 90 480 L 125 470 L 105 535 L 70 520 Z', labelX: 98, labelY: 504, labelSize: 12 },
      { id: 'ag-tassel-2', colorId: 4, d: 'M 495 470 L 535 458 L 540 525 L 502 522 Z', labelX: 518, labelY: 496, labelSize: 12 },
      // Palace Onion Domes
      { id: 'ag-dome-main', colorId: 4, d: 'M 400 500 C 465 565 510 620 490 695 L 310 695 C 290 620 335 565 400 500 Z', labelX: 400, labelY: 625 },
      { id: 'ag-dome-l', colorId: 4, d: 'M 190 595 C 235 635 262 675 250 735 L 130 735 C 118 675 145 635 190 595 Z', labelX: 190, labelY: 682 },
      { id: 'ag-dome-r', colorId: 4, d: 'M 610 595 C 655 635 682 675 670 735 L 550 735 C 538 675 565 635 610 595 Z', labelX: 610, labelY: 682 },
      // Palace Walls & Archway
      { id: 'ag-wall-main', colorId: 3, d: 'M 250 695 L 550 695 L 550 915 L 250 915 Z', labelX: 300, labelY: 790 },
      { id: 'ag-wall-l', colorId: 3, d: 'M 80 735 L 250 735 L 250 915 L 80 915 Z', labelX: 165, labelY: 825 },
      { id: 'ag-wall-r', colorId: 3, d: 'M 550 735 L 720 735 L 720 915 L 550 915 Z', labelX: 635, labelY: 825 },
      { id: 'ag-arch', colorId: 1, d: 'M 342 915 L 342 795 C 342 735 458 735 458 795 L 458 915 Z', labelX: 400, labelY: 840 },
      // Clouds & Ground
      { id: 'ag-cloud-l', colorId: 7, d: 'M 0 320 C 65 290 120 315 150 350 L 0 380 Z', labelX: 60, labelY: 345, labelSize: 12 },
      { id: 'ag-ground', colorId: 1, d: 'M 0 915 L 800 915 L 800 1000 L 0 1000 Z', labelX: 400, labelY: 962 },
    ],
    detailStrokes: [
      'M 400 465 L 400 500 M 190 568 L 190 595 M 610 568 L 610 595',
      'M 155 805 L 155 865 M 645 805 L 645 865',
    ],
  },
  {
    id: 'disney-04',
    categoryId: 'disney',
    levelNumber: 4,
    title: 'PRIDE ROCK DAWN',
    character: 'Savannah Kingdom',
    source: 'Savannah Classics',
    punchline: 'Everything the golden light touches tells a story.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#2A120A',
    palette: [
      { id: 1, name: 'Dawn Vermilion', hex: '#DC2626' },
      { id: 2, name: 'Savannah Tangerine', hex: '#EA580C' },
      { id: 3, name: 'Solar Amber', hex: '#F59E0B' },
      { id: 4, name: 'Sun Core', hex: '#FEF08A' },
      { id: 5, name: 'Acacia Umber', hex: '#431407' },
      { id: 6, name: 'Pride Stone', hex: '#7C2D12' },
      { id: 7, name: 'Grassland Gold', hex: '#CA8A04' },
    ],
    regions: [
      { id: 'pr-sky-1', colorId: 1, d: 'M 0 0 L 800 0 L 800 260 L 0 260 Z', labelX: 110, labelY: 110 },
      { id: 'pr-sky-2', colorId: 2, d: 'M 0 260 L 800 260 L 800 510 L 0 510 Z', labelX: 110, labelY: 360 },
      { id: 'pr-sky-3', colorId: 3, d: 'M 0 510 L 800 510 L 800 720 L 0 720 Z', labelX: 690, labelY: 590 },
      // Giant Rising Sun
      { id: 'pr-sun-outer', colorId: 3, d: 'M 400 220 C 565 220 690 345 690 510 C 690 675 565 760 400 760 C 235 760 110 675 110 510 C 110 345 235 220 400 220 Z', labelX: 400, labelY: 280 },
      { id: 'pr-sun-core', colorId: 4, d: 'M 400 315 C 505 315 590 400 590 505 C 590 610 505 685 400 685 C 295 685 210 610 210 505 C 210 400 295 315 400 315 Z', labelX: 400, labelY: 425 },
      // Distant Plains
      { id: 'pr-plains', colorId: 7, d: 'M 0 700 L 800 700 L 800 845 L 0 845 Z', labelX: 130, labelY: 765 },
      // Iconic Pride Rock Outcrop
      { id: 'pr-rock-top', colorId: 6, d: 'M 800 620 L 420 535 L 355 565 L 570 725 L 800 740 Z', labelX: 595, labelY: 635 },
      { id: 'pr-rock-base', colorId: 5, d: 'M 800 740 L 570 725 L 445 1000 L 800 1000 Z', labelX: 650, labelY: 880 },
      // Lion Silhouette on the Promontory
      { id: 'pr-lion-mane', colorId: 5, d: 'M 380 495 C 380 438 448 430 470 475 L 478 552 L 395 552 Z', labelX: 432, labelY: 498, labelSize: 13 },
      { id: 'pr-lion-body', colorId: 5, d: 'M 465 485 L 555 505 L 570 578 L 465 558 Z', labelX: 518, labelY: 530, labelSize: 13 },
      // Acacia Tree on Left
      { id: 'pr-tree-trunk', colorId: 5, d: 'M 150 655 L 185 655 L 195 895 L 140 895 Z', labelX: 168, labelY: 790, labelSize: 13 },
      { id: 'pr-tree-canopy', colorId: 5, d: 'M 40 655 C 55 590 280 590 305 655 Z', labelX: 170, labelY: 632 },
      // Foreground Grass Hill
      { id: 'pr-fore', colorId: 5, d: 'M 0 845 Q 260 805 510 925 L 510 1000 L 0 1000 Z', labelX: 210, labelY: 935 },
      // Soaring Birds
      { id: 'pr-bird-1', colorId: 5, d: 'M 200 200 Q 235 170 265 205 Q 235 192 200 200 Z', labelX: 235, labelY: 192, labelSize: 11 },
      { id: 'pr-bird-2', colorId: 5, d: 'M 560 150 Q 595 120 625 155 Q 595 142 560 150 Z', labelX: 595, labelY: 142, labelSize: 11 },
    ],
    detailStrokes: [
      'M 555 515 Q 595 530 610 505',
      'M 420 535 L 570 725',
    ],
  },
  {
    id: 'disney-05',
    categoryId: 'disney',
    levelNumber: 5,
    title: 'ICE PALACE ASCENSION',
    character: 'Snow Queen Spire',
    source: 'Frozen North',
    punchline: 'Crystalline towers carved from winter courage.',
    difficulty: 'Advanced',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0B192C',
    palette: [
      { id: 1, name: 'Polar Night', hex: '#0F2544' },
      { id: 2, name: 'Aurora Teal', hex: '#14B8A6' },
      { id: 3, name: 'Glacier Blue', hex: '#38BDF8' },
      { id: 4, name: 'Frost Crystal', hex: '#BAE6FD' },
      { id: 5, name: 'Snow White', hex: '#F0F9FF' },
      { id: 6, name: 'Arctic Slate', hex: '#334E68' },
      { id: 7, name: 'Twilight Amethyst', hex: '#818CF8' },
    ],
    regions: [
      { id: 'ic-sky', colorId: 1, d: 'M 0 0 L 800 0 L 800 580 L 0 580 Z', labelX: 110, labelY: 95 },
      { id: 'ic-aurora-1', colorId: 2, d: 'M 0 180 Q 240 80 480 200 Q 650 280 800 160 L 800 280 Q 640 380 460 300 Q 240 200 0 300 Z', labelX: 180, labelY: 215 },
      { id: 'ic-aurora-2', colorId: 7, d: 'M 0 280 Q 250 180 470 285 Q 645 365 800 265 L 800 375 Q 625 460 445 385 Q 235 290 0 385 Z', labelX: 650, labelY: 350 },
      // Mountain Peaks
      { id: 'ic-mtn-l', colorId: 6, d: 'M 0 490 L 185 330 L 340 680 L 0 680 Z', labelX: 120, labelY: 540 },
      { id: 'ic-mtn-r', colorId: 6, d: 'M 800 490 L 615 330 L 460 680 L 800 680 Z', labelX: 680, labelY: 540 },
      // Ice Palace Central Crystal Spires
      { id: 'ic-spire-c', colorId: 4, d: 'M 400 110 L 448 395 L 352 395 Z', labelX: 400, labelY: 310 },
      { id: 'ic-spire-l', colorId: 3, d: 'M 295 230 L 352 465 L 245 465 Z', labelX: 298, labelY: 390 },
      { id: 'ic-spire-r', colorId: 3, d: 'M 505 230 L 555 465 L 448 465 Z', labelX: 502, labelY: 390 },
      { id: 'ic-hall-l', colorId: 4, d: 'M 245 465 L 400 420 L 400 725 L 220 725 Z', labelX: 312, labelY: 580 },
      { id: 'ic-hall-r', colorId: 3, d: 'M 555 465 L 400 420 L 400 725 L 580 725 Z', labelX: 488, labelY: 580 },
      // Glowing Snowflake Emblem
      { id: 'ic-flake', colorId: 5, d: 'M 400 485 L 435 550 L 400 615 L 365 550 Z', labelX: 400, labelY: 550, labelSize: 13 },
      // Ice Staircase Sweeping Down
      { id: 'ic-stairs', colorId: 5, d: 'M 345 725 L 455 725 L 560 980 L 240 980 Z', labelX: 400, labelY: 865 },
      // Snowbanks
      { id: 'ic-snow-l', colorId: 4, d: 'M 0 680 L 345 725 L 240 1000 L 0 1000 Z', labelX: 135, labelY: 860 },
      { id: 'ic-snow-r', colorId: 4, d: 'M 800 680 L 455 725 L 560 1000 L 800 1000 Z', labelX: 665, labelY: 860 },
      // Crystal Balcony Arch
      { id: 'ic-balcony', colorId: 5, d: 'M 285 695 L 515 695 L 495 745 L 305 745 Z', labelX: 400, labelY: 722, labelSize: 13 },
      // Floating Ice Shards
      { id: 'ic-shard-l', colorId: 5, d: 'M 155 120 L 180 175 L 155 215 L 130 175 Z', labelX: 155, labelY: 170, labelSize: 12 },
      { id: 'ic-shard-r', colorId: 5, d: 'M 645 120 L 670 175 L 645 215 L 620 175 Z', labelX: 645, labelY: 170, labelSize: 12 },
    ],
    detailStrokes: [
      'M 400 110 L 400 420',
      'M 325 780 L 475 780 M 305 835 L 495 835 M 280 895 L 520 895 M 255 950 L 545 950',
    ],
  },
];

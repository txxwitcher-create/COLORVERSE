import type { ArtworkDefinition } from '../../types/colorverse';

export const STUDY_ARTWORKS: ArtworkDefinition[] = [
  {
    id: 'study-01',
    categoryId: 'study',
    levelNumber: 1,
    title: 'CHAMBERS OF THE HEART',
    character: 'Human Cardiac Anatomy',
    source: 'Medical Science Plate',
    punchline: 'Four tireless chambers beating a hundred thousand times a day.',
    difficulty: 'Advanced',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#12151C',
    palette: [
      { id: 1, name: 'Anatomical Slate', hex: '#1B202C' },
      { id: 2, name: 'Arterial Crimson', hex: '#DC2626' },
      { id: 3, name: 'Aortic Ruby', hex: '#991B1B' },
      { id: 4, name: 'Venous Cobalt', hex: '#2563EB' },
      { id: 5, name: 'Pulmonary Indigo', hex: '#1E40AF' },
      { id: 6, name: 'Myocardium Rose', hex: '#F43F5E' },
      { id: 7, name: 'Valve Ivory', hex: '#F3EFE6' },
      { id: 8, name: 'Plate Gold', hex: '#D4AF37' },
    ],
    regions: [
      { id: 'ht-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 95, labelY: 95 },
      { id: 'ht-frame', colorId: 8, d: 'M 55 55 L 745 55 L 745 945 L 55 945 L 55 55 M 85 85 L 85 915 L 715 915 L 715 85 Z', labelX: 400, labelY: 70, labelSize: 12 },
      // Superior Vena Cava (Blue)
      { id: 'ht-svc', colorId: 4, d: 'M 215 165 L 298 165 L 315 395 L 228 395 Z', labelX: 262, labelY: 270 },
      // Aortic Arch (Bright Red)
      { id: 'ht-aorta-arch', colorId: 2, d: 'M 330 340 C 330 155 555 155 555 340 L 478 340 C 478 240 408 240 408 340 Z', labelX: 442, labelY: 225 },
      { id: 'ht-aorta-br1', colorId: 2, d: 'M 365 130 L 405 130 L 405 215 L 365 215 Z', labelX: 385, labelY: 168, labelSize: 12 },
      { id: 'ht-aorta-br2', colorId: 2, d: 'M 428 118 L 468 118 L 468 205 L 428 205 Z', labelX: 448, labelY: 158, labelSize: 12 },
      { id: 'ht-aorta-br3', colorId: 2, d: 'M 492 135 L 532 135 L 532 222 L 492 222 Z', labelX: 512, labelY: 175, labelSize: 12 },
      // Pulmonary Artery (Indigo)
      { id: 'ht-pulm-trunk', colorId: 5, d: 'M 340 390 C 375 305 510 295 625 325 L 615 395 C 515 375 435 395 405 450 Z', labelX: 525, labelY: 352 },
      // Right Atrium & Left Atrium
      { id: 'ht-r-atrium', colorId: 4, d: 'M 175 465 C 175 385 265 365 345 400 L 360 545 L 195 565 Z', labelX: 268, labelY: 472 },
      { id: 'ht-l-atrium', colorId: 3, d: 'M 460 400 C 545 385 625 435 615 535 L 455 555 Z', labelX: 538, labelY: 478 },
      // Interventricular Septum
      { id: 'ht-septum', colorId: 7, d: 'M 365 545 L 445 545 L 465 825 L 385 835 Z', labelX: 412, labelY: 690, labelSize: 13 },
      // Right Ventricle (Deoxygenated Chamber)
      { id: 'ht-r-vent', colorId: 5, d: 'M 195 565 L 365 545 L 385 835 C 275 815 190 715 195 565 Z', labelX: 288, labelY: 695 },
      // Left Ventricle (Oxygenated Thick Wall Chamber)
      { id: 'ht-l-vent', colorId: 2, d: 'M 445 545 L 615 535 C 635 715 570 845 465 865 L 465 825 Z', labelX: 535, labelY: 695 },
      // Outer Muscular Apex Wall
      { id: 'ht-apex', colorId: 6, d: 'M 255 790 C 345 875 495 895 575 785 C 555 885 455 910 385 895 C 315 880 270 845 255 790 Z', labelX: 425, labelY: 872, labelSize: 13 },
      // Inferior Vena Cava
      { id: 'ht-ivc', colorId: 4, d: 'M 225 785 L 305 815 L 295 900 L 215 900 Z', labelX: 260, labelY: 855, labelSize: 12 },
      // Tricuspid & Mitral Valves
      { id: 'ht-valve-l', colorId: 7, d: 'M 265 535 L 355 535 L 345 575 L 275 575 Z', labelX: 310, labelY: 556, labelSize: 11 },
      { id: 'ht-valve-r', colorId: 7, d: 'M 455 535 L 545 535 L 535 575 L 465 575 Z', labelX: 500, labelY: 556, labelSize: 11 },
      // Descending Aorta tip
      { id: 'ht-desc-aorta', colorId: 3, d: 'M 505 835 L 575 805 L 590 900 L 515 900 Z', labelX: 548, labelY: 865, labelSize: 12 },
    ],
    detailStrokes: [
      'M 262 230 L 262 310 M 248 295 L 262 315 L 276 295',
      'M 412 245 Q 442 205 475 235',
      'M 310 575 L 310 640 M 500 575 L 500 640',
    ],
  },
  {
    id: 'study-02',
    categoryId: 'study',
    levelNumber: 2,
    title: 'THE SOLAR ORRERY',
    character: 'Planetary System',
    source: 'Astronomy Plate',
    punchline: 'Eight worlds waltzing around a burning golden star.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0B1020',
    palette: [
      { id: 1, name: 'Deep Cosmos', hex: '#0F172A' },
      { id: 2, name: 'Solar Gold', hex: '#FACC15' },
      { id: 3, name: 'Corona Amber', hex: '#F97316' },
      { id: 4, name: 'Terra Blue', hex: '#38BDF8' },
      { id: 5, name: 'Martian Rust', hex: '#EF4444' },
      { id: 6, name: 'Jovian Ochre', hex: '#D97706' },
      { id: 7, name: 'Neptune Indigo', hex: '#6366F1' },
      { id: 8, name: 'Orrery Brass', hex: '#C29B40' },
    ],
    regions: [
      { id: 'so-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 110 },
      // Celestial Brass Corners
      { id: 'so-cor-tl', colorId: 8, d: 'M 40 40 L 180 40 L 40 180 Z', labelX: 82, labelY: 82, labelSize: 12 },
      { id: 'so-cor-tr', colorId: 8, d: 'M 760 40 L 620 40 L 760 180 Z', labelX: 718, labelY: 82, labelSize: 12 },
      { id: 'so-cor-bl', colorId: 8, d: 'M 40 960 L 180 960 L 40 820 Z', labelX: 82, labelY: 918, labelSize: 12 },
      { id: 'so-cor-br', colorId: 8, d: 'M 760 960 L 620 960 L 760 820 Z', labelX: 718, labelY: 918, labelSize: 12 },
      // Sun Corona & Core
      { id: 'so-sun-outer', colorId: 3, d: 'M 400 375 C 470 375 525 430 525 500 C 525 570 470 625 400 625 C 330 625 275 570 275 500 C 275 430 330 375 400 375 Z', labelX: 400, labelY: 405, labelSize: 13 },
      { id: 'so-sun-core', colorId: 2, d: 'M 400 418 C 446 418 482 454 482 500 C 482 546 446 582 400 582 C 354 582 318 546 318 500 C 318 454 354 418 400 418 Z', labelX: 400, labelY: 500 },
      // Inner Planets (Mercury, Venus, Earth, Mars)
      { id: 'so-mercury', colorId: 8, d: 'M 255 340 C 278 340 296 358 296 381 C 296 404 278 422 255 422 C 232 422 214 404 214 381 C 214 358 232 340 255 340 Z', labelX: 255, labelY: 381, labelSize: 12 },
      { id: 'so-venus', colorId: 6, d: 'M 565 320 C 594 320 618 344 618 373 C 618 402 594 426 565 426 C 536 426 512 402 512 373 C 512 344 536 320 565 320 Z', labelX: 565, labelY: 373, labelSize: 13 },
      { id: 'so-earth', colorId: 4, d: 'M 205 565 C 242 565 272 595 272 632 C 272 669 242 699 205 699 C 168 699 138 669 138 632 C 138 595 168 565 205 565 Z', labelX: 205, labelY: 632 },
      { id: 'so-mars', colorId: 5, d: 'M 605 585 C 636 585 660 609 660 640 C 660 671 636 695 605 695 C 574 695 550 671 550 640 C 550 609 574 585 605 585 Z', labelX: 605, labelY: 640, labelSize: 13 },
      // Outer Giants (Jupiter, Saturn + Ring, Uranus, Neptune)
      { id: 'so-jupiter', colorId: 6, d: 'M 400 135 C 458 135 504 181 504 239 C 504 297 458 343 400 343 C 342 343 296 297 296 239 C 296 181 342 135 400 135 Z', labelX: 400, labelY: 239 },
      { id: 'so-saturn', colorId: 2, d: 'M 400 725 C 446 725 482 761 482 807 C 482 853 446 889 400 889 C 354 889 318 853 318 807 C 318 761 354 725 400 725 Z', labelX: 400, labelY: 807 },
      { id: 'so-saturn-ring', colorId: 8, d: 'M 255 832 Q 400 885 545 780 Q 400 835 255 832 Z', labelX: 505, labelY: 806, labelSize: 12 },
      { id: 'so-uranus', colorId: 4, d: 'M 145 785 C 180 785 208 813 208 848 C 208 883 180 911 145 911 C 110 911 82 883 82 848 C 82 813 110 785 145 785 Z', labelX: 145, labelY: 848, labelSize: 13 },
      { id: 'so-neptune', colorId: 7, d: 'M 655 785 C 690 785 718 813 718 848 C 718 883 690 911 655 911 C 620 911 592 883 592 848 C 592 813 620 785 655 785 Z', labelX: 655, labelY: 848, labelSize: 13 },
    ],
    detailStrokes: [
      'M 400 500 m -195 0 a 195 195 0 1 0 390 0 a 195 195 0 1 0 -390 0',
      'M 400 500 m -275 0 a 275 275 0 1 0 550 0 a 275 275 0 1 0 -550 0',
      'M 400 500 m -350 0 a 350 350 0 1 0 700 0 a 350 350 0 1 0 -700 0',
      'M 310 218 L 490 218 M 305 262 L 495 262',
    ],
  },
  {
    id: 'study-03',
    categoryId: 'study',
    levelNumber: 3,
    title: 'BOTANICAL ROSE STUDY',
    character: 'Rosa Gallica Plate',
    source: 'Botanical Illustration',
    punchline: 'Thorns, sepals, and velvet petals mapped in naturalist ink.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#F3EFE4',
    palette: [
      { id: 1, name: 'Herbarium Parchment', hex: '#EFE8D8' },
      { id: 2, name: 'Frame Olive', hex: '#4D5D42' },
      { id: 3, name: 'Gallica Rose', hex: '#BE185D' },
      { id: 4, name: 'Blush Petal', hex: '#F472B6' },
      { id: 5, name: 'Botanical Leaf', hex: '#15803D' },
      { id: 6, name: 'Young Sepal', hex: '#4ADE80' },
      { id: 7, name: 'Stamen Gold', hex: '#EAB308' },
    ],
    regions: [
      { id: 'bt-paper', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 115, labelY: 115 },
      { id: 'bt-border', colorId: 2, d: 'M 45 45 L 755 45 L 755 955 L 45 955 L 45 45 M 72 72 L 72 928 L 728 928 L 728 72 Z', labelX: 400, labelY: 59, labelSize: 11 },
      // Main Stem & Secondary Bud Stem
      { id: 'bt-stem', colorId: 5, d: 'M 382 475 L 418 475 L 430 890 L 378 890 Z', labelX: 402, labelY: 745, labelSize: 13 },
      { id: 'bt-branch', colorId: 5, d: 'M 414 630 L 575 470 L 592 490 L 420 665 Z', labelX: 505, labelY: 565, labelSize: 12 },
      // Compound Serrated Leaves
      { id: 'bt-leaf-l1', colorId: 5, d: 'M 382 585 C 270 500 140 535 125 630 C 195 685 315 660 382 618 Z', labelX: 245, labelY: 605 },
      { id: 'bt-leaf-l2', colorId: 6, d: 'M 380 735 C 275 680 165 735 160 815 C 235 855 330 815 380 770 Z', labelX: 265, labelY: 775 },
      { id: 'bt-leaf-r1', colorId: 5, d: 'M 422 720 C 535 665 655 710 665 805 C 585 848 480 810 422 758 Z', labelX: 545, labelY: 762 },
      // Open Five-Petal Botanical Blossom
      { id: 'bt-p1', colorId: 4, d: 'M 400 135 C 475 135 505 225 460 315 L 340 315 C 295 225 325 135 400 135 Z', labelX: 400, labelY: 215 },
      { id: 'bt-p2', colorId: 3, d: 'M 205 255 C 255 185 345 215 375 315 L 315 415 C 225 405 175 330 205 255 Z', labelX: 272, labelY: 312 },
      { id: 'bt-p3', colorId: 3, d: 'M 595 255 C 545 185 455 215 425 315 L 485 415 C 575 405 625 330 595 255 Z', labelX: 528, labelY: 312 },
      { id: 'bt-p4', colorId: 4, d: 'M 245 455 C 265 375 345 360 400 390 L 385 510 C 305 535 235 505 245 455 Z', labelX: 325, labelY: 455 },
      { id: 'bt-p5', colorId: 4, d: 'M 555 455 C 535 375 455 360 400 390 L 415 510 C 495 535 565 505 555 455 Z', labelX: 475, labelY: 455 },
      // Golden Stamen Center
      { id: 'bt-center', colorId: 7, d: 'M 400 285 C 442 285 475 318 475 360 C 475 402 442 435 400 435 C 358 435 325 402 325 360 C 325 318 358 285 400 285 Z', labelX: 400, labelY: 360 },
      // Side Rosebud & Sepal Cup
      { id: 'bt-bud-petal', colorId: 3, d: 'M 595 365 C 645 360 668 415 635 465 L 570 445 C 562 405 572 372 595 365 Z', labelX: 608, labelY: 416, labelSize: 13 },
      { id: 'bt-bud-sepal', colorId: 6, d: 'M 558 442 L 642 465 L 605 520 L 555 495 Z', labelX: 595, labelY: 480, labelSize: 12 },
      // Herbarium Nameplate
      { id: 'bt-plate', colorId: 2, d: 'M 535 855 L 700 855 L 700 905 L 535 905 Z', labelX: 618, labelY: 880, labelSize: 12 },
    ],
    detailStrokes: [
      'M 155 620 L 365 602 M 185 795 L 365 758 M 635 785 L 440 742',
      'M 365 360 L 435 360 M 400 325 L 400 395',
    ],
  },
  {
    id: 'study-04',
    categoryId: 'study',
    levelNumber: 4,
    title: 'MONARCH METAMORPHOSIS',
    character: 'Danaus Plexippus',
    source: 'Entomology Study Plate',
    punchline: 'Stained-glass wings engineered for a continent-wide flight.',
    difficulty: 'Advanced',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#121519',
    palette: [
      { id: 1, name: 'Specimen Obsidian', hex: '#181A20' },
      { id: 2, name: 'Monarch Tangerine', hex: '#F97316' },
      { id: 3, name: 'Amber Wing', hex: '#FB923C' },
      { id: 4, name: 'Golden Cell', hex: '#FACC15' },
      { id: 5, name: 'Vein Charcoal', hex: '#1F2937' },
      { id: 6, name: 'Pearl Spot', hex: '#F8FAFC' },
      { id: 7, name: 'Milkweed Leaf', hex: '#22C55E' },
    ],
    regions: [
      { id: 'mn-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 95 },
      // Outer Black Wing Margins
      { id: 'mn-fwing-l-rim', colorId: 5, d: 'M 380 415 C 260 220 95 165 60 285 C 40 395 145 535 375 515 Z', labelX: 112, labelY: 295 },
      { id: 'mn-fwing-r-rim', colorId: 5, d: 'M 420 415 C 540 220 705 165 740 285 C 760 395 655 535 425 515 Z', labelX: 688, labelY: 295 },
      { id: 'mn-hwing-l-rim', colorId: 5, d: 'M 375 525 C 205 535 125 655 185 775 C 245 865 360 790 385 645 Z', labelX: 205, labelY: 740 },
      { id: 'mn-hwing-r-rim', colorId: 5, d: 'M 425 525 C 595 535 675 655 615 775 C 555 865 440 790 415 645 Z', labelX: 595, labelY: 740 },
      // Forewing Luminous Cells
      { id: 'mn-cell-fl1', colorId: 2, d: 'M 355 425 L 155 285 C 145 345 190 420 350 475 Z', labelX: 255, labelY: 380 },
      { id: 'mn-cell-fr1', colorId: 2, d: 'M 445 425 L 645 285 C 655 345 610 420 450 475 Z', labelX: 545, labelY: 380 },
      { id: 'mn-cell-fl2', colorId: 3, d: 'M 355 395 L 220 245 C 275 235 335 285 370 375 Z', labelX: 300, labelY: 305 },
      { id: 'mn-cell-fr2', colorId: 3, d: 'M 445 395 L 580 245 C 525 235 465 285 430 375 Z', labelX: 500, labelY: 305 },
      { id: 'mn-cell-fl3', colorId: 4, d: 'M 190 435 L 350 482 L 345 505 C 255 510 200 478 190 435 Z', labelX: 270, labelY: 478, labelSize: 12 },
      { id: 'mn-cell-fr3', colorId: 4, d: 'M 610 435 L 450 482 L 455 505 C 545 510 600 478 610 435 Z', labelX: 530, labelY: 478, labelSize: 12 },
      // Hindwing Cells
      { id: 'mn-cell-hl1', colorId: 2, d: 'M 365 545 L 210 595 C 205 660 250 720 365 620 Z', labelX: 278, labelY: 622 },
      { id: 'mn-cell-hr1', colorId: 2, d: 'M 435 545 L 590 595 C 595 660 550 720 435 620 Z', labelX: 522, labelY: 622 },
      { id: 'mn-cell-hl2', colorId: 3, d: 'M 370 635 L 245 730 C 285 778 345 760 372 680 Z', labelX: 315, labelY: 718 },
      { id: 'mn-cell-hr2', colorId: 3, d: 'M 430 635 L 555 730 C 515 778 455 760 428 680 Z', labelX: 485, labelY: 718 },
      // Pearl Marginal Spots
      { id: 'mn-spot-l', colorId: 6, d: 'M 105 245 C 122 245 134 257 134 274 C 134 291 122 303 105 303 C 88 303 76 291 76 274 C 76 257 88 245 105 245 Z', labelX: 105, labelY: 274, labelSize: 12 },
      { id: 'mn-spot-r', colorId: 6, d: 'M 695 245 C 712 245 724 257 724 274 C 724 291 712 303 695 303 C 678 303 666 291 666 274 C 666 257 678 245 695 245 Z', labelX: 695, labelY: 274, labelSize: 12 },
      // Thorax & Abdomen
      { id: 'mn-head', colorId: 5, d: 'M 400 320 C 422 320 438 338 438 360 C 438 382 422 396 400 396 C 378 396 362 382 362 360 C 362 338 378 320 400 320 Z', labelX: 400, labelY: 358, labelSize: 12 },
      { id: 'mn-body', colorId: 5, d: 'M 372 395 L 428 395 L 418 715 C 408 740 392 740 382 715 Z', labelX: 400, labelY: 545, labelSize: 13 },
      // Botanical Milkweed Base Leaf
      { id: 'mn-leaf-l', colorId: 7, d: 'M 145 905 C 225 855 325 865 395 925 L 145 955 Z', labelX: 265, labelY: 912, labelSize: 13 },
      { id: 'mn-leaf-r', colorId: 7, d: 'M 655 905 C 575 855 475 865 405 925 L 655 955 Z', labelX: 535, labelY: 912, labelSize: 13 },
    ],
    detailStrokes: [
      'M 385 325 Q 345 245 315 205 M 415 325 Q 455 245 485 205',
      'M 385 450 L 415 450 M 385 510 L 415 510 M 385 570 L 415 570 M 385 630 L 415 630',
    ],
  },
  {
    id: 'study-05',
    categoryId: 'study',
    levelNumber: 5,
    title: 'STRATA OF THE EARTH',
    character: 'Geological Cross-Section',
    source: 'Earth Science Plate',
    punchline: 'From verdant crust to molten core, time written in stone.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0F172A',
    palette: [
      { id: 1, name: 'Stratosphere Blue', hex: '#1E3A8A' },
      { id: 2, name: 'Biosphere Emerald', hex: '#16A34A' },
      { id: 3, name: 'Ocean Azure', hex: '#0284C7' },
      { id: 4, name: 'Granite Crust', hex: '#78716C' },
      { id: 5, name: 'Upper Mantle', hex: '#B45309' },
      { id: 6, name: 'Lower Mantle', hex: '#DC2626' },
      { id: 7, name: 'Outer Core', hex: '#F97316' },
      { id: 8, name: 'Inner Core Gold', hex: '#FEF08A' },
    ],
    regions: [
      { id: 'ge-space', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 110 },
      // Full Globe Outer Ocean
      { id: 'ge-ocean', colorId: 3, d: 'M 400 145 C 595 145 755 305 755 500 C 755 695 595 855 400 855 C 205 855 45 695 45 500 C 45 305 205 145 400 145 Z', labelX: 160, labelY: 420 },
      // Continents on Left Hemisphere
      { id: 'ge-cont-1', colorId: 2, d: 'M 145 275 C 215 210 315 190 365 245 C 335 330 265 365 185 385 C 125 360 115 315 145 275 Z', labelX: 245, labelY: 295 },
      { id: 'ge-cont-2', colorId: 2, d: 'M 110 535 C 185 505 265 545 285 655 C 245 745 165 735 115 655 Z', labelX: 195, labelY: 630 },
      // Cutaway Quarter Wedge — Crust
      { id: 'ge-crust', colorId: 4, d: 'M 400 145 A 355 355 0 0 1 755 500 L 720 500 A 320 320 0 0 0 400 180 Z', labelX: 628, labelY: 255, labelSize: 12 },
      // Upper Mantle Wedge
      { id: 'ge-mantle-up', colorId: 5, d: 'M 400 180 A 320 320 0 0 1 720 500 L 645 500 A 245 245 0 0 0 400 255 Z', labelX: 590, labelY: 315 },
      // Lower Mantle Wedge
      { id: 'ge-mantle-low', colorId: 6, d: 'M 400 255 A 245 245 0 0 1 645 500 L 560 500 A 160 160 0 0 0 400 340 Z', labelX: 540, labelY: 365 },
      // Outer Liquid Core Wedge
      { id: 'ge-outer-core', colorId: 7, d: 'M 400 340 A 160 160 0 0 1 560 500 L 485 500 A 85 85 0 0 0 400 415 Z', labelX: 485, labelY: 418 },
      // Inner Solid Core
      { id: 'ge-inner-core', colorId: 8, d: 'M 400 415 C 448 415 485 452 485 500 C 485 548 448 585 400 585 C 352 585 315 548 315 500 C 315 452 352 415 400 415 Z', labelX: 400, labelY: 500 },
      // Lower Right Ocean Arc
      { id: 'ge-cont-3', colorId: 2, d: 'M 465 655 C 545 615 645 625 665 695 C 615 775 515 805 445 775 Z', labelX: 555, labelY: 710 },
      // Legend Swatch Bars at Bottom of Educational Plate
      { id: 'ge-leg-1', colorId: 4, d: 'M 95 905 L 220 905 L 220 945 L 95 945 Z', labelX: 158, labelY: 926, labelSize: 12 },
      { id: 'ge-leg-2', colorId: 5, d: 'M 255 905 L 380 905 L 380 945 L 255 945 Z', labelX: 318, labelY: 926, labelSize: 12 },
      { id: 'ge-leg-3', colorId: 6, d: 'M 415 905 L 540 905 L 540 945 L 415 945 Z', labelX: 478, labelY: 926, labelSize: 12 },
      { id: 'ge-leg-4', colorId: 8, d: 'M 575 905 L 700 905 L 700 945 L 575 945 Z', labelX: 638, labelY: 926, labelSize: 12 },
    ],
    detailStrokes: [
      'M 400 145 L 400 415 M 485 500 L 755 500',
      'M 400 90 L 400 125 M 400 875 L 400 895',
    ],
  },
];

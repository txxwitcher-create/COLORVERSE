import type { ArtworkDefinition } from '../../types/colorverse';

export const KIDS_ARTWORKS: ArtworkDefinition[] = [
  {
    id: 'kids-01',
    categoryId: 'kids',
    levelNumber: 1,
    title: 'SUNNY LITTLE ROCKET',
    character: 'Captain Pip',
    source: 'Space Explorers',
    punchline: 'Three, two, one—blast off past the sleepy stars!',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#152046',
    palette: [
      { id: 1, name: 'Space Navy', hex: '#1E2A5E' },
      { id: 2, name: 'Rocket Red', hex: '#EF4444' },
      { id: 3, name: 'Cloud White', hex: '#F8FAFC' },
      { id: 4, name: 'Sky Window', hex: '#38BDF8' },
      { id: 5, name: 'Starlight Yellow', hex: '#FACC15' },
      { id: 6, name: 'Booster Orange', hex: '#F97316' },
      { id: 7, name: 'Saturn Mint', hex: '#34D399' },
    ],
    regions: [
      { id: 'rk-space', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 115 },
      // Ringed Planet & Moon
      { id: 'rk-planet', colorId: 7, d: 'M 155 215 C 205 215 245 255 245 305 C 245 355 205 395 155 395 C 105 395 65 355 65 305 C 65 255 105 215 155 215 Z', labelX: 155, labelY: 305 },
      { id: 'rk-ring', colorId: 5, d: 'M 38 335 Q 155 375 272 275 Q 155 330 38 335 Z', labelX: 235, labelY: 298, labelSize: 12 },
      { id: 'rk-star-1', colorId: 5, d: 'M 640 165 L 662 212 L 712 220 L 675 255 L 685 305 L 640 280 L 595 305 L 605 255 L 568 220 L 618 212 Z', labelX: 640, labelY: 242 },
      // Rocket Nose & Body
      { id: 'rk-nose', colorId: 2, d: 'M 400 115 C 468 180 515 260 525 320 L 275 320 C 285 260 332 180 400 115 Z', labelX: 400, labelY: 245 },
      { id: 'rk-body', colorId: 3, d: 'M 275 320 L 525 320 C 542 460 525 600 490 705 L 310 705 C 275 600 258 460 275 320 Z', labelX: 400, labelY: 625 },
      // Porthole Window
      { id: 'rk-port-rim', colorId: 2, d: 'M 400 375 C 455 375 495 415 495 470 C 495 525 455 565 400 565 C 345 565 305 525 305 470 C 305 415 345 375 400 375 Z', labelX: 400, labelY: 398, labelSize: 13 },
      { id: 'rk-port-glass', colorId: 4, d: 'M 400 408 C 435 408 462 435 462 470 C 462 505 435 532 400 532 C 365 532 338 505 338 470 C 338 435 365 408 400 408 Z', labelX: 400, labelY: 470 },
      // Fins
      { id: 'rk-fin-l', colorId: 2, d: 'M 285 525 C 200 570 155 660 155 770 L 295 705 Z', labelX: 225, labelY: 675 },
      { id: 'rk-fin-r', colorId: 2, d: 'M 515 525 C 600 570 645 660 645 770 L 505 705 Z', labelX: 575, labelY: 675 },
      { id: 'rk-nozzle', colorId: 6, d: 'M 332 705 L 468 705 L 490 760 L 310 760 Z', labelX: 400, labelY: 734, labelSize: 14 },
      // Flame Exhaust
      { id: 'rk-flame-outer', colorId: 6, d: 'M 325 760 L 475 760 C 485 845 450 915 400 965 C 350 915 315 845 325 760 Z', labelX: 400, labelY: 912 },
      { id: 'rk-flame-inner', colorId: 5, d: 'M 362 760 L 438 760 C 442 820 425 865 400 895 C 375 865 358 820 362 760 Z', labelX: 400, labelY: 822 },
      // Cozy Cloud Bottom Corners
      { id: 'rk-cloud-l', colorId: 3, d: 'M 0 855 C 80 820 185 845 235 920 L 235 1000 L 0 1000 Z', labelX: 95, labelY: 935 },
      { id: 'rk-cloud-r', colorId: 3, d: 'M 800 855 C 720 820 615 845 565 920 L 565 1000 L 800 1000 Z', labelX: 705, labelY: 935 },
    ],
    detailStrokes: [
      'M 372 452 Q 395 432 425 445',
      'M 120 550 L 140 550 M 130 540 L 130 560 M 670 480 L 690 480 M 680 470 L 680 490',
    ],
  },
  {
    id: 'kids-02',
    categoryId: 'kids',
    levelNumber: 2,
    title: 'THE HAPPY DINO VALLEY',
    character: 'Barnaby Bronto',
    source: 'Dino Friends',
    punchline: 'Tall neck, big smile, and plenty of crunchy leaves.',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#C7ECFA',
    palette: [
      { id: 1, name: 'Morning Sky', hex: '#7DD3FC' },
      { id: 2, name: 'Sunny Sun', hex: '#FACC15' },
      { id: 3, name: 'Dino Emerald', hex: '#22C55E' },
      { id: 4, name: 'Belly Mint', hex: '#A7F3D0' },
      { id: 5, name: 'Valley Meadow', hex: '#4ADE80' },
      { id: 6, name: 'Volcano Clay', hex: '#A855F7' },
      { id: 7, name: 'Spots Coral', hex: '#FB7185' },
    ],
    regions: [
      { id: 'dn-sky', colorId: 1, d: 'M 0 0 L 800 0 L 800 680 L 0 680 Z', labelX: 110, labelY: 110 },
      { id: 'dn-sun', colorId: 2, d: 'M 645 95 C 700 95 742 137 742 192 C 742 247 700 289 645 289 C 590 289 548 247 548 192 C 548 137 590 95 645 95 Z', labelX: 645, labelY: 192 },
      { id: 'dn-hill-back', colorId: 6, d: 'M 430 680 L 580 420 L 695 420 L 800 680 Z', labelX: 635, labelY: 565 },
      { id: 'dn-ground', colorId: 5, d: 'M 0 680 L 800 680 L 800 1000 L 0 1000 Z', labelX: 685, labelY: 910 },
      // Friendly Brontosaurus Body
      { id: 'dn-tail', colorId: 3, d: 'M 465 650 C 575 660 665 610 725 540 C 705 685 605 765 465 760 Z', labelX: 595, labelY: 690 },
      { id: 'dn-torso', colorId: 3, d: 'M 225 565 C 245 490 485 490 520 620 L 505 785 L 220 785 Z', labelX: 375, labelY: 625 },
      { id: 'dn-belly', colorId: 4, d: 'M 245 695 C 310 665 435 665 485 695 L 485 785 L 245 785 Z', labelX: 365, labelY: 738 },
      { id: 'dn-neck', colorId: 3, d: 'M 195 295 L 295 295 L 330 605 L 210 605 Z', labelX: 255, labelY: 455 },
      { id: 'dn-head', colorId: 3, d: 'M 105 265 C 105 185 285 185 315 265 C 315 340 245 360 175 355 C 125 350 105 320 105 265 Z', labelX: 210, labelY: 270 },
      // Legs
      { id: 'dn-leg-1', colorId: 3, d: 'M 225 770 L 305 770 L 305 915 L 225 915 Z', labelX: 265, labelY: 845 },
      { id: 'dn-leg-2', colorId: 3, d: 'M 425 770 L 505 770 L 505 915 L 425 915 Z', labelX: 465, labelY: 845 },
      // Playful Spots & Cheek
      { id: 'dn-spot-1', colorId: 7, d: 'M 335 555 C 362 555 382 575 382 602 C 382 628 362 648 335 648 C 308 648 288 628 288 602 C 288 575 308 555 335 555 Z', labelX: 335, labelY: 602, labelSize: 13 },
      { id: 'dn-spot-2', colorId: 7, d: 'M 442 580 C 464 580 480 596 480 618 C 480 640 464 656 442 656 C 420 656 404 640 404 618 C 404 596 420 580 442 580 Z', labelX: 442, labelY: 618, labelSize: 13 },
      { id: 'dn-cheek', colorId: 7, d: 'M 175 285 C 192 285 205 298 205 312 C 205 326 192 338 175 338 C 158 338 145 326 145 312 C 145 298 158 285 175 285 Z', labelX: 175, labelY: 312, labelSize: 12 },
      // Fluffy Cloud
      { id: 'dn-cloud', colorId: 4, d: 'M 360 155 C 360 115 415 105 445 130 C 475 110 520 130 515 175 L 350 175 Z', labelX: 435, labelY: 152, labelSize: 13 },
    ],
    detailStrokes: [
      'M 155 245 A 8 8 0 1 0 155.1 245',
      'M 125 315 Q 160 338 195 318',
      'M 240 895 L 240 915 M 285 895 L 285 915 M 445 895 L 445 915 M 485 895 L 485 915',
    ],
  },
  {
    id: 'kids-03',
    categoryId: 'kids',
    levelNumber: 3,
    title: 'COZY MUSHROOM COTTAGE',
    character: 'Pippin the Fox',
    source: 'Woodland Tales',
    punchline: 'A polka-dot roof where forest stories begin.',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#BAE6FD',
    palette: [
      { id: 1, name: 'Woodland Sky', hex: '#93C5FD' },
      { id: 2, name: 'Toadstool Red', hex: '#EF4444' },
      { id: 3, name: 'Cream Wall', hex: '#FEF3C7' },
      { id: 4, name: 'Oak Door', hex: '#92400E' },
      { id: 5, name: 'Clover Green', hex: '#22C55E' },
      { id: 6, name: 'Window Glow', hex: '#FDE047' },
      { id: 7, name: 'Stone Path', hex: '#CBD5E1' },
    ],
    regions: [
      { id: 'ms-sky', colorId: 1, d: 'M 0 0 L 800 0 L 800 720 L 0 720 Z', labelX: 110, labelY: 110 },
      { id: 'ms-hill-l', colorId: 5, d: 'M 0 650 Q 190 580 400 720 L 400 1000 L 0 1000 Z', labelX: 110, labelY: 850 },
      { id: 'ms-hill-r', colorId: 5, d: 'M 800 650 Q 610 580 400 720 L 400 1000 L 800 1000 Z', labelX: 690, labelY: 850 },
      { id: 'ms-path', colorId: 7, d: 'M 330 825 L 470 825 L 555 1000 L 245 1000 Z', labelX: 400, labelY: 925 },
      // Chimney
      { id: 'ms-chimney', colorId: 4, d: 'M 545 205 L 625 205 L 625 360 L 545 360 Z', labelX: 585, labelY: 275 },
      // Cottage Stem House
      { id: 'ms-house', colorId: 3, d: 'M 215 475 L 585 475 C 605 630 585 770 555 835 L 245 835 C 215 770 195 630 215 475 Z', labelX: 280, labelY: 750 },
      // Big Red Mushroom Cap
      { id: 'ms-cap', colorId: 2, d: 'M 85 495 C 95 215 245 165 400 165 C 555 165 705 215 715 495 Z', labelX: 400, labelY: 420 },
      // Polka Dots on Cap
      { id: 'ms-dot-1', colorId: 3, d: 'M 255 290 C 292 290 320 318 320 355 C 320 392 292 420 255 420 C 218 420 190 392 190 355 C 190 318 218 290 255 290 Z', labelX: 255, labelY: 355 },
      { id: 'ms-dot-2', colorId: 3, d: 'M 420 220 C 460 220 490 250 490 290 C 490 330 460 360 420 360 C 380 360 350 330 350 290 C 350 250 380 220 420 220 Z', labelX: 420, labelY: 290 },
      { id: 'ms-dot-3', colorId: 3, d: 'M 580 320 C 612 320 638 346 638 378 C 638 410 612 436 580 436 C 548 436 522 410 522 378 C 522 346 548 320 580 320 Z', labelX: 580, labelY: 378 },
      // Arched Door & Glowing Round Windows
      { id: 'ms-door', colorId: 4, d: 'M 332 835 L 332 645 C 332 585 468 585 468 645 L 468 835 Z', labelX: 400, labelY: 725 },
      { id: 'ms-win-l', colorId: 6, d: 'M 272 565 C 298 565 318 585 318 612 C 318 638 298 658 272 658 C 246 658 226 638 226 612 C 226 585 246 565 272 565 Z', labelX: 272, labelY: 612, labelSize: 13 },
      { id: 'ms-win-r', colorId: 6, d: 'M 528 565 C 554 565 574 585 574 612 C 574 638 554 658 528 658 C 502 658 482 638 482 612 C 482 585 502 565 528 565 Z', labelX: 528, labelY: 612, labelSize: 13 },
      // Little Chimney Puff
      { id: 'ms-puff', colorId: 7, d: 'M 585 110 C 625 110 650 135 645 170 C 620 190 565 190 545 165 C 540 132 558 110 585 110 Z', labelX: 590, labelY: 148, labelSize: 13 },
      // Bushes
      { id: 'ms-bush-l', colorId: 5, d: 'M 155 775 C 185 735 245 745 255 835 L 135 835 Z', labelX: 198, labelY: 802, labelSize: 12 },
      { id: 'ms-bush-r', colorId: 5, d: 'M 645 775 C 615 735 555 745 545 835 L 665 835 Z', labelX: 602, labelY: 802, labelSize: 12 },
    ],
    detailStrokes: [
      'M 272 565 L 272 658 M 226 612 L 318 612',
      'M 528 565 L 528 658 M 482 612 L 574 612',
      'M 440 735 A 7 7 0 1 0 440.1 735',
    ],
  },
  {
    id: 'kids-04',
    categoryId: 'kids',
    levelNumber: 4,
    title: 'RAINBOW WHALE SPLASH',
    character: 'Bubbles the Whale',
    source: 'Ocean Pals',
    punchline: 'Making waves and painting rainbows across the bay.',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#E0F2FE',
    palette: [
      { id: 1, name: 'Breeze Sky', hex: '#BAE6FD' },
      { id: 2, name: 'Whale Ocean', hex: '#2563EB' },
      { id: 3, name: 'Belly Cream', hex: '#EFF6FF' },
      { id: 4, name: 'Wave Aqua', hex: '#0EA5E9' },
      { id: 5, name: 'Rainbow Coral', hex: '#F43F5E' },
      { id: 6, name: 'Rainbow Gold', hex: '#FACC15' },
      { id: 7, name: 'Rainbow Mint', hex: '#10B981' },
    ],
    regions: [
      { id: 'wh-sky', colorId: 1, d: 'M 0 0 L 800 0 L 800 680 L 0 680 Z', labelX: 110, labelY: 110 },
      // Rainbow Arch behind whale
      { id: 'wh-rb-1', colorId: 5, d: 'M 90 580 A 310 310 0 0 1 710 580 L 650 580 A 250 250 0 0 0 150 580 Z', labelX: 400, labelY: 300 },
      { id: 'wh-rb-2', colorId: 6, d: 'M 150 580 A 250 250 0 0 1 650 580 L 590 580 A 190 190 0 0 0 210 580 Z', labelX: 400, labelY: 360 },
      { id: 'wh-rb-3', colorId: 7, d: 'M 210 580 A 190 190 0 0 1 590 580 L 530 580 A 130 130 0 0 0 270 580 Z', labelX: 400, labelY: 420 },
      // Water Spout Drops
      { id: 'wh-spout-l', colorId: 4, d: 'M 375 340 C 315 240 245 255 245 315 C 295 310 335 330 355 420 Z', labelX: 315, labelY: 305, labelSize: 13 },
      { id: 'wh-spout-r', colorId: 4, d: 'M 425 340 C 485 240 555 255 555 315 C 505 310 465 330 445 420 Z', labelX: 485, labelY: 305, labelSize: 13 },
      // Happy Whale Body & Tail
      { id: 'wh-tail-l', colorId: 2, d: 'M 605 565 C 660 475 735 465 755 520 C 715 570 670 605 615 620 Z', labelX: 685, labelY: 530 },
      { id: 'wh-tail-r', colorId: 2, d: 'M 615 620 C 685 620 755 645 745 705 C 685 710 630 685 585 655 Z', labelX: 680, labelY: 668 },
      { id: 'wh-body', colorId: 2, d: 'M 145 645 C 145 435 495 425 620 585 L 605 760 L 165 760 Z', labelX: 375, labelY: 575 },
      { id: 'wh-belly', colorId: 3, d: 'M 165 655 C 255 625 425 635 495 760 L 165 760 Z', labelX: 295, labelY: 710 },
      { id: 'wh-fin', colorId: 2, d: 'M 395 660 C 455 680 485 755 445 800 C 395 790 365 730 395 660 Z', labelX: 422, labelY: 735, labelSize: 13 },
      // Layered Ocean Waves
      { id: 'wh-wave-1', colorId: 4, d: 'M 0 740 Q 200 695 400 755 Q 600 815 800 740 L 800 890 L 0 890 Z', labelX: 165, labelY: 820 },
      { id: 'wh-wave-2', colorId: 2, d: 'M 0 855 Q 240 815 480 875 Q 660 915 800 855 L 800 1000 L 0 1000 Z', labelX: 540, labelY: 938 },
      // Happy Sun
      { id: 'wh-sun', colorId: 6, d: 'M 145 100 C 192 100 228 136 228 183 C 228 230 192 266 145 266 C 98 266 62 230 62 183 C 62 136 98 100 145 100 Z', labelX: 145, labelY: 183 },
    ],
    detailStrokes: [
      'M 235 585 A 10 10 0 1 0 235.1 585',
      'M 175 635 Q 230 665 295 640',
      'M 225 695 L 225 750 M 280 685 L 280 750 M 335 690 L 335 750',
    ],
  },
  {
    id: 'kids-05',
    categoryId: 'kids',
    levelNumber: 5,
    title: 'FRIENDLY CLOUD DRAGON',
    character: 'Puff the Dragon',
    source: 'Sky Meadows',
    punchline: 'Breathing warm sparkles instead of fire.',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#DDD6FE',
    palette: [
      { id: 1, name: 'Lavender Sky', hex: '#C4B5FD' },
      { id: 2, name: 'Dragon Teal', hex: '#14B8A6' },
      { id: 3, name: 'Belly Butter', hex: '#FEF08A' },
      { id: 4, name: 'Wing Berry', hex: '#EC4899' },
      { id: 5, name: 'Sparkle Gold', hex: '#F59E0B' },
      { id: 6, name: 'Cloud White', hex: '#F8FAFC' },
      { id: 7, name: 'Horn Mint', hex: '#6EE7B7' },
    ],
    regions: [
      { id: 'dg-sky', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 110 },
      // Fluffy Cloud Bed
      { id: 'dg-cloud-1', colorId: 6, d: 'M 70 845 C 80 760 190 735 265 785 C 335 725 465 725 535 785 C 610 735 720 760 730 845 L 730 945 L 70 945 Z', labelX: 400, labelY: 880 },
      // Dragon Wings
      { id: 'dg-wing-l', colorId: 4, d: 'M 295 455 C 160 325 75 405 110 560 C 175 590 250 560 305 530 Z', labelX: 190, labelY: 485 },
      { id: 'dg-wing-r', colorId: 4, d: 'M 505 455 C 640 325 725 405 690 560 C 625 590 550 560 495 530 Z', labelX: 610, labelY: 485 },
      // Horns
      { id: 'dg-horn-l', colorId: 5, d: 'M 305 235 L 265 135 L 355 205 Z', labelX: 305, labelY: 192, labelSize: 12 },
      { id: 'dg-horn-r', colorId: 5, d: 'M 495 235 L 535 135 L 445 205 Z', labelX: 495, labelY: 192, labelSize: 12 },
      // Dragon Head & Snout
      { id: 'dg-head', colorId: 2, d: 'M 275 315 C 275 195 525 195 525 315 C 525 415 470 465 400 465 C 330 465 275 415 275 315 Z', labelX: 400, labelY: 280 },
      { id: 'dg-snout', colorId: 7, d: 'M 312 345 C 312 308 488 308 488 345 C 488 415 450 445 400 445 C 350 445 312 415 312 345 Z', labelX: 400, labelY: 382 },
      // Chubby Dragon Body & Belly
      { id: 'dg-body', colorId: 2, d: 'M 255 625 C 255 465 545 465 545 625 C 545 755 485 805 400 805 C 315 805 255 755 255 625 Z', labelX: 295, labelY: 635 },
      { id: 'dg-belly', colorId: 3, d: 'M 315 645 C 315 525 485 525 485 645 C 485 745 450 795 400 795 C 350 795 315 745 315 645 Z', labelX: 400, labelY: 665 },
      // Little Paws
      { id: 'dg-paw-l', colorId: 7, d: 'M 245 725 C 280 715 315 735 315 785 L 235 785 Z', labelX: 278, labelY: 758, labelSize: 12 },
      { id: 'dg-paw-r', colorId: 7, d: 'M 555 725 C 520 715 485 735 485 785 L 565 785 Z', labelX: 522, labelY: 758, labelSize: 12 },
      // Floating Magic Stars
      { id: 'dg-star-1', colorId: 5, d: 'M 150 220 L 170 265 L 215 275 L 180 308 L 190 355 L 150 330 L 110 355 L 120 308 L 85 275 L 130 265 Z', labelX: 150, labelY: 290, labelSize: 13 },
      { id: 'dg-star-2', colorId: 5, d: 'M 650 185 L 668 225 L 708 232 L 678 262 L 686 305 L 650 284 L 614 305 L 622 262 L 592 232 L 632 225 Z', labelX: 650, labelY: 250, labelSize: 13 },
      // Tail Curl
      { id: 'dg-tail', colorId: 2, d: 'M 530 685 C 615 700 665 655 685 615 C 670 725 605 775 515 755 Z', labelX: 615, labelY: 712, labelSize: 13 },
    ],
    detailStrokes: [
      'M 342 295 A 10 10 0 1 0 342.1 295 M 458 295 A 10 10 0 1 0 458.1 295',
      'M 365 405 Q 400 428 435 405',
      'M 330 610 L 470 610 M 325 675 L 475 675 M 340 735 L 460 735',
    ],
  },
];

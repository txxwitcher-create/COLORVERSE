import type { ArtworkDefinition } from '../../types/colorverse';

export const MEMES_ARTWORKS: ArtworkDefinition[] = [
  {
    id: 'memes-01',
    categoryId: 'memes',
    levelNumber: 1,
    title: 'THIS IS FINE',
    character: 'Calm Coffee Hound',
    source: 'Internet Classics',
    punchline: 'Sipping warm espresso while everything goes gloriously sideways.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#2A1208',
    palette: [
      { id: 1, name: 'Blaze Orange', hex: '#F97316' },
      { id: 2, name: 'Ember Red', hex: '#DC2626' },
      { id: 3, name: 'Flame Gold', hex: '#FACC15' },
      { id: 4, name: 'Hound Ochre', hex: '#D99B4E' },
      { id: 5, name: 'Bowler Black', hex: '#1F2937' },
      { id: 6, name: 'Mug Cream', hex: '#F8FAFC' },
      { id: 7, name: 'Table Oak', hex: '#78350F' },
    ],
    regions: [
      { id: 'tf-wall', colorId: 2, d: 'M 0 0 L 800 0 L 800 720 L 0 720 Z', labelX: 110, labelY: 110 },
      // Roaring Flames Background
      { id: 'tf-flame-l', colorId: 1, d: 'M 0 720 L 0 280 C 85 160 175 265 185 390 C 235 280 295 360 285 720 Z', labelX: 135, labelY: 465 },
      { id: 'tf-flame-r', colorId: 1, d: 'M 800 720 L 800 240 C 710 150 615 260 610 385 C 555 275 505 365 515 720 Z', labelX: 665, labelY: 465 },
      { id: 'tf-flame-c1', colorId: 3, d: 'M 55 720 C 65 445 145 385 185 520 C 205 440 250 495 250 720 Z', labelX: 155, labelY: 605 },
      { id: 'tf-flame-c2', colorId: 3, d: 'M 745 720 C 735 445 655 385 615 520 C 595 440 550 495 550 720 Z', labelX: 645, labelY: 605 },
      // Tiny Bowler Hat
      { id: 'tf-hat-dome', colorId: 5, d: 'M 325 225 C 325 145 475 145 475 225 Z', labelX: 400, labelY: 185, labelSize: 13 },
      { id: 'tf-hat-brim', colorId: 5, d: 'M 285 225 L 515 225 L 515 258 L 285 258 Z', labelX: 400, labelY: 242, labelSize: 12 },
      // Floppy Dog Ears
      { id: 'tf-ear-l', colorId: 7, d: 'M 265 305 C 215 320 205 445 255 475 L 295 395 Z', labelX: 250, labelY: 395, labelSize: 13 },
      { id: 'tf-ear-r', colorId: 7, d: 'M 535 305 C 585 320 595 445 545 475 L 505 395 Z', labelX: 550, labelY: 395, labelSize: 13 },
      // Calm Hound Head & Body
      { id: 'tf-head', colorId: 4, d: 'M 280 345 C 280 245 520 245 520 345 C 520 445 475 505 400 505 C 325 505 280 445 280 345 Z', labelX: 400, labelY: 325 },
      { id: 'tf-snout', colorId: 4, d: 'M 335 395 C 335 365 465 365 465 395 C 465 470 435 495 400 495 C 365 495 335 470 335 395 Z', labelX: 400, labelY: 445 },
      { id: 'tf-eye-l', colorId: 6, d: 'M 338 320 C 362 320 380 338 380 362 C 380 386 362 404 338 404 C 314 404 296 386 296 362 C 296 338 314 320 338 320 Z', labelX: 338, labelY: 362, labelSize: 12 },
      { id: 'tf-eye-r', colorId: 6, d: 'M 462 320 C 486 320 504 338 504 362 C 504 386 486 404 462 404 C 438 404 420 386 420 362 C 420 338 438 320 462 320 Z', labelX: 462, labelY: 362, labelSize: 12 },
      { id: 'tf-body', colorId: 4, d: 'M 285 505 L 515 505 L 545 720 L 255 720 Z', labelX: 400, labelY: 615 },
      // Coffee Table & Iconic Mug
      { id: 'tf-table-top', colorId: 7, d: 'M 0 720 L 800 720 L 800 815 L 0 815 Z', labelX: 165, labelY: 768 },
      { id: 'tf-table-base', colorId: 5, d: 'M 0 815 L 800 815 L 800 1000 L 0 1000 Z', labelX: 400, labelY: 910 },
      { id: 'tf-mug', colorId: 6, d: 'M 545 595 L 655 595 L 645 720 L 555 720 Z', labelX: 600, labelY: 658 },
      { id: 'tf-steam', colorId: 6, d: 'M 580 510 Q 615 535 585 585 Q 635 545 615 505 Z', labelX: 600, labelY: 545, labelSize: 11 },
    ],
    detailStrokes: [
      'M 338 362 A 8 8 0 1 0 338.1 362 M 462 362 A 8 8 0 1 0 462.1 362',
      'M 385 425 L 415 425 L 400 442 Z',
      'M 365 466 Q 400 482 435 466',
      'M 655 620 C 695 620 695 690 648 690',
    ],
  },
  {
    id: 'memes-02',
    categoryId: 'memes',
    levelNumber: 2,
    title: 'MUCH ART VERY COLOR',
    character: 'Shiba Legend',
    source: 'Doge Archives',
    punchline: 'Such palette. Many brushstroke. Wow.',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#FEF3C7',
    palette: [
      { id: 1, name: 'Wow Yellow', hex: '#FDE047' },
      { id: 2, name: 'Shiba Toast', hex: '#D97706' },
      { id: 3, name: 'Cream Fur', hex: '#FEF9C3' },
      { id: 4, name: 'Ear Blush', hex: '#FCA5A5' },
      { id: 5, name: 'Nose Espresso', hex: '#292524' },
      { id: 6, name: 'Beret Magenta', hex: '#DB2777' },
      { id: 7, name: 'Scarf Teal', hex: '#14B8A6' },
    ],
    regions: [
      { id: 'dg-m-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 110 },
      // Artist Beret on Shiba
      { id: 'dg-m-beret', colorId: 6, d: 'M 225 225 C 245 105 515 95 575 215 L 485 260 L 245 265 Z', labelX: 400, labelY: 175 },
      // Pointy Shiba Ears
      { id: 'dg-m-ear-l', colorId: 2, d: 'M 215 350 L 175 165 L 330 250 Z', labelX: 230, labelY: 255 },
      { id: 'dg-m-ear-r', colorId: 2, d: 'M 585 350 L 625 165 L 470 250 Z', labelX: 570, labelY: 255 },
      { id: 'dg-m-ear-il', colorId: 4, d: 'M 222 315 L 205 218 L 288 265 Z', labelX: 238, labelY: 270, labelSize: 12 },
      { id: 'dg-m-ear-ir', colorId: 4, d: 'M 578 315 L 595 218 L 512 265 Z', labelX: 562, labelY: 270, labelSize: 12 },
      // Round Fluffy Shiba Head & Cheeks
      { id: 'dg-m-head', colorId: 2, d: 'M 195 475 C 195 275 315 235 400 235 C 485 235 605 275 605 475 C 605 625 515 695 400 695 C 285 695 195 625 195 475 Z', labelX: 400, labelY: 325 },
      { id: 'dg-m-cheeks', colorId: 3, d: 'M 215 505 C 245 430 335 425 400 445 C 465 425 555 430 585 505 C 585 630 505 695 400 695 C 295 695 215 630 215 505 Z', labelX: 400, labelY: 605 },
      // Side-eye Expressive Eyes & Nose
      { id: 'dg-m-eye-l', colorId: 5, d: 'M 308 405 C 335 405 355 425 355 450 C 355 475 335 492 308 492 C 282 492 262 475 262 450 C 262 425 282 405 308 405 Z', labelX: 308, labelY: 450, labelSize: 13 },
      { id: 'dg-m-eye-r', colorId: 5, d: 'M 492 405 C 518 405 538 425 538 450 C 538 475 518 492 492 492 C 465 492 445 475 445 450 C 445 425 465 405 492 405 Z', labelX: 492, labelY: 450, labelSize: 13 },
      { id: 'dg-m-nose', colorId: 5, d: 'M 365 505 C 365 485 435 485 435 505 C 435 535 415 552 400 552 C 385 552 365 535 365 505 Z', labelX: 400, labelY: 518, labelSize: 12 },
      // Artist Scarf & Chest Fur
      { id: 'dg-m-scarf', colorId: 7, d: 'M 225 685 Q 400 755 575 685 L 605 790 Q 400 845 195 790 Z', labelX: 400, labelY: 755 },
      { id: 'dg-m-body-l', colorId: 2, d: 'M 155 795 L 325 815 L 325 980 L 120 980 Z', labelX: 235, labelY: 895 },
      { id: 'dg-m-body-r', colorId: 2, d: 'M 645 795 L 475 815 L 475 980 L 680 980 Z', labelX: 565, labelY: 895 },
      { id: 'dg-m-chest', colorId: 3, d: 'M 325 815 L 475 815 L 475 980 L 325 980 Z', labelX: 400, labelY: 900 },
      // Sparkle Burst
      { id: 'dg-m-burst', colorId: 6, d: 'M 665 440 L 688 495 L 745 505 L 695 540 L 710 595 L 665 562 L 620 595 L 635 540 L 585 505 L 642 495 Z', labelX: 665, labelY: 522, labelSize: 13 },
    ],
    detailStrokes: [
      'M 340 578 Q 370 605 400 575 Q 430 605 460 578',
      'M 295 438 A 6 6 0 1 0 295.1 438 M 478 438 A 6 6 0 1 0 478.1 438',
    ],
  },
  {
    id: 'memes-03',
    categoryId: 'memes',
    levelNumber: 3,
    title: 'STONKS ONLY GO UP',
    character: 'Market Sage',
    source: 'Finance Memes',
    punchline: 'When the chart bends reality purely through confidence.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0B1324',
    palette: [
      { id: 1, name: 'Ticker Midnight', hex: '#0F172A' },
      { id: 2, name: 'Chart Grid Blue', hex: '#1E3A8A' },
      { id: 3, name: 'Bull Market Green', hex: '#10B981' },
      { id: 4, name: 'Suit Charcoal', hex: '#1F2937' },
      { id: 5, name: 'Shirt Crisp', hex: '#F8FAFC' },
      { id: 6, name: 'Power Tie Red', hex: '#EF4444' },
      { id: 7, name: 'Mannequin Pearl', hex: '#E2E8F0' },
    ],
    regions: [
      { id: 'st-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 110 },
      // Bar Chart Columns Behind
      { id: 'st-bar-1', colorId: 2, d: 'M 65 520 L 145 520 L 145 960 L 65 960 Z', labelX: 105, labelY: 640 },
      { id: 'st-bar-2', colorId: 2, d: 'M 195 445 L 275 445 L 275 960 L 195 960 Z', labelX: 235, labelY: 540 },
      { id: 'st-bar-3', colorId: 2, d: 'M 525 325 L 605 325 L 605 960 L 525 960 Z', labelX: 565, labelY: 445 },
      { id: 'st-bar-4', colorId: 2, d: 'M 655 215 L 735 215 L 735 960 L 655 960 Z', labelX: 695, labelY: 360 },
      // Giant Rising Green Arrow
      { id: 'st-arrow-shaft', colorId: 3, d: 'M 40 615 L 245 480 L 345 545 L 635 195 L 690 245 L 355 635 L 240 555 L 70 670 Z', labelX: 175, labelY: 558 },
      { id: 'st-arrow-head', colorId: 3, d: 'M 575 135 L 745 105 L 725 280 Z', labelX: 682, labelY: 175 },
      // Smooth Head & Neck
      { id: 'st-head', colorId: 7, d: 'M 290 360 C 290 225 510 225 510 360 C 510 475 465 545 400 545 C 335 545 290 475 290 360 Z', labelX: 400, labelY: 380 },
      { id: 'st-neck', colorId: 7, d: 'M 348 520 L 452 520 L 460 610 L 340 610 Z', labelX: 400, labelY: 566 },
      // Business Suit & Red Tie
      { id: 'st-suit-l', colorId: 4, d: 'M 145 735 C 185 630 255 600 340 595 L 365 980 L 125 980 Z', labelX: 245, labelY: 815 },
      { id: 'st-suit-r', colorId: 4, d: 'M 655 735 C 615 630 545 600 460 595 L 435 980 L 675 980 Z', labelX: 555, labelY: 815 },
      { id: 'st-shirt', colorId: 5, d: 'M 340 595 L 460 595 L 400 845 Z', labelX: 372, labelY: 660, labelSize: 13 },
      { id: 'st-tie', colorId: 6, d: 'M 380 620 L 420 620 L 432 820 L 400 895 L 368 820 Z', labelX: 400, labelY: 745, labelSize: 13 },
      { id: 'st-suit-mid', colorId: 4, d: 'M 365 845 L 435 845 L 435 980 L 365 980 Z', labelX: 400, labelY: 930 },
      // Floating Profit Badges
      { id: 'st-badge-1', colorId: 3, d: 'M 95 145 L 255 145 L 255 215 L 95 215 Z', labelX: 175, labelY: 180 },
      { id: 'st-badge-2', colorId: 6, d: 'M 95 245 L 220 245 L 220 305 L 95 305 Z', labelX: 158, labelY: 275, labelSize: 13 },
    ],
    detailStrokes: [
      'M 332 375 L 372 375 M 428 375 L 468 375',
      'M 378 468 Q 400 482 422 468',
      'M 400 390 L 392 435 L 410 435',
    ],
  },
  {
    id: 'memes-04',
    categoryId: 'memes',
    levelNumber: 4,
    title: 'DINNER TABLE DRAMA',
    character: 'Confused White Cat',
    source: 'Reaction Classics',
    punchline: 'Innocent eyes over an untouched plate of salad.',
    difficulty: 'Easy',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#1E293B',
    palette: [
      { id: 1, name: 'Bistro Wall', hex: '#334155' },
      { id: 2, name: 'Chair Velvet', hex: '#991B1B' },
      { id: 3, name: 'Cat Ivory', hex: '#F8FAFC' },
      { id: 4, name: 'Ear Pink', hex: '#F9A8D4' },
      { id: 5, name: 'Tablecloth Linen', hex: '#E2E8F0' },
      { id: 6, name: 'Salad Crisp', hex: '#22C55E' },
      { id: 7, name: 'Tomato Cherry', hex: '#EF4444' },
    ],
    regions: [
      { id: 'ct-wall', colorId: 1, d: 'M 0 0 L 800 0 L 800 680 L 0 680 Z', labelX: 110, labelY: 110 },
      // High-Back Restaurant Chair
      { id: 'ct-chair', colorId: 2, d: 'M 155 155 C 155 110 645 110 645 155 L 630 680 L 170 680 Z', labelX: 230, labelY: 225 },
      // Cat Ears
      { id: 'ct-ear-l', colorId: 3, d: 'M 265 360 L 235 205 L 360 285 Z', labelX: 280, labelY: 282 },
      { id: 'ct-ear-r', colorId: 3, d: 'M 535 360 L 565 205 L 440 285 Z', labelX: 520, labelY: 282 },
      { id: 'ct-ear-il', colorId: 4, d: 'M 272 332 L 258 248 L 325 292 Z', labelX: 282, labelY: 295, labelSize: 12 },
      { id: 'ct-ear-ir', colorId: 4, d: 'M 528 332 L 542 248 L 475 292 Z', labelX: 518, labelY: 295, labelSize: 12 },
      // Iconic Confused Cat Face & Shoulders
      { id: 'ct-head', colorId: 3, d: 'M 235 450 C 235 285 335 270 400 270 C 465 270 565 285 565 450 C 565 560 495 605 400 605 C 305 605 235 560 235 450 Z', labelX: 400, labelY: 365 },
      { id: 'ct-body', colorId: 3, d: 'M 260 580 L 540 580 L 565 710 L 235 710 Z', labelX: 400, labelY: 645 },
      { id: 'ct-nose', colorId: 4, d: 'M 378 465 L 422 465 L 400 495 Z', labelX: 400, labelY: 478, labelSize: 11 },
      // Crisp Tablecloth
      { id: 'ct-table', colorId: 5, d: 'M 0 680 L 800 680 L 800 1000 L 0 1000 Z', labelX: 110, labelY: 890 },
      // Dinner Plate
      { id: 'ct-plate-rim', colorId: 3, d: 'M 400 715 C 565 715 675 765 675 840 C 675 915 565 965 400 965 C 235 965 125 915 125 840 C 125 765 235 715 400 715 Z', labelX: 400, labelY: 932, labelSize: 13 },
      // Untouched Salad Leaves & Cherry Tomatoes
      { id: 'ct-salad-1', colorId: 6, d: 'M 225 815 C 255 745 365 745 395 815 C 365 885 255 885 225 815 Z', labelX: 305, labelY: 815 },
      { id: 'ct-salad-2', colorId: 6, d: 'M 405 815 C 435 745 545 745 575 815 C 545 885 435 885 405 815 Z', labelX: 495, labelY: 815 },
      { id: 'ct-tom-1', colorId: 7, d: 'M 355 775 C 378 775 395 792 395 815 C 395 838 378 855 355 855 C 332 855 315 838 315 815 C 315 792 332 775 355 775 Z', labelX: 355, labelY: 815, labelSize: 12 },
      { id: 'ct-tom-2', colorId: 7, d: 'M 455 795 C 478 795 495 812 495 835 C 495 858 478 875 455 875 C 432 875 415 858 415 835 C 415 812 432 795 455 795 Z', labelX: 455, labelY: 835, labelSize: 12 },
      // Drink Glass
      { id: 'ct-glass', colorId: 1, d: 'M 660 555 L 745 555 L 735 725 L 670 725 Z', labelX: 702, labelY: 640 },
    ],
    detailStrokes: [
      'M 305 425 L 365 440 M 495 425 L 435 440',
      'M 365 525 Q 400 508 435 525',
      'M 220 475 L 285 480 M 215 510 L 285 505 M 580 475 L 515 480 M 585 510 L 515 505',
    ],
  },
  {
    id: 'memes-05',
    categoryId: 'memes',
    levelNumber: 5,
    title: 'COSMIC EPIPHANY',
    character: 'Galaxy Brain',
    source: 'Enlightenment Memes',
    punchline: 'Ascending beyond mortal comprehension one swatch at a time.',
    difficulty: 'Medium',
    isPremium: true,
    viewBox: '0 0 800 1000',
    backgroundHex: '#0A0618',
    palette: [
      { id: 1, name: 'Astral Void', hex: '#0F0924' },
      { id: 2, name: 'Nebula Violet', hex: '#6D28D9' },
      { id: 3, name: 'Cosmic Magenta', hex: '#DB2777' },
      { id: 4, name: 'Synapse Cyan', hex: '#22D3EE' },
      { id: 5, name: 'Enlightened Gold', hex: '#FACC15' },
      { id: 6, name: 'Ethereal Indigo', hex: '#312E81' },
      { id: 7, name: 'Pure Light', hex: '#F8FAFC' },
    ],
    regions: [
      { id: 'gb-bg', colorId: 1, d: 'M 0 0 L 800 0 L 800 1000 L 0 1000 Z', labelX: 100, labelY: 100 },
      // Radiating Enlightenment Rays
      { id: 'gb-ray-top', colorId: 5, d: 'M 400 320 L 325 35 L 475 35 Z', labelX: 400, labelY: 115 },
      { id: 'gb-ray-l', colorId: 3, d: 'M 330 375 L 40 215 L 40 375 Z', labelX: 125, labelY: 315 },
      { id: 'gb-ray-r', colorId: 3, d: 'M 470 375 L 760 215 L 760 375 Z', labelX: 675, labelY: 315 },
      { id: 'gb-ray-bl', colorId: 4, d: 'M 330 435 L 40 485 L 40 625 Z', labelX: 125, labelY: 535 },
      { id: 'gb-ray-br', colorId: 4, d: 'M 470 435 L 760 485 L 760 625 Z', labelX: 675, labelY: 535 },
      // Cosmic Halo
      { id: 'gb-halo', colorId: 2, d: 'M 400 165 C 555 165 665 275 665 430 C 665 585 555 685 400 685 C 245 685 135 585 135 430 C 135 275 245 165 400 165 Z', labelX: 595, labelY: 430 },
      // Translucent Profile Head & Shoulders
      { id: 'gb-shoulders', colorId: 6, d: 'M 145 815 C 185 715 285 685 400 685 C 515 685 615 715 655 815 L 685 980 L 115 980 Z', labelX: 400, labelY: 855 },
      { id: 'gb-neck', colorId: 6, d: 'M 335 585 L 465 585 L 478 705 L 322 705 Z', labelX: 400, labelY: 645 },
      { id: 'gb-head', colorId: 6, d: 'M 255 395 C 255 245 335 205 400 205 C 465 205 545 245 545 395 C 545 525 485 605 400 605 C 315 605 255 525 255 395 Z', labelX: 400, labelY: 550 },
      // Glowing Galaxy Brain Core
      { id: 'gb-brain-l', colorId: 3, d: 'M 395 250 C 315 250 280 315 290 390 C 300 445 350 465 395 455 Z', labelX: 342, labelY: 355 },
      { id: 'gb-brain-r', colorId: 4, d: 'M 405 250 C 485 250 520 315 510 390 C 500 445 450 465 405 455 Z', labelX: 458, labelY: 355 },
      { id: 'gb-star-core', colorId: 7, d: 'M 400 285 L 424 340 L 480 360 L 424 380 L 400 435 L 376 380 L 320 360 L 376 340 Z', labelX: 400, labelY: 360, labelSize: 13 },
      // Glowing Ascended Eyes
      { id: 'gb-eye-l', colorId: 7, d: 'M 315 475 L 375 480 L 368 502 L 320 498 Z', labelX: 346, labelY: 488, labelSize: 11 },
      { id: 'gb-eye-r', colorId: 7, d: 'M 485 475 L 425 480 L 432 502 L 480 498 Z', labelX: 454, labelY: 488, labelSize: 11 },
      // Orbiting Knowledge Planets
      { id: 'gb-orb-1', colorId: 5, d: 'M 215 745 C 245 745 268 768 268 798 C 268 828 245 851 215 851 C 185 851 162 828 162 798 C 162 768 185 745 215 745 Z', labelX: 215, labelY: 798, labelSize: 13 },
      { id: 'gb-orb-2', colorId: 4, d: 'M 585 745 C 615 745 638 768 638 798 C 638 828 615 851 585 851 C 555 851 532 828 532 798 C 532 768 555 745 585 745 Z', labelX: 585, labelY: 798, labelSize: 13 },
    ],
    detailStrokes: [
      'M 340 315 Q 365 300 385 320 M 460 315 Q 435 300 415 320',
      'M 215 798 Q 400 725 585 798',
    ],
  },
];

import { Book } from '../types';

export const BOOKS_DATA: Book[] = [
  {
    id: 'solitude',
    title: 'The Architecture of Solitude',
    subtitle: 'A Novel of Space, Memory, and Belonging',
    author: 'Elias van der Pol',
    coverImage: '/src/assets/images/book_cover_solitude_1793171382581.jpg',
    category: 'Fiction & Prose',
    featured: true,
    badge: {
      text: 'Indie Bestseller · Staff Choice',
      type: 'terracotta'
    },
    formats: [
      {
        type: 'Hardcover',
        price: 28.00,
        msrp: 32.00,
        description: 'Debossed quarter-cloth binding with dust jacket on 130gsm laid paper',
        stockStatus: 'In Stock',
        details: 'First printing · Signed bookplate included'
      },
      {
        type: 'Paperback',
        price: 18.00,
        description: 'Deckle-edge trade paperback with French flaps',
        stockStatus: 'In Stock'
      },
      {
        type: 'E-Book',
        price: 12.99,
        description: 'DRM-free ePub & PDF with custom typographic layout',
        stockStatus: 'In Stock'
      },
      {
        type: 'Audiobook',
        price: 24.00,
        description: 'Unabridged narrative read by Julian Mercer (10h 42m)',
        stockStatus: 'In Stock'
      }
    ],
    synopsis: `In an unmapped seaside sanctuary on the North Sea coast, a reclusive restorer of historic astronomical clocks uncovers a series of architectural blueprints left behind by a forgotten mid-century modernist. As winter turns the waters to lead, each discovered room begins to mirror a grief he thought buried forty years prior. Van der Pol writes with crystalline restraint, transforming physical chambers into delicate acoustic chambers of memory and redemption.`,
    staffPickNote: {
      curatorName: 'Clara van Dijk',
      curatorRole: 'Head of Contemporary Fiction, Amsterdam',
      quote: `A quiet triumph of modern European prose. Elias understands that rooms are not simply enclosures of stone and plaster; they are the exact dimensions of what we choose to keep inside.`
    },
    excerpt: {
      chapterTitle: 'Chapter I: The North Facing Window',
      content: [
        `The clock in the bell tower of Saint Bavo struck four times, its bronze mallet hesitating before the final stroke as if considering whether the afternoon was truly worth concluding. Down along the canal quay, the water took on the dull sheen of poured pewter, reflecting nothing save the underside of the willow branches and the sudden, solitary wheel of a gull.`,
        `Julian stood by the trestle table, his calipers balanced between thumb and forefinger. On the sheet of unbleached draughtsman paper before him lay the brass gear from a pendule portative crafted in Lyon in 1782. Three teeth on the escapement wheel were worn down to smooth nubbins, ground away by two centuries of human punctuality.`,
        `"Everything we construct," his father had once remarked without looking up from the lathe, "is simply an apology to the daylight for passing so quickly." Julian remembered the smell of machine oil and wet wool that hung about his father's apron, a scent that forty years of North Sea dampness had failed to erase from these floorboards.`,
        `He set the calipers down on the green baize cloth. Through the tall sash window, the tide was turning. In two hours, the mudflats would be swallowed by the cold sea, and the house would stand alone once again, surrounded on three sides by water.`
      ]
    },
    specs: {
      isbn13: '978-0-987654-32-1',
      pages: 384,
      publisher: 'Meridian Broadsheet Editions',
      pubDate: 'September 2026',
      dimensions: '5.5 × 8.5 × 1.2 inches',
      weight: '1.45 lbs',
      binding: 'Smyth-sewn clothbound with ribbon marker',
      paperStock: '70lb Munken Pure archival cream stock'
    },
    rating: 4.9,
    reviewCount: 42,
    ratingBreakdown: {
      5: 36,
      4: 5,
      3: 1,
      2: 0,
      1: 0
    },
    reviews: [
      {
        id: 'rev-1',
        reviewer: 'The Paris Review',
        source: 'Editorial Review',
        rating: 5,
        date: 'October 14, 2026',
        comment: 'Van der Pol’s prose has the architectural weight of Mies van der Rohe and the luminous interiority of Marilynne Robinson. A genuine masterpiece.'
      },
      {
        id: 'rev-2',
        reviewer: 'Arthur Pendelton',
        source: 'Verified Reader · Edinburgh',
        rating: 5,
        date: 'October 02, 2026',
        comment: 'The physical book is as magnificent as the words. The archival paper feels warm to the touch, and the pacing is breathtaking.'
      },
      {
        id: 'rev-3',
        reviewer: 'Helena Berg',
        source: 'Verified Reader · Stockholm',
        rating: 4,
        date: 'September 28, 2026',
        comment: 'Hypnotic and meditative. Not a book to rush through; it demands to be read beside an open window in the autumn rain.'
      }
    ]
  },
  {
    id: 'botanical',
    title: 'Flora of the Quiet Earth',
    subtitle: 'A Botanical Study of the Natural World & Celestial Alignments',
    author: 'Astrid Lindholm & Dr. Paul Finch',
    coverImage: '/src/assets/images/book_cover_botanical_1793171383259.jpg',
    category: 'Botany & Nature',
    badge: {
      text: 'Collector’s First Edition · Gold Foil Cloth',
      type: 'sage'
    },
    formats: [
      {
        type: 'Hardcover',
        price: 45.00,
        msrp: 52.00,
        description: 'Foil-stamped dark moss bookcloth with gilded top edge',
        stockStatus: 'In Stock',
        details: 'Includes botanical herbarium folding chart'
      },
      {
        type: 'Paperback',
        price: 24.00,
        description: 'Heavyweight matte exhibition catalog edition',
        stockStatus: 'In Stock'
      },
      {
        type: 'E-Book',
        price: 16.99,
        description: 'High-definition digital plates with zoomable engravings',
        stockStatus: 'In Stock'
      }
    ],
    synopsis: `An extraordinary, hand-curated survey of nocturnal flora, sub-arctic lichens, and ancient medicinal mosses across the circumpolar north. Accompanied by seventy full-page copperplate engravings rendered by nineteenth-century naturalist expeditions, this edition bridges historical botanical scholarship with modern ecological conservation.`,
    staffPickNote: {
      curatorName: 'Evelyn St. James',
      curatorRole: 'Rare Natural History Specialist, Oxford',
      quote: `Opening this volume feels like stepping into an 18th-century herbarium at midnight. The tactile debossing and gold leaf foil make it an heirloom object.`
    },
    excerpt: {
      chapterTitle: 'Prelude: The Seed in Winter Silence',
      content: [
        `Under five feet of frozen peat in the valley of the Torne River, the dormant embryo of Saxifraga oppositifolia awaits the angle of the sun to shift by barely four degrees. It has done so since the receding of the last glacial maximum, counting seasons not in days or months, but in the slow expansion and retreat of permafrost.`,
        `To study alpine botany is to abandon human measurements of urgency. The dwarf willow grows horizontally, its branches hugging the granite bedrock to escape the scour of windborne quartz crystals, gaining less than two millimeters of circumference in an average human lifetime.`,
        `In our herbarium cabinets at Uppsala, we preserve specimens pressed between layers of rag paper during Linnaeus’s northern journey of 1732. The scent of dried birch resin and cedar dust remains intact, lingering upon the page like an unspoken botanical vow.`
      ]
    },
    specs: {
      isbn13: '978-1-492021-88-4',
      pages: 420,
      publisher: 'Arboretum Antiqua Press',
      pubDate: 'August 2026',
      dimensions: '7.2 × 10.4 × 1.6 inches',
      weight: '2.80 lbs',
      binding: 'Clothbound with deep green buckram and foil stamping',
      paperStock: '140gsm uncoated acid-free cotton paper'
    },
    rating: 4.95,
    reviewCount: 38,
    ratingBreakdown: {
      5: 35,
      4: 3,
      3: 0,
      2: 0,
      1: 0
    },
    reviews: [
      {
        id: 'rev-bot-1',
        reviewer: 'Botanical Quarterly Review',
        source: 'Editorial Spotlight',
        rating: 5,
        date: 'September 12, 2026',
        comment: 'A monumental achievement in physical book publishing. The paper texture and botanical fidelity are peerless.'
      },
      {
        id: 'rev-bot-2',
        reviewer: 'Miriam Thorne',
        source: 'Verified Reader · Cambridge',
        rating: 5,
        date: 'October 11, 2026',
        comment: 'Worth every penny of the cover price. The gold foil details on the cover are breathtaking in morning light.'
      }
    ]
  },
  {
    id: 'harbor',
    title: 'Notes from the Northern Pier',
    subtitle: 'A Novel of Solitude, Tides, and Distant Ships',
    author: 'Ellen Reid',
    coverImage: '/src/assets/images/book_cover_harbor_1793171383992.jpg',
    category: 'Fiction & Prose',
    badge: {
      text: 'National Book Critics Circle Finalist',
      type: 'sage'
    },
    formats: [
      {
        type: 'Hardcover',
        price: 26.00,
        msrp: 30.00,
        description: 'Hardcover bound in mist-gray linen with embossed title',
        stockStatus: 'In Stock'
      },
      {
        type: 'Paperback',
        price: 17.00,
        description: 'Pocket-sized broadsheet format with deckle edges',
        stockStatus: 'In Stock'
      },
      {
        type: 'Audiobook',
        price: 21.50,
        description: 'Narrated by Fiona Shaw (8h 15m)',
        stockStatus: 'In Stock'
      }
    ],
    synopsis: `Set along the fog-drenched wooden boardwalks of a deserted Maine harbor town in the off-season, Reid chronicles thirty days in the life of a maritime archivist tasked with cataloging the personal effects of fishermen who never returned. Poetic, bracing, and steeped in the quiet rhythms of the North Atlantic.`,
    staffPickNote: {
      curatorName: 'Marcus Cole',
      curatorRole: 'Staff Dispatch Curator, Portland',
      quote: `Reid writes about ocean fog the way painters treat light. You can smell the salt brine and damp cedar on every single sentence.`
    },
    excerpt: {
      chapterTitle: 'Entry 04: The Fog Horn at Point Judith',
      content: [
        `The fog did not roll in from the banks; it rose straight out of the water like steam off a cooling cauldron. By noon, the bell buoy two cables out had vanished, replaced by its mournful iron clank every nineteen seconds.`,
        `In the harbormaster’s ledger from 1894, the handwriting switches abruptly from the copperplate cursive of old Captain Teague to the tight, nervous pencil strokes of his daughter Martha. On November the third, she wrote only: 'Schooner Hesperus overdue. Coal fires banked. The wind smells of snow.'`,
        `I sat at the wooden desk with my tea going cold, listening to the pilings creak against the tide. There is an unmistakable honesty to a town when all the summer visitors have departed and left only the gulls and the wet timber behind.`
      ]
    },
    specs: {
      isbn13: '978-0-394511-92-0',
      pages: 296,
      publisher: 'Atlantic Sound Editions',
      pubDate: 'July 2026',
      dimensions: '5.2 × 8.0 × 1.0 inches',
      weight: '1.15 lbs',
      binding: 'Casebound with ribbon marker',
      paperStock: '65lb Finch Opaque archival paper'
    },
    rating: 4.8,
    reviewCount: 29,
    ratingBreakdown: {
      5: 23,
      4: 5,
      3: 1,
      2: 0,
      1: 0
    },
    reviews: [
      {
        id: 'rev-harb-1',
        reviewer: 'London Review of Books',
        source: 'Editorial Review',
        rating: 5,
        date: 'August 19, 2026',
        comment: 'Ellen Reid has created one of the most resonant maritime elegies in modern literature. Unsparing and tender.'
      }
    ]
  },
  {
    id: 'echoes',
    title: 'Echoes of the Silk Road',
    subtitle: 'Journeys Through Persia, Samarkand, and Beyond',
    author: 'Elias N. Khan',
    coverImage: '/src/assets/images/book_cover_echoes_1793171384416.jpg',
    category: 'Art & Architecture',
    badge: {
      text: 'International Travel Book of the Year',
      type: 'terracotta'
    },
    formats: [
      {
        type: 'Hardcover',
        price: 36.00,
        msrp: 42.00,
        description: 'Embossed geometric cobalt linen with gilded top edge',
        stockStatus: 'In Stock',
        details: 'Includes fold-out cartographic silk route map'
      },
      {
        type: 'Paperback',
        price: 22.00,
        description: 'Trade edition with color plates',
        stockStatus: 'In Stock'
      },
      {
        type: 'E-Book',
        price: 14.99,
        description: 'Interactive map-linked digital monograph',
        stockStatus: 'In Stock'
      }
    ],
    synopsis: `An immersive cultural, architectural, and literary exploration tracing the caravan trails from Isfahan to Bukhara. Khan pairs deep historical archival findings with contemporary photographic studies of tile mosaics, caravanserais, and the living tradition of carpet weaving and calligraphy.`,
    staffPickNote: {
      curatorName: 'Soraya M.',
      curatorRole: 'Curator of Islamic Art & Architecture',
      quote: `Khan writes with the observational intimacy of Bruce Chatwin and the scholarly depth of Oleg Grabar. The lapis lazuli cloth binding is an instant classic.`
    },
    excerpt: {
      chapterTitle: 'Chapter III: The Cobalt Domes of Isfahan',
      content: [
        `Under the midday sun of Naqsh-e Jahan, the turquoise faience tiles of the Shah Mosque do not merely reflect the sky; they argue with it. As the sun moves, the cobalt and saffron glaze shifts from deep oceanic indigo to the pale, blinding cyan of desert ice.`,
        `The master tilemaker Mirak told me that the secret to the longevity of seventeenth-century Safavid glaze lay in the river silt of Zayandeh and the crushed lapis brought by donkey cart from the mountains of Badakhshan. 'Modern pigment knows only how to fade,' he smiled, tapping a cracked bowl with his fingernail. 'Old glaze knows how to listen.'`,
        `Walking beneath the vaulted muqarnas at twilight, one hears the footsteps of pilgrims and caravan merchants who camped in these courtyards three hundred years ago. The silence here is not empty; it is crowded with echoes.`
      ]
    },
    specs: {
      isbn13: '978-1-584562-77-3',
      pages: 464,
      publisher: 'Silk Road Monograph Press',
      pubDate: 'May 2026',
      dimensions: '6.8 × 9.8 × 1.5 inches',
      weight: '2.40 lbs',
      binding: 'Clothbound hardcover with foil stamping',
      paperStock: '120gsm GardaMatte archival stock'
    },
    rating: 4.88,
    reviewCount: 31,
    ratingBreakdown: {
      5: 27,
      4: 3,
      3: 1,
      2: 0,
      1: 0
    },
    reviews: [
      {
        id: 'rev-echo-1',
        reviewer: 'Architectural Digest',
        source: 'Editorial Feature',
        rating: 5,
        date: 'June 04, 2026',
        comment: 'A visual and literary tour de force. The production quality matches the breathtaking monuments it documents.'
      }
    ]
  },
  {
    id: 'geometry-silence',
    title: 'The Geometry of Modern Silence',
    subtitle: 'Essays on Solitude, Architecture, and Contemplation',
    author: 'Hannah A. Kroll',
    coverImage: '/src/assets/images/book_cover_solitude_1793171382581.jpg',
    category: 'Philosophy',
    badge: {
      text: 'European Essay Prize Winner',
      type: 'sage'
    },
    formats: [
      {
        type: 'Hardcover',
        price: 25.00,
        msrp: 29.00,
        description: 'Minimalist warm cream board binding with blind debossing',
        stockStatus: 'In Stock'
      },
      {
        type: 'Paperback',
        price: 16.50,
        description: 'Uncoated stock paperback with wide margins for marginalia',
        stockStatus: 'In Stock'
      },
      {
        type: 'E-Book',
        price: 11.99,
        description: 'Formatted for e-readers with clean serif typography',
        stockStatus: 'In Stock'
      }
    ],
    synopsis: `In an era defined by perpetual notification and algorithmic velocity, philosopher Hannah Kroll examines the physical spaces where silence has historically survived: monastic cloisters, high-altitude alpine libraries, Zen rock gardens, and recording studios. A luminous defense of uninterrupted attention.`,
    staffPickNote: {
      curatorName: 'Dr. Leonard Gross',
      curatorRole: 'Department of Philosophy & Aesthetics',
      quote: `Kroll reminds us that silence is not the absence of sound, but the presence of room for thinking. An indispensable companion for our fragmented times.`
    },
    excerpt: {
      chapterTitle: 'The Monastic Threshold',
      content: [
        `At the Cistercian Abbey of Le Thoronet in Provence, the stone masonry was cut with such acoustic discipline that a single plainchant tone resonates for seven seconds against the limestone vault. To stand within it is to understand that the architecture was not built to host music; the architecture is itself the instrument.`,
        `Silence in modernity is almost always framed as a subtraction—an uncomfortable vacancy to be immediately plugged with headphones or digital chatter. Yet the medieval stonecutter understood silence as positive matter: dense, porous, and capable of holding prayer like water in a cistern.`,
        `When we reclaim our rooms from continuous distraction, we are not fleeing the world; we are preparing ourselves to actually inhabit it.`
      ]
    },
    specs: {
      isbn13: '978-0-198823-14-9',
      pages: 256,
      publisher: 'Cloister Academic Press',
      pubDate: 'January 2026',
      dimensions: '5.0 × 7.8 × 0.9 inches',
      weight: '0.95 lbs',
      binding: 'Smyth-sewn casebound',
      paperStock: '80gsm Holmen Book archival cream'
    },
    rating: 4.85,
    reviewCount: 22,
    ratingBreakdown: {
      5: 18,
      4: 3,
      3: 1,
      2: 0,
      1: 0
    },
    reviews: [
      {
        id: 'rev-geom-1',
        reviewer: 'Times Literary Supplement',
        source: 'Review',
        rating: 5,
        date: 'March 18, 2026',
        comment: 'Bracingly intelligent and deeply comforting. A work of philosophy that changes how you inhabit your own home.'
      }
    ]
  },
  {
    id: 'typographic-quarterly',
    title: 'The Typographic Quarterly: Vol. IV',
    subtitle: 'Specimens of Hot-Metal Type, Broadside Printing, and Binding Crafts',
    author: 'Curated by The St. Bride Foundation',
    coverImage: '/src/assets/images/book_cover_botanical_1793171383259.jpg',
    category: 'Collector\'s Press',
    badge: {
      text: 'Limited Letterpress Edition (500 Copies)',
      type: 'terracotta'
    },
    formats: [
      {
        type: 'Hardcover',
        price: 58.00,
        msrp: 65.00,
        description: 'Quarter-bound in calfskin and paste paper, hand-numbered',
        stockStatus: 'Low Stock',
        details: 'Numbered edition · Hand-printed letterpress inserts'
      },
      {
        type: 'Paperback',
        price: 28.00,
        description: 'Letterpress paper wrapper with exposed spine stitching',
        stockStatus: 'In Stock'
      }
    ],
    synopsis: `An archival collection documenting the golden age of European book design, featuring fold-out type specimens from Baskerville, Bodoni, and Eric Gill, along with historical essays on hand-marbled papers and Dutch gilt bindings. Printed on historic Heidelberg cylinder presses.`,
    staffPickNote: {
      curatorName: 'Simon Hawthorne',
      curatorRole: 'Master Printer & Archivist',
      quote: `For anyone who loves the scent of printer’s ink and the physical bite of metal type into rag paper, this quarterly is holy scripture.`
    },
    excerpt: {
      chapterTitle: 'On the Physics of Impression',
      content: [
        `When lead meets dampened handmade paper under twenty tons of cylinder pressure, something happens that no laser or offset drum can ever simulate: the ink is driven into the fibers, leaving a palpable topographic crater.`,
        `Run your fingertips across a page printed by William Morris at the Kelmscott Press in 1896, and you are not merely reading words; you are reading topography. The letter 'M' is a trench of ink; the period is an intentional puncture in the silence of the sheet.`,
        `This tactile resistance is what slows the reader down, inviting the eye to dwell upon the weight of the glyph before hurrying along to the next thought.`
      ]
    },
    specs: {
      isbn13: '978-0-951234-99-8',
      pages: 216,
      publisher: 'St. Bride Fine Press',
      pubDate: 'November 2026',
      dimensions: '8.0 × 11.5 × 1.3 inches',
      weight: '2.60 lbs',
      binding: 'Exposed Smyth stitching with heavy paste paper boards',
      paperStock: '160gsm Somerset Book hand-moulded paper'
    },
    rating: 4.96,
    reviewCount: 19,
    ratingBreakdown: {
      5: 18,
      4: 1,
      3: 0,
      2: 0,
      1: 0
    },
    reviews: [
      {
        id: 'rev-typo-1',
        reviewer: 'Eye Magazine',
        source: 'Typography Spotlight',
        rating: 5,
        date: 'October 20, 2026',
        comment: 'A triumph of tactile bookmaking in an ephemeral digital age. Essential for any typographic library.'
      }
    ]
  }
];

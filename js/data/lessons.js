// ─────────────────────────────────────────────────────────────
//  Paladin App — Lesson Data
//  6 interactive history lessons with branching narratives
// ─────────────────────────────────────────────────────────────

export const lessons = [

  // ═══════════════════════════════════════════════════════════
  //  1. THE RISE OF ROME  —  Ancient
  // ═══════════════════════════════════════════════════════════
  {
    id: 'rome-rise',
    era: 'ancient',
    title: 'The Rise of Rome',
    subtitle: 'From humble village to mighty republic',
    icon: '🏛️',
    duration: '4 min',
    narrator: { name: 'Gaius Julius Caesar', title: 'Dictator of Rome', portrait: 'assets/characters/caesar.png' },
    pages: [
      {
        id: 'page-1',
        text: 'Let me tell you how my beloved Rome began — long before my time, in an age of legend. Twin brothers, Romulus and Remus, abandoned at birth and nursed by a she-wolf — so the old stories say. In 753 BCE, on the muddy banks of the Tiber, Romulus traced a furrow in the earth and declared it the boundary of a new city. When Remus mocked those tiny walls by leaping over them, Romulus struck him down, sealing our founding in blood. A brutal beginning, yes — but what a city rose from that blood! The seven hills echoed with the cries of settlers who flocked to this unlikely refuge of outlaws, exiles, and dreamers. I have always admired Romulus. He understood that greatness demands sacrifice.',
        imageDesc: 'Romulus tracing the sacred boundary of Rome on the Palatine Hill while a she-wolf watches from the shadows',
        choices: null
      },
      {
        id: 'page-2',
        text: 'For two and a half centuries, kings ruled my city — some wise, some tyrannical. The last king, Tarquinius Superbus, governed with such cruelty that my ancestors revolted in 509 BCE, casting out the monarchy forever. In its place they forged something revolutionary: a republic, governed not by one man\'s whims but by elected senators and consuls. The Forum buzzed with heated debates, and ordinary citizens discovered a dangerous new idea — that power could belong to the people. But I saw the Republic\'s fractures more clearly than anyone. The Senate had grown corrupt, paralyzed by petty rivalries while Rome\'s enemies gathered at the borders. Someone had to act. The question was: what would you have done?',
        imageDesc: 'Roman senators in white togas debating fiercely in the grand Forum with marble columns rising behind them',
        choices: [
          { text: 'Cross the Rubicon with Caesar', nextPageId: 'page-3a' },
          { text: 'Stay loyal to the Senate', nextPageId: 'page-3b' }
        ]
      },
      {
        id: 'page-3a',
        text: 'You march with me as my legions splash across the shallow Rubicon River in 49 BCE — an act of treason that can never be undone. "Alea iacta est," I whisper. The die is cast. Behind us stretches Gaul, conquered and pacified after eight brutal years of my campaigns; ahead lies Rome itself, trembling at our approach. My soldiers roar with loyalty — they have bled for me across a continent, and I will not abandon them to the Senate\'s spite. Civil war erupts like wildfire, and the old republican order begins to crumble. They call me ambitious. Perhaps. But I call it destiny.',
        imageDesc: 'Julius Caesar on horseback leading armored legions across a moonlit river, determination etched on his face',
        choices: null
      },
      {
        id: 'page-3b',
        text: 'You stand shoulder to shoulder with the senators in the marble halls of the Curia, voices raised against me. Cato the Younger pounds his fist on the lectern, warning that my ambition will devour Roman liberty like a flame consumes parchment. Pompey — once my ally, my son-in-law\'s father — draws his sword for the Senate\'s cause. I understand their fear. The Republic is sacred to them. But I have seen the corruption, the incompetence, the senators who grow fat while soldiers starve. Tradition alone cannot stop the tide of history — and my legions are already on the march. Forgive me, old friend Pompey. Rome needs more than tradition now.',
        imageDesc: 'Senators in the Curia passionately arguing against tyranny while a storm gathers outside the marble windows',
        choices: null
      },
      {
        id: 'page-4',
        text: 'The Republic\'s fate was sealed on the Ides of March, 44 BCE. I will not pretend I did not see the signs — the soothsayer\'s warning, the unease in the Senate chamber. Twenty-three stab wounds ended my life on the Senate floor. Even Brutus, whom I loved like a son... But my death only accelerated Rome\'s transformation. My adopted heir Octavian — clever boy — ruthlessly outmaneuvered every rival. Mark Antony, Cleopatra, the last republican holdouts — all fell before him until he stood alone atop the Roman world. Renamed Augustus, he became the first Emperor. The Republic I fought for — or against, depending on whom you ask — was dead. But the Empire I made possible would endure for five hundred years. Was it worth my blood? I leave that for you to judge.',
        imageDesc: 'Augustus Caesar standing before a vast crowd in gleaming golden armor with the Roman eagle standards behind him',
        choices: null
      },
      {
        id: 'page-5',
        text: 'At its zenith — the world I helped create — Rome\'s dominion stretched from the rain-soaked hills of Britannia to the scorching deserts of Mesopotamia, encompassing fifty million souls. My roads — straight as a centurion\'s javelin — stitched the empire together, carrying legions, merchants, and ideas across three continents. My aqueducts brought fresh water cascading into cities of marble and concrete. Latin became the language of law, philosophy, and power, its echoes still audible in your courtrooms and cathedrals today. From a mud hut on the Tiber to master of the known world — this is Rome\'s story. This is my story. And now, it is yours to carry forward.',
        imageDesc: 'Panoramic view of Rome at its height — the Colosseum, aqueducts, and bustling streets stretching to the horizon',
        choices: null
      }
    ],
    quiz: [
      {
        question: 'According to legend, who founded the city of Rome?',
        options: ['Julius Caesar', 'Romulus', 'Augustus', 'Hannibal'],
        correct: 1,
        explanation: 'Legend holds that Romulus founded Rome in 753 BCE after killing his twin brother Remus in a dispute over the city\'s boundaries.'
      },
      {
        question: 'What event in 509 BCE transformed Rome\'s government?',
        options: [
          'The assassination of Caesar',
          'The overthrow of the last king and founding of the Republic',
          'The construction of the Colosseum',
          'The invasion by Hannibal'
        ],
        correct: 1,
        explanation: 'In 509 BCE, Roman citizens overthrew Tarquinius Superbus, the last king of Rome, and established the Roman Republic governed by elected officials.'
      },
      {
        question: 'What did Caesar famously say when crossing the Rubicon?',
        options: [
          '"Veni, vidi, vici"',
          '"Et tu, Brute?"',
          '"Alea iacta est" (The die is cast)',
          '"Carpe diem"'
        ],
        correct: 2,
        explanation: 'Caesar reportedly said "Alea iacta est" — "The die is cast" — acknowledging that crossing the Rubicon with his army was an irreversible act of war against the Senate.'
      },
      {
        question: 'Who became Rome\'s first Emperor?',
        options: ['Julius Caesar', 'Mark Antony', 'Augustus (Octavian)', 'Nero'],
        correct: 2,
        explanation: 'Octavian, Caesar\'s adopted heir, defeated all rivals and was renamed Augustus, becoming Rome\'s first Emperor in 27 BCE and ending the Republic.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  //  2. LAND OF THE PHARAOHS  —  Ancient
  // ═══════════════════════════════════════════════════════════
  {
    id: 'egypt-pharaohs',
    era: 'ancient',
    title: 'Land of the Pharaohs',
    subtitle: 'Mysteries of ancient Egypt',
    icon: '🏺',
    duration: '4 min',
    narrator: { name: 'Ramesses the Great', title: 'Pharaoh of Egypt', portrait: 'assets/characters/pharaoh.png' },
    pages: [
      {
        id: 'page-1',
        text: 'I am Ramesses, and I shall tell you of the land I ruled — a civilization born from the sacred waters of the Nile. Every year, like clockwork, the great river swelled beyond its banks and painted the parched desert in ribbons of rich, black silt. This annual miracle transformed a barren wasteland into the most fertile farmland on Earth, giving rise to my people\'s civilization that endured for three thousand years. Along the riverbanks, my farmers sowed wheat and barley while my scribes recorded every harvest in elegant hieroglyphs on papyrus scrolls. Villages grew into cities, cities into kingdoms, and around 3100 BCE a warrior-king named Narmer united Upper and Lower Egypt under a single crown. The age of the pharaohs had begun — my age — and with it, humanity\'s most spectacular dreams took form in stone.',
        imageDesc: 'The Nile River flooding fertile green banks with ancient Egyptian farmers working fields under a golden sun',
        choices: null
      },
      {
        id: 'page-2',
        text: 'My ancestor Pharaoh Khufu stood at the edge of the Giza plateau around 2560 BCE with a vision that would stagger the imagination of every generation to come. He commanded the construction of a tomb so immense that it would scrape the heavens — the Great Pyramid, assembled from 2.3 million stone blocks, each weighing as much as an elephant. Tens of thousands of skilled laborers — not slaves, as your historians once believed, but proud workers fed on bread, beer, and onions — hauled and placed each block with astonishing precision. The project consumed decades and bankrupted treasuries, and it stood as the tallest structure on Earth for nearly four millennia. I myself built monuments to rival the ancients. But now, you must decide — where should Egypt\'s next great effort be focused?',
        imageDesc: 'Workers hauling massive limestone blocks up earthen ramps with the half-built Great Pyramid rising behind them',
        choices: [
          { text: 'Build a pyramid at Giza', nextPageId: 'page-3a' },
          { text: 'Expand the temple at Karnak', nextPageId: 'page-3b' }
        ]
      },
      {
        id: 'page-3a',
        text: 'The Giza plateau became a hive of industry as two more pyramids rose beside Khufu\'s masterpiece — those of his son Khafre and grandson Menkaure. Khafre\'s pyramid was cleverly built on higher ground, making it appear taller than his father\'s, and at its base crouched the enigmatic Great Sphinx, carved from a single ridge of limestone with the body of a lion and the face of a king. Even in my time, the Sphinx was already ancient, half-buried in sand, gazing eastward with those inscrutable eyes. Workers chiseled and polished the casing stones until the pyramids gleamed like crystals under our sun. I have walked among them, felt their shadow, and I tell you — nothing built by human hands has ever come closer to touching the gods.',
        imageDesc: 'The three Great Pyramids of Giza gleaming white under the desert sun with the Sphinx standing guard',
        choices: null
      },
      {
        id: 'page-3b',
        text: 'At Thebes — my glorious capital — I poured Egypt\'s wealth into Karnak, the largest religious complex ever constructed. Generation after generation of pharaohs added their own halls, obelisks, and sanctuaries to honor Amun-Ra, king of the gods. I myself added more than any ruler before me. The Hypostyle Hall alone contains 134 columns, each one so massive that a hundred men could stand on its capital. My priests chanted hymns at dawn as incense smoke curled through shafts of sunlight, and the sacred lake mirrored the obelisks that pierced the sky. Karnak was the spiritual heart of Egypt — proof that we pharaohs commanded not just the land, but the favor of the gods themselves. I carved my name deeper than any who came before, so that none might erase my glory.',
        imageDesc: 'The colossal Hypostyle Hall of Karnak Temple with massive painted columns and shafts of golden light',
        choices: null
      },
      {
        id: 'page-4',
        text: 'Centuries after my reign, the boy-pharaoh Tutankhamun was laid to rest around 1323 BCE, his mummy encased in a coffin of solid gold weighing over 110 kilograms. For three thousand years his tomb lay hidden beneath rubble and forgotten — until one of your archaeologists, Howard Carter, pierced the darkness in 1922 with trembling candlelight. "Can you see anything?" his patron asked. "Yes," Carter whispered, "wonderful things." Golden chariots, jeweled thrones, alabaster vases, and the iconic death mask flooded your newspapers, igniting a global obsession with my people. The discovery proved what I always knew — that even the smallest pharaoh carried treasures that would dazzle the world across millennia.',
        imageDesc: 'Howard Carter peering into Tutankhamun\'s tomb by candlelight, golden artifacts gleaming in the darkness',
        choices: null
      },
      {
        id: 'page-5',
        text: 'The legacy of my Egypt echoes through every corner of your modern civilization. Our engineers invented techniques of stone construction that your architects still study today; our physicians wrote the first medical textbooks; our mathematicians calculated the area of a circle with remarkable accuracy. Cleopatra, the last of our pharaohs, spoke nine languages and nearly bent the Roman Empire to her will before the dynasty finally fell in 30 BCE. The Rosetta Stone, deciphered in 1822, unlocked the mystery of our hieroglyphs and gave the modern world a voice to read thoughts written five thousand years ago. From the flooding of the Nile to the treasures of Tutankhamun, my people\'s story is a testament to what humanity can achieve when imagination meets determination. Remember us. We built eternity.',
        imageDesc: 'The Rosetta Stone displayed in a museum with hieroglyphic, Demotic, and Greek scripts visible on its surface',
        choices: null
      }
    ],
    quiz: [
      {
        question: 'Approximately how many stone blocks make up the Great Pyramid of Khufu?',
        options: ['500,000', '1 million', '2.3 million', '5 million'],
        correct: 2,
        explanation: 'The Great Pyramid was assembled from approximately 2.3 million stone blocks, each weighing as much as 2.5 tons, making it one of the most ambitious construction projects in history.'
      },
      {
        question: 'Who discovered the tomb of Tutankhamun in 1922?',
        options: ['Jean-François Champollion', 'Howard Carter', 'Lord Byron', 'Heinrich Schliemann'],
        correct: 1,
        explanation: 'British archaeologist Howard Carter discovered Tutankhamun\'s nearly intact tomb in the Valley of the Kings in November 1922, stunning the world with its golden treasures.'
      },
      {
        question: 'Who was the last pharaoh of ancient Egypt?',
        options: ['Hatshepsut', 'Ramesses II', 'Tutankhamun', 'Cleopatra VII'],
        correct: 3,
        explanation: 'Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt. Her death in 30 BCE marked the end of pharaonic rule and Egypt\'s absorption into the Roman Empire.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  //  3. THE CRUSADES  —  Medieval
  // ═══════════════════════════════════════════════════════════
  {
    id: 'crusades',
    era: 'medieval',
    title: 'The Crusades',
    subtitle: 'Faith, conquest, and the Holy Land',
    icon: '⚔️',
    duration: '5 min',
    narrator: { name: 'Sir Baldwin of Boulogne', title: 'Crusader Knight', portrait: 'assets/characters/crusader.png' },
    pages: [
      {
        id: 'page-1',
        text: 'I was there at Clermont, in November 1095, when Pope Urban II stood before that vast crowd and delivered the speech that set the world on fire. He painted a vivid picture of our Christian brothers suffering under Muslim rule in Jerusalem, and he called upon us — the knights of Europe — to take up arms and reclaim the Holy Land. "Deus vult!" we thundered back. God wills it! Within months, tens of thousands of us — warriors, peasants, adventurers — sewed crosses onto our cloaks and set out on the most ambitious journey of our lives. I left my home, my lands, my family behind. Faith, glory, and gold beckoned — but so did unimaginable suffering. We had no idea what lay ahead.',
        imageDesc: 'Pope Urban II addressing a roaring crowd of knights and peasants at Clermont, hands raised in fervor',
        choices: null
      },
      {
        id: 'page-2',
        text: 'The journey to Jerusalem was a nightmare I shall never forget. We slogged across the Anatolian plateau under a merciless sun, our armor turning into ovens of broiling steel. Men dropped dead from heat and thirst beside the road. At Antioch, we endured an eight-month siege that nearly broke us — I watched starving brothers boil leather boots for broth and weep for the green fields of home. But against all odds, the city fell, and we pressed south along the coast, our ranks thinned but our determination unbroken. Then at last, Jerusalem\'s ancient walls appeared on the horizon, and I fell to my knees and wept. We had come so far. Now came the hardest choice of all.',
        imageDesc: 'Exhausted Crusader knights in battered armor marching through the scorching Anatolian desert toward distant mountains',
        choices: [
          { text: 'Storm the walls of Jerusalem at dawn', nextPageId: 'page-3a' },
          { text: 'Negotiate with the city\'s defenders', nextPageId: 'page-3b' }
        ]
      },
      {
        id: 'page-3a',
        text: 'On July 15, 1099, we launched our assault. I shall never forget that day. Our siege towers rolled toward Jerusalem\'s ancient walls as arrows rained down like a hailstorm of death. Godfrey of Bouillon — my brother — was among the first to leap onto the battlements, his sword flashing in the blinding sunlight, rallying us with a battle cry that shook the very stones. The defenders fought with desperate courage, pouring boiling oil from above, but we were an unstoppable tide of faith and fury. By nightfall, Jerusalem had fallen. I walked through streets that ran with blood, and I wept — whether from triumph or horror, I could not tell. Our holy mission was accomplished, but at a cost that haunts me still.',
        imageDesc: 'Crusaders scaling the walls of Jerusalem with siege towers while defenders pour boiling oil from above',
        choices: null
      },
      {
        id: 'page-3b',
        text: 'Cooler heads among us urged negotiation, hoping to take Jerusalem without the full bloodshed of assault. Envoys were dispatched to the Fatimid governor, proposing safe passage for the garrison in exchange for surrender. But the talks collapsed — neither side could trust the other, and the defenders believed reinforcements from Egypt were only weeks away. The failed diplomacy only steeled our resolve; siege towers were hastily built from the timbers of dismantled Genoese ships. When the assault finally came, it was fueled by months of frustration and a burning conviction that God himself demanded the city\'s fall. Perhaps diplomacy would have been wiser. But we were knights, not diplomats, and our blood ran hot with holy purpose.',
        imageDesc: 'Crusader and Fatimid envoys facing each other tensely in a torchlit tent with maps spread between them',
        choices: null
      },
      {
        id: 'page-4',
        text: 'The Crusader states we built — the Kingdom of Jerusalem, the County of Tripoli, the Principality of Antioch, and my own County of Edessa — clung to the coast like barnacles on a hull, surrounded by hostile forces. We raised mighty fortresses like Krak des Chevaliers, whose concentric walls represented the pinnacle of military engineering. But then came Saladin — the Muslim commander who united Egypt and Syria. At the Battle of Hattin in 1187, he shattered our army and recaptured Jerusalem. I must confess — even as an enemy, Saladin earned my deepest respect. He allowed Christian civilians to leave unharmed, a stark contrast to our own conduct in 1099. History judges us all, and not always kindly.',
        imageDesc: 'Saladin on horseback overlooking the recaptured city of Jerusalem as his green banners fly from the walls',
        choices: null
      },
      {
        id: 'page-5',
        text: 'The Crusades dragged on for nearly two hundred years after us, spawning eight major expeditions and countless smaller campaigns that reshaped the world I knew. But here is what surprises most — we opened trade routes that brought silk, spices, and sugar to European tables. We brought back Arabic numerals, algebra, and medical knowledge that would fuel the Renaissance. Military orders like the Knights Templar and Hospitallers became the first great international organizations. Yet the human cost was staggering — hundreds of thousands perished on both sides, and the scars of hatred endured for centuries. I took the cross believing God commanded it. Whether I was right... that question follows me into eternity.',
        imageDesc: 'A busy medieval marketplace where European merchants trade spices and silks with Eastern traders under colorful awnings',
        choices: null
      }
    ],
    quiz: [
      {
        question: 'In what year did Pope Urban II call for the First Crusade?',
        options: ['1066', '1095', '1187', '1204'],
        correct: 1,
        explanation: 'Pope Urban II delivered his famous speech at the Council of Clermont in November 1095, launching the First Crusade with the rallying cry "Deus vult!" (God wills it).'
      },
      {
        question: 'Which Muslim leader recaptured Jerusalem in 1187?',
        options: ['Suleiman the Magnificent', 'Saladin', 'Baybars', 'Mehmed II'],
        correct: 1,
        explanation: 'Saladin (Salah ad-Din) united Muslim forces and decisively defeated the Crusaders at the Battle of Hattin in 1187, recapturing Jerusalem and earning fame for his chivalrous conduct.'
      },
      {
        question: 'What famous Crusader fortress is considered a masterpiece of medieval military architecture?',
        options: ['Tower of London', 'Krak des Chevaliers', 'Château Gaillard', 'Alhambra'],
        correct: 1,
        explanation: 'Krak des Chevaliers, located in present-day Syria, is widely regarded as the finest example of Crusader castle architecture with its concentric walls and strategic hilltop position.'
      },
      {
        question: 'What lasting impact did the Crusades have on Europe?',
        options: [
          'They had no significant impact',
          'They opened trade routes and introduced Eastern knowledge to Europe',
          'They ended all conflict between Christians and Muslims',
          'They led to the immediate fall of the Byzantine Empire'
        ],
        correct: 1,
        explanation: 'The Crusades opened vital trade routes bringing silk, spices, and sugar to Europe, and introduced Arabic numerals, algebra, and medical knowledge that helped fuel the Renaissance.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  //  4. THE VIKING AGE  —  Medieval
  // ═══════════════════════════════════════════════════════════
  {
    id: 'viking-age',
    era: 'medieval',
    title: 'The Viking Age',
    subtitle: 'Raiders, traders, and explorers',
    icon: '🛡️',
    duration: '4 min',
    narrator: { name: 'Ragnar Sigurdsson', title: 'Norse Chieftain', portrait: 'assets/characters/viking.png' },
    pages: [
      {
        id: 'page-1',
        text: 'I am Ragnar, son of Sigurd, and I will tell you of my people — the Norsemen, the seafarers, the terror of Christendom. On a gray June morning in 793 CE, my grandfather\'s longships sliced through the North Sea mist toward the holy island of Lindisfarne. Within hours, the monastery ran red — it was looted, monks were taken, and treasures accumulated over centuries vanished into our ships. The Saxons wrote in horror: "Never before has such terror appeared in Britain." That raid marked the beginning of our age — a 300-year saga of exploration, conquest, and glory that would reshape every map of Europe. We had announced ourselves to the world, and the world trembled before us.',
        imageDesc: 'Viking longships emerging from morning mist approaching the stone monastery of Lindisfarne on a rocky shore',
        choices: null
      },
      {
        id: 'page-2',
        text: 'Do not believe those who call us mere raiders — we were master shipbuilders, shrewd merchants, and fearless explorers driven by a restless hunger for new horizons. Our clinker-built longships, shallow-drafted and symmetrical, could sail across open oceans and navigate shallow rivers with equal ease. My traders established routes stretching from Baghdad to Newfoundland, exchanging furs, amber, and walrus ivory for silver, silk, and spices. Our women could own property, divorce their husbands, and even fight alongside us as shieldmaidens. We were not savages — we were a people of laws, poetry, and iron will. Now tell me — which path calls to your Viking spirit?',
        imageDesc: 'A Viking longship workshop with craftsmen building a clinker-hulled vessel, dragon prow taking shape under skilled hands',
        choices: [
          { text: 'Raid the monastery at Lindisfarne', nextPageId: 'page-3a' },
          { text: 'Trade with Constantinople', nextPageId: 'page-3b' }
        ]
      },
      {
        id: 'page-3a',
        text: 'My longships cut through the cold gray waves as we rowed toward the wealthy monasteries of the English coast. The raid was swift and devastating — my warriors burst through wooden doors, seizing golden chalices, jewel-encrusted gospel books, and bolts of fine linen. The monks scrambled to hide their relics, but my men were thorough, trained to strip a settlement bare in under an hour. The plunder was staggering: enough silver to buy farmland back in Norway, enough prestige to attract new followers to my banner. As my longship cut homeward through the waves, I understood something clearly — raiding had made me wealthy, but it had also made me feared. And fear, I learned, is both a weapon and a chain.',
        imageDesc: 'Viking warriors bursting through monastery doors, grabbing golden chalices as terrified monks flee into the night',
        choices: null
      },
      {
        id: 'page-3b',
        text: 'I steered my longship southeast, navigating the rivers of what you now call Russia, portaging our vessel overland between waterways until the golden domes of Constantinople — Miklagard, the Great City — shimmered on the horizon. The Byzantine capital was the richest city on Earth, a dazzling metropolis of half a million souls, and its markets overflowed with silk from China, spices from India, and gold from Africa. I traded my furs, amber, and honey for Byzantine coins, fine textiles, and Damascus steel blades that sang when drawn. Some of my bravest warriors stayed behind to join the legendary Varangian Guard — the emperor\'s own Norse bodyguards, the highest-paid soldiers in all the world. We Norsemen were welcome everywhere that valued courage.',
        imageDesc: 'Viking merchants arriving at the golden domes and grand bazaars of Constantinople with goods on their longship',
        choices: null
      },
      {
        id: 'page-4',
        text: 'Our thirst for discovery pushed us beyond the edges of the known world. Erik the Red, banished from Iceland for manslaughter, sailed west into uncharted waters and discovered a vast, ice-rimmed land he cunningly named "Greenland" to lure settlers — a brilliant trick, that. His son, Leif Erikson, pushed even further. Around 1000 CE, Leif landed on the shores of a land you now call North America, nearly five centuries before that Genoese sailor Columbus was even born. Your archaeologists confirmed our settlement at a place called L\'Anse aux Meadows in Newfoundland. We were not reckless fools — we were skilled navigators who read the stars, the waves, and the flight of birds to cross thousands of miles of open ocean.',
        imageDesc: 'Leif Erikson standing on the bow of his longship gazing at the forested coastline of North America for the first time',
        choices: null
      },
      {
        id: 'page-5',
        text: 'By the eleventh century, our age was drawing to a close as my people settled, accepted the new Christian god, and merged with the cultures we had once terrorized. In England, the Danish king Canute ruled a North Sea empire; in France, our descendants — the Normans — built cathedrals and conquered England under William in 1066. In Russia, the Varangian Rus gave their name to an entire nation. We left our mark on everything — your English words "skull," "window," "husband," and "Thursday" are gifts from our Norse tongue. From raiders to rulers, our legacy is woven into the very fabric of your modern world. Remember us not as savages, but as the people who dared to sail beyond the edge of the map. Skål!',
        imageDesc: 'A Viking settlement transforming into a medieval Christian town with a stave church rising among longhouses',
        choices: null
      }
    ],
    quiz: [
      {
        question: 'What event in 793 CE is considered the start of the Viking Age?',
        options: [
          'The founding of Dublin',
          'The raid on the monastery at Lindisfarne',
          'The discovery of Iceland',
          'The Battle of Stamford Bridge'
        ],
        correct: 1,
        explanation: 'The surprise Viking raid on the monastery at Lindisfarne in 793 CE shocked Christian Europe and is traditionally considered the beginning of the Viking Age.'
      },
      {
        question: 'Who is credited as the first European to reach North America?',
        options: ['Christopher Columbus', 'Erik the Red', 'Leif Erikson', 'Marco Polo'],
        correct: 2,
        explanation: 'Leif Erikson, son of Erik the Red, reached North America around 1000 CE — nearly 500 years before Columbus. The Norse settlement at L\'Anse aux Meadows in Newfoundland confirms this.'
      },
      {
        question: 'What was the Varangian Guard?',
        options: [
          'A Viking raiding party in England',
          'An elite Norse bodyguard unit serving the Byzantine emperor',
          'A group of Viking explorers in Greenland',
          'The personal army of Erik the Red'
        ],
        correct: 1,
        explanation: 'The Varangian Guard was an elite unit of Norse warriors who served as personal bodyguards to the Byzantine emperors in Constantinople, renowned for their loyalty and fighting prowess.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  //  5. THE FRENCH REVOLUTION  —  Modern
  // ═══════════════════════════════════════════════════════════
  {
    id: 'french-revolution',
    era: 'modern',
    title: 'The French Revolution',
    subtitle: 'Liberty, equality, and upheaval',
    icon: '🗽',
    duration: '5 min',
    narrator: { name: 'Citizen Desmoulins', title: 'Voice of the Revolution', portrait: 'assets/characters/revolutionary.png' },
    pages: [
      {
        id: 'page-1',
        text: 'I was there. I saw it all. By the late 1780s, my France was a powder keg wrapped in silk and perfume. King Louis XVI and Queen Marie Antoinette lived in staggering opulence at Versailles — a palace with 700 rooms and 1,200 fireplaces — while we ordinary Parisians starved in the streets, unable to afford a loaf of bread. The treasury was bankrupt, drained by decades of war and royal excess, and a feudal system forced peasants to pay crushing taxes while the nobility paid nothing. Voltaire and Rousseau had planted dangerous ideas in our minds — ideas about liberty and equality. France was on the brink, and I, Camille Desmoulins, was about to help light the fuse.',
        imageDesc: 'Starving Parisians in ragged clothes gazing across at the glittering Palace of Versailles in the distance',
        choices: null
      },
      {
        id: 'page-2',
        text: 'On July 14, 1789, I leapt onto a table at the Palais-Royal and shouted to the crowd: "To arms! To arms!" Within hours, a furious mob — armed with muskets, pikes, and righteous anger — surged toward the Bastille, that medieval fortress-prison that symbolized everything we despised about royal tyranny. The governor tried to negotiate, but the crowd was beyond reason. Cannon fire erupted, walls were breached, and by nightfall the fortress had fallen. Only seven prisoners were found inside, but the symbolism was thunderous: we, the people, had torn down the very stones of oppression. The governor\'s head was paraded through the streets, and across France, peasants rose up. The revolution had begun. Which side will you stand on?',
        imageDesc: 'A massive crowd storming the towering Bastille fortress with smoke and cannon fire filling the Parisian sky',
        choices: [
          { text: 'Support the moderate constitutional monarchy', nextPageId: 'page-3a' },
          { text: 'Join the radical push for a republic', nextPageId: 'page-3b' }
        ]
      },
      {
        id: 'page-3a',
        text: 'Some of us believed France needed a constitutional monarchy — a king who rules within the bounds of law, not above it. We drafted the Declaration of the Rights of Man and of the Citizen, proclaiming that "men are born and remain free and equal in rights." What glorious words! Louis XVI reluctantly accepted the new constitution, but his heart was never in it. Secretly, the fool attempted to flee France in disguise, only to be caught at Varennes and dragged back to Paris in humiliation. We moderates struggled to hold the center as radical voices grew louder, demanding not reform but total destruction of the old order. I feared we were losing control.',
        imageDesc: 'Moderate revolutionaries drafting the Declaration of the Rights of Man by candlelight in an elegant Parisian salon',
        choices: null
      },
      {
        id: 'page-3b',
        text: 'My friend Robespierre — the Incorruptible, they called him — led the radical Jacobins who believed only a republic purged of monarchy could deliver true liberty. "The king must die so that the nation may live," he declared. On January 21, 1793, Louis XVI was marched to the guillotine as drums rolled and crowds watched in stunned silence. The blade fell, and France became a republic born in blood. But then the revolution began to devour its own children. Robespierre turned his suspicion on anyone — noble, priest, or fellow revolutionary — suspected of disloyalty. The machinery of terror was being assembled. Even I, his old friend, began to feel the cold shadow of the blade.',
        imageDesc: 'Robespierre addressing a packed hall of radical Jacobins with fiery intensity, tricolor banners hanging behind him',
        choices: null
      },
      {
        id: 'page-4',
        text: 'The Reign of Terror descended upon France like a blade. From September 1793 to July 1794, Robespierre\'s Committee of Public Safety sent 17,000 souls to the guillotine. Marie Antoinette, Danton, scientists, poets, bakers — all fell. The guillotine became so busy that blood pooled in the cobblestones. Even my dear friend Danton, who roared "Show my head to the people — it is worth seeing!" as the blade fell. And then they came for me. I, who had helped start this revolution, was led to the guillotine alongside my beloved Lucile. In July 1794, Robespierre himself followed us. The Terror ended with the same instrument it had wielded. France exhaled, but the scars would never heal. I gave my life for liberty. Was it worth it? I pray it was.',
        imageDesc: 'The guillotine in the Place de la Révolution surrounded by somber crowds under a gray Parisian sky',
        choices: null
      },
      {
        id: 'page-5',
        text: 'From the ashes of the Terror rose a young Corsican artillery officer named Napoleon Bonaparte, who seized power in 1799 and crowned himself Emperor — a supreme irony for a revolution that began by beheading a king. But our Revolution\'s legacy transcended Napoleon: we abolished feudalism, established the metric system, and enshrined the principles of citizenship and human rights in law forever. The tricolor flag, "La Marseillaise," our motto "Liberté, Égalité, Fraternité" — they endure as symbols of democratic aspiration worldwide. We proved that the people could overthrow even the most entrenched tyranny. The road from oppression to liberty is paved with both triumph and tragedy — I know this better than most. But liberty is worth every drop of blood. It must be.',
        imageDesc: 'Napoleon Bonaparte being crowned Emperor in Notre-Dame Cathedral with revolutionary tricolor banners adorning the walls',
        choices: null
      }
    ],
    quiz: [
      {
        question: 'What event on July 14, 1789 is considered the symbolic start of the French Revolution?',
        options: [
          'The execution of Louis XVI',
          'The storming of the Bastille',
          'The Women\'s March on Versailles',
          'The Tennis Court Oath'
        ],
        correct: 1,
        explanation: 'The storming of the Bastille on July 14, 1789 became the defining symbol of the French Revolution and is still celebrated as France\'s national holiday (Bastille Day).'
      },
      {
        question: 'Who led the Committee of Public Safety during the Reign of Terror?',
        options: ['Napoleon Bonaparte', 'Louis XVI', 'Maximilien Robespierre', 'Marquis de Lafayette'],
        correct: 2,
        explanation: 'Maximilien Robespierre dominated the Committee of Public Safety and oversaw the Reign of Terror (1793-1794), during which an estimated 17,000 people were executed by guillotine.'
      },
      {
        question: 'How many people were estimated to have been executed during the Reign of Terror?',
        options: ['About 1,000', 'About 5,000', 'About 17,000', 'About 100,000'],
        correct: 2,
        explanation: 'An estimated 17,000 people were officially executed during the Reign of Terror, with thousands more dying in prisons. The period lasted from September 1793 to July 1794.'
      },
      {
        question: 'What is the motto of the French Republic that emerged from the Revolution?',
        options: [
          '"Deus vult"',
          '"E pluribus unum"',
          '"Liberté, Égalité, Fraternité"',
          '"Veni, vidi, vici"'
        ],
        correct: 2,
        explanation: '"Liberté, Égalité, Fraternité" (Liberty, Equality, Fraternity) became the national motto of France, encapsulating the core ideals of the French Revolution that still define the republic today.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  //  6. THE GREAT WAR  —  Modern
  // ═══════════════════════════════════════════════════════════
  {
    id: 'world-war-one',
    era: 'modern',
    title: 'The Great War',
    subtitle: 'The war that changed everything',
    icon: '💣',
    duration: '5 min',
    narrator: { name: 'Private Thomas Wells', title: 'British Expeditionary Force', portrait: 'assets/characters/soldier.png' },
    pages: [
      {
        id: 'page-1',
        text: 'I was nineteen when they told us it would be over by Christmas. They lied. On June 28, 1914, a young man named Gavrilo Princip fired two shots on a Sarajevo street corner and killed the Archduke Franz Ferdinand. I didn\'t know then that those bullets would end my childhood. Within six weeks, alliances and rivalries dragged every power in Europe into the abyss. Germany backed Austria-Hungary; Russia mobilized; France honored its alliance; and when Germany invaded Belgium, my Britain entered the fray. I remember the recruiting posters, the cheering crowds, the girls giving white feathers to men who hadn\'t enlisted. We thought it was an adventure. Thirty-two nations would be consumed. None of us understood what was coming.',
        imageDesc: 'The assassination scene in Sarajevo with Gavrilo Princip firing at the Archduke\'s motorcade on a crowded street',
        choices: null
      },
      {
        id: 'page-2',
        text: 'The generals promised us a quick, glorious war — cavalry charges, home by Christmas. Instead, the Western Front became 475 miles of trenches stretching from the Channel to the Alps, a nightmare landscape of mud, barbed wire, and death. I lived like a rat in a waterlogged ditch, plagued by lice, trench foot, and the constant thunder of shells that drove men mad beside me. Machine guns turned no-man\'s-land into a killing field where my friends were mowed down in rows. By the end of 1914, hundreds of thousands were dead, and we\'d barely begun. I had to make a choice about how to survive this hell.',
        imageDesc: 'Soldiers huddled in a muddy, waterlogged trench with barbed wire and explosions visible above the parapet',
        choices: [
          { text: 'Volunteer for the new tank corps', nextPageId: 'page-3a' },
          { text: 'Serve in the trenches as infantry', nextPageId: 'page-3b' }
        ]
      },
      {
        id: 'page-3a',
        text: 'I volunteered for the new weapon they said would break the deadlock: the tank. On September 15, 1916, at Flers-Courcelette during the Somme, I rumbled forward inside a steel behemoth we called "Big Willie." Its tracks crushed the barbed wire that had devoured a generation of our infantry. The noise inside was deafening — the engine roared, shells clanged off the hull, and the temperature climbed past 50°C. I could barely breathe. But German soldiers fled in terror at the sight of us, and for the first time, the stalemate cracked. The tanks were slow, unreliable, and prone to getting stuck — but sitting inside that iron monster, I glimpsed a future where machines, not lads like me, would bear the brunt of battle.',
        imageDesc: 'A British Mark I tank crushing through barbed wire on the Somme battlefield while infantry advance behind it',
        choices: null
      },
      {
        id: 'page-3b',
        text: 'I gripped my rifle and went over the top when the whistle blew, scrambling across the cratered wasteland of no-man\'s-land as bullets cracked past my ears. On the first day of the Somme — July 1, 1916 — we suffered nearly 60,000 casualties, the bloodiest single day in our army\'s history. Shell holes became graves for my friends. Lads I\'d trained with fell and never rose. The bombardment that was supposed to destroy the German bunkers had barely scratched them, and their machine guns sprang to life the instant our barrage lifted. I survived because of luck, instinct, and the comrade who dragged me into a crater when my legs gave out. This was not glory. This was industrial slaughter on a scale I cannot make you understand.',
        imageDesc: 'Soldiers charging across no-man\'s-land through explosions and barbed wire on the first day of the Somme',
        choices: null
      },
      {
        id: 'page-4',
        text: 'The war dragged on through 1917 and into 1918. I watched empires crumble. The Russian Revolution toppled the Tsar; America\'s entry in April 1917 tipped the balance our way at last. But new horrors came first — poison gas that blinded and choked my brothers in their trenches; aerial dogfights between fragile biplanes above our heads; submarine wolf packs sinking hundreds of ships in the Atlantic. By autumn 1918, Germany\'s allies were collapsing — Bulgaria, the Ottomans, Austria-Hungary — and revolution brewed in Berlin. The end was coming, but it arrived not with a triumphant march, but with exhaustion, starvation, and mutiny. We were all broken by then. Every last one of us.',
        imageDesc: 'Biplanes locked in aerial combat above the trenches with smoke trails and explosions in the sky',
        choices: null
      },
      {
        id: 'page-5',
        text: 'At 11:00 AM on November 11, 1918 — the eleventh hour of the eleventh day of the eleventh month — the guns fell silent. I staggered out of my trench and stared across no-man\'s-land at the German soldiers doing the same. We were hollow-eyed, shaking, barely human anymore. The Great War was over. Nearly 20 million dead. 21 million wounded. Four empires erased from the map. The Treaty of Versailles imposed crushing reparations on Germany, sowing seeds of resentment that would bloom into an even more terrible conflict just twenty years later. They told us this was the war to end all wars. It wasn\'t. It only set the stage for the next one. I survived, but the boy who enlisted in 1914 — he died somewhere in those trenches. What came home was someone else entirely.',
        imageDesc: 'Soldiers emerging from trenches on Armistice Day, some weeping, some embracing, under a pale November sky',
        choices: null
      }
    ],
    quiz: [
      {
        question: 'What event triggered the start of World War One in 1914?',
        options: [
          'The sinking of the Lusitania',
          'The assassination of Archduke Franz Ferdinand',
          'The invasion of Poland',
          'The Zimmermann Telegram'
        ],
        correct: 1,
        explanation: 'The assassination of Archduke Franz Ferdinand of Austria-Hungary by Gavrilo Princip in Sarajevo on June 28, 1914 triggered the chain of alliances that led to World War One.'
      },
      {
        question: 'How many casualties did the British Army suffer on the first day of the Battle of the Somme?',
        options: ['About 10,000', 'About 30,000', 'About 60,000', 'About 100,000'],
        correct: 2,
        explanation: 'On July 1, 1916, the British Army suffered nearly 60,000 casualties (killed, wounded, and missing), making it the bloodiest single day in British military history.'
      },
      {
        question: 'When did the Armistice end World War One?',
        options: [
          'June 28, 1919',
          'November 11, 1918',
          'January 1, 1918',
          'December 25, 1917'
        ],
        correct: 1,
        explanation: 'The Armistice took effect at 11:00 AM on November 11, 1918 — the eleventh hour of the eleventh day of the eleventh month — ending four years of devastating conflict.'
      }
    ]
  }

];

/* =========================================================================
   EDIT ME — everything on the site lives here.
   You do not need to touch any other file to change the words, the story,
   the photos, or the reasons. Just edit the values below and save.
   ========================================================================= */

const SITE_DATA = {

  // ---- Basics -----------------------------------------------------------
  name: "Shammi",
  nicknames: {
    primary: "Cutei",
    formal: "Madam Ji",
  },

  // ---- Landing screen -----------------------------------------------------
  landing: {
    badge: "✦ A Special Surprise for my Cutei😘 ✦",
    greeting: "Hey, Madam Ji ✨",
    subtitle: "I made you a little magical corner of my heart for your birthday.",
    buttonLabel: "Open Your Surprise 🎁",
  },

  // ---- Opening / hero once inside -----------------------------------------
  hero: {
    eyebrow: "for my Cutei 💖",
    line1: "Happy Birthday, Shammi!",
    line2: "This celebration is all for you.",
    subtitle:
      "Every section holds a little piece of love and magic I wanted you to see. Take your time, Madam Ji — walk through your special day.",
  },

  // ---- Interactive Birthday Cake & Candles --------------------------------
  cake: {
    badge: "make a wish",
    title: "Blow the Candles, Madam Ji 🎂",
    subtitle: "Close your eyes, make the biggest wish of your heart, and blow out the candles!",
    blowBtn: "Blow Out the Candles",
    cutBtn: "Cut the Cake",
    wishGrantedTitle: "✨ Wish Granted! ✨",
    celebrationText: "May all your days be as bright and sweet as you make mine.",
    candlesCount: 5,
  },

  // ---- Virtual Flower Bouquet for Cutei -----------------------------------
  bouquet: {
    badge: "hand-picked with love",
    title: "A Bouquet for My Cutei 💐",
    subtitle: "Real flowers wilt, but this bouquet is made of love and blooms forever. Tap each flower to reveal its secret message!",
    ribbonTag: "For My Cutei (Madam Ji) 💖",
    ribbonSub: "Hand-picked with infinite love by Gaurav",
    flowers: [
      {
        id: "rose",
        name: "Crimson Velvet Rose",
        emoji: "🌹",
        color: "#ff3366",
        meaning: "Symbolizing my deep, unconditional love for you that only grows stronger and deeper every single day.",
      },
      {
        id: "peony",
        name: "Blushing Pink Peony",
        emoji: "🌸",
        color: "#ff758c",
        meaning: "For your sweet grace, your gentle care, and that radiant smile that lights up my whole world.",
      },
      {
        id: "sunflower",
        name: "Golden Sunshine Blossom",
        emoji: "🌻",
        color: "#f9ca24",
        meaning: "Because you are my personal sunshine. No matter how cloudy the day is, you make everything warm and bright.",
      },
      {
        id: "tulip",
        name: "Romantic Pink Tulip",
        emoji: "🌷",
        color: "#fd79a8",
        meaning: "A promise of sweetness, playful laughs, warm hugs, and all the special moments still waiting for us.",
      },
      {
        id: "orchid",
        name: "Royal Purple Orchid",
        emoji: "🪻",
        color: "#a29bfe",
        meaning: "Rare, exquisite, and timeless. There is no one in this entire universe as uniquely wonderful as you.",
      },
      {
        id: "daisy",
        name: "Starlight Daisy & Lily",
        emoji: "🌼",
        color: "#ffeaa7",
        meaning: "For the peace, comfort, and pure happiness you bring into my life just by being yourself.",
      },
    ],
    bloomAllBtn: "Bloom Entire Bouquet 🌸✨",
    showerBtn: "Rain Flower Petals 🌧️🌹",
  },

  // ---- Special Birthday Letter (Wax Seal Envelope) ------------------------
  letter: {
    badge: "sealed with love",
    title: "A Letter from My Heart",
    subtitle: "Tap the wax seal to open your birthday letter 💌",
    salutation: "My Hottest Madam Ji,",
    paragraphs: [
      "On this beautiful day, the world was blessed with the kindest, sweetest, and most special person I know.",
      "Thank you for being my constant smile, my peace, and the brightest spark in every single day. The way your eyes light up when you laugh is my favorite sight in the universe.",
      "I hope this birthday brings you as much happiness, warmth, and wonder as you bring to everyone lucky enough to know you. You deserve all the stars in the night sky and more.",
    ],
    closing: "Forever yours,",
    senderName: "With all my heart ❤️",
  },

  // ---- Our Story timeline --------------------------------------------------
  story: [
    {
      tag: "The Beginning",
      icon: "💕",
      date: "The Day We Met",
      text: "8-BALL-POOL: The moment you walked into my life, everything felt brighter. I knew right away that you were someone truly unforgettable.",
    },
    {
      tag: "The Moments",
      icon: "🌸",
      date: "Unforgettable Memories",
      text: "All those late-night conversations, shared laughs, silly jokes, and little inside stories that belong just to us.",
    },
    {
      tag: "The Journey",
      icon: "✨",
      date: "Growing Together",
      text: "Every smile, every support, and every step along the way that brought us closer together.",
    },
    {
      tag: "Today & Always",
      icon: "🎂",
      date: "Your Special Day",
      text: "Celebrating another incredible year of you. Here's to your dreams, your laughter, and a lifetime of happiness ahead!",
    },
  ],

  // ---- Memory gallery -------------------------------------------------------
  // Replace `img` with real image files in `assets/photos/` (e.g. "assets/photos/photo1.jpg")
  // Or leave null to display aesthetic curated romantic cards.
  gallery: [
    {
      img: "assets/photos/1.jpeg",
      theme: "sunset",
      caption: "That unforgettable smile that lights up my whole world ✨",
    },
    {
      img: "assets/photos/2.jpeg",
      theme: "rose",
      caption: "Our favorite little moments together 🌸",
    },
    {
      img: "assets/photos/3.jpeg",
      theme: "starlight",
      caption: "Under the stars, thinking of you 🌙",
    },
    {
      img: "assets/photos/4.jpeg",
      theme: "blush",
      caption: "Your infectious laugh that makes everything better 🥰",
    },
    {
      img: "assets/photos/5.jpeg",
      theme: "gold",
      caption: "Every memory with you is pure gold 💫",
    },
    {
      img: "assets/photos/6.jpeg",
      theme: "midnight",
      caption: "Here's to making countless more memories, Cutei 💖",
    },
  ],

  // ---- Love notes -------------------------------------------------------
  loveNotes: [
    {
      title: "If you're reading this,",
      message: "Just a gentle reminder: you are so deeply valued, loved, and appreciated every single second.",
    },
    {
      title: "A little secret,",
      message: "No matter how busy the day gets, thoughts of you are always my favorite pause.",
    },
    {
      title: "For Madam Ji,",
      message: "Rule #1 for today: You get unlimited love by sir ji #gaurav😁, zero stress, and all the royal treatment you deserve",
    },
    {
      title: "Just because,",
      message: "You don't need any special occasion to be celebrated — you are wonderful simply by being you.",
    },
  ],

  // ---- Reasons (balloon pop) -------------------------------------------
  reasons: [
    "Your beautiful, radiant smile ❤️",
    "The cute way you talk and laugh 🥰",
    "How deeply and genuinely you care 🌸",
    "Your adorable little habits 💫",
    "The way you turn ordinary days into magic ✨",
    "Simply because there is nobody in the world like you 💖",
  ],

  // ---- Cute interactive moment --------------------------------------------
  loveMeter: {
    prompt: "Do you know how much you are loved, My Cutei😘?",
    instruction: "Press & hold the heart, My Cutei😘",
    resultLine1: "ohhh!!! You broke the meter and kept counting...",
    resultLine2: "Infinitely. Beyond all the stars in the sky. ✨",
  },

  // ---- Final surprise --------------------------------------------------
  finale: {
    lead: "And finally, Madam Ji…",
    message:
      "Happy Birthday, My Cutei😘! May your day be filled with endless joy, sweet surprises, warm hugs, and all the love in the universe. Thank you for being my favorite person in the entire world.",
    signature: "— always yours, with all my love ❤️",
  },

  // ---- Music ------------------------------------------------------------
  music: {
    src: "assets/music/your-song.mp3",
    label: "birthday melody",
  },
};

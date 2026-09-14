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
    badge: "✦ A Special Surprise ✦",
    greeting: "Hey, Madam Ji ✨",
    subtitle: "I made you a little magical corner of the internet for your birthday.",
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

  // ---- Special Birthday Letter (Wax Seal Envelope) ------------------------
  letter: {
    badge: "sealed with love",
    title: "A Letter from My Heart",
    subtitle: "Tap the wax seal to open your birthday letter 💌",
    salutation: "My Dearest Madam Ji,",
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
      text: "The moment you walked into my life, everything felt brighter. I knew right away that you were someone truly unforgettable.",
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
      message: "Rule #1 for today: You get unlimited treats, zero stress, and all the royal treatment you deserve!",
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
    prompt: "Do you know how much you are loved?",
    instruction: "Press & hold the heart, Madam Ji!",
    resultLine1: "It broke the meter and kept counting...",
    resultLine2: "Infinitely. Beyond all the stars in the sky. ✨",
  },

  // ---- Final surprise --------------------------------------------------
  finale: {
    lead: "And finally, Madam Ji…",
    message:
      "Happy Birthday, Shammi! May your day be filled with endless joy, sweet surprises, warm hugs, and all the love in the universe. Thank you for being my favorite person in the entire world.",
    signature: "— always yours, with all my love ❤️",
  },

  // ---- Music ------------------------------------------------------------
  music: {
    src: "assets/music/your-song.mp3",
    label: "birthday melody",
  },
};

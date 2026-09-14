(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D = SITE_DATA;

  /* =========================================================================
     PROCEDURAL WEB AUDIO SYNTHESIZER (ZERO DEPENDENCY SFX)
     ========================================================================= */
  let audioCtx = null;
  let sfxEnabled = true;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // SFX: Magical Ascending Chimes
  function playChime() {
    if (!sfxEnabled || !audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 0.45);
    });
  }

  // SFX: Pop Balloon
  function playPop() {
    if (!sfxEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  }

  // SFX: Candle Blow Whoosh
  function playBlow() {
    if (!sfxEnabled || !audioCtx) return;
    const bufferSize = audioCtx.sampleRate * 0.4;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);
    filter.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.4);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
  }

  // SFX: Celebratory Fanfare Chord
  function playFanfare() {
    if (!sfxEnabled || !audioCtx) return;
    const chords = [
      [523.25, 659.25, 783.99], // C Major
      [587.33, 739.99, 880.00], // D Major
      [659.25, 830.61, 987.77], // E Major
      [783.99, 987.77, 1174.66, 1567.98] // G Major with high sparkle
    ];

    chords.forEach((chord, i) => {
      const time = audioCtx.currentTime + i * 0.15;
      chord.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.01, time);
        gain.gain.exponentialRampToValueAtTime(0.12, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, time + (i === chords.length - 1 ? 1.0 : 0.25));
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + (i === chords.length - 1 ? 1.1 : 0.3));
      });
    });
  }

  // SFX Toggle Handler
  const sfxBtn = document.getElementById("sfxToggle");
  sfxBtn.addEventListener("click", () => {
    initAudioContext();
    sfxEnabled = !sfxEnabled;
    sfxBtn.classList.toggle("is-muted", !sfxEnabled);
    sfxBtn.title = sfxEnabled ? "Sound Effects On" : "Sound Effects Muted";
    if (sfxEnabled) playChime();
  });

  // Enable audio on any first user interaction
  const unlockAudio = () => {
    initAudioContext();
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
  window.addEventListener("click", unlockAudio, { once: true });
  window.addEventListener("touchstart", unlockAudio, { once: true });

  /* =========================================================================
     CONFETTI CANNON ENGINE (CANVAS)
     ========================================================================= */
  const confettiCanvas = document.getElementById("confettiCanvas");
  const cCtx = confettiCanvas.getContext("2d");
  let confettiParticles = [];

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  const confettiColors = ["#e84393", "#fd79a8", "#f9ca24", "#ffeaa7", "#00cec9", "#6c5ce7", "#fff"];

  function fireConfetti(originXRatio = 0.5, originYRatio = 0.5, count = 60) {
    if (prefersReducedMotion) return;
    const originX = window.innerWidth * originXRatio;
    const originY = window.innerHeight * originYRatio;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 6;
      confettiParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - Math.random() * 4,
        size: Math.random() * 7 + 5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.012 + 0.008,
      });
    }
  }

  function updateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.rotSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > confettiCanvas.height) {
        confettiParticles.splice(i, 1);
        continue;
      }

      cCtx.save();
      cCtx.globalAlpha = Math.max(p.life, 0);
      cCtx.translate(p.x, p.y);
      cCtx.rotate((p.rotation * Math.PI) / 180);
      cCtx.fillStyle = p.color;
      cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      cCtx.restore();
    }
    requestAnimationFrame(updateConfetti);
  }
  requestAnimationFrame(updateConfetti);

  /* =========================================================================
     TEXT / DATA INJECTION
     ========================================================================= */
  const setText = (selector, val) => {
    document.querySelectorAll(selector).forEach((el) => (el.textContent = val));
  };

  if (D.landing) {
    if (D.landing.badge) setText("[data-landing-badge]", D.landing.badge);
    setText("[data-landing-title]", D.landing.greeting);
    setText("[data-landing-subtitle]", D.landing.subtitle);
    setText("[data-landing-btn]", D.landing.buttonLabel);
  }

  if (D.hero) {
    setText("[data-hero-eyebrow]", D.hero.eyebrow);
    setText("[data-hero-line1]", D.hero.line1);
    setText("[data-hero-line2]", D.hero.line2);
    setText("[data-hero-subtitle]", D.hero.subtitle);
  }

  if (D.cake) {
    if (D.cake.badge) setText("[data-cake-badge]", D.cake.badge);
    if (D.cake.title) setText("[data-cake-title]", D.cake.title);
    if (D.cake.subtitle) setText("[data-cake-subtitle]", D.cake.subtitle);
    if (D.cake.blowBtn) document.getElementById("blowBtnText").textContent = D.cake.blowBtn;
    if (D.cake.cutBtn) document.getElementById("cutBtnText").textContent = D.cake.cutBtn;
    if (D.cake.wishGrantedTitle) document.getElementById("wishCardTitle").textContent = D.cake.wishGrantedTitle;
    if (D.cake.celebrationText) document.getElementById("wishCardText").textContent = D.cake.celebrationText;
    document.getElementById("cakeTopperText").textContent = `Happy Birthday ${D.name} ✨`;
  }

  if (D.bouquet) {
    if (D.bouquet.badge) setText("[data-bouquet-badge]", D.bouquet.badge);
    if (D.bouquet.title) setText("[data-bouquet-title]", D.bouquet.title);
    if (D.bouquet.subtitle) setText("[data-bouquet-subtitle]", D.bouquet.subtitle);
    if (D.bouquet.ribbonTag) {
      const tagTitle = document.getElementById("tagTitleText");
      if (tagTitle) tagTitle.textContent = D.bouquet.ribbonTag;
    }
    if (D.bouquet.ribbonSub) {
      const tagSub = document.getElementById("tagSubText");
      if (tagSub) tagSub.textContent = D.bouquet.ribbonSub;
    }
    if (D.bouquet.bloomAllBtn) {
      const bloomBtnText = document.getElementById("bloomAllText");
      if (bloomBtnText) bloomBtnText.textContent = D.bouquet.bloomAllBtn;
    }
    if (D.bouquet.showerBtn) {
      const showerBtnText = document.getElementById("showerBtnText");
      if (showerBtnText) showerBtnText.textContent = D.bouquet.showerBtn;
    }
  }

  if (D.letter) {
    if (D.letter.badge) setText("[data-letter-badge]", D.letter.badge);
    if (D.letter.title) setText("[data-letter-title]", D.letter.title);
    if (D.letter.subtitle) setText("[data-letter-subtitle]", D.letter.subtitle);
    document.getElementById("letterSalutation").textContent = D.letter.salutation;
    document.getElementById("letterClosing").textContent = D.letter.closing;
    document.getElementById("letterAuthor").textContent = D.letter.senderName;

    const letterBody = document.getElementById("letterBody");
    letterBody.innerHTML = "";
    (D.letter.paragraphs || []).forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      letterBody.appendChild(p);
    });
  }

  document.getElementById("loveMeterPrompt").textContent = D.loveMeter.prompt;
  document.getElementById("loveMeterInstruction").textContent = D.loveMeter.instruction;
  document.getElementById("finaleLead").textContent = D.finale.lead;
  document.getElementById("finaleMessage").textContent = D.finale.message;
  document.getElementById("finaleTitle").innerHTML = `Happy Birthday, ${D.name} <span class="finale__heart">❤</span>`;
  document.getElementById("finaleSignature").textContent = D.finale.signature;
  document.getElementById("musicLabel").textContent = D.music.label || "birthday melody";

  /* =========================================================================
     LANDING SCREEN → OPEN SURPRISE (CLEAN FIX - NO GHOST OVERLAP)
     ========================================================================= */
  const landing = document.getElementById("landing");
  const openBtn = document.getElementById("openSurprise");

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  openBtn.addEventListener("click", () => {
    initAudioContext();
    playChime();
    fireConfetti(0.5, 0.5, 75);

    landing.classList.add("is-hidden");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Cleanly unmount from render flow after transition so it never overlaps hero
    setTimeout(() => {
      landing.style.display = "none";
      document.getElementById("hero").scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }, 750);
  }, { once: true });

  /* =========================================================================
     STARFIELD & AMBIENT FLOATING FLOWER PETALS SKY
     ========================================================================= */
  const skyCanvas = document.getElementById("sky");
  const skyCtx = skyCanvas.getContext("2d");
  let stars = [];
  let hearts = [];
  let petals = [];

  function resizeSky() {
    skyCanvas.width = window.innerWidth;
    skyCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeSky);
  resizeSky();

  function seedSky() {
    stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.006,
    }));

    if (!prefersReducedMotion) {
      hearts = Array.from({ length: 5 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 8 + 8,
        speed: Math.random() * 0.35 + 0.15,
        drift: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.2 + 0.08,
      }));

      const petalList = ["🌸", "🌹", "🌷", "🌺", "✨", "🍃"];
      petals = Array.from({ length: 14 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 8 + 14,
        speedY: Math.random() * 0.6 + 0.35,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayAmp: Math.random() * 0.8 + 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.4,
        opacity: Math.random() * 0.35 + 0.25,
        emoji: petalList[Math.floor(Math.random() * petalList.length)],
      }));
    }
  }
  seedSky();

  function tickSky() {
    skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);

    stars.forEach((s) => {
      s.phase += s.speed;
      const alpha = 0.3 + Math.sin(s.phase) * 0.35;
      skyCtx.beginPath();
      skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      skyCtx.fillStyle = `rgba(255, 255, 255, ${Math.max(alpha, 0.1)})`;
      skyCtx.fill();
    });

    if (!prefersReducedMotion) {
      hearts.forEach((h) => {
        h.y -= h.speed;
        h.x += h.drift;
        if (h.y < -30) {
          h.y = skyCanvas.height + 30;
          h.x = Math.random() * window.innerWidth;
        }
        skyCtx.save();
        skyCtx.globalAlpha = h.opacity;
        skyCtx.font = `${h.size}px sans-serif`;
        skyCtx.fillText("💖", h.x, h.y);
        skyCtx.restore();
      });

      petals.forEach((p) => {
        p.y += p.speedY;
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * p.swayAmp;
        p.rotation += p.rotSpeed;
        if (p.y > skyCanvas.height + 30) {
          p.y = -30;
          p.x = Math.random() * window.innerWidth;
        }
        skyCtx.save();
        skyCtx.globalAlpha = p.opacity;
        skyCtx.translate(p.x, p.y);
        skyCtx.rotate((p.rotation * Math.PI) / 180);
        skyCtx.font = `${p.size}px sans-serif`;
        skyCtx.textAlign = "center";
        skyCtx.textBaseline = "middle";
        skyCtx.fillText(p.emoji, 0, 0);
        skyCtx.restore();
      });
    }

    requestAnimationFrame(tickSky);
  }
  requestAnimationFrame(tickSky);

  /* =========================================================================
     SCROLL REVEAL & NAVIGATION OBSERVER
     ========================================================================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

  const dots = Array.from(document.querySelectorAll(".dotnav__dot"));
  const navSections = dots.map((d) => document.getElementById(d.dataset.target)).filter(Boolean);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    });
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = navSections.indexOf(entry.target);
        if (idx === -1) return;
        if (entry.isIntersecting) {
          dots.forEach((d) => d.classList.remove("is-active"));
          dots[idx].classList.add("is-active");
        }
      });
    },
    { threshold: 0.4 }
  );
  navSections.forEach((s) => navObserver.observe(s));

  /* =========================================================================
     INTERACTIVE BIRTHDAY CAKE & CANDLES
     ========================================================================= */
  const candlesRack = document.getElementById("candlesRack");
  const candlesCount = (D.cake && D.cake.candlesCount) || 5;
  let candles = [];

  for (let i = 0; i < candlesCount; i++) {
    const c = document.createElement("div");
    c.className = "candle";
    c.innerHTML = `
      <div class="candle__flame"></div>
      <div class="candle__wick"></div>
      <div class="candle__smoke"></div>
    `;
    c.addEventListener("click", () => blowOutCandles());
    candlesRack.appendChild(c);
    candles.push(c);
  }

  const blowBtn = document.getElementById("blowCandlesBtn");
  const cutBtn = document.getElementById("cutCakeBtn");
  const wishCard = document.getElementById("wishCard");
  const cakeSliceCut = document.getElementById("cakeSliceCut");
  let candlesBlown = false;

  function blowOutCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    initAudioContext();
    playBlow();

    candles.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add("is-blown");
      }, idx * 60);
    });

    setTimeout(() => {
      playFanfare();
      fireConfetti(0.5, 0.4, 100);
      blowBtn.style.display = "none";
      cutBtn.style.display = "inline-flex";
      wishCard.style.display = "block";
      setTimeout(() => {
        wishCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    }, 400);
  }
  blowBtn.addEventListener("click", blowOutCandles);

  cutBtn.addEventListener("click", () => {
    initAudioContext();
    playChime();
    fireConfetti(0.5, 0.5, 80);
    cakeSliceCut.classList.add("is-visible");
    cutBtn.disabled = true;
    cutBtn.style.opacity = "0.7";
    cutBtn.innerHTML = "<span>🍰 Enjoy Your Cake!</span>";
  });

  /* =========================================================================
     VIRTUAL FLOWER BOUQUET FOR CUTEI
     ========================================================================= */
  const bouquetFlowers = document.getElementById("bouquetFlowers");
  const flowerCard = document.getElementById("flowerCard");
  const flowerCardIcon = document.getElementById("flowerCardIcon");
  const flowerCardBadge = document.getElementById("flowerCardBadge");
  const flowerCardText = document.getElementById("flowerCardText");
  const bouquetCounter = document.getElementById("bouquetCounter");
  const bloomAllBtn = document.getElementById("bloomAllBtn");
  const showerPetalsBtn = document.getElementById("showerPetalsBtn");

  const flowersData = (D.bouquet && D.bouquet.flowers) || [];
  const totalFlowers = flowersData.length;
  let bloomedFlowerIds = new Set();

  // Natural fan arrangement geometry for bouquet flowers
  const offsets = [
    { x: -95, y: -4, rot: -22, tilt: -26, z: 2 },
    { x: -56, y: 14, rot: -12, tilt: -16, z: 3 },
    { x: -18, y: 24, rot: -4,  tilt: -6,  z: 5 },
    { x: 18,  y: 22, rot: 5,   tilt: 7,   z: 5 },
    { x: 56,  y: 12, rot: 13,  tilt: 17,  z: 3 },
    { x: 95,  y: -6, rot: 23,  tilt: 27,  z: 2 }
  ];

  if (bouquetFlowers && flowersData.length > 0) {
    flowersData.forEach((f, idx) => {
      const layout = offsets[idx % offsets.length];
      const flowerEl = document.createElement("div");
      flowerEl.className = "flower-item";
      flowerEl.id = `flower-${f.id}`;
      flowerEl.style.left = `calc(50% + ${layout.x}px - 30px)`;
      flowerEl.style.bottom = `${10 + layout.y}px`;
      flowerEl.style.transform = `rotate(${layout.rot}deg)`;
      flowerEl.style.zIndex = layout.z;
      flowerEl.style.setProperty("--hover-tilt", `${layout.tilt}deg`);
      flowerEl.style.setProperty("--f-glow", `${f.color}aa`);

      flowerEl.innerHTML = `
        <div class="flower-head">
          <div class="flower-head__halo"></div>
          <span class="flower-emoji">${f.emoji}</span>
        </div>
        <div class="flower-stem">
          <span class="flower-leaf flower-leaf--left">🍃</span>
          <span class="flower-leaf flower-leaf--right">🌿</span>
        </div>
      `;

      flowerEl.addEventListener("click", () => {
        revealFlower(f, flowerEl);
      });

      bouquetFlowers.appendChild(flowerEl);
    });
  }

  function revealFlower(f, el) {
    initAudioContext();
    playChime();

    const rect = el.getBoundingClientRect();
    fireConfetti(rect.left / window.innerWidth, rect.top / window.innerHeight, 20);

    el.classList.add("is-bloomed");
    bloomedFlowerIds.add(f.id);

    // Update Counter
    if (bouquetCounter) {
      if (bloomedFlowerIds.size === totalFlowers) {
        bouquetCounter.innerHTML = `All ${totalFlowers} flowers bloomed for Cutei! 💖`;
      } else {
        bouquetCounter.innerHTML = `🌸 ${bloomedFlowerIds.size} / ${totalFlowers} flowers bloomed`;
      }
    }

    // Display Detail Card
    if (flowerCard) {
      flowerCard.style.display = "flex";
      flowerCardIcon.textContent = f.emoji;
      flowerCardBadge.textContent = f.name;
      flowerCardBadge.style.color = f.color;
      flowerCardText.textContent = f.meaning;
    }
  }

  // Bloom entire bouquet button
  if (bloomAllBtn) {
    bloomAllBtn.addEventListener("click", () => {
      initAudioContext();
      playChime();
      let delay = 0;

      flowersData.forEach((f, i) => {
        setTimeout(() => {
          const el = document.getElementById(`flower-${f.id}`);
          if (el) {
            el.classList.add("is-bloomed");
            bloomedFlowerIds.add(f.id);
            const rect = el.getBoundingClientRect();
            fireConfetti(rect.left / window.innerWidth, rect.top / window.innerHeight, 16);
          }
          if (i === flowersData.length - 1) {
            playFanfare();
            fireConfetti(0.5, 0.4, 90);
            if (bouquetCounter) {
              bouquetCounter.innerHTML = `All flowers blooming with love for Cutei! 💐💖`;
            }
            if (flowerCard) {
              flowerCard.style.display = "flex";
              flowerCardIcon.textContent = "💐";
              flowerCardBadge.textContent = "Everlasting Bouquet";
              flowerCardBadge.style.color = "var(--accent-gold)";
              flowerCardText.textContent = "Every single bloom represents a piece of my heart, blooming with love for my favorite person.";
            }
          }
        }, delay);
        delay += 160;
      });
    });
  }

  // Rain Petals button
  if (showerPetalsBtn) {
    showerPetalsBtn.addEventListener("click", () => {
      initAudioContext();
      playChime();
      firePetalShower(55);
    });
  }

  /* =========================================================================
     WAX-SEALED BIRTHDAY LETTER (INTERACTIVE ENVELOPE)
     ========================================================================= */
  const envelope = document.querySelector(".envelope");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const waxSealBtn = document.getElementById("waxSealBtn");
  let envelopeOpened = false;

  waxSealBtn.addEventListener("click", () => {
    if (envelopeOpened) return;
    envelopeOpened = true;
    initAudioContext();
    playChime();
    fireConfetti(0.5, 0.5, 50);

    envelope.classList.add("is-open");

    // After flap flips, expand into letter reading view
    setTimeout(() => {
      envelopeWrapper.classList.add("is-expanded");
      envelope.classList.add("is-expanded");
    }, 700);
  });

  /* =========================================================================
     OUR STORY TIMELINE
     ========================================================================= */
  const timelineEl = document.getElementById("timeline");
  (D.story || []).forEach((item) => {
    const div = document.createElement("div");
    div.className = "timeline__item";
    div.setAttribute("data-reveal", "");
    div.innerHTML = `
      <span class="timeline__dot"></span>
      <span class="timeline__icon">${item.icon}</span>
      <span class="timeline__tag">${item.tag}</span>
      <span class="timeline__date">${item.date}</span>
      <p class="timeline__text">${item.text}</p>
    `;
    timelineEl.appendChild(div);
    revealObserver.observe(div);
  });

  /* =========================================================================
     POLAROID MEMORY GALLERY & LIGHTBOX
     ========================================================================= */
  const galleryGrid = document.getElementById("galleryGrid");
  const tilts = [-3, 2.5, -2, 3, -1.8, 2.2];

  const themeArts = {
    sunset: { icon: "🌅", label: "Golden Hour Glow" },
    rose: { icon: "🌸", label: "Sweet Moments" },
    starlight: { icon: "🌙", label: "Starlit Nights" },
    blush: { icon: "🥰", label: "That Radiant Laugh" },
    gold: { icon: "✨", label: "Pure Magic" },
    midnight: { icon: "💖", label: "Always & Forever" },
  };

  (D.gallery || []).forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.setProperty("--tilt", `${tilts[i % tilts.length]}deg`);
    card.setAttribute("data-reveal", "");
    card.dataset.index = i;

    const themeKey = item.theme || Object.keys(themeArts)[i % Object.keys(themeArts).length];
    const theme = themeArts[themeKey] || themeArts.sunset;

    card.innerHTML = `
      <div class="polaroid__photo">
        ${
          item.img
            ? `<img src="${item.img}" alt="${item.caption}" loading="lazy" />`
            : `<div class="polaroid__art polaroid__art--${themeKey}">
                <span class="polaroid__art-icon">${theme.icon}</span>
                <span class="polaroid__art-title">${theme.label}</span>
              </div>`
        }
      </div>
      <p class="polaroid__caption">${item.caption}</p>
    `;
    card.addEventListener("click", () => openLightbox(i));
    galleryGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* Lightbox Modal */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  let currentPhoto = 0;

  function renderLightbox() {
    const item = D.gallery[currentPhoto];
    const themeKey = item.theme || Object.keys(themeArts)[currentPhoto % Object.keys(themeArts).length];
    const theme = themeArts[themeKey] || themeArts.sunset;

    lightboxImg.innerHTML = item.img
      ? `<img src="${item.img}" alt="${item.caption}" />`
      : `<div class="polaroid__art polaroid__art--${themeKey}" style="height: 100%;">
          <span class="polaroid__art-icon" style="font-size: 3rem;">${theme.icon}</span>
          <span class="polaroid__art-title" style="font-size: 1.6rem;">${theme.label}</span>
        </div>`;
    lightboxCaption.textContent = item.caption;
  }

  function openLightbox(idx) {
    currentPhoto = idx;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.getElementById("lightboxPrev").addEventListener("click", () => {
    currentPhoto = (currentPhoto - 1 + D.gallery.length) % D.gallery.length;
    renderLightbox();
  });
  document.getElementById("lightboxNext").addEventListener("click", () => {
    currentPhoto = (currentPhoto + 1) % D.gallery.length;
    renderLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
    if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
  });

  /* =========================================================================
     LOVE NOTES (FLIP CARDS)
     ========================================================================= */
  const notesGrid = document.getElementById("notesGrid");
  (D.loveNotes || []).forEach((note) => {
    const wrap = document.createElement("div");
    wrap.className = "note";
    wrap.setAttribute("data-reveal", "");
    wrap.innerHTML = `
      <div class="note__card">
        <div class="note__face note__front">
          <span class="seal">💌</span>
          <span class="title">${note.title}</span>
          <span class="hint">tap to open</span>
        </div>
        <div class="note__face note__back">
          <p class="message">${note.message}</p>
        </div>
      </div>
    `;
    wrap.addEventListener("click", () => {
      initAudioContext();
      playChime();
      wrap.classList.toggle("is-open");
    });
    notesGrid.appendChild(wrap);
    revealObserver.observe(wrap);
  });

  /* =========================================================================
     REASONS (BALLOONS TO POP)
     ========================================================================= */
  const balloonsEl = document.getElementById("balloons");
  const reasonsList = document.getElementById("reasonsList");
  const reasonsCountEl = document.getElementById("reasonsCount");
  const reasonsTotalEl = document.getElementById("reasonsTotal");
  reasonsTotalEl.textContent = (D.reasons || []).length;

  const balloonGradients = [
    "radial-gradient(circle at 35% 30%, #ffccd9, #e84393)",
    "radial-gradient(circle at 35% 30%, #ffeaa7, #f9ca24)",
    "radial-gradient(circle at 35% 30%, #e0c3fc, #8e44ad)",
    "radial-gradient(circle at 35% 30%, #81ecec, #00cec9)",
    "radial-gradient(circle at 35% 30%, #ff9ff3, #f368e0)",
    "radial-gradient(circle at 35% 30%, #ffd32a, #ff5e57)"
  ];
  let poppedCount = 0;

  (D.reasons || []).forEach((reason, i) => {
    const b = document.createElement("div");
    b.className = "balloon";
    b.dataset.reason = reason;
    const left = 6 + (i * (88 / D.reasons.length));
    const duration = 10 + Math.random() * 6;
    const delay = -(Math.random() * duration);
    b.style.left = `${left}%`;
    b.style.animationDuration = `${duration}s`;
    b.style.animationDelay = `${delay}s`;

    b.innerHTML = `
      <div class="balloon__body" style="background: ${balloonGradients[i % balloonGradients.length]};"></div>
      <div class="balloon__string"></div>
    `;
    b.addEventListener("click", () => popBalloon(b), { once: true });
    balloonsEl.appendChild(b);
  });

  function popBalloon(b) {
    if (b.classList.contains("is-popped")) return;
    b.classList.add("is-popped");
    initAudioContext();
    playPop();

    const rect = b.getBoundingClientRect();
    fireConfetti(rect.left / window.innerWidth, rect.top / window.innerHeight, 20);

    poppedCount += 1;
    reasonsCountEl.textContent = poppedCount;

    const li = document.createElement("li");
    li.textContent = b.dataset.reason;
    reasonsList.appendChild(li);

    if (poppedCount === D.reasons.length) {
      setTimeout(() => {
        playFanfare();
        fireConfetti(0.5, 0.6, 90);
      }, 300);
    }
  }

  /* =========================================================================
     LOVE METER (PRESS & HOLD)
     ========================================================================= */
  const loveBtn = document.getElementById("loveBtn");
  const ringFg = document.getElementById("ringFg");
  const loveMeterCount = document.getElementById("loveMeterCount");
  const loveMeterLine1 = document.getElementById("loveMeterLine1");
  const loveMeterLine2 = document.getElementById("loveMeterLine2");
  const CIRCUMFERENCE = 339.3;
  const HOLD_DURATION = 1400;
  let meterComplete = false;
  let holdStart = null;
  let meterRAF = null;

  function onHoldStart(e) {
    if (meterComplete) return;
    e.preventDefault();
    initAudioContext();
    loveBtn.classList.add("is-pressed");
    holdStart = performance.now();
    meterLoop();
  }

  function meterLoop() {
    if (meterComplete || holdStart === null) return;
    const elapsed = performance.now() - holdStart;
    const progress = Math.min(1, elapsed / HOLD_DURATION);
    ringFg.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
    loveMeterCount.textContent = `${Math.round(progress * 100)}%`;

    if (progress >= 1) {
      finishMeter();
    } else {
      meterRAF = requestAnimationFrame(meterLoop);
    }
  }

  function onHoldEnd() {
    if (meterComplete || holdStart === null) return;
    cancelAnimationFrame(meterRAF);
    loveBtn.classList.remove("is-pressed");
    ringFg.style.transition = "stroke-dashoffset 0.3s ease";
    ringFg.style.strokeDashoffset = String(CIRCUMFERENCE);
    setTimeout(() => (ringFg.style.transition = ""), 300);
    loveMeterCount.textContent = "0%";
    holdStart = null;
  }

  function finishMeter() {
    meterComplete = true;
    loveBtn.classList.remove("is-pressed");
    loveMeterCount.textContent = "∞";
    loveMeterLine1.textContent = D.loveMeter.resultLine1;
    loveMeterLine2.textContent = D.loveMeter.resultLine2;
    playFanfare();
    fireConfetti(0.5, 0.6, 90);
  }

  loveBtn.addEventListener("pointerdown", onHoldStart);
  loveBtn.addEventListener("pointerup", onHoldEnd);
  loveBtn.addEventListener("pointerleave", onHoldEnd);
  loveBtn.addEventListener("pointercancel", onHoldEnd);

  /* =========================================================================
     FINALE & REPLAY
     ========================================================================= */
  const finaleSection = document.getElementById("finale");
  let finaleCelebrated = false;

  const finaleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !finaleCelebrated) {
          finaleCelebrated = true;
          playFanfare();
          fireConfetti(0.5, 0.4, 120);
        }
      });
    },
    { threshold: 0.4 }
  );
  finaleObserver.observe(finaleSection);

  document.getElementById("replayBtn").addEventListener("click", () => {
    initAudioContext();
    playChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================================================================
     BACKGROUND MUSIC PLAYER
     ========================================================================= */
  const audioEl = document.getElementById("audioEl");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const musicPlayer = document.getElementById("musicPlayer");
  audioEl.src = D.music.src;
  let isPlaying = false;

  musicToggle.addEventListener("click", () => {
    initAudioContext();
    if (!isPlaying) {
      const playPromise = audioEl.play();
      if (playPromise && playPromise.catch) {
        playPromise
          .then(() => {
            isPlaying = true;
            musicToggle.classList.add("is-playing");
            musicPlayer.classList.add("is-active");
            musicToggle.querySelector(".musicplayer__icon").textContent = "❚❚";
          })
          .catch(() => {
            musicLabel.textContent = "add mp3 in assets/music";
          });
      }
    } else {
      audioEl.pause();
      isPlaying = false;
      musicToggle.classList.remove("is-playing");
      musicPlayer.classList.remove("is-active");
      musicToggle.querySelector(".musicplayer__icon").textContent = "♪";
    }
  });

  /* =========================================================================
     PETAL SHOWER & CURSOR / TOUCH MAGIC FLOWER TRAIL
     ========================================================================= */
  function firePetalShower(count = 45) {
    if (prefersReducedMotion) return;
    const petalEmojis = ["🌸", "🌹", "🌷", "🌻", "🌺", "🪻", "🌼", "✨"];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "sparkle-trail";
        el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        el.style.left = `${Math.random() * 100}vw`;
        el.style.top = "-20px";
        el.style.fontSize = `${Math.random() * 14 + 18}px`;
        el.style.transition = `transform ${Math.random() * 2 + 2.5}s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 3s linear`;
        document.body.appendChild(el);

        requestAnimationFrame(() => {
          el.style.transform = `translate(${Math.random() * 120 - 60}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720 - 360}deg)`;
          el.style.opacity = "0";
        });

        setTimeout(() => el.remove(), 3800);
      }, i * 35);
    }
  }

  let lastTrailTime = 0;
  function createSparkleTrail(x, y) {
    const now = performance.now();
    if (now - lastTrailTime < 55) return;
    lastTrailTime = now;

    const trail = document.createElement("div");
    trail.className = "sparkle-trail";
    const trailItems = ["🌸", "💖", "✨", "🌹", "🌷", "💫"];
    trail.textContent = trailItems[Math.floor(Math.random() * trailItems.length)];
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    trail.style.fontSize = `${Math.random() * 8 + 14}px`;
    document.body.appendChild(trail);

    const driftX = (Math.random() - 0.5) * 45;
    const driftY = -(Math.random() * 35 + 25);
    const rot = (Math.random() - 0.5) * 60;

    requestAnimationFrame(() => {
      trail.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0.6) rotate(${rot}deg)`;
      trail.style.opacity = "0";
    });

    setTimeout(() => trail.remove(), 750);
  }

  window.addEventListener("pointermove", (e) => {
    if (prefersReducedMotion) return;
    createSparkleTrail(e.clientX, e.clientY);
  }, { passive: true });

})();

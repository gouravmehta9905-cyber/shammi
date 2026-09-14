# For Shammi 💌

A luxurious, romantic birthday website — landing surprise, interactive birthday cake & blowable candles, everlasting handpicked flower bouquet, wax-sealed love letter, your story timeline, polaroid memory gallery, love notes, a "pop the reasons" floating balloon game, a press-and-hold love meter, and an emotional finale.

No build tools needed. It's plain HTML/CSS/JS, so it just works when you
open it or host it anywhere.

## 1. See it right now

Double-click `index.html` and it opens in your browser. That's the whole
site, already personalized with placeholder text.

## 2. Edit the words

Open **`js/data.js`**. Every sentence on the site lives in that one file —
her name, the nicknames, the story timeline, the gallery captions, the
love notes, the reasons, and the final message. Change the text between
the quotes and save. You don't need to touch any other file just to edit
words.

Look for `YOUR PHOTO HERE`, `YOUR MEMORY HERE`, and `YOUR MESSAGE HERE` —
those are the placeholders meant for you to replace.

## 3. Add real photos

1. Put your image files in `assets/photos/` (e.g. `assets/photos/goa-trip.jpg`).
2. In `js/data.js`, find the `gallery` list and change a line like:
   ```js
   { img: null, caption: "YOUR MEMORY HERE" },
   ```
   to:
   ```js
   { img: "assets/photos/goa-trip.jpg", caption: "That evening in Goa" },
   ```
3. Repeat for as many photos as you like — add or remove entries freely.

## 4. Add your song (optional)

1. Put an mp3 file in `assets/music/`, e.g. `assets/music/our-song.mp3`.
2. In `js/data.js`, update:
   ```js
   music: {
     src: "assets/music/our-song.mp3",
     label: "our song",
   },
   ```
It never autoplays — she has to press the little disc button, bottom-left,
herself (browsers block autoplay with sound anyway, and it's nicer as a
choice).

## 5. Send it to her

The simplest way is to host it for free and send the link:

- **Netlify Drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop)
  and drag the whole `for-shammi` folder in. You get a live link in seconds.
- **Vercel** or **GitHub Pages** work too if you're already using them.
- Or just zip the folder and send it to her directly — she can double-click
  `index.html` on her own computer.

## Project structure

```
for-shammi/
  index.html          the page structure
  css/style.css        all styling and animations
  js/data.js            <- edit this for all text/photos/content
  js/main.js            interactivity (don't need to touch this)
  assets/photos/        put your images here
  assets/music/         put your mp3 here
```

## Notes

- Fully responsive — tested down to small phone widths.
- Respects "reduce motion" accessibility settings automatically.
- The floating hearts/stars background is canvas-based and lightweight,
  so it stays smooth even on older phones.

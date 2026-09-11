# Birthday Girl Website 💕

A romantic interactive website that asks questions only she would know, unlocking a special birthday surprise at the end.

## Features

- **Interactive Question Flow**: 5 questions that only she would know the answers to
- **Progress Tracking**: Visual progress bar that fills with each correct answer
- **Beautiful Animations**: Floating hearts, sparkles, confetti, and smooth transitions
- **Romantic Design**: Soft pink/rose theme with elegant typography
- **Final Reveal**: Shows a photo and heartfelt message
- **GitHub Pages Ready**: Static site, no build step needed

## Quick Start

```bash
# Just open index.html in a browser, or serve locally:
npx serve .
# or
python3 -m http.server 8000
```

## Customization

### 1. Change the Questions & Answers

Edit `script.js` - modify the `correctAnswers` object:

```javascript
const correctAnswers = {
    q1: 'baby',        // Answer to "What nickname do I call you?"
    q2: 'can'thelp',   // Answer to "What's our song?"
    q3: 'coffee',      // Answer to "Where was our first date?"
    q4: 'heart',       // Answer to "What's my favorite thing about you?"
    q5: 'moon'         // Answer to "I love you to the ____ and back"
};
```

### 2. Update Question Text & Options

Edit `index.html` - modify the question screens (q1Screen through q5Screen):
- Change the question text in `<h2 class="question-text">`
- Update the button options and their `data-answer` values

### 3. Add Your Photo

Replace `photo.jpg` in the project root with your special photo.

**Recommended**: Portrait orientation, at least 800x1000px for best quality.

### 4. Customize the Final Message

Edit the `finalMessage` text in `index.html` (inside the message-card div).

### 5. Change Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
    --primary: #e91e63;      /* Main pink */
    --primary-light: #f8bbd0; /* Light pink */
    --primary-dark: #c2185b;  /* Dark pink */
    --secondary: #ff6b9d;     /* Accent pink */
    --accent: #ffd700;        /* Gold for highlights */
    /* ... */
}
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/YOURREPO.git
   git push -u origin main
   ```
3. Go to Settings → Pages
4. Source: "Deploy from a branch"
5. Branch: `main` / `/ (root)`
6. Save → Your site will be live at `https://YOURUSERNAME.github.io/YOURREPO/`

## File Structure

```
DPBDAY/
├── index.html      # Main HTML structure
├── styles.css      # All styling & animations
├── script.js       # Question logic & interactions
├── photo.jpg       # Your special photo (add this!)
└── README.md       # This file
```

## Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers fully supported

## Notes

- No build tools, no dependencies, no frameworks - pure HTML/CSS/JS
- Works offline once loaded
- Responsive design for all screen sizes
- Respects `prefers-reduced-motion` for accessibility

---

Made with love 💕
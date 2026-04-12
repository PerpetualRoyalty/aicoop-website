# AICoop.ai

A cooperative platform where builders co-own the AI future. Based in Walton County, Florida.

## Overview

AICoop connects entrepreneurs, developers, and enterprise teams through two offerings:

- **Community** — Free collaborative space for resource sharing, mentorship, and developer support (virtual + in-person in Walton County, FL).
- **Enterprise Copilot** — Private RAG-powered knowledge assistant that gives engineers cited answers from internal docs, repos, and wikis.

## Tech Stack

- Pure HTML/CSS/JS (no build step required)
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts CDN
- [Lucide Icons](https://lucide.dev) via unpkg CDN
- Custom CSS (no Tailwind or framework dependency)
- Intersection Observer API for scroll animations and counter effects

## Features

- Fully mobile-responsive (breakpoints at 1024 / 768 / 480px)
- Tabbed product showcase (Community vs Enterprise)
- FAQ accordion
- Animated stat counters
- Scroll-reveal animations
- Sticky glassmorphism navbar
- Analytics event stubs (ready to wire to GA4, Mixpanel, etc.)

## Local Development

No build tools needed. Open `index.html` in a browser:

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (Python)
python3 -m http.server 3000

# Option 3: Local server (Node)
npx serve .
```

## Deployment

This is a static site — deploy anywhere:

- **GitHub Pages**: Push to `main`, enable Pages in repo settings
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the folder, or connect the repo
- **Cloudflare Pages**: Connect repo, no build command needed

## Project Structure

```
├── index.html          # Main landing page (complete, self-contained)
├── community.html      # Community detail page
├── enterprise.html     # Enterprise detail page
├── README.md
├── LICENSE
└── .gitignore
```

## License

MIT License — see [LICENSE](LICENSE) for details.

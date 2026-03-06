# Global Plant Genetics Website

A modern, content-managed website for Global Plant Genetics featuring elegant design, news management via Markdown, and seamless deployment to AWS S3.

## 🌱 Overview

This site combines modern design with a practical static site generator (11ty/Eleventy) to enable easy content management. Team members can add news articles by creating Markdown files, then deploy with a single command.

**Key Features:**
- 📝 News/blog system with Markdown support
- 🌾 Individual pages for 7 crop programs
- 📱 Fully responsive design
- 🎨 Glass morphism and gradient aesthetics
- 🚀 One-command deployment to AWS S3
- 🔧 Simple setup with automated install scripts

## 📁 Project Structure

```
globalplantgenetics/
├── src/                          # Source files (input for 11ty)
│   ├── index.html                # Homepage
│   ├── styles.css                # Main stylesheet
│   ├── script.js                 # JavaScript functionality
│   ├── _includes/                # Reusable components
│   │   ├── header.html           # Shared navigation
│   │   ├── footer.html           # Shared footer
│   │   └── layouts/
│   │       ├── base.html         # Base layout template
│   │       ├── news-article.html # News article template
│   │       └── crop-page.html    # Crop page template
│   ├── news/                     # News articles (Markdown)
│   │   ├── index.html            # News listing page
│   │   └── *.md                  # Individual articles
│   ├── crops/                    # Individual crop pages
│   │   ├── strawberries.html
│   │   ├── blueberries.html
│   │   ├── raspberries.html
│   │   ├── blackberries.html
│   │   ├── asparagus.html
│   │   ├── grapes.html
│   │   └── nuts.html
│   ├── about/
│   │   ├── team.html
│   │   └── intellectual-property.html
│   ├── contact.html
│   ├── privacy-policy.html
│   └── images/                   # Image assets
├── dist/                         # Build output (deployed to S3)
├── node_modules/                 # Dependencies (gitignored)
├── .eleventy.js                  # 11ty configuration
├── package.json                  # Node dependencies & scripts
├── setup.sh                      # Install script (Linux/Mac)
├── setup.ps1                     # Install script (Windows)
├── deploy.sh                     # Build + deploy script (Linux/Mac)
├── deploy.ps1                    # Build + deploy script (Windows)
└── README.md                     # This file
```

## 🚀 Quick Start

### First-Time Setup

#### Linux/Mac:
```bash
# 1. Run setup script (installs Node.js if needed, then npm packages)
chmod +x setup.sh
./setup.sh

# 2. Configure AWS CLI (one-time)
aws configure
# Enter: AWS Access Key ID, Secret Access Key, Region (us-east-1), Output format (json)
```

#### Windows:
```powershell
# 1. Run setup script (checks for Node.js, installs npm packages)
.\setup.ps1

# 2. Configure AWS CLI (one-time)
aws configure
# Enter: AWS Access Key ID, Secret Access Key, Region (us-east-1), Output format (json)
```

### Development

Start local development server:
```bash
npm run dev
```
Visit http://localhost:8080 to preview the site.

### Deployment

Build and deploy to S3:
```bash
# Linux/Mac
./deploy.sh

# Windows
.\deploy.ps1
```

The script will:
1. Build the site (`npm run build`)
2. Prompt for S3 bucket name
3. Upload files to S3
4. Set proper cache headers
5. Provide the site URL

## 📝 Adding News Articles

### Step 1: Create Markdown File

Create a new file in `src/news/`:
```
src/news/2026-03-new-strawberry-variety.md
```

### Step 2: Add Frontmatter

Add metadata at the top of the file:
```markdown
---
title: "Breakthrough Strawberry Variety Launches in Europe"
date: 2026-03-15
author: "Rupert Hargreaves"
category: "Product Launch"
crop: "Strawberries"
featured: true
excerpt: "Our latest UC Davis partnership brings exceptional flavor and disease resistance."
image: "/images/news/strawberry-2026-03.jpg"
---
```

### Step 3: Write Content

Below the frontmatter, write your article in Markdown:
```markdown
## Introduction

Our newest strawberry variety, developed in partnership with UC Davis...

## Key Benefits
- Enhanced disease resistance
- Superior flavor profile
- Extended shelf life

Contact our team to learn more.
```

### Step 4: Deploy

Run the deployment script:
```bash
./deploy.sh    # Linux/Mac
.\deploy.ps1   # Windows
```

Your article is now live! 🎉

## 🎨 Design Features

### Gradient System
- **Primary Gradient**: Forest greens inspired by plant life
- **Berry Gradient**: Deep purples and pinks for berry programs
- **Earth Gradient**: Rich browns for natural foundations
- **Sky Gradient**: Ocean blues for atmospheric depth
- **Sunset Gradient**: Coral and peach for warmth

### Typography
- **Display Font**: Crimson Pro - Elegant serif for headings
- **Body Font**: DM Sans - Clean, modern sans-serif for content

### Interactive Features
- Smooth parallax scrolling
- Glass morphism effects
- Hover animations on cards
- YouTube video integration
- Mobile-responsive navigation
- Scroll-triggered animations
- Cookie consent (GDPR-compliant)

## 🛠️ Available Commands

```bash
npm run dev      # Start development server with live reload
npm run build    # Build site to dist/ folder
npm run clean    # Remove dist/ folder
npm run deploy   # Build and deploy to S3
```

## 📦 Dependencies

- **@11ty/eleventy**: Static site generator
- **vanilla-cookieconsent**: GDPR-compliant cookie consent

## 🌐 Site Sections

1. **Homepage** - Hero, stats, programs, YouTube, about, CTA
2. **Crop Pages** (7) - Detailed program information
3. **News** - Blog/article system with Markdown
4. **IP & Services** - Licensing and services information
5. **Team** - Team member profiles
6. **Contact** - Contact form and information
7. **Privacy Policy** - GDPR-compliant privacy information

## 📱 Responsive Breakpoints

- Desktop: 1400px+
- Laptop: 968px - 1400px
- Tablet: 768px - 968px
- Mobile: < 768px

## ♿ Accessibility

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Focus indicators
- WCAG AA color contrast
- Reduced motion support

## 🔧 Customization

### Update Colors
Edit CSS variables in `src/styles.css`:
```css
:root {
    --gradient-primary: linear-gradient(...);
    --gradient-berry: linear-gradient(...);
}
```

### Update Navigation
Edit `src/_includes/header.html`

### Update Footer
Edit `src/_includes/footer.html`

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🆘 Troubleshooting

### Build fails with "eleventy: command not found"
Run `npm install` to install dependencies.

### Deploy fails with "aws: command not found"
Install AWS CLI: https://aws.amazon.com/cli/

### Changes not showing after deploy
Clear your browser cache or use incognito mode.

## 📞 Support

For questions about the website or content management, refer to the Quick Start guide above or contact your development team.

---

**Global Plant Genetics** 🌱
*World-leading IP partnerships delivering breakthrough varieties*

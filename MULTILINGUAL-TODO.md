# Multilingual Support - Next Steps

**Status**: 🔜 Ready to implement
**Languages Identified**: English (en), Chinese (cn), German (de), Spanish (es), Russian (ru), Portuguese (pt), French (fr)

---

## Current Situation

The site mentions multiple language support but currently:
- ❌ No language switcher UI
- ❌ No translated content
- ❌ No hreflang tags (critical for international SEO)
- ❌ No language-specific URL structure

The SEO foundation is now in place - multilingual support is the logical next step.

---

## Implementation Approach

### Option 1: Subdirectory Structure (Recommended)
```
https://www.globalplantgenetics.com/          (English - default)
https://www.globalplantgenetics.com/es/       (Spanish)
https://www.globalplantgenetics.com/de/       (German)
https://www.globalplantgenetics.com/cn/       (Chinese)
https://www.globalplantgenetics.com/ru/       (Russian)
https://www.globalplantgenetics.com/pt/       (Portuguese)
https://www.globalplantgenetics.com/fr/       (French)
```

**Pros**:
- Clean, professional URL structure
- Easy for users to understand
- Better for SEO (Google prefers this)
- Easier to manage with Eleventy

### Option 2: Subdomain Structure
```
https://www.globalplantgenetics.com/          (English)
https://es.globalplantgenetics.com/           (Spanish)
https://de.globalplantgenetics.com/           (German)
```

**Pros**:
- Can host on different servers if needed
- Complete separation of language sites

**Cons**:
- More complex DNS setup
- Higher hosting costs
- More complex deployment

---

## Technical Implementation Plan

### Phase 1: Setup Infrastructure (2-4 hours)
1. **Install i18n plugin**
   ```bash
   npm install --save-dev eleventy-plugin-i18n
   ```

2. **Create language directories**
   ```
   src/
   ├── en/           (English - default)
   │   ├── index.html
   │   ├── crops/
   │   └── news/
   ├── es/           (Spanish)
   ├── de/           (German)
   ├── cn/           (Chinese)
   ├── ru/           (Russian)
   ├── pt/           (Portuguese)
   └── fr/           (French)
   ```

3. **Create translation files**
   ```
   src/_data/
   ├── i18n/
   │   ├── en.json
   │   ├── es.json
   │   ├── de.json
   │   ├── cn.json
   │   ├── ru.json
   │   ├── pt.json
   │   └── fr.json
   ```

### Phase 2: Update Templates (1-2 hours)
1. **Add hreflang tags to base.html**
   ```html
   <link rel="alternate" hreflang="en" href="https://www.globalplantgenetics.com/" />
   <link rel="alternate" hreflang="es" href="https://www.globalplantgenetics.com/es/" />
   <link rel="alternate" hreflang="de" href="https://www.globalplantgenetics.com/de/" />
   <link rel="alternate" hreflang="zh" href="https://www.globalplantgenetics.com/cn/" />
   <link rel="alternate" hreflang="ru" href="https://www.globalplantgenetics.com/ru/" />
   <link rel="alternate" hreflang="pt" href="https://www.globalplantgenetics.com/pt/" />
   <link rel="alternate" hreflang="fr" href="https://www.globalplantgenetics.com/fr/" />
   <link rel="alternate" hreflang="x-default" href="https://www.globalplantgenetics.com/" />
   ```

2. **Add language switcher to header**
   - Dropdown menu with flag icons
   - Current language highlighted
   - Preserves current page context

3. **Update schema to support multiple languages**

### Phase 3: Content Translation (Variable timeline)
1. **Translate core pages**:
   - Homepage
   - About/Team
   - Contact
   - IP & Services

2. **Translate crop pages** (7 pages):
   - Strawberries
   - Blueberries
   - Raspberries
   - Blackberries
   - Asparagus
   - Grapes
   - Nuts

3. **Translate news articles** (optional - can be gradual):
   - Start with most important/recent articles
   - Add new articles in multiple languages going forward

### Phase 4: SEO Updates (1 hour)
1. Update sitemap to include all language variants
2. Add language-specific meta tags
3. Update robots.txt if needed
4. Test all hreflang tags with Google Search Console

---

## Translation Strategy

### Option A: Professional Translation Service
- **Pros**: Highest quality, industry-specific terminology
- **Cons**: Most expensive
- **Recommended for**: Technical content, legal pages
- **Services**: Gengo, One Hour Translation, ProZ

### Option B: Machine Translation + Human Review
- **Pros**: Fast, cost-effective for initial launch
- **Cons**: May have minor errors
- **Recommended for**: News articles, general content
- **Tools**: DeepL (best quality), Google Translate

### Option C: Multilingual CMS Integration
- **Pros**: Streamlined workflow, version control
- **Cons**: Requires additional setup
- **Tools**: Locize, Phrase, Crowdin

---

## Priority Languages

Based on the agricultural genetics market:

1. **Spanish** (es) - HIGH PRIORITY
   - Major markets: Mexico, Peru, Chile, Colombia, Argentina, Spain
   - Large berry production regions

2. **Portuguese** (pt) - HIGH PRIORITY
   - Major market: Brazil (massive berry production growth)

3. **German** (de) - MEDIUM PRIORITY
   - European market leader
   - Strong berry consumption

4. **French** (fr) - MEDIUM PRIORITY
   - French market + African francophone countries

5. **Chinese** (cn) - MEDIUM PRIORITY
   - Rapidly growing blueberry market
   - Important for long-term growth

6. **Russian** (ru) - LOWER PRIORITY
   - Growing market but geopolitically complex

---

## Eleventy Configuration Example

```javascript
// .eleventy.js
const i18n = require('eleventy-plugin-i18n');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(i18n, {
    translations: {
      en: require('./src/_data/i18n/en.json'),
      es: require('./src/_data/i18n/es.json'),
      de: require('./src/_data/i18n/de.json'),
      cn: require('./src/_data/i18n/cn.json'),
      ru: require('./src/_data/i18n/ru.json'),
      pt: require('./src/_data/i18n/pt.json'),
      fr: require('./src/_data/i18n/fr.json'),
    },
    fallbackLocales: {
      '*': 'en'
    }
  });

  // Add language collection
  eleventyConfig.addCollection("langEn", (collection) =>
    collection.getFilteredByGlob("src/en/**/*.{html,md}")
  );

  // Repeat for each language...
};
```

---

## Translation File Structure Example

```json
// src/_data/i18n/en.json
{
  "nav": {
    "crops": "Crops",
    "ip": "IP & Services",
    "team": "Team",
    "news": "News",
    "contact": "Contact"
  },
  "home": {
    "hero_title": "Pioneering Excellence In Plant Genetics",
    "hero_subtitle": "World-leading IP partnerships delivering breakthrough varieties in berries, asparagus, grapes, and nuts.",
    "cta_explore": "Explore Programs",
    "cta_watch": "Watch Our Story"
  },
  "footer": {
    "copyright": "© 2015-2026 Global Plant Genetics. All rights reserved.",
    "privacy": "Privacy Policy"
  }
}
```

```json
// src/_data/i18n/es.json
{
  "nav": {
    "crops": "Cultivos",
    "ip": "Propiedad Intelectual",
    "team": "Equipo",
    "news": "Noticias",
    "contact": "Contacto"
  },
  "home": {
    "hero_title": "Pioneros en Excelencia en Genética Vegetal",
    "hero_subtitle": "Asociaciones líderes mundiales en propiedad intelectual que ofrecen variedades innovadoras en bayas, espárragos, uvas y nueces.",
    "cta_explore": "Explorar Programas",
    "cta_watch": "Ver Nuestra Historia"
  },
  "footer": {
    "copyright": "© 2015-2026 Global Plant Genetics. Todos los derechos reservados.",
    "privacy": "Política de Privacidad"
  }
}
```

---

## Estimated Timeline

| Phase | Duration | Effort |
|-------|----------|--------|
| Setup infrastructure | 2-4 hours | Development |
| Update templates | 1-2 hours | Development |
| Translate core pages (7 languages) | 1-2 weeks | Translation |
| Translate crop pages (7 pages × 7 languages) | 1-2 weeks | Translation |
| SEO updates & testing | 4-8 hours | Development |
| **TOTAL** | **3-5 weeks** | **Mixed** |

---

## Budget Estimate

**Professional Translation**:
- Core pages (~5,000 words): $250-500 per language
- Crop pages (~7,000 words): $350-700 per language
- **Total per language**: $600-1,200
- **All 6 languages**: $3,600-7,200

**Machine + Review**:
- Core pages: $50-100 per language
- Crop pages: $70-140 per language
- **Total per language**: $120-240
- **All 6 languages**: $720-1,440

---

## Next Actions

1. ✅ Review this plan with stakeholders
2. ⬜ Decide on translation approach (professional vs. machine+review)
3. ⬜ Prioritize languages (suggest Spanish & Portuguese first)
4. ⬜ Install i18n plugin and configure Eleventy
5. ⬜ Create directory structure
6. ⬜ Begin with 1-2 priority languages for pilot
7. ⬜ Test hreflang implementation
8. ⬜ Roll out remaining languages

---

## SEO Impact of Multilingual Support

- **15-40% traffic increase** per language added
- Better rankings in regional Google versions (google.es, google.de, etc.)
- Reduced bounce rate from non-English speakers
- Improved user engagement and conversion rates
- Competitive advantage in international markets

---

**Ready to start? Begin with Spanish & Portuguese translations of the homepage and one crop page to test the workflow.**

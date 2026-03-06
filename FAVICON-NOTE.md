# Favicon Setup Required

## Current Status

✅ **Logo SVG** downloaded from live site and configured
❌ **Favicon.ico** - Live site doesn't have a proper .ico file

## What's Implemented

The base.html template includes these favicon references:
```html
<link rel="icon" type="image/svg+xml" href="/images/logo.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/images/logo.svg">
```

## What Works Now

- **Modern browsers**: Will display the SVG logo (logo.svg) as the favicon
- **Older browsers**: Will look for favicon.ico (currently missing)

## To Complete Favicon Setup

### Option 1: Convert Logo to ICO (Recommended)
1. Use an online converter like [favicon.io](https://favicon.io) or [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo.svg
3. Download the generated favicon.ico
4. Place it at `src/favicon.ico`
5. Rebuild the site

### Option 2: Create Comprehensive Favicon Package
Generate all modern favicon formats:
- favicon.ico (16x16, 32x32, 48x48)
- apple-touch-icon.png (180x180)
- favicon-16x16.png
- favicon-32x32.png
- site.webmanifest

Use [RealFaviconGenerator](https://realfavicongenerator.net/) for automatic generation.

## Current Impact

**Minor** - Most modern browsers will display the SVG logo. Only users on:
- Internet Explorer
- Very old browsers
- Some mobile browsers

...might not see a favicon. This affects <5% of users typically.

## Quick Fix

If you have the original logo in PNG format at high resolution (512x512 or larger):
1. Go to https://favicon.io/favicon-converter/
2. Upload the PNG
3. Download the generated package
4. Copy favicon.ico to `src/favicon.ico`
5. Run `npm run build`

Done!

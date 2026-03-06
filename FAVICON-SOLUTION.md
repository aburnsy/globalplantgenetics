# Favicon Solution - Your Logo is White!

## The Problem
Your `logo.svg` has **white fills** on a transparent background. When converters try to create a favicon, it looks blank because white-on-transparent = invisible!

```svg
<style>
  .cls-1, .cls-2 {
    fill: #fff;  /* ← This is why it's blank! */
  }
</style>
```

---

## ✅ BEST SOLUTION: Browser Method (2 minutes)

### Step 1: Add Background in Browser

1. Open file in Chrome/Edge: `C:\Users\andre\OneDrive\Documents\Development\globalplantgenetics\src\images\logo.svg`

2. Press `F12` to open DevTools

3. In the Elements tab, find the `<svg>` tag (first line)

4. Right-click the `<svg>` line → "Edit as HTML"

5. Change the opening tag to:
   ```html
   <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 581 154.51" style="background: #1a5f3f;">
   ```
   (Just added `style="background: #1a5f3f;"` at the end)

6. Press Enter - logo now has green background!

### Step 2: Screenshot & Convert

7. Use Windows Snipping Tool (Win+Shift+S) to capture just the logo

8. Open Paint → Paste → Resize to **512 x 512 pixels** (square)

9. File → Save as PNG: `logo-favicon.png`

10. Go to: **https://favicon.io/favicon-converter/**
    - Upload your PNG
    - Download the zip file
    - Extract `favicon.ico`

11. Copy `favicon.ico` to: `src/favicon.ico`

12. Run: `npm run build`

Done! ✅

---

## Alternative: Paint.NET / Photoshop Method

If you have an image editor:

1. Open `logo.svg` in Paint.NET, GIMP, or Photoshop

2. **Add a new layer with green background** (#1a5f3f) behind the logo

3. **Resize canvas** to square (e.g., 512x512)

4. **Export as PNG** → `logo-favicon.png`

5. Go to https://favicon.io/favicon-converter/
   - Upload PNG
   - Download favicon.ico

6. Copy to `src/favicon.ico`

---

## Why This Happens

Online converters expect logos with:
- Visible colors (not white)
- Or solid backgrounds
- Or proper color fills

Your SVG is designed for dark backgrounds (website uses dark header), so the white logo is invisible on white/transparent backgrounds!

---

## Quick Test

After you get the favicon.ico:

1. Put it in `src/favicon.ico`
2. Run `npm run build`
3. Check `dist/favicon.ico` exists
4. Open `dist/index.html` in browser
5. Look at browser tab - favicon should appear!

---

## Need Help?

If you're still stuck, you can:
1. Send me a screenshot of the logo with green background
2. Or export a PNG with background
3. And I can help convert it

The key is: **Add a colored background before converting!**

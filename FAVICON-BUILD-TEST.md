# Favicon Build Verification ✅

## Current Setup - Already Configured!

### ✅ 1. Eleventy Config (`.eleventy.js` - Line 13)
```javascript
eleventyConfig.addPassthroughCopy("src/favicon.ico");
```
**Status**: Configured ✓

### ✅ 2. HTML Template (`base.html` - Line 34)
```html
<link rel="alternate icon" href="/favicon.ico">
```
**Status**: Configured ✓

---

## What Happens When You Build:

### Step 1: You Add Favicon
```
src/favicon.ico  ← You put your favicon.ico here
```

### Step 2: You Run Build
```bash
npm run build
```

### Step 3: Eleventy Copies It
```
src/favicon.ico  →  dist/favicon.ico
```
Eleventy automatically copies it to the dist folder!

### Step 4: HTML References It
Every page will have:
```html
<link rel="alternate icon" href="/favicon.ico">
```

### Step 5: Browser Loads It
When someone visits your site:
```
https://www.globalplantgenetics.com/
  ↓ Browser requests
https://www.globalplantgenetics.com/favicon.ico
  ↓ Server serves
dist/favicon.ico ✓
```

---

## Test Checklist

After you add `src/favicon.ico`:

### 1. Build Test
```bash
cd C:\Users\andre\OneDrive\Documents\Development\globalplantgenetics
npm run build
```

**Expected output:**
```
[11ty] Copied 7 files / Wrote 152 files
```
(7 files includes: styles.css, script.js, cookie-consent.js, images/, robots.txt, favicon.ico, ...)

### 2. File Verification
```bash
# Check if favicon was copied
ls dist/favicon.ico
```

**Expected:** File exists at `dist/favicon.ico`

### 3. HTML Verification
Open any page:
```bash
# Check if HTML has favicon link
grep -n "favicon" dist/index.html
```

**Expected output:**
```
34:    <link rel="alternate icon" href="/favicon.ico">
```

### 4. Browser Test
```bash
# Start dev server
npm start
```

Then:
1. Open browser: http://localhost:8090
2. Look at browser tab
3. You should see your favicon icon!

### 5. Production Test (After Deploy)
1. Deploy to production
2. Visit: https://www.globalplantgenetics.com/
3. Check browser tab for favicon
4. Test direct access: https://www.globalplantgenetics.com/favicon.ico

---

## Current Status

| Item | Status | Location |
|------|--------|----------|
| Eleventy config | ✅ Ready | `.eleventy.js` line 13 |
| HTML template | ✅ Ready | `base.html` line 34 |
| Favicon file | ⏳ **You need to add this** | `src/favicon.ico` |

---

## What You Need To Do:

1. **Get your favicon.ico** (from favicon.io converter)
2. **Place it here**: `C:\Users\andre\OneDrive\Documents\Development\globalplantgenetics\src\favicon.ico`
3. **Run**: `npm run build`
4. **Verify**: Check `dist/favicon.ico` exists
5. **Test**: Open `dist/index.html` in browser, check tab icon

That's it! The build system is already configured correctly. 🎉

---

## Troubleshooting

**If favicon doesn't copy:**
```bash
# Check if file exists
ls src/favicon.ico

# If missing, add it
# If present, rebuild
npm run build
```

**If browser doesn't show icon:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Try incognito/private window
4. Check browser console for 404 errors

**If still not working:**
Check file permissions:
```bash
# Windows
icacls src\favicon.ico
```

File should be readable by everyone.

# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Preview Locally

Simply open `index.html` in your web browser:

**Windows:**
- Double-click `index.html`, or
- Right-click → Open with → Your preferred browser

**Mac:**
```bash
open index.html
```

**Linux:**
```bash
xdg-open index.html
```

Or use a local server (recommended for testing):

**Python 3:**
```bash
python -m http.server 8000
# Then visit: http://localhost:8000
```

**Node.js (if installed):**
```bash
npx http-server
# Then visit: http://localhost:8080
```

---

### 2. Customize Content

Edit `index.html` to update:

#### Company Information
- Line 7: Update page title and meta description
- Line 35: Company name in logo
- Line 60-65: Hero title and subtitle
- Line 270-290: About section text

#### Program Details
Update each program card (lines 130-250):
- Crop icons (emojis)
- Program titles
- Descriptions (keep them punchy!)
- Tags

#### YouTube Integration
Replace placeholder content (lines 300-380):
- Update YouTube channel link (appears multiple times)
- Add your actual video thumbnails
- Customize video titles

#### Contact Information
- Line 400: Update email address
- Line 445-460: Footer links and social media

---

### 3. Deploy to AWS

#### Prerequisites
1. Install AWS CLI: https://aws.amazon.com/cli/
2. Configure credentials: `aws configure`
3. Create an S3 bucket in AWS Console

#### Option A: Using Deployment Script (Easiest)

**Windows (PowerShell):**
```powershell
.\deploy.ps1
```

**Mac/Linux (Bash):**
```bash
chmod +x deploy.sh
./deploy.sh
```

Enter your bucket name when prompted, and the script handles everything!

#### Option B: Manual Deployment

1. **Upload to S3:**
```bash
aws s3 sync . s3://YOUR-BUCKET-NAME \
  --exclude ".git/*" \
  --exclude "*.md" \
  --delete
```

2. **Enable Static Website Hosting:**
- Go to S3 Console
- Select your bucket
- Properties → Static website hosting → Enable
- Set index document: `index.html`

3. **Make Public:**
- Update `bucket-policy.json` with your bucket name
- Apply policy:
```bash
aws s3api put-bucket-policy \
  --bucket YOUR-BUCKET-NAME \
  --policy file://bucket-policy.json
```

4. **Access Your Site:**
```
http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com
```

---

## 🌐 CloudFront Setup (Optional, for Custom Domain + HTTPS)

### Why CloudFront?
- HTTPS support
- Custom domain (www.globalplantgenetics.com)
- Global CDN for faster loading
- Better security

### Quick Setup

1. **AWS Console → CloudFront → Create Distribution**

2. **Settings:**
   - Origin domain: Select your S3 bucket
   - Default root object: `index.html`
   - Viewer protocol policy: Redirect HTTP to HTTPS

3. **Custom Domain (Optional):**
   - Add alternate domain name (CNAME): `www.globalplantgenetics.com`
   - Request SSL certificate in ACM
   - Add certificate to distribution

4. **DNS Configuration:**
   - Add CNAME record at your domain registrar:
   ```
   www.globalplantgenetics.com → d123abc.cloudfront.net
   ```

5. **Wait for deployment** (15-20 minutes)

---

## 🎨 Design Customization

### Colors & Gradients

Edit `styles.css` lines 8-50 to change gradients:

```css
:root {
    --gradient-primary: linear-gradient(135deg, #1a5f3f 0%, #8dd3ad 100%);
    /* Customize your colors here */
}
```

### Typography

Current fonts:
- **Display:** Crimson Pro (serif) - for headings
- **Body:** DM Sans (sans-serif) - for content

To change fonts:
1. Update Google Fonts link in `index.html` (line 9)
2. Update CSS variables in `styles.css` (lines 52-53)

### Spacing & Layout

All spacing uses CSS variables (lines 55-60):
```css
--spacing-lg: 4rem;  /* Increase/decrease section spacing */
```

---

## 📱 Testing Checklist

Before launching:

- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test mobile responsiveness (use browser dev tools)
- [ ] Click all navigation links
- [ ] Test YouTube link opens correctly
- [ ] Verify all content is updated
- [ ] Check spelling and grammar
- [ ] Test contact email link
- [ ] Verify smooth scroll animations
- [ ] Test on actual mobile devices
- [ ] Check page load speed

---

## 🔧 Common Issues & Solutions

### Fonts not loading?
- Check Google Fonts link in HTML
- Ensure internet connection (fonts load from CDN)

### Animations not working?
- Check browser console for JavaScript errors (F12)
- Ensure `script.js` is linked in HTML

### S3 Access Denied?
- Verify bucket policy is applied correctly
- Check bucket is not blocking public access
- Ensure CloudFront has access to S3

### Content not updating?
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Invalidate CloudFront cache (if using CloudFront)
- Wait a few minutes for S3 sync

---

## 💡 Pro Tips

1. **Development Workflow:**
   - Edit files locally
   - Test in browser
   - Deploy when ready
   - Clear cache to see changes

2. **Gradients:**
   - Use subtle transitions for professional look
   - Test on different screens (colors vary)
   - Ensure text contrast meets accessibility standards

3. **Performance:**
   - Images should be optimized (use WebP format)
   - Consider lazy loading for large galleries
   - Monitor page load speed with Lighthouse

4. **SEO:**
   - Update meta tags in `<head>`
   - Add alt text to images when you add them
   - Submit sitemap to Google Search Console

---

## 📞 Need Help?

Common resources:
- AWS S3 Documentation: https://docs.aws.amazon.com/s3/
- CloudFront Guide: https://docs.aws.amazon.com/cloudfront/
- CSS Gradients: https://cssgradient.io/
- Browser DevTools: F12 key in most browsers

---

**You're all set!** 🌱

This site is designed to wow your client with modern aesthetics, strong YouTube integration, and professional presentation. The "Living Gradients" concept ensures it stands out from generic websites while feeling authentic to Global Plant Genetics' brand.

Good luck with the presentation!

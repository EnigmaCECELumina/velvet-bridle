# Marketing Assets Creation Guide

This directory contains HTML templates for creating marketing assets for The Velvet Bridle.

## Files

- `gumroad-banner.html` - 1600×400px banner for Gumroad
- `payhip-thumbnail.html` - 800×800px thumbnail for Payhip

## How to Convert HTML to Images

### Method 1: Browser Screenshot (Recommended)

1. **Open the HTML file in your browser**
   - Double-click `gumroad-banner.html` or `payhip-thumbnail.html`
   - The file will open in your default browser

2. **Take a screenshot**
   - **Windows**: Use Snipping Tool or Win+Shift+S
   - **Mac**: Use Cmd+Shift+4 for selective screenshot
   - **Chrome/Firefox**: Use developer tools (F12) → Device Toolbar → Screenshot

3. **Save as PNG/JPG**
   - Save the screenshot in the appropriate format
   - Ensure the dimensions match the specifications
   - For Gumroad: 1600×400px
   - For Payhip: 800×800px

### Method 2: Online Converters

Use online HTML-to-image converters:
- https://html2canvas.hertzen.com/
- https://www.sitepoint.com/community/t/html-to-image-converter/
- https://html-to-image.com/

Upload the HTML file and download the converted image.

### Method 3: Command Line Tools

**Using Puppeteer (Node.js)**:
```bash
npm install puppeteer
```

Create a script `screenshot.js`:
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // For Gumroad banner
  await page.goto('file:///path/to/gumroad-banner.html');
  await page.screenshot({ path: 'gumroad-banner.png', clip: { x: 0, y: 0, width: 1600, height: 400 } });
  
  // For Payhip thumbnail
  await page.goto('file:///path/to/payhip-thumbnail.html');
  await page.screenshot({ path: 'payhip-thumbnail.png', clip: { x: 0, y: 0, width: 800, height: 800 } });
  
  await browser.close();
})();
```

Run: `node screenshot.js`

### Method 4: Design Software

1. Open HTML file in browser
2. Take screenshot at high resolution
3. Import into Photoshop/GIMP/Figma
4. Crop to exact dimensions
5. Export as PNG/JPG

## Image Specifications

### Gumroad Banner
- **Dimensions**: 1600×400 pixels
- **Format**: PNG or JPG
- **File Size**: Under 2MB
- **Colors**: Gothic palette (black, gold, burgundy)

### Payhip Thumbnail
- **Dimensions**: 800×800 pixels
- **Format**: PNG or JPG
- **File Size**: Under 1MB
- **Style**: Square with ornate frame

## Customization

### Changing Text
Edit the HTML files directly:
- Look for `<h1>`, `<p>`, or `<span>` tags
- Modify the text content
- Save and refresh browser

### Adjusting Colors
Find CSS color values and modify:
- `#c9a227` - Antique gold
- `#4a0e1a` - Rich burgundy
- `#0a0a0a` - Deep black
- `#f5f0e8` - Muted ivory

### Modifying Layout
Adjust CSS properties:
- `width`, `height` for dimensions
- `padding`, `margin` for spacing
- `font-size` for text size
- `opacity` for transparency

## Testing Your Images

### Gumroad Upload Test
1. Go to your Gumroad product page
2. Upload the banner image
3. Preview how it appears
4. Check that text is readable
5. Verify gold accents display correctly

### Payhip Upload Test
1. Go to your Payhip product page
2. Upload the thumbnail image
3. Preview in product listing
4. Check visibility in search results
5. Verify frame looks good at small sizes

## Troubleshooting

### Images Not Displaying Correctly
- Clear browser cache
- Try different browser
- Check screen resolution
- Ensure exact dimensions

### Colors Look Different
- Check color profile (sRGB)
- Adjust monitor calibration
- Try different export format
- Verify CSS color values

### Text Not Readable
- Increase font size
- Improve contrast
- Use different font weight
- Add text shadow

### File Size Too Large
- Reduce image quality
- Use JPG instead of PNG
- Optimize with image compressor
- Remove unnecessary elements

## Alternative: Use Design Software

If you prefer using design software, here are the specifications to recreate the designs manually:

### Gumroad Banner (1600×400)
1. Create canvas 1600×400
2. Add deep black gradient background
3. Create ornate gold frame (3px border)
4. Add corner decorations
5. Insert horse silhouette (right side)
6. Add "The Velvet Bridle" text (48px, Cinzel font, gold)
7. Add subtitle (28px, Playfair Display, ivory)
8. Add gold sparkle effects
9. Export as PNG

### Payhip Thumbnail (800×800)
1. Create canvas 800×800
2. Add deep black gradient background
3. Create ornate gothic frame (4px border)
4. Add corner ornaments with flourishes
5. Create app preview box (center)
6. Add mock app interface
7. Add product name at bottom (32px, Cinzel, gold)
8. Add decorative divider
9. Export as PNG

## Additional Resources

- **Fonts**: Google Fonts (Cinzel, Playfair Display, Lato)
- **Color Tools**: Adobe Color, Coolors.co
- **Image Compression**: TinyPNG, ImageOptim
- **Design Inspiration**: Pinterest, Behance (gothic design)

## Final Checklist

Before uploading to marketplaces:

- [ ] Image dimensions are exact
- [ ] File size is within limits
- [ ] Colors match brand palette
- [ ] Text is readable at all sizes
- [ ] Gothic aesthetic is consistent
- [ ] Product name is prominent
- [ ] No typos or errors
- [ ] Image is high quality
- [ ] Background is appropriate
- [ ] File format is correct

---

*These HTML templates provide a quick way to generate professional marketing assets. For best results, convert using high-resolution screenshot methods or professional design software.*
# iOS PWA Installation Troubleshooting

## Why "Add to Home Screen" might not appear:

### 1. **Must Use Safari**
- ❌ Chrome on iOS does NOT support PWA installation
- ✅ You MUST use Safari browser
- ✅ Open the app in Safari on your iPad/iPhone

### 2. **HTTPS or Localhost Required**
- ✅ `http://localhost:3002` works (development)
- ✅ `http://YOUR_IP:3002` works on local network
- ✅ `https://yourdomain.com` works (production)
- ❌ `file://` protocol does NOT work

### 3. **Check These Requirements:**

#### Manifest.json must be accessible:
- Visit: `http://YOUR_IP:3002/manifest.json`
- Should show JSON content (not 404 error)
- Content-Type should be `application/manifest+json`

#### Apple Touch Icon must exist:
- Visit: `http://YOUR_IP:3002/assets/offklass.png`
- Should show your logo image
- Recommended size: 180x180px or 512x512px

#### Service Worker should register:
- Open Safari Developer Tools (if available)
- Check Console for "Service Worker registered"
- Service worker is optional but helps

### 4. **Step-by-Step iOS Installation:**

1. **Open Safari** (not Chrome!)
2. Navigate to: `http://YOUR_IP:3002`
3. Wait for page to fully load
4. Tap the **Share button** (square with arrow up) at the bottom
5. Scroll down in the share menu
6. Look for **"Add to Home Screen"** option
7. If you don't see it:
   - Try refreshing the page
   - Clear Safari cache (Settings > Safari > Clear History)
   - Make sure you're on the main page (not a sub-page)
   - Check that manifest.json is accessible

### 5. **Common Issues:**

#### Issue: "Add to Home Screen" doesn't appear
**Solutions:**
- Make sure you're using Safari (not Chrome)
- Check that manifest.json is accessible
- Try accessing from the root URL (`/`) not a sub-page
- Clear Safari cache and cookies
- Restart Safari

#### Issue: Icon doesn't show correctly
**Solutions:**
- Ensure `/assets/offklass.png` exists and is accessible
- Icon should be at least 180x180px
- PNG format with transparent background works best
- Clear Safari cache after updating icon

#### Issue: App opens in Safari instead of standalone
**Solutions:**
- Make sure `apple-mobile-web-app-capable` meta tag is set to "yes"
- Check manifest.json has `"display": "standalone"`
- After installing, open from home screen (not Safari bookmarks)

### 6. **Testing Checklist:**

- [ ] Using Safari browser (not Chrome)
- [ ] Accessing via HTTP/HTTPS (not file://)
- [ ] Manifest.json is accessible at `/manifest.json`
- [ ] Logo is accessible at `/assets/offklass.png`
- [ ] Service worker registers (check console)
- [ ] Page loads completely before trying to install
- [ ] Trying from the root URL (`/`)

### 7. **Alternative: Manual Installation**

If "Add to Home Screen" still doesn't appear:

1. Take a screenshot of the app
2. Go to Photos app
3. Share the screenshot
4. Use "Add to Home Screen" from there (this creates a bookmark, not a PWA)

**Note:** This method creates a bookmark, not a true PWA, so it won't have full-screen mode.

### 8. **For Production:**

When deploying to production:
- Use HTTPS (required for service workers)
- Ensure all assets are accessible
- Test on actual iOS device (not just simulator)
- Verify manifest.json is served with correct Content-Type

## Still Not Working?

1. Check browser console for errors
2. Verify all files are accessible via direct URL
3. Try on a different iOS device
4. Make sure iOS version is 11.3+ (supports PWAs)
5. Check that you're not in Private Browsing mode


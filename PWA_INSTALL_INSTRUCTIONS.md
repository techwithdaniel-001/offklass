# 📱 Installing ofklass as a PWA

## 🍎 iOS (iPad/iPhone) Installation:

### ⚠️ IMPORTANT: Must Use Safari!
- ❌ **Chrome on iOS does NOT support PWA installation**
- ✅ **You MUST use Safari browser**
- ✅ iOS 11.3+ required for PWA support

### Quick Install Steps:

1. **Open Safari** on your iPad/iPhone (NOT Chrome!)

2. **Navigate to your ofklass app**:
   - Local network: `http://YOUR_IP:3002`
   - Or your domain: `https://yourdomain.com`

3. **Wait for the page to fully load**

4. **Tap the Share button** (square with arrow pointing up) at the bottom of Safari

5. **Scroll down** in the share menu

6. **Tap "Add to Home Screen"** (if you don't see it, see troubleshooting below)

7. **Customize the name** (or keep "ofklass") and tap "Add"

8. **Done!** You'll see the ofklass icon on your home screen

### 🖥️ Desktop (Chrome/Edge) Installation:

1. **Open Chrome or Edge** browser

2. **Navigate to your ofklass app**

3. **Look for the install icon** in the address bar (or a popup will appear)

4. **Click "Install"** when prompted

5. **Done!** The app will open in its own window

## Features When Installed:

- ✅ Runs in full-screen mode (no browser UI)
- ✅ Works offline (with cached content)
- ✅ Looks like a native app
- ✅ Quick access from home screen
- ✅ Separate from Safari browser

## 🔧 Troubleshooting iOS Installation:

### Can't see "Add to Home Screen" option?

**Check these:**
1. ✅ **Are you using Safari?** (Chrome doesn't support iOS PWA)
2. ✅ **Is the page fully loaded?** (Wait a few seconds)
3. ✅ **Are you on the main page?** (Try going to `/` not a sub-page)
4. ✅ **Is manifest.json accessible?** (Visit `http://YOUR_IP:3002/manifest.json` - should show JSON)
5. ✅ **Is the icon accessible?** (Visit `http://YOUR_IP:3002/assets/offklass.png` - should show image)

**Try these fixes:**
- Clear Safari cache: Settings > Safari > Clear History and Website Data
- Refresh the page (pull down to refresh)
- Close and reopen Safari
- Make sure you're not in Private Browsing mode
- Try accessing from the root URL (`/`) not a sub-page like `/dashboard`

### Icon not showing correctly?

- The app now uses `offklass.png` as the favicon and PWA icon
- Check that `/assets/offklass.png` exists and is accessible
- Icon should be at least 180x180px for best iOS results
- Clear Safari cache after updating icon

### App not working offline?

- The service worker needs to be registered first
- Visit the app once while online to cache content
- Check browser console for service worker registration

## For Developers:

The PWA setup includes:
- `manifest.json` - App configuration
- `sw.js` - Service worker for offline support
- Icons in `public/` folder
- iOS-specific meta tags in layout

To generate better icons, open `public/icon-generator.html` in a browser or create custom icons with your design tool.


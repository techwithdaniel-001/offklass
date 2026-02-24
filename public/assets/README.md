# Assets Folder

This folder contains all images and media files for the ofklass app.

## Required Files:

### Logo
- **offklass.png** - Main app logo/icon (you need to add this)
  - Recommended size: 512x512px or higher
  - Format: PNG with transparent background
  - This will be used as the PWA icon and app logo

### Icons (already generated)
- **icon-192.png** - 192x192px icon for PWA
- **icon-512.png** - 512x512px icon for PWA

### Videos
- **demo.mp4** - Demo video for lessons (you need to add this)

## How to Add Your Logo:

1. Place your `offklass.png` file in this folder (`public/assets/`)
2. The app will automatically use it for:
   - PWA home screen icon
   - App icons
   - Apple touch icons

## File Structure:
```
public/
  assets/
    offklass.png      ← Add your logo here
    icon-192.png     ← Auto-generated
    icon-512.png     ← Auto-generated
    demo.mp4         ← Fallback/demo video (optional)
    curriculum/      ← Lesson videos by unit (see below)
      unit-1/        ← 1.mp4, 2.mp4, ... (one per lesson in order)
      unit-2/
      ... unit-8/
```

### Curriculum videos (Grade 4, units 1–8)
Lesson videos are organized under `assets/curriculum/`: one folder per unit (`unit-1` through `unit-8`). Inside each unit folder, name videos by lesson order: `1.mp4`, `2.mp4`, … up to `8.mp4`. See `assets/curriculum/README.md` for details.

## Notes:
- All images should be optimized for web (compressed PNGs)
- Logo should have a transparent background for best results
- Video should be in MP4 format for maximum compatibility


#!/usr/bin/env python3.11
"""Optimize TalkBridge icon files for checkpoint save."""

from PIL import Image
import os

icon_paths = [
    "assets/images/icon.png",
    "assets/images/splash-icon.png",
    "assets/images/favicon.png",
    "assets/images/android-icon-foreground.png",
]

for icon_path in icon_paths:
    if os.path.exists(icon_path):
        img = Image.open(icon_path)
        # Reduce to 512x512 for app icons (sufficient for all platforms)
        img_resized = img.resize((512, 512), Image.Resampling.LANCZOS)
        # Save with optimization
        img_resized.save(icon_path, "PNG", optimize=True, quality=95)
        file_size_kb = os.path.getsize(icon_path) / 1024
        print(f"✓ Optimized {icon_path}: {file_size_kb:.1f} KB")
    else:
        print(f"✗ File not found: {icon_path}")

print("\nOptimization complete!")

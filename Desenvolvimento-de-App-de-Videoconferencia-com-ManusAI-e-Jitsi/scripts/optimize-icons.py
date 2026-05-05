from pathlib import Path
from PIL import Image

PROJECT = Path('/home/ubuntu/language-meet-mobile')
SOURCE = Path('/home/ubuntu/webdev-static-assets/language-meet-icon.png')
TARGETS = {
    'assets/images/icon.png': 768,
    'assets/images/splash-icon.png': 512,
    'assets/images/favicon.png': 256,
    'assets/images/android-icon-foreground.png': 768,
}

source_image = Image.open(SOURCE).convert('RGBA')

for relative_path, size in TARGETS.items():
    target = PROJECT / relative_path
    resized = source_image.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(target, format='PNG', optimize=True, compress_level=9)
    print(f'{relative_path}: {target.stat().st_size / 1024:.1f} KB')

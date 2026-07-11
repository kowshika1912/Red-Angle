import os
import re

directory = 'src'
replacements = {
    # Backgrounds
    r"'#050505'": "var(--color-bg)",
    r"'#0a0805'": "var(--color-bg)",
    r"'#0a0a0a'": "var(--color-surface)",
    r"'#030404'": "var(--color-bg-2)",
    r"'#111'": "var(--color-surface-2)",
    r"'#111111'": "var(--color-surface-2)",
    r"'#141209'": "var(--color-surface)",
    r"'#1c1810'": "var(--color-surface-2)",
    r"'rgba\(0,\s*0,\s*0,\s*0\.9\)'": "rgba(255, 255, 255, 0.9)",
    r"'rgba\(0,\s*0,\s*0,\s*0\.8\)'": "rgba(255, 255, 255, 0.8)",
    r"'rgba\(0,\s*0,\s*0,\s*0\.5\)'": "rgba(255, 255, 255, 0.5)",
    
    # Text colors
    r"'#fff'": "var(--text-primary)",
    r"'#ffffff'": "var(--text-primary)",
    r"'#a0a0a0'": "var(--text-secondary)",
    r"'#999'": "var(--text-muted)",
    r"'#888'": "var(--text-muted)",
    r"'#666'": "var(--text-muted)",
}

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                # We want to replace inside style={{ ... }} but simple replace is easier for strings
                # since we are replacing strings with variables, we need to strip quotes if replacing with var() inside style
                # Actually, in React, style={{ background: 'var(--color-bg)' }} works.
                # So we replace '#050505' with 'var(--color-bg)' (keeping the quotes)
                new_content = re.sub(old, f"'{new}'", new_content)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")

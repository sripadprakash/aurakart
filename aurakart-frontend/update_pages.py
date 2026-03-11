import os
import re

directory = r'C:\Users\hp\OneDrive\Desktop\Aurakart\aurakart-frontend\src\pages'

# Regex to match the span and its content more flexibly
pattern = re.compile(
    r'(<span className={user\?\.orders\?\.length >= 3 \? "text-red-400 font-black uppercase text-\[10px\]" : "text-green-400 font-black uppercase text-\[10px\]"}>\s+){user\?\.orders\?\.length >= 3 \? ".*?" : ".*?"}(\s+</span>)',
    re.MULTILINE | re.DOTALL
)

replacement = r'\1{user?.orders?.length >= 3 ? "Offer expired as used. Shipping: $1.00" : "FREE"}\2'

for filename in os.listdir(directory):
    if filename.endswith('.jsx'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content, count = pattern.subn(replacement, content)
        
        if count > 0:
            with open(filepath, 'w', encoding='utf-8', newline='') as f:
                f.write(new_content)
            print(f"Updated {filename}: {count} replacements")
        else:
            print(f"Skipped {filename} (no match)")

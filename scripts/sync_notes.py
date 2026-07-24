import os
import glob
import re
import shutil

OBSIDIAN_BASE = r"C:\Obsidian\10_AI_Brain"
OUTPUTS_DIR = os.path.join(OBSIDIAN_BASE, "05_Outputs")
COMPOUND_DIR = os.path.join(OBSIDIAN_BASE, "08_Compound")

DEST_BASE = r"C:\Projects\obsidian-knowledge-site\content"
DEST_OUTPUTS = os.path.join(DEST_BASE, "outputs")
DEST_COMPOUND = os.path.join(DEST_BASE, "compound")

def setup_dirs():
    if os.path.exists(OUTPUTS_DIR) or os.path.exists(COMPOUND_DIR):
        for d in [DEST_OUTPUTS, DEST_COMPOUND]:
            if os.path.exists(d):
                shutil.rmtree(d)
            os.makedirs(d)

def convert_wikilinks(content):
    def replacer(match):
        inner = match.group(1)
        if '|' in inner:
            link, display = inner.split('|', 1)
        else:
            link, display = inner, inner
        
        slug = link.replace(' ', '-').lower()
        return f"[{display}](/notes/{slug})"
    
    content = re.sub(r'\[\[(.*?)\]\]', replacer, content)
    # Fix unclosed <br> tags for MDX
    content = content.replace('<br>', '<br />')
    return content

def process_files(src_dir, dest_dir):
    if not os.path.exists(src_dir):
        print(f"Warning: Source directory {src_dir} does not exist. Skipping.")
        return

    files = glob.glob(os.path.join(src_dir, "*.md"))
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = convert_wikilinks(content)
        
        filename = os.path.basename(file_path)
        name, ext = os.path.splitext(filename)
        slugified_name = name.replace(' ', '-').lower() + ext
        
        dest_path = os.path.join(dest_dir, slugified_name)
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Processed: {filename} -> {slugified_name}")

if __name__ == "__main__":
    print("Setting up content directories...")
    setup_dirs()
    print("Processing 05_Outputs...")
    process_files(OUTPUTS_DIR, DEST_OUTPUTS)
    print("Processing 08_Compound...")
    process_files(COMPOUND_DIR, DEST_COMPOUND)
    print("Done syncing notes.")

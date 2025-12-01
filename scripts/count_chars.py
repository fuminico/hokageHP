import os
import re
import glob

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    # 1. Total characters (raw)
    total_chars = len(raw_content)

    # 2. Body only (remove frontmatter)
    body_content = re.sub(r'^---[\s\S]*?---\n', '', raw_content)
    body_chars = len(body_content)

    # 3. Body without whitespace (Japanese counting style)
    body_no_space = re.sub(r'\s', '', body_content)
    body_no_space_count = len(body_no_space)

    return {
        'total': total_chars,
        'body': body_chars,
        'body_no_space': body_no_space_count
    }

def main():
    target_dir = 'website/content/services'
    files = glob.glob(os.path.join(target_dir, '*.md'))
    
    print("File Name,No Space,Body(w/Space),Total(Raw)")
    
    for file in sorted(files):
        filename = os.path.basename(file)
        stats = analyze_file(file)
        print(f"{filename},{stats['body_no_space']},{stats['body']},{stats['total']}")
        
    print("No Space: Body chars without whitespace")
    print("Body(w/Space): Body chars with whitespace")
    print("Total(Raw): Total file chars")

if __name__ == "__main__":
    main()

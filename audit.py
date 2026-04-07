import os
import re

def audit():
    html_files = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    results = []
    for path in html_files:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        start_indices = [m.start() for m in re.finditer(r'<div\s+class=\"quiz-container\"', content)]
        
        for start in start_indices:
            depth = 1
            pos = start + 10 # skip <div class
            end_pos = -1
            while depth > 0 and pos < len(content):
                next_open = content.find('<div', pos)
                next_close = content.find('</div', pos)
                if next_close == -1: break
                if next_open != -1 and next_open < next_close:
                    depth += 1
                    pos = next_open + 4
                else:
                    depth -= 1
                    pos = next_close + 5
                    if depth == 0:
                        end_pos = next_close
            
            if end_pos != -1:
                container_inner = content[start:end_pos]
                if 'quiz-content' not in container_inner:
                    results.append(path)
                    break
    return sorted(list(set(results)))

if __name__ == '__main__':
    for r in audit():
        print(r)

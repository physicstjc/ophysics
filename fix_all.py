import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    start_pattern = re.compile(r'(<div class=\"quiz-container\"[^>]*>)')
    segments = start_pattern.split(content)
    new_segments = [segments[0]]

    for i in range(1, len(segments), 2):
        opening_tag = segments[i]
        rest = segments[i+1]
        
        depth = 1
        pos = 0
        end_pos = -1
        while depth > 0 and pos < len(rest):
            next_open = rest.find('<div', pos)
            next_close = rest.find('</div', pos)
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
            inner = rest[:end_pos]
            after = rest[end_pos:]
            if 'class=\"quiz-content\"' not in inner:
                h3_match = re.search(r'^(.*?(?:<h3>.*?</h3>\s*))', inner, re.DOTALL | re.IGNORECASE)
                if h3_match:
                    header = h3_match.group(1)
                    body = inner[len(header):]
                    inner = f'{header}<div class=\"quiz-content\">\n{body}</div>\n'
                else:
                    inner = f'\n<div class=\"quiz-content\">\n{inner}</div>\n'
            new_segments.append(opening_tag)
            new_segments.append(inner)
            new_segments.append(after)
        else:
            new_segments.append(opening_tag)
            new_segments.append(rest)

    new_content = ''.join(new_segments)
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == '__main__':
    # Fix all files that the audit script found
    files = [
        './current-of-electricity/resistance.html',
        './current-of-electricity/electromotive-force-and-potential-difference.html',
        './dc-circuits/circuit-components.html'
    ]
    for f in files:
        if os.path.exists(f):
            if process_file(f):
                print(f'Fixed {f}')

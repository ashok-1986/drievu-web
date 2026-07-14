#!/usr/bin/env python3
"""Fix duplicate scrollToSection function in sectors page."""
import os
import sys
from pathlib import Path

def fix_duplicate_scroll_to_section():
    # Resolve path relative to this script's location
    script_dir = Path(__file__).parent
    target_file = script_dir / "src" / "app" / "sectors" / "page.tsx"
    
    if not target_file.exists():
        print(f"Target file not found: {target_file}")
        return False
    
    # Read with explicit UTF-8 encoding
    with open(target_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the second occurrence of scrollToSection
    search_str = 'const scrollToSection = (id: string) => {'
    first_idx = content.find(search_str)
    second_idx = content.find(search_str, first_idx + 1)
    
    if second_idx == -1:
        print("Second occurrence not found")
        return False
    
    # Find the return ( after the second definition
    # We need to be more precise - find the return ( that's at the same indentation level
    end_idx = content.find('\n  return (', second_idx)
    if end_idx == -1:
        # Try alternative pattern
        end_idx = content.find('\nreturn (', second_idx)
    if end_idx == -1:
        print("Could not find return after second definition")
        return False
    
    # Validate: check that we're removing a complete function definition
    # The block should contain the function and end right before 'return ('
    removed_block = content[second_idx:end_idx]
    if 'const scrollToSection' not in removed_block:
        print("Validation failed: removed block doesn't contain expected function")
        return False
    
    # Remove the duplicate
    new_content = content[:second_idx] + content[end_idx:]
    
    # Verify only one occurrence remains
    if new_content.count('const scrollToSection = (id: string) => {') != 1:
        print("Validation failed: unexpected number of occurrences after fix")
        return False
    
    # Atomic write with backup
    backup_file = target_file.with_suffix('.tsx.bak')
    temp_file = target_file.with_suffix('.tsx.tmp')
    
    # Create backup
    target_file.rename(backup_file)
    
    # Write to temp file
    with open(temp_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # Atomic replace
    os.replace(temp_file, target_file)
    
    # Remove backup on success
    backup_file.unlink(missing_ok=True)
    
    print("Fixed duplicate scrollToSection")
    return True

if __name__ == "__main__":
    success = fix_duplicate_scroll_to_section()
    sys.exit(0 if success else 1)
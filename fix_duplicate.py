with open(r'D:\STARTUP PROJECTS\Drievu\drievu-web\src\app\sectors\page.tsx', 'r') as f:
    content = f.read()

# Find the second occurrence
first_idx = content.find('const scrollToSection = (id: string) => {')
second_idx = content.find('const scrollToSection = (id: string) => {', first_idx + 1)

if second_idx != -1:
    # Find the return after this
    end_idx = content.find('return (', second_idx)
    if end_idx != -1:
        # Remove from second_idx to end_idx
        content = content[:second_idx] + content[end_idx:]
        print("Fixed!")
    else:
        print("Could not find return after second definition")
else:
    print("Second occurrence not found")

with open(r'D:\STARTUP PROJECTS\Drievu\drievu-web\src\app\sectors\page.tsx', 'w') as f:
    f.write(content)

print('Done')
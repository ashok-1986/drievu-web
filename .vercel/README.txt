> Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you link a directory to a Vercel project.

> What does the "project.json" file contain?
The "project.json" file contains generated linking fields:
- The ID of the Vercel project that you linked ("projectId")
- The ID of the user or team your Vercel project is owned by ("orgId")
(Note: The name of the Vercel project, "projectName", may also be included but is not guaranteed)

> Should I commit the ".vercel" folder?
No, you should not share the generated ".vercel" metadata (like project.json) with anyone.
Upon creation, it will be automatically added to your ".gitignore" file.
However, this README file itself remains documentation that may be tracked if desired.

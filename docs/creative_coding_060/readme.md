Grab tabs urls in Safari from Alfred into the clipboard

# Creative Coding / Simpler Tools
## an ongoing coding/research seminar
<http://creativecoding.xyz>


# Grab tabs (Safari,Alfred,clipboard)	
A simple AppleScript that works as a Workflow in Alfred.
It grabs the url of each tabs in the front most window in Safari and list them (index, title, url) as a string in the clipboard; this can then be pasted in a text file and saved on disk.

:+todo output format: css, markdown, html, text, json
:+todo source from Chrome, Brave, etc.

**Instructions**: how to install in Alfred

Manualy:
- Create a Trigger: Keyword; no argument needed.
- Create an Actions: Run script: OSASCRIPT (AppleScript)
- Create a Notifications
- connects the three
- open the action and paste the script in there

Test: open some tabs in Safari; activate Alfred and type `grabtabs`; switch to Sublime Text, paste with ⌘V

Drag/drop the workflow onto Alfred's preferences.
Notes: There is a `Grabtabs.alfredworkflow` file that I exported from Alfred 
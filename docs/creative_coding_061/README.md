a basic visual code editor: insert dom object via keyboard

# Creative Coding / Simpler Tools
## an ongoing coding/research seminar
<http://creativecoding.xyz>

After reading [https://rogovoy.me/blog/writing-html-sucks](), I found it interesting to develop the idea given the fundamentals developped in the Calligraphy prototype.
Ideally packaged as a single line script, this should let edit/create/delete any div element on the page; and export them somehow.
The main idea is to create a set of elements within elements (sort of russian-dolls, reminiscent somehow to the cms i had developed for the early days of kitsuné). The user would have the ability to control these elements, somehow (at the moment: make the block's content editable, insert new element, if the element already a child, use flex style, and control if we use row or column). A simple tool to write and automate html code.

All this happening via keyboard:
- Tab: cycle through the focus-able elements
- Enter: switch contentEditable property on/off
- +: insert a new element within the active element
- r: flex with direction: row
- c: flex with direction: column
- #, then space: insert a title, H1
- ##, then space: insert H2
- ###, then space: insert H3 … etc down to H6
- f: free floar element (position absolute)
- arrow keys: move element
- w, then arrow keys: change the active element's width; up and down are +/-10 and left/right are +/-1
- h, then arrow keys: change the active element's height; up and down are +/-10 and left/right are +/-1

nb: mouse can also be used to point and click the active element (select) and drag the elemnt around (once it's free float)

Possible development to explore:
- insert <img> block and upload images
- multiple selection of blocks
- code editor: write custom css, assign it to element
- code editor: write custom html, insert it inside an element
- markdown editor; insert content inside an element
- place marker and grids

Notes
- if a parent is draggable, its children wont be editable
- document.activeElement wont let style be set onto DOM element; we need to grab the id first and then use document.getElementById; YAY! Fun!

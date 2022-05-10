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

nb: mouse can also be used to point and click the active element

Possible development to explore:
- multiple selection
- write custom css, assign it to element
- move block with arrows (+alt+meta to increment); position absolute/fixed
- place marker and grids
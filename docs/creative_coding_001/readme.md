Draw a parametric box with loops on X,Y (SVG)

# Creative Coding / Visual Experiments
## an ongoing coding/research seminar
<http://creativecoding.xyz>

### What's happening here

- we use a double loop; one for the X axis and one for the Y axis: _repeat_x_ and _repeat_y_
- inside these loops we define each “faces” coordinates sets in a variable: _top_face_, _side_face_ and _front_face_. They are then assembled and stored in an array: _polygon_points_.
- later on we use the array to insert new polygons in the svg element.

### What to do from here

The polygons are now existing in the page.

- Play with varaiables: what if we wanted to make them bigger or smaller.
- How would you add more polygons?
- How would you change the style of the boxes?
- We want a (fake) isometric view; how would you do it?


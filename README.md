# Drivewyze
My solution uses a generator to run through all possible color combinations for the blank dots,
and checks if any of them result in a polygon with only two complete triangles.
I referenced [the Mozilla JavaScript documentation](https://developer.mozilla.org/bm/docs/Web/JavaScript)
for function definitions and documentation. It took about three hours from start to finish. 

If I were to improve something, it would probably be the algorithm. 
Brute force isn't very efficient, but on a problem this size it runs in under a second on my machine.
I would also like if the polygon class were more flexible. It can currently only handle triangles of the given colors,
but a more general solution might be able to check any variety of shapes and colors. And in terms of the code maybe
a build process to do linting and transpiling and minification if it ever were to be run on the web.

To run the code, just open index.html in a browser. I've only tested it on Chrome 66, and it uses some ES6 syntax so some
older browsers might not support it.

Some tests I would write would be simple polygons where I know the answer. There are also plenty of tests for the 
individual methods and functions.

---
layout: default
---

<div class="page-header">
  <h1>Handdrawn.js</h1>
</div>

A RaphaelJS plugin to give your vector graphics a hand drawn style. Great for
sketch diagrams, charts and illustrations.

<div id="handdrawnIntro" class="rPaper img-polaroid"></div>

### drawnLine

<pre>paper.drawnLine(x, y, x2, y2, wobble)</pre>

The example below renders a series of horizontal lines with increasing wobble:

<div id="handdrawnLine" class="rPaper img-polaroid"></div>



### drawnRect

<pre>paper.drawnRect(x, y, x2, y2, wobble)</pre>

The example below renders a series of rectangles with increasing wobble:

<div id="handdrawnRect" class="rPaper img-polaroid"></div>



### drawnCircularArc

<pre>paper.drawnCircularArc(centerX, centerY, radius, startAngle, endAngle)</pre>

The example below renders a series of circular arcs. The wobble on circular
arcs is a function of the radius.

<div id="handdrawnCircularArc" class="rPaper img-polaroid"></div>



### drawnRegularPolygon

<pre>paper.drawnRegularPolygon(centerX, centerY, radius, numberOfSides, wobble)</pre>

The example below renders a grid of regular polygons with random number of sides.

<div id="handdrawnRegularPolygon" class="rPaper img-polaroid"></div>



### drawnCircle

<pre>paper.drawnCircle(centerX, centerY, radius, wobble)</pre>

The hand drawn diagrams go well with a handwriting font as shown in this example.
This example also shows that closed handdrawn shapes can have a fill attribute.

<div id="handdrawnCircle" class="rPaper img-polaroid"></div>


### Responsive design with Raphael

The SVG graphics on this page are responsive, i.e. they shrink as the
viewport gets smaller. I followed this 
[recipe for responsive SVG graphics](http://jsfiddle.net/AUNwC/44/)

### Random number distributions

This chart compares one uniform and two normal distributions for random numbers.
Currently I use the uniform distribution, but I'm exploring normal distributions
for a more natural look.

<div id="rnPaper" class="rPaper img-polaroid"></div>

----

More info
---------

### Dependencies

* RaphaelJS, 2.1 or greater



### Installation

* copy raphael.handdrawn.js into your project
* include the js file after raphael.js


### Resources

* [Documentation](http://handdrawn.clearcove.ca)
* [Source code (github)](https://github.com/jhund/raphael.handdrawn.js)
* [Issues](https://github.com/jhund/raphael.handdrawn.js/issues)


### Credits

This plugin is based on https://github.com/the55/implements55


### License

MIT licensed



### Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a future version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.



### Copyright

Copyright (c) 2010 - 2013 Jo Hund. MIT license.

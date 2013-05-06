---
layout: default
---

<div class="page-header">
  <h1>Raphael.handdrawn.js</h1>
</div>

A RaphaelJS plugin to give your vector graphics a hand drawn style. Great for
sketch diagrams, charts and illustrations.


<h3>drawnLine</h3>
<p>Command: <code>paper.drawnLine(x, y, x2, y2, wobble)</code></p>
<p>The example below renders a series of horizontal lines with increasing wobble:</p>
<div id="handdrawnLine" style="height: 300px;"></div>



<h3>drawnRect</h3>
<p>Command: <code>paper.drawnRect(x, y, x2, y2, wobble)</code></p>
<p>The example below renders a series of rectangles with increasing wobble:</p>
<div id="handdrawnRect" style="height: 300px;"></div>



<h3>drawnCircularArc</h3>
<p>Command: <code>paper.drawnCircularArc(centerX, centerY, radius, startAngle, endAngle)</code></p>
<p>
  The example below renders a series of circular arcs. The wobble on circular
  arcs is a function of the radius.
</p>
<div id="handdrawnCircularArc" style="height: 300px;"></div>



<h3>drawnRegularPolygon</h3>
<p>Command: <code>paper.drawnRegularPolygon(centerX, centerY, radius, numberOfSides, wobble)</code></p>
<p>The example below renders a grid of regular polygons with random number of sides.</p>
<div id="handdrawnRegularPolygon" style="height: 300px;"></div>



<h3>drawnCircle</h3>
<p>Command: <code>paper.drawnCircle(centerX, centerY, radius, wobble)</code></p>
<p>
  The hand drawn diagrams go well with a handwriting font as shown in this example.
  This example also shows that closed handdrawn shapes can have a fill attribute.
</p>
<div id="handdrawnCircle" style="height: 300px;"></div>



<h3>Random number distributions</h3>
<p>
  This chart compares one uniform and two normal distributions for random numbers.
  Currently I use the uniform distribution, but I'm exploring normal distributions
  for a more natural look.
</p>
<div id="rnPaper" style="height: 300px;"></div>

----

More info on raphael.handdrawn.js
---------

### Dependencies

* RaphaelJS, 2.1 or greater



### Installation

* copy raphael.handdrawn.js into your project
* include the js file after raphael.js


### Resources

* [Documentation](http://jhund.github.io/raphael.handdrawn.js)
* [Source code (github)](https://github.com/jhund/raphael.handdrawn.js)
* [Issues](https://github.com/jhund/raphael.handdrawn.js/issues)



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

//
// raphael.handdrawn.js:
// A RaphaelJS plugin for SVG vector graphics with a hand drawn style.
//
// Author: Jo Hund
// MIT licensed
//
// Based on https://github.com/the55/implements55
//
//---------------------------------------------------------------- extensions

// Returns a random integer with uniform distribution.
// range: the range covered by returned random integers, defaults to 100
// mean: the mean of the returned random integers, defaults to 0
//
// Example: with default params, the random integers are between -50 and 50
Raphael.randomizeUniform = function(range, mean) {
  range = range || 100;
  mean = mean || 0;
  var rand = Math.random() * range;
  return Math.round((rand - (range / 2)) + mean);
};

// Returns a random integer with normal distribution.
// range: the range covered by returned random integers, defaults to 100
// mean: the mean of the returned random integers, defaults to 0
//
// Example: with default params, the random integers are between -50 and 50
Raphael.randomizeNormal1 = function(range, mean) {
  range = (range || 1.0) / 9;
  mean = mean || 0.0;
  var rand = Math.cos(2 * Math.PI * Math.random()) * Math.sqrt(-2 * Math.log(Math.random()))
  return Math.round((rand * range) + mean)
}

// Returns a random integer with normal distribution.
// range: the range covered by returned random integers, defaults to 100
// mean: the mean of the returned random integers, defaults to 0
//
// Example: with default params, the random integers are between -50 and 50
// Modified from: http://blog.yjl.im/2010/09/simulating-normal-random-variable-using.html
Raphael.randomizeNormal2 = function(range, mean) {
  range = (range || 100) * 1.2;
  mean = mean || 0.0;
  var v1, v2, s;
  do {
    var u1 = Math.random();
    var u2 = Math.random();
    v1 = 2 * u1 - 1;
    v2 = 2 * u2 - 1;
    s = v1 * v1 + v2 * v2;
  } while (s > 1);

  x = Math.sqrt(-2 * Math.log(s) / s) * v1;
  x = mean + Math.sqrt(range) * x;
  return Math.round(x);
}

// Pick the random number distribution to use
Raphael.randomize = Raphael.randomizeUniform;

// Generates a chain of SVG curves that connect points x,y and x2,y2 with
// wobble and segments of segmentLength each.
// This is the work horse of the plugin that generates wobbly lines.
Raphael.drawnMidpoints = function(x, y, x2, y2, wobble, segmentLength) {
  var length = Math.pow((y2-y) * (y2-y) + (x2-x) * (x2-x), 0.5),
      segments = parseInt(length / segmentLength),
      points = [],
      segmentStartX,
      segmentStartY,
      segmentEndX,
      segmentEndY,
      midX1,
      midX2;
  for(var i = 1; i < segments; i++) {
    segmentStartX = x + (x2-x) * (i-1) / segments;
    segmentStartY = y + (y2-y) * (i-1) / segments;
    segmentEndX = x + (x2-x) * i/segments;
    segmentEndY = y + (y2-y) * i/segments;

    midX1 = Math.round(segmentStartX + (segmentStartX - segmentEndX) * -0.3 + Raphael.randomize(wobble));
    midX2 = Math.round(segmentStartX + (segmentStartX - segmentEndX) * -0.7 + Raphael.randomize(wobble));
    midY1 = Math.round(segmentStartY + (segmentStartY - segmentEndY) * -0.3 + Raphael.randomize(wobble));
    midY2 = Math.round(segmentStartY + (segmentStartY - segmentEndY) * -0.7 + Raphael.randomize(wobble));

    points.push(
      'C ' + midX1 + ' ' + midY1 + ' ' + midX2 + ' ' + midY2 + ' ' + segmentEndX + ' ' + segmentEndY
    );
  }
  return points.join(' ');
};

// Generates an SVG path string for hand drawing a line.
Raphael.fn.drawnLine = function (x, y, x2, y2, wobble) {
  var path = [
        "M",
        (x + Raphael.randomize(wobble/2)), (y + Raphael.randomize(wobble/2))
      ],
      segmentLength = 20;
  path.push(Raphael.drawnMidpoints(x, y, x2, y2, wobble, segmentLength));
  path.push(
    'L' + (x2 + Raphael.randomize(wobble/2)) + ' ' + (y2 + Raphael.randomize(wobble/2))
  );
  return this.path(path.join(' '));
};

// Generates an SVG path string for hand drawing a rectangle.
Raphael.fn.drawnRect = function (x, y, width, height, wobble) {
  var path = [
        "M",
        (x + Raphael.randomize(wobble/2)), (y + Raphael.randomize(wobble/2))
      ];
  var segmentLength = 20;
  path.push(Raphael.drawnMidpoints(x, y, x, y+height, wobble, segmentLength));
  path.push('L', x+Raphael.randomize(wobble/2), y+height+Raphael.randomize(wobble/2));

  path.push(Raphael.drawnMidpoints(x, y+height, x+width, y+height, wobble, segmentLength));
  path.push('L', x+width+Raphael.randomize(wobble/2), y+height+Raphael.randomize(wobble/2));

  path.push(Raphael.drawnMidpoints(x+width, y+height, x+width, y, wobble, segmentLength));
  path.push('L', x+width+Raphael.randomize(wobble/2), y+Raphael.randomize(wobble/2));

  path.push(Raphael.drawnMidpoints(x+width, y, x, y, wobble, segmentLength));
  path.push('Z');

  return this.path(path.join(' '));
};

// Generates an SVG path string for hand drawing a regular polygon.
Raphael.fn.drawnRegularPolygon = function(cx, cy, r, sides, wobble) {
  var segmentLength = 10,
      lastX, lastY,
      thisX, thisY,
      angle,
      path = ['M'];
  for (var i = 0; i <= sides; i++) {
    angle = i * 2 * Math.PI / sides;
    thisX = Math.round(cx + (r * Math.cos(angle)));
    thisY = Math.round(cy + (r * Math.sin(angle)));
    if(i > 0) {
      path.push(Raphael.drawnMidpoints(lastX, lastY, thisX, thisY, wobble, segmentLength));
      path.push('L');
    }
    path.push(
      (thisX + Raphael.randomize(wobble/2)),
      (thisY + Raphael.randomize(wobble/2))
    );
    lastX = thisX;
    lastY = thisY;
  }

  path.push('Z');
  return this.path(path.join(' '));
};

// Generates an SVG path string for hand drawing a circular arc.
// takes attrs like circularArc
Raphael.fn.drawnCircularArc = function(centerX, centerY, radius, startAngle, endAngle) {
  var outerRadius,
      wobble,
      degreeIncrement = parseInt(15 - Math.pow(radius, .33)) + 1,
      drawnPath = [],
      startAngle, endAngle,
      angle1, angle2,
      segmentStartX, segmentStartY,
      segmentEndX, segmentEndY,
      widerSegmentStartX, widerSegmentStartY,
      widerSegmentEndX, widerSegmentEndY,
      midx1, midX2,
      midY1, midY2;

  if(radius > 300) {
    wobble = (degreeIncrement + Math.sqrt(radius)) / 3;
  } else {
    wobble = (5 + Math.sqrt(radius)) / 3;
  }

  outerRadius = radius * (1.0 + degreeIncrement/1000);

  if(radius > 1500) {
    outerRadius = radius * (1.0 + degreeIncrement/radius);
  } else if(radius > 500) {
    outerRadius = outerRadius * 0.995;
  }

  startAngle  = startAngle % 360;
  endAngle    = endAngle % 360;
  if(startAngle < 0)  { startAngle += 360; }
  if(endAngle < 0)    { endAngle += 360; }
  if(endAngle < startAngle) endAngle += 360;

  for(var angle = startAngle; angle < endAngle; angle += degreeIncrement) {
    angle1 = angle * Math.PI/180;
    angle2 = (angle + degreeIncrement) * Math.PI/180;

    segmentStartX = parseInt(centerX + radius * Math.cos(angle1));
    segmentStartY = parseInt(centerY + radius * Math.sin(angle1));
    segmentEndX   = parseInt(centerX + radius * Math.cos(angle2));
    segmentEndY   = parseInt(centerY + radius * Math.sin(angle2));
    if(angle == startAngle) drawnPath.push('M ' + segmentStartX + ' ' + segmentStartY);

    widerSegmentStartX = parseInt(centerX + outerRadius * Math.cos(angle1));
    widerSegmentStartY = parseInt(centerY + outerRadius * Math.sin(angle1));
    widerSegmentEndX   = parseInt(centerX + outerRadius * Math.cos(angle2));
    widerSegmentEndY   = parseInt(centerY + outerRadius * Math.sin(angle2));
    midX1 = Math.round(widerSegmentStartX + (widerSegmentStartX-widerSegmentEndX) * -0.3 + Raphael.randomize(wobble));
    midX2 = Math.round(widerSegmentStartX + (widerSegmentStartX-widerSegmentEndX) * -0.7 + Raphael.randomize(wobble));
    midY1 = Math.round(widerSegmentStartY + (widerSegmentStartY-widerSegmentEndY) * -0.3 + Raphael.randomize(wobble));
    midY2 = Math.round(widerSegmentStartY + (widerSegmentStartY-widerSegmentEndY) * -0.7 + Raphael.randomize(wobble));
    drawnPath.push([
      'C', midX1, midY1, midX2, midY2, segmentEndX, segmentEndY
    ].join(' '));
  }
  return this.path(drawnPath.join(' '));
};

// Generates an SVG path string for hand drawing a circle.
Raphael.fn.drawnCircle = function(cx, cy, r, wobble) {
  // use regular polygon with 19 sides
  var sides = 19;
  return this.drawnRegularPolygon(cx, cy, r, sides, wobble);
}

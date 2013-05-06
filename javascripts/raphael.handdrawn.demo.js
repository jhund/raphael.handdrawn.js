var hdWidth = 630,
    hdHeight = 300;

$(function(){
  var paperLine = Raphael('handdrawnLine', hdWidth, hdHeight);
  for(var i = 1; i < (hdHeight - 10); i += 11) {
    paperLine.drawnLine(
      20,
      i + 2.5,
      hdWidth - 20,
      i + 2.5,
      (i / 30)
    ).attr({ stroke: "#999" });
  };

  var paperRect = Raphael("handdrawnRect", hdWidth, hdHeight);
  for(var i = 1; i < hdWidth - 100; i+= 50) {
    paperRect.drawnRect(
      100 - i/10,
      70 - i/10,
      i,
      i/2,
      i/50
    ).attr({stroke: "#999"});
  };

  var paperCircularArc = Raphael('handdrawnCircularArc', hdWidth, hdHeight);
  for(var i = 0; i < 75; i++) {
    var r = hdWidth + Raphael.randomize(100),
        cx = hdWidth/2
        endpointY = Raphael.randomize(hdHeight*1.2) - hdHeight*0.1,
        cy = endpointY - ((hdWidth/2) * 2),
        arc = paperCircularArc.drawnCircularArc(cx, cy, r, 60, 120);
    if(i%2 == 0) arc.rotate(180, cx, endpointY + (cy + r - endpointY) / 2);
  };

  var paperRegularPolygon = Raphael('handdrawnRegularPolygon', hdWidth, hdHeight);
  for(var i = 0; i < hdWidth+20; i+=100) {
    for(var j=0; j < hdHeight+20; j +=100) {
      paperRegularPolygon.drawnRegularPolygon(
        i,
        j,
        50 + Raphael.randomize(15),
        3 + Raphael.randomize(10, 5),
        2 + Raphael.randomize(5, 2)
      );
    };
  };

  var paperCircle = Raphael('handdrawnCircle', hdWidth, hdHeight);
  paperCircle.drawnCircle(
    hdWidth/2, hdHeight/2, 75, 5
  ).attr({
    stroke: "#000", fill: "#f00", "fill-opacity": 0.2
  });
  paperCircle.text(
    hdWidth/2,
    hdHeight/2,
    "Drawn using\ndrawnCircle"
  ).attr({
    "font-family": "'Shadows Into Light', cursive",
    "font-size": 18
  });

  var rnPaper = Raphael('rnPaper', hdWidth, hdHeight),
      uniform = {},
      normal1 = {},
      normal2 = {},
      range = 100,
      numSamples = 5000,
      xOffset;
  // initialize histogram containers
  for(var i = 0; i < (range * 2); i++) {
    uniform[i] = 0;
    normal1[i] = 0;
    normal2[i] = 0;
  }
  // generate random data
  for(var i = 0; i < numSamples; i++) {
    uniform[Raphael.randomizeUniform(range, range / 2)] += 1;
    normal1[Raphael.randomizeNormal1(range, range / 2)] += 1;
    normal2[Raphael.randomizeNormal2(range, range / 2)] += 1;
  };
  // render uniform distribution
  xOffset = 0 * (range + 20);
  for(var i = 0; i < (range * 2); i++) {
    rnPaper.path('M' + (i + xOffset) + ' ' + hdHeight + 'L' + (i + xOffset) + ' ' + (hdHeight - uniform[i])).translate(0.5, 0.5);
  };
  rnPaper.path('M' + xOffset + ' 0L' + xOffset + ' ' + hdHeight).attr({ stroke: "#f00" }).translate(0.5, 0.5);
  rnPaper.path('M' + (xOffset + range) + ' 0L' + (xOffset + range) + ' ' + hdHeight).translate(0.5, 0.5).attr({ stroke: "#f00" });
  // render normal1 distribution
  xOffset = 1 * (range + 20);
  for(var i = 0; i < (range * 2); i++) {
    rnPaper.path('M' + (i + xOffset) + ' ' + hdHeight + 'L' + (i + xOffset) + ' ' + (hdHeight - normal1[i])).translate(0.5, 0.5);
  };
  rnPaper.path('M' + xOffset + ' 0L' + xOffset + ' ' + hdHeight).attr({ stroke: "#f00" }).translate(0.5, 0.5);
  rnPaper.path('M' + (xOffset + range) + ' 0L' + (xOffset + range) + ' ' + hdHeight).translate(0.5, 0.5).attr({ stroke: "#f00" });
  // render normal2 distribution
  xOffset = 2 * (range + 20);
  for(var i = 0; i < (range * 2); i++) {
    rnPaper.path('M' + (i + xOffset) + ' ' + hdHeight + 'L' + (i + xOffset) + ' ' + (hdHeight - normal2[i])).translate(0.5, 0.5);
  };
  rnPaper.path('M' + xOffset + ' 0L' + xOffset + ' ' + hdHeight).attr({ stroke: "#f00" }).translate(0.5, 0.5);
  rnPaper.path('M' + (xOffset + range) + ' 0L' + (xOffset + range) + ' ' + hdHeight).translate(0.5, 0.5).attr({ stroke: "#f00" });
});

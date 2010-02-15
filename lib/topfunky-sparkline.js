
/*jslint white: false, onevar: true, browser: true, devel: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true */
/*global Raphael */

//   Usage:
//   new TopfunkySparkline('chart',
//                [42, 15, 21, 7],
//                { width:400,
//                  height:30,
//                  title:"Monthly Revenue",
//                  target:25,
//                  goodThreshold:20});

function TopfunkySparkline(elementName, datapoints, opts) {

  if ( !(this instanceof arguments.callee) ) {
    return new arguments.callee(elementName, datapoints, opts);
  }

  this.width  = opts.width;
  this.height = opts.height;

  this.barWidth      = opts.barWidth      || 3;
  this.spacing       = opts.spacing       || 1;
  this.colorGood     = opts.colorGood     || "#6699cc";
  this.colorBad      = opts.colorBad      || "#a8c0d8";
  this.colorTarget   = opts.colorTarget   || "#ffffcc";
  this.goodThreshold = opts.goodThreshold || 20;
  this.target        = opts.target        || 15;

  ////
  // Runs Math.ceil on all arguments to make a crisp rectangle.
  // For best results, use a solid 1px stroke.

  this.crispRect = function (x, y, width, height) {
    return this.paper.rect(Math.ceil(x),
                           Math.ceil(y),
                           Math.ceil(width > 0 ? width-1 : width),
                           Math.ceil(height > 0 ? height-1 : height)
                          );
  };

  this.crispLine = function (x, y, width, height) {
    return this.paper.path("M {x} {y} l {width} {height}".supplant({
      'x': Math.ceil(x),
      'y': Math.ceil(y),
      'width': Math.ceil(width),
      'height': Math.ceil(height)
    }));
  };

  this.draw = function () {

    this.paper = Raphael(elementName, this.width, this.height);

    // Normalize
    var normalizedDatapoints = [],
      maximumDatavalue = Math.max.apply( Math, datapoints ),
      i = 0,
      barColor,
      xOffset,
      yOffset,
      bar,
      targetLine;

    for (i = 0; i < datapoints.length; i = i+1) {
      normalizedDatapoints[i] = datapoints[i] / maximumDatavalue;
    }

    // Bars
    for (i = 0; i < datapoints.length; i = i+1) {
      if (datapoints[i] >= this.goodThreshold) {
        barColor = this.colorGood;
      } else {
        barColor = this.colorBad;
      }

      xOffset = i*(this.barWidth + this.spacing) + this.width - datapoints.length*(this.barWidth + this.spacing);
      yOffset = this.height - normalizedDatapoints[i] * this.height;
      bar = this.crispRect(xOffset,
                           yOffset,
                           this.barWidth,
                           normalizedDatapoints[i] * this.height);
      bar.attr({
        stroke: barColor,
        fill: barColor
      });
    }

    // Target line
    targetLine = this.crispLine(0,
                                this.height - (this.target/maximumDatavalue)*this.height,
                                this.width,
                                0);
    targetLine.attr({stroke: this.colorTarget, fill: 'transparent'});

    // Title
    if (opts.title) {
      this.paper.text(0, 9, opts.title).attr({
        "text-anchor": "start",
        "font-family": "'Myriad Pro', 'Lucida Grande', 'Helvetica Neue', Helvetica, sans-serif",
        "font-weight": "bold",
        "font-size": 12,
        "fill": "white"
      });
      this.paper.text(0, 8, opts.title).attr({
        "text-anchor": "start",
        "font-family": "'Myriad Pro', 'Lucida Grande', 'Helvetica Neue', Helvetica, sans-serif",
        "font-weight": "bold",
        "font-size": 12,
        "fill": "black"
      });
    }
  };

  this.draw();
}


  // "{animal} on a {transport}".supplant({animal: "frog", transport: "rocket"})
  String.prototype.supplant = function (o) {
    return this.replace(/\{([^{}]*)\}/g,
                        function (a, b) {
                          var r = o[b];
                          return typeof r === 'string' || typeof r === 'number' ? r : a;
                        }
                       );
  };


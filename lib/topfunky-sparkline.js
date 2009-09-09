//= require "raphael-min"
//= require "cufon-yui"
//= require "04b21_400.font"

/*
  Usage:
  TopfunkySparkline('chart',
               [42, 15, 21, 7],
               { width:400,
                 height:30,
                 title:"Monthly Revenue",
                 target:25,
                 good_threshold:20});
*/
var TopfunkySparkline = function(elementName, datapoints, opts) {

  this.width  = opts.width;
  this.height = opts.height;

  this.bar_width      = opts.bar_width      || 3;
  this.spacing        = opts.spacing        || 1;
  this.color_good     = opts.color_good     || "#6699cc";
  this.color_bad      = opts.color_bad      || "#a8c0d8";
  this.color_target   = opts.color_target   || "#ffffcc";
  this.good_threshold = opts.good_threshold || 20;
  this.target         = opts.target         || 15;

  this.paper = Raphael(elementName, this.width, this.height);

  // Normalize
  var normalizedDatapoints = [];
  var maximumDatavalue = Math.max.apply( Math, datapoints );

  for (var i = 0; i < datapoints.length; i++) {
    normalizedDatapoints[i] = datapoints[i] / maximumDatavalue;
  }

  // Bars
  for (var i = 0; i < datapoints.length; i++) {
    var bar_color;
    if (datapoints[i] >= good_threshold)
      bar_color = color_good;
    else
      bar_color = color_bad;

    var x_offset = i*(bar_width+spacing) + this.width - datapoints.length*(bar_width+spacing);
    var y_offset = parseInt(height - normalizedDatapoints[i]*height);
    var bar = paper.rect(x_offset,
               y_offset,
               bar_width,
               Math.ceil(normalizedDatapoints[i]*height))
    bar.attr({stroke:'transparent', fill:bar_color});
  }

  // Target line
  var targetLine = paper.rect(0, parseInt(height - (target/maximumDatavalue)*height), width, 1)
  targetLine.attr({stroke:"transparent", fill:color_target});

  // Text title
  var titleObject = paper.print(2,
                                (this.height - 6),
                                opts.title.toUpperCase(),
                                paper.getFont("04b21", 400), 8);
  var titleWidth  = titleObject.getBBox().width;
  paper.rect(0, (this.height - 12),
            titleWidth + 6, 12).attr({stroke:'transparent', fill:'white'});

  // HACK: Redraw title over background after font calculations
  paper.print(2, (this.height - 6),
              opts.title.toUpperCase(), paper.getFont("04b21", 400), 8).attr({fill:"#555555"});
}


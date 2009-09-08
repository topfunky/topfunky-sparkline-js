//= require "cufon-yui"
//= require "04b21_400.font"
//= require "raphael-min"

var JSSparklines = function(elementName, datapoints, opts) {

  this.width = opts.width;
  this.height = opts.height;

  // TODO: Use opts or defaults
  this.bar_width      = 3;
  this.spacing        = 1;
  this.color_good     = "#6699cc";
  this.color_bad      = "#a8c0d8";
  this.color_target   = "#ffffcc";
  this.good_threshold = 20;

  this.paper = Raphael(elementName, this.width, this.height);

  // Outline
  var r = paper.rect(0, 0, width, height);
  r.attr({stroke:"#e0e0e0"});

  // TODO: Normalize

  for (var i = 0; i < datapoints.length; i++) {
    var c = paper.rect((i*(bar_width+spacing)), (height - datapoints[i]), 
                       bar_width, datapoints[i]);

    c.attr({stroke:'transparent'});
    if (datapoints[i] >= good_threshold)
      c.animate({fill:color_good}, 1000);
    else
      c.animate({fill:color_bad}, 1000);
  }
  
  paper.rect(0, (this.height - 9), 60, 9).attr({stroke:'transparent', fill:'white'});
  
  paper.print(2, (this.height - 6), 
              opts.title.toUpperCase(), paper.getFont("04b21", 400), 8);
  
}

JSSparklines('chart', [21, 10, 3, 24, 18, 50, 0, 1, 45, 29], {width:400, height:30, title:"Sparklines"});


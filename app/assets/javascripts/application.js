// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

/* © 2009 ROBO Design
 * http://www.robodesign.ro
 */

// Keep everything in anonymous function, called on window load.
// var tool;
var xyz;
if(window.addEventListener) {
window.addEventListener('load', function () {
  var canvas, context, tool;

  function init () {
    // Find the canvas element.
    canvas = document.getElementById('imageView');
    // if (!canvas) {
    //   alert('Error: I cannot find the canvas element!');
    //   return;
    // }

    // if (!canvas.getContext) {
    //   alert('Error: no canvas.getContext!');
    //   return;
    // }

    // // Get the 2D canvas context.
    context = canvas.getContext('2d');
    // context.strokeStyle("#ff0000")
    // if (!context) {
    //   alert('Error: failed to getContext!');
    //   return;
    // }

    // Pencil tool instance.
    tool = new tool_pencil();

    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);

	red = document.getElementById("red");
    red.addEventListener("click", change_color, false);

    orange = document.getElementById("orange");
    orange.addEventListener("click", change_color, false);

    yellow = document.getElementById("yellow");
    yellow.addEventListener("click", change_color, false);

    green = document.getElementById("green");
    green.addEventListener("click", change_color, false);

    blue = document.getElementById("blue");
    blue.addEventListener("click", change_color, false);

    purple = document.getElementById("purple");
    purple.addEventListener("click", change_color, false);

    brown = document.getElementById("brown");
    brown.addEventListener("click", change_color, false);

    black = document.getElementById("black");
    black.addEventListener("click", change_color, false);

  }

    function change_color() {
    	console.log(this.getAttribute("id"));
    	context.strokeStyle = this.getAttribute("id");
    }

  // This painting tool works like a drawing pencil which tracks the mouse 
  // movements.
  function tool_pencil () {
    var tool = this;
    this.started = false;
    xyz = true;

    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        // if (CountDownTimer.running){
        	tool.started = xyz;
        // }
        
    };

    // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
      }
    };

    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };
  }

  // The general-purpose event handler. This function just determines the mouse 
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  init();

  // var myVar = setInterval (function(){
  // 	myTimer()
  // })

}, false); }

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};

window.onload = function () {
    var display = document.querySelector('#time'),
        timer = new CountDownTimer(20),
        timeObj = CountDownTimer.parse(20);

    format(timeObj.minutes, timeObj.seconds);
    
    timer.onTick(format);
    
    document.querySelector('canvas').addEventListener('mousedown', function () {
        if (xyz == true) {
        	timer.start();
        }
    });
    
    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
        if (display.textContent == "00:00") {
        	display.textContent = "Time's up!";
        	document.getElementById("game_over").innerHTML = "<a href='/games/categories'><button class='btn btn-primary'>Play Again</button></a> <a href='/sessions'><button class='btn btn-info'>Switch Player</button></a>";
        	xyz = false;
        }
    }
};
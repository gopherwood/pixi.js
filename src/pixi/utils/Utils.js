// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

/**
 * A polyfill for requestAnimationFrame
 *
 * @method requestAnimationFrame
 */
/**
 * A polyfill for cancelAnimationFrame
 *
 * @method cancelAnimationFrame
 */
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

window.requestAnimFrame = window.requestAnimationFrame;

/**
 * Converts a hex color number to an [R, G, B] array
 *
 * @method HEXtoRGB
 * @param hex {Number}
 */
function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}

/**
 * A polyfill for Function.prototype.bind
 *
 * @method bind
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
 
      if (typeof target != 'function') throw new TypeError();
 
      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }
 
      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);
 
      return bound;
    };
  })();
}

/**
 * A wrapper for ajax requests to be handled cross browser
 *
 * @class AjaxRequest
 * @constructor
 */
var AjaxRequest = PIXI.AjaxRequest = function()
{
	var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
	
	if (window.ActiveXObject)
	{ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		for (var i=0; i<activexmodes.length; i++)
		{
			try{
				return new ActiveXObject(activexmodes[i])
			}
   			catch(e){
    			//suppress error
   			}
		}
	}
	else if (window.XMLHttpRequest) // if Mozilla, Safari etc
  	{
  		return new XMLHttpRequest()
 	}
 	else
 	{
		return false;
 	}
}

/**
 * @method filenameFromUrl
 * @param {String} url The url to pull the filename from.
 * @return {String} The filename (including extension).
 */
function filenameFromUrl(url)
{
	var name = url.substring(url.lastIndexOf("/") + 1);
	if(name.indexOf("?") != -1)
		name = name.substring(0, name.indexOf("?"));
	return name;
}

Math.PI_OVER_180 = Math.PI / 180;

/*
 * DEBUGGING ONLY
 */
PIXI.runList = function(item)
{
	console.log(">>>>>>>>>")
	console.log("_")
	var safe = 0;
	var tmp = item.first;
	console.log(tmp);
	
	while(tmp._iNext)
	{
		safe++;
//		console.log(tmp.childIndex + tmp);
		tmp = tmp._iNext;
		console.log(tmp);//.childIndex);
	//	console.log(tmp);
	
		if(safe > 100)
		{
			console.log("BREAK")
			break
		}
	}	
}





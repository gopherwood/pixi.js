/**
 * @license
 * Pixi.JS - v1.3.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2014-01-09
 *
 * Pixi.JS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

(function(){

	var root = this;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * @module PIXI
 */
var PIXI = PIXI || {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 *
 * @class Point
 * @constructor
 * @param x {Number} position of the point
 * @param y {Number} position of the point
 */
PIXI.Point = function(x, y)
{
	/**
	 * @property x
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;

	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
}

/**
 * Creates a clone of this point
 *
 * @method clone
 * @return {Point} a copy of the point
 */
PIXI.Point.prototype.clone = function()
{
	return new PIXI.Point(this.x, this.y);
}

/**
 * Returns the dot product between this point and another one.
 * @method dotProd 
 * @param other {Point} The point to form a dot product with
 * @return The dot product between the two points.
 */
PIXI.Point.prototype.dotProd = function(other)
{
	return this.x * other.x + this.y * other.y;
}

/**
 * Returns the length (or magnitude) of this point.
 * @method length
 * @return The length of this point.
 */
PIXI.Point.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

/**
 * Returns the squared length (or magnitude) of this point. This is faster than length().
 * @method lengthSq
 * @return The length squared of this point.
 */
PIXI.Point.prototype.lengthSq = function()
{
	return this.x * this.x + this.y * this.y;
}

/**
 * Reduces the point to a length of 1.
 * @method normalize
 */
PIXI.Point.prototype.normalize = function()
{
	var oneOverLen = 1 / this.length();
	this.x *= oneOverLen;
	this.y *= oneOverLen;
}

/**
 * Subtracts the x and y values of a point from this point.
 * @method subtract 
 * @param other {Point} The point to subtract from this one
 */
PIXI.Point.prototype.subtract = function(other)
{
	this.x -= other.x;
	this.y -= other.y;
}

/**
 * Adds the x and y values of a point to this point.
 * @method add 
 * @param other {Point} The point to add to this one
 */
PIXI.Point.prototype.add = function(other)
{
	this.x += other.x;
	this.y += other.y;
}

/**
 * Truncate the length of the point to a maximum.
 * @method truncate 
 * @param maxLength {Number} The maximum length to allow in this point.
 */
PIXI.Point.prototype.truncate = function(maxLength)
{
	var l = this.length();
	if(l > maxLength)
	{
		var maxOverLen = maxLength / l;
		this.x *= maxOverLen;
		this.y *= maxOverLen;	
	}
}

/**
 * Multiplies the x and y values of this point by a value.
 * @method scaleBy 
 * @param value {Number} The value to scale by.
 */
PIXI.Point.prototype.scaleBy = function(value)
{
	this.x *= value;
	this.y *= value;
}

// constructor
PIXI.Point.prototype.constructor = PIXI.Point;


/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 *
 * @class Rectangle
 * @constructor
 * @param x {Number} The X coord of the upper-left corner of the rectangle
 * @param y {Number} The Y coord of the upper-left corner of the rectangle
 * @param width {Number} The overall width of this rectangle
 * @param height {Number} The overall height of this rectangle
 */
PIXI.Rectangle = function(x, y, width, height)
{
	/**
	 * @property x
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;

	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;

	/**
	 * @property width
	 * @type Number
	 * @default 0
	 */
	this.width = width || 0;

	/**
	 * @property height
	 * @type Number
	 * @default 0
	 */
	this.height = height || 0;
}

/**
 * Creates a clone of this Rectangle
 *
 * @method clone
 * @return {Rectangle} a copy of the rectangle
 */
PIXI.Rectangle.prototype.clone = function()
{
	return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this Rectangle
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this Rectangle
 */
PIXI.Rectangle.prototype.contains = function(x, y)
{
    if(this.width <= 0 || this.height <= 0)
        return false;

	var x1 = this.x;
	if(x >= x1 && x <= x1 + this.width)
	{
		var y1 = this.y;

		if(y >= y1 && y <= y1 + this.height)
		{
			return true;
		}
	}

	return false;
}

// constructor
PIXI.Rectangle.prototype.constructor = PIXI.Rectangle;


/**
 * @author Adrien Brault <adrien.brault@gmail.com>
 */

/**
 * @class Polygon
 * @constructor
 * @param points* {Array<Point>|Array<Number>|Point...|Number...} This can be an array of Points that form the polygon,
 *      a flat array of numbers that will be interpreted as [x,y, x,y, ...], or the arguments passed can be
 *      all the points of the polygon e.g. `new PIXI.Polygon(new PIXI.Point(), new PIXI.Point(), ...)`, or the
 *      arguments passed can be flat x,y values e.g. `new PIXI.Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are
 *      Numbers.
 */
PIXI.Polygon = function(points)
{
    //if points isn't an array, use arguments as the array
    if(!(points instanceof Array))
        points = Array.prototype.slice.call(arguments);

    //if this is a flat array of numbers, convert it to points
    if(typeof points[0] === 'number') {
        var p = [];
        for(var i = 0, il = points.length; i < il; i+=2) {
            p.push(
                new PIXI.Point(points[i], points[i + 1])
            );
        }

        points = p;
    }

	this.points = points;
}

/**
 * Creates a clone of this polygon
 *
 * @method clone
 * @return {Polygon} a copy of the polygon
 */
PIXI.Polygon.prototype.clone = function()
{
	var points = [];
	for (var i=0; i<this.points.length; i++) {
		points.push(this.points[i].clone());
	}

	return new PIXI.Polygon(points);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this polygon
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this polygon
 */
PIXI.Polygon.prototype.contains = function(x, y)
{
    var inside = false;

    // use some raycasting to test hits
    // https://github.com/substack/point-in-polygon/blob/master/index.js
	var p = this.points;
    for(var i = 0, len = p.length, j = p.length - 1; i < len; j = i++) {
		var pi = p[i], pj = p[j];
        var xi = pi.x, yi = pi.y,
            xj = pj.x, yj = pj.y,
            intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if(intersect) inside = !inside;
    }

    return inside;
}

// constructor
PIXI.Polygon.prototype.constructor = PIXI.Polygon;

/**
 * @author Chad Engler <chad@pantherdev.com>
 */

/**
 * The Circle object can be used to specify a hit area for displayobjects
 *
 * @class Circle
 * @constructor
 * @param x {Number} The X coord of the upper-left corner of the framing rectangle of this circle
 * @param y {Number} The Y coord of the upper-left corner of the framing rectangle of this circle
 * @param radius {Number} The radius of the circle
 */
PIXI.Circle = function(x, y, radius)
{
    /**
     * @property x
     * @type Number
     * @default 0
     */
    this.x = x || 0;

    /**
     * @property y
     * @type Number
     * @default 0
     */
    this.y = y || 0;

    /**
     * @property radius
     * @type Number
     * @default 0
     */
    this.radius = radius || 0;
}

/**
 * Creates a clone of this Circle instance
 *
 * @method clone
 * @return {Circle} a copy of the polygon
 */
PIXI.Circle.prototype.clone = function()
{
    return new PIXI.Circle(this.x, this.y, this.radius);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this circle
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this polygon
 */
PIXI.Circle.prototype.contains = function(x, y)
{
    if(this.radius <= 0)
        return false;

    var dx = (this.x - x),
        dy = (this.y - y),
        r2 = this.radius * this.radius;

    dx *= dx;
    dy *= dy;

    return (dx + dy <= r2);
}

// constructor
PIXI.Circle.prototype.constructor = PIXI.Circle;


/**
 * @author Chad Engler <chad@pantherdev.com>
 */

/**
 * The Ellipse object can be used to specify a hit area for displayobjects
 *
 * @class Ellipse
 * @constructor
 * @param x {Number} The X coord of the upper-left corner of the framing rectangle of this ellipse
 * @param y {Number} The Y coord of the upper-left corner of the framing rectangle of this ellipse
 * @param width {Number} The overall width of this ellipse
 * @param height {Number} The overall height of this ellipse
 */
PIXI.Ellipse = function(x, y, width, height)
{
    /**
     * @property x
     * @type Number
     * @default 0
     */
    this.x = x || 0;

    /**
     * @property y
     * @type Number
     * @default 0
     */
    this.y = y || 0;

    /**
     * @property width
     * @type Number
     * @default 0
     */
    this.width = width || 0;

    /**
     * @property height
     * @type Number
     * @default 0
     */
    this.height = height || 0;
}

/**
 * Creates a clone of this Ellipse instance
 *
 * @method clone
 * @return {Ellipse} a copy of the ellipse
 */
PIXI.Ellipse.prototype.clone = function()
{
    return new PIXI.Ellipse(this.x, this.y, this.width, this.height);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this ellipse
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this ellipse
 */
PIXI.Ellipse.prototype.contains = function(x, y)
{
    if(this.width <= 0 || this.height <= 0)
        return false;

    //normalize the coords to an ellipse with center 0,0
    //and a radius of 0.5
    var normx = ((x - this.x) / this.width) - 0.5,
        normy = ((y - this.y) / this.height) - 0.5;

    normx *= normx;
    normy *= normy;

    return (normx + normy < 0.25);
}

PIXI.Ellipse.getBounds = function()
{
    return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

// constructor
PIXI.Ellipse.prototype.constructor = PIXI.Ellipse;



/*
 * A lighter version of the rad gl-matrix created by Brandon Jones, Colin MacKenzie IV
 * you both rock!
 */

function determineMatrixArrayType() {
    PIXI.Matrix = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
    return PIXI.Matrix;
}

determineMatrixArrayType();

PIXI.mat3 = {};

PIXI.mat3.create = function()
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;

	return matrix;
}


PIXI.mat3.identity = function(matrix)
{
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;

	return matrix;
}


PIXI.mat4 = {};

PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;

	return matrix;
}

PIXI.mat3.multiply = function (mat, mat2, dest)
{
	if (!dest) { dest = mat; }

	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2],
	    a10 = mat[3], a11 = mat[4], a12 = mat[5],
	    a20 = mat[6], a21 = mat[7], a22 = mat[8],

	    b00 = mat2[0], b01 = mat2[1], b02 = mat2[2],
	    b10 = mat2[3], b11 = mat2[4], b12 = mat2[5],
	    b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];

	dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
	dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
	dest[2] = b00 * a02 + b01 * a12 + b02 * a22;

	dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
	dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
	dest[5] = b10 * a02 + b11 * a12 + b12 * a22;

	dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
	dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
	dest[8] = b20 * a02 + b21 * a12 + b22 * a22;

	return dest;
}

PIXI.mat3.clone = function(mat)
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = mat[0];
	matrix[1] = mat[1];
	matrix[2] = mat[2];
	matrix[3] = mat[3];
	matrix[4] = mat[4];
	matrix[5] = mat[5];
	matrix[6] = mat[6];
	matrix[7] = mat[7];
	matrix[8] = mat[8];

	return matrix;
}

PIXI.mat3.transpose = function (mat, dest)
{
 	// If we are transposing ourselves we can skip a few steps but have to cache some values
    if (!dest || mat === dest) {
        var a01 = mat[1], a02 = mat[2],
            a12 = mat[5];

        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
        return mat;
    }

    dest[0] = mat[0];
    dest[1] = mat[3];
    dest[2] = mat[6];
    dest[3] = mat[1];
    dest[4] = mat[4];
    dest[5] = mat[7];
    dest[6] = mat[2];
    dest[7] = mat[5];
    dest[8] = mat[8];
    return dest;
}

PIXI.mat3.toMat4 = function (mat, dest)
{
	if (!dest) { dest = PIXI.mat4.create(); }

	dest[15] = 1;
	dest[14] = 0;
	dest[13] = 0;
	dest[12] = 0;

	dest[11] = 0;
	dest[10] = mat[8];
	dest[9] = mat[7];
	dest[8] = mat[6];

	dest[7] = 0;
	dest[6] = mat[5];
	dest[5] = mat[4];
	dest[4] = mat[3];

	dest[3] = 0;
	dest[2] = mat[2];
	dest[1] = mat[1];
	dest[0] = mat[0];

	return dest;
}


/////


PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;

	return matrix;
}

PIXI.mat4.transpose = function (mat, dest)
{
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if (!dest || mat === dest)
	{
	    var a01 = mat[1], a02 = mat[2], a03 = mat[3],
	        a12 = mat[6], a13 = mat[7],
	        a23 = mat[11];

	    mat[1] = mat[4];
	    mat[2] = mat[8];
	    mat[3] = mat[12];
	    mat[4] = a01;
	    mat[6] = mat[9];
	    mat[7] = mat[13];
	    mat[8] = a02;
	    mat[9] = a12;
	    mat[11] = mat[14];
	    mat[12] = a03;
	    mat[13] = a13;
	    mat[14] = a23;
	    return mat;
	}

	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
}

PIXI.mat4.multiply = function (mat, mat2, dest)
{
	if (!dest) { dest = mat; }

	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
	var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
	var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

	// Cache only the current line of the second matrix
    var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
    dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[4];
    b1 = mat2[5];
    b2 = mat2[6];
    b3 = mat2[7];
    dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[8];
    b1 = mat2[9];
    b2 = mat2[10];
    b3 = mat2[11];
    dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[12];
    b1 = mat2[13];
    b2 = mat2[14];
    b3 = mat2[15];
    dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    return dest;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The base class for all objects that are rendered on the screen.
 *
 * @class DisplayObject
 * @constructor
 */
PIXI.DisplayObject = function()
{
	this.last = this;
	this.first = this;
	/**
	 * The coordinate of the object relative to the local coordinates of the parent.
	 *
	 * @property position
	 * @type Point
	 */
	this.position = new PIXI.Point();

	/**
	 * The scale factor of the object.
	 *
	 * @property scale
	 * @type Point
	 */
	this.scale = new PIXI.Point(1,1);//{x:1, y:1};

	/**
	 * The pivot point of the displayObject that it rotates around
	 *
	 * @property pivot
	 * @type Point
	 */
	this.pivot = new PIXI.Point(0,0);

	/**
	 * The rotation of the object in radians.
	 *
	 * @property rotation
	 * @type Number
	 */
	this.rotation = 0;

	/**
	 * The opacity of the object.
	 *
	 * @property alpha
	 * @type Number
	 */	
	this.alpha = 1;

	/**
	 * The visibility of the object.
	 *
	 * @property visible
	 * @type Boolean
	 */	
	this.visible = true;

	/**
	 * This is the defined area that will pick up mouse / touch events. It is null by default.
	 * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
	 *
	 * @property hitArea
	 * @type Rectangle|Circle|Ellipse|Polygon
	 */	
	this.hitArea = null;

	/**
	 * This is used to indicate if the displayObject should display a mouse hand cursor on rollover
	 *
	 * @property buttonMode
	 * @type Boolean
	 */
	this.buttonMode = false;

	/**
	 * Can this object be rendered
	 *
	 * @property renderable
	 * @type Boolean
	 */
	this.renderable = false;

	/**
	 * [read-only] The display object container that contains this display object.
	 *
	 * @property parent
	 * @type DisplayObjectContainer
	 * @readOnly
	 */	
	this.parent = null;

	/**
	 * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
	 *
	 * @property stage
	 * @type Stage
	 * @readOnly
	 */	
	this.stage = null;

	/**
	 * [read-only] The multiplied alpha of the displayobject
	 *
	 * @property worldAlpha
	 * @type Number
	 * @readOnly
	 */
	this.worldAlpha = 1;

	/**
	 * [read-only] Whether or not the object is interactive, do not toggle directly! use the `interactive` property
	 *
	 * @property _interactive
	 * @type Boolean
	 * @readOnly
	 * @private
	 */
	this._interactive = false;

	/**
	 * [read-only] Current transform of the object based on world (parent) factors
	 *
	 * @property worldTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.worldTransform = PIXI.mat3.create()//mat3.identity();

	/**
	 * [read-only] Current transform of the object locally
	 *
	 * @property localTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.localTransform = PIXI.mat3.create()//mat3.identity();

	/**
	 * [NYI] Unkown
	 *
	 * @property color
	 * @type Array<>
	 * @private
	 */
	this.color = [];

	/**
	 * [NYI] Holds whether or not this object is dynamic, for rendering optimization
	 *
	 * @property dynamic
	 * @type Boolean
	 * @private
	 */
	this.dynamic = true;
	
	this._width = 0;
	this._height = 0;

	// chach that puppy!
	this._sr = 0;
	this._cr = 1;


	this.filterArea = new PIXI.Rectangle(0,0,1,1);
	
	/*
	 * MOUSE Callbacks
	 */

	/**
	 * A callback that is used when the users clicks on the displayObject with their mouse
	 * @method click
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user clicks the mouse down over the sprite
	 * @method mousedown
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases the mouse that was over the displayObject
	 * for this callback to be fired the mouse must have been pressed down over the displayObject
	 * @method mouseup
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
	 * for this callback to be fired, The touch must have started over the displayObject
	 * @method mouseupoutside
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the users mouse rolls over the displayObject
	 * @method mouseover
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the users mouse leaves the displayObject
	 * @method mouseout
	 * @param interactionData {InteractionData}
	 */


	/*
	 * TOUCH Callbacks
	 */

	/**
	 * A callback that is used when the users taps on the sprite with their finger
	 * basically a touch version of click
	 * @method tap
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user touch's over the displayObject
	 * @method touchstart
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases a touch over the displayObject
	 * @method touchend
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases the touch that was over the displayObject
	 * for this callback to be fired, The touch must have started over the sprite
	 * @method touchendoutside
	 * @param interactionData {InteractionData}
	 */
}

// constructor
PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;

/**
 * Placeholder so that generic code can at least read a value of 0.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'width', {
    get: function() {
        return this._width;// * this.scale.x;
    },
    set: function(value) {
		this._width = value;// / this.scale.x;
    }
});

/**
 * Placeholder so that generic code can at least read a value of 0.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'height', {
    get: function() {
        return this._height;// * this.scale.y;
    },
    set: function(value) {
		this._height = value;// / this.scale.y;
    }
});

/**
 * [Deprecated] Indicates if the sprite will have touch and mouse interactivity. It is false by default
 * Instead of using this function you can now simply set the interactive property to true or false
 *
 * @method setInteractive
 * @param interactive {Boolean}
 * @deprecated Simply set the `interactive` property directly
 */
PIXI.DisplayObject.prototype.setInteractive = function(interactive)
{
	this.interactive = interactive;
}

/**
 * Indicates if the sprite will have touch and mouse interactivity. It is false by default
 *
 * @property interactive
 * @type Boolean
 * @default false
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'interactive', {
    get: function() {
        return this._interactive;
    },
    set: function(value) {
    	this._interactive = value;
    	
    	// TODO more to be done here..
		// need to sort out a re-crawl!
		if(this.stage)this.stage.dirty = true;
    }
});

/**
 * Sets a mask for the displayObject. A mask is an object that limits the visibility of an object to the shape of the mask applied to it.
 * In PIXI a regular mask must be a PIXI.Ggraphics object. This allows for much faster masking in canvas as it utilises shape clipping.
 * To remove a mask, set this property to null.
 *
 * @property mask
 * @type Graphics
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'mask', {
    get: function() {
        return this._mask;
    },
    set: function(value) {
    	
    	
        if(value)
        {
        	if(this._mask)
	    	{
	    		value.start = this._mask.start;
	    		value.end = this._mask.end;
	    	}
    		else
    		{
		        this.addFilter(value);
		        value.renderable = false;
    		}
        }
        else
        {
        	 this.removeFilter(this._mask);
			 this._mask.renderable = true;
        }
        
        this._mask = value;
    }
});

/**
 * Sets the filters for the displayObject. 
 * * IMPORTANT: This is a webGL only feature and will be ignored by the canvas renderer.
 * To remove filters simply set this property to 'null'
 * @property filters
 * @type Array An array of filters
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'filters', {
    get: function() {
        return this._filters;
    },
    set: function(value) {
    	
        if(value)
        {
        	if(this._filters)this.removeFilter(this._filters);
	        this.addFilter(value);

		    // now put all the passes in one place..
	        var passes = [];
	        for (var i = 0; i < value.length; i++) 
	        {
	        	var filterPasses = value[i].passes;
	        	for (var j = 0; j < filterPasses.length; j++) 
	        	{
	        		passes.push(filterPasses[j]);
	        	};
	        };

	        value.start.filterPasses = passes;
        }
        else
        {
        	if(this._filters)this.removeFilter(this._filters);
        }
        
        this._filters = value;

       

        
    }
});

/*
 * Adds a filter to this displayObject
 *
 * @method addFilter
 * @param mask {Graphics} the graphics object to use as a filter
 * @private
 */
PIXI.DisplayObject.prototype.addFilter = function(data)
{
	//if(this.filter)return;
	//this.filter = true;
//	data[0].target = this;
	

	// insert a filter block..
	// TODO Onject pool thease bad boys..
	var start = new PIXI.FilterBlock();
	var end = new PIXI.FilterBlock();
	
	data.start = start;
	data.end = end;
	
	start.data = data;
	end.data = data;
	
	start.first = start.last =  this;
	end.first = end.last = this;
	
	start.open = true;
	
	start.target = this;
	
	/*
	 * insert start
	 */
	
	var childFirst = start
	var childLast = start
	var nextObject;
	var previousObject;
		
	previousObject = this.first._iPrev;
	
	if(previousObject)
	{
		nextObject = previousObject._iNext;
		childFirst._iPrev = previousObject;
		previousObject._iNext = childFirst;		
	}
	else
	{
		nextObject = this;
	}	
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	
	// now insert the end filter block..
	
	/*
	 * insert end filter
	 */
	var childFirst = end
	var childLast = end
	var nextObject = null;
	var previousObject = null;
		
	previousObject = this.last;
	nextObject = previousObject._iNext;
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	childFirst._iPrev = previousObject;
	previousObject._iNext = childFirst;	
	
	var updateLast = this;
	
	var prevLast = this.last;
	while(updateLast)
	{
		if(updateLast.last == prevLast)
		{
			updateLast.last = end;
		}
		updateLast = updateLast.parent;
	}
	
	this.first = start;
	
	// if webGL...
	if(this.__renderGroup)
	{
		this.__renderGroup.addFilterBlocks(start, end);
	}
	
}

/*
 * Removes the filter to this displayObject
 *
 * @method removeFilter
 * @private
 */
PIXI.DisplayObject.prototype.removeFilter = function(data)
{
	//if(!this.filter)return;
	//this.filter = false;
	console.log("YUOIO")
	// modify the list..
	var startBlock = data.start;
	
	
	var nextObject = startBlock._iNext;
	var previousObject = startBlock._iPrev;
		
	if(nextObject)nextObject._iPrev = previousObject;
	if(previousObject)previousObject._iNext = nextObject;		
	
	this.first = startBlock._iNext;
	
	// remove the end filter
	var lastBlock = data.end;
	
	var nextObject = lastBlock._iNext;
	var previousObject = lastBlock._iPrev;
		
	if(nextObject)nextObject._iPrev = previousObject;
	previousObject._iNext = nextObject;		
	
	// this is always true too!
	var tempLast =  lastBlock._iPrev;	
	// need to make sure the parents last is updated too
	var updateLast = this;
	while(updateLast.last == lastBlock)
	{
		updateLast.last = tempLast;
		updateLast = updateLast.parent;
		if(!updateLast)break;
	}
	
	// if webGL...
	if(this.__renderGroup)
	{
		this.__renderGroup.removeFilterBlocks(startBlock, lastBlock);
	}
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.DisplayObject.prototype.updateTransform = function()
{
	// TODO OPTIMIZE THIS!! with dirty
	if(this.rotation !== this.rotationCache)
	{
		this.rotationCache = this.rotation;
		this._sr =  Math.sin(this.rotation);
		this._cr =  Math.cos(this.rotation);
	}	
	
	var localTransform = this.localTransform;
	var parentTransform = this.parent.worldTransform;
	var worldTransform = this.worldTransform;
	//console.log(localTransform)
	var sX = this.scale.x;
	var sY = this.scale.y;
	var a00 = localTransform[0] = this._cr * sX;
	var a01 = localTransform[1] = -this._sr * sY;
	var a10 = localTransform[3] = this._sr * sX;
	var a11 = localTransform[4] = this._cr * sY;
	
	// TODO --> do we even need a local matrix???
	
	var px = this.pivot.x;
	var py = this.pivot.y;
   	
   	///AAARR GETTER SETTTER!
	var a02 = localTransform[2] = this.position.x - a00 * px - py * a01;
	var a12 = localTransform[5] = this.position.y - a11 * py - px * a10;

    // Cache the matrix values (makes for huge speed increases!)
    var /*a00 = localTransform[0], a01 = localTransform[1], a02 = localTransform[2],*/
        /*a10 = localTransform[3], a11 = localTransform[4], a12 = localTransform[5],*/

        b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
        b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];
	
    worldTransform[0] = b00 * a00 + b01 * a10;
    worldTransform[1] = b00 * a01 + b01 * a11;
    worldTransform[2] = b00 * a02 + b01 * a12 + b02;

    worldTransform[3] = b10 * a00 + b11 * a10;
    worldTransform[4] = b10 * a01 + b11 * a11;
    worldTransform[5] = b10 * a02 + b11 * a12 + b12;

	// because we are using affine transformation, we can optimise the matrix concatenation process.. wooo!
	// mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
	this.worldAlpha = this.alpha * this.parent.worldAlpha;
	
	this.vcount = PIXI.visibleCount;

}

PIXI.visibleCount = 0;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A DisplayObjectContainer represents a collection of display objects.
 * It is the base class of all display objects that act as a container for other objects.
 *
 * @class DisplayObjectContainer 
 * @extends DisplayObject
 * @constructor
 */
PIXI.DisplayObjectContainer = function()
{
	PIXI.DisplayObject.call( this );
	
	/**
	 * [read-only] The of children of this container.
	 *
	 * @property children
	 * @type Array<DisplayObject>
	 * @readOnly
	 */	
	this.children = [];
}

// constructor
PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param child {DisplayObject} The DisplayObject to add to the container
 */
PIXI.DisplayObjectContainer.prototype.addChild = function(child)
{
	if(child.parent != undefined)
	{
		
		//// COULD BE THIS???
		child.parent.removeChild(child);
	//	return;
	}

	child.parent = this;
	
	this.children.push(child);	
	
	// update the stage refference..
	
	if(this.stage)
	{
		var tmpChild = child;
		do
		{
			if(tmpChild.interactive)this.stage.dirty = true;
			tmpChild.stage = this.stage;
			tmpChild = tmpChild._iNext;
		}	
		while(tmpChild)
	}
	
	// LINKED LIST //
	
	// modify the list..
	var childFirst = child.first
	var childLast = child.last;
	var nextObject;
	var previousObject;
	
	// this could be wrong if there is a filter??
	if(this._filters || this._mask)
	{
		previousObject =  this.last._iPrev;
	}
	else
	{
		previousObject = this.last;
	}

	nextObject = previousObject._iNext;
	
	// always true in this case
	// need to make sure the parents last is updated too
	var updateLast = this;
	var prevLast = previousObject;
	
	while(updateLast)
	{
		if(updateLast.last == prevLast)
		{
			updateLast.last = child.last;
		}
		updateLast = updateLast.parent;
	}
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	childFirst._iPrev = previousObject;
	previousObject._iNext = childFirst;		

	// need to remove any render groups..
	if(this.__renderGroup)
	{
		// being used by a renderTexture.. if it exists then it must be from a render texture;
		if(child.__renderGroup)child.__renderGroup.removeDisplayObjectAndChildren(child);
		// add them to the new render group..
		this.__renderGroup.addDisplayObjectAndChildren(child);
	}
	
}

/**
 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
 *
 * @method addChildAt
 * @param child {DisplayObject} The child to add
 * @param index {Number} The index to place the child in
 */
PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(index >= 0 && index <= this.children.length)
	{
		if(child.parent != undefined)
		{
			child.parent.removeChild(child);
		}
		child.parent = this;
		
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = this.stage;
				tmpChild = tmpChild._iNext;
			}
			while(tmpChild)
		}
		
		// modify the list..
		var childFirst = child.first;
		var childLast = child.last;
		var nextObject;
		var previousObject;
		
		if(index == this.children.length)
		{
			previousObject =  this.last;
			var updateLast = this;
			var prevLast = this.last;
			while(updateLast)
			{
				if(updateLast.last == prevLast)
				{
					updateLast.last = child.last;
				}
				updateLast = updateLast.parent;
			}
		}
		else if(index == 0)
		{
			previousObject = this;
		}
		else
		{
			previousObject = this.children[index-1].last;
		}
		
		nextObject = previousObject._iNext;
		
		// always true in this case
		if(nextObject)
		{
			nextObject._iPrev = childLast;
			childLast._iNext = nextObject;
		}
		
		childFirst._iPrev = previousObject;
		previousObject._iNext = childFirst;		

		this.children.splice(index, 0, child);
		// need to remove any render groups..
		if(this.__renderGroup)
		{
			// being used by a renderTexture.. if it exists then it must be from a render texture;
			if(child.__renderGroup)child.__renderGroup.removeDisplayObjectAndChildren(child);
			// add them to the new render group..
			this.__renderGroup.addDisplayObjectAndChildren(child);
		}
		
	}
	else
	{
		throw new Error(child + " The index "+ index +" supplied is out of bounds " + this.children.length);
	}
}

/**
 * [NYI] Swaps the depth of 2 displayObjects
 *
 * @method swapChildren
 * @param child {DisplayObject}
 * @param child2 {DisplayObject}
 * @private
 */
PIXI.DisplayObjectContainer.prototype.swapChildren = function(child, child2)
{
	/*
	 * this funtion needs to be recoded.. 
	 * can be done a lot faster..
	 */
	return;
	
	// need to fix this function :/
	/*
	// TODO I already know this??
	var index = this.children.indexOf( child );
	var index2 = this.children.indexOf( child2 );
	
	if ( index !== -1 && index2 !== -1 ) 
	{
		// cool
		
		/*
		if(this.stage)
		{
			// this is to satisfy the webGL batching..
			// TODO sure there is a nicer way to achieve this!
			this.stage.__removeChild(child);
			this.stage.__removeChild(child2);
			
			this.stage.__addChild(child);
			this.stage.__addChild(child2);
		}
		
		// swap the positions..
		this.children[index] = child2;
		this.children[index2] = child;
		
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	}*/
}

/**
 * Returns the Child at the specified index
 *
 * @method getChildAt
 * @param index {Number} The index to get the child from
 */
PIXI.DisplayObjectContainer.prototype.getChildAt = function(index)
{
	if(index >= 0 && index < this.children.length)
	{
		return this.children[index];
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	}
}

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param child {DisplayObject} The DisplayObject to remove
 */
PIXI.DisplayObjectContainer.prototype.removeChild = function(child)
{
	var index = this.children.indexOf( child );
	if ( index !== -1 ) 
	{
		// unlink //
		// modify the list..
		var childFirst = child.first;
		var childLast = child.last;
		
		var nextObject = childLast._iNext;
		var previousObject = childFirst._iPrev;
			
		if(nextObject)nextObject._iPrev = previousObject;
		previousObject._iNext = nextObject;		
		
		if(this.last == childLast)
		{
			var tempLast =  childFirst._iPrev;	
			// need to make sure the parents last is updated too
			var updateLast = this;
			while(updateLast.last == childLast.last)
			{
				updateLast.last = tempLast;
				updateLast = updateLast.parent;
				if(!updateLast)break;
			}
		}
		
		childLast._iNext = null;
		childFirst._iPrev = null;
		 
		// update the stage reference..
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = null;
				tmpChild = tmpChild._iNext;
			}	
			while(tmpChild)
		}
	
		// webGL trim
		if(child.__renderGroup)
		{
			child.__renderGroup.removeDisplayObjectAndChildren(child);
		}
		
		child.parent = undefined;
		this.children.splice( index, 1 );
	}
	else
	{
		throw new Error(child + " The supplied DisplayObject must be a child of the caller " + this);
	}
}

/**
 * Removes all children from front to back.
 * @method removeChildren
 * @param  leave=0 {Number} The number of children at the back to leave. Default is 0.
 */
PIXI.DisplayObjectContainer.prototype.removeChildren = function(leave, recurse)
{
	if(this.children.length == 0) return;
	
	/*if(typeof leave == "undefined")
		leave = 0;
	for(var i = this.children.length - 1; i >= leave; --i)
	{
		var child = this.children[i];
		// update the stage reference..
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = null;
				tmpChild = tmpChild._iNext;
			}	
			while(tmpChild)
		}
		// webGL trim
		if(child.__renderGroup)
			child.__renderGroup.removeDisplayObjectAndChildren(child);
		child.parent = undefined;
	}
	this.children.length = leave;*/
	while(this.children.length)
	{
		var c = this.children[0];
		this.removeChild(c);
		if(recurse && c.removeChildren)
			c.removeChildren(0, recurse);
	}
}


/**
 * Updates the container's children's transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.DisplayObjectContainer.prototype.updateTransform = function()
{
	if(!this.visible)return;
	
	PIXI.DisplayObject.prototype.updateTransform.call( this );
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0;
PIXI.blendModes.SCREEN = 1;


/**
 * The SPrite object is the base for all textured objects that are rendered to the screen
 *
 * @class Sprite
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture} The texture for this sprite
 * @type String
 */
PIXI.Sprite = function(texture)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * The anchor sets the origin point of the texture.
	 * The default is 0,0 this means the textures origin is the top left 
	 * Setting than anchor to 0.5,0.5 means the textures origin is centered
	 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
	 *
     * @property anchor
     * @type Point
     */
	this.anchor = new PIXI.Point();

	/**
	 * The texture that the sprite is using
	 *
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;
	
	/**
	 * The blend mode of sprite.
	 * currently supports PIXI.blendModes.NORMAL and PIXI.blendModes.SCREEN
	 *
	 * @property blendMode
	 * @type Number
	 */
	this.blendMode = PIXI.blendModes.NORMAL;

	/**
	 * The width of the sprite (this is initially set by the texture)
	 *
	 * @property _width
	 * @type Number
	 * @private
	 */
	this._width = 0;

	/**
	 * The height of the sprite (this is initially set by the texture)
	 *
	 * @property _height
	 * @type Number
	 * @private
	 */
	this._height = 0;

	if(texture.baseTexture.hasLoaded)
	{
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}

	this.renderable = true;
}

// constructor
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Sprite.prototype.constructor = PIXI.Sprite;

/**
 * The width of the sprite, setting this will actually modify the scale to acheive the value set
 *
 * @property width
 * @type Number
 */
Object.defineProperty(PIXI.Sprite.prototype, 'width', {
    get: function() {
        return this.scale.x * this.texture.width;
    },
    set: function(value) {
    	this.scale.x = value / this.texture.width;
        this._width = value;
    }
});

/**
 * The height of the sprite, setting this will actually modify the scale to acheive the value set
 *
 * @property height
 * @type Number
 */
Object.defineProperty(PIXI.Sprite.prototype, 'height', {
    get: function() {
        return  this.scale.y * this.texture.height;
    },
    set: function(value) {
    	this.scale.y = value / this.texture.height;
        this._height = value;
    }
});

/**
 * Sets the texture of the sprite
 *
 * @method setTexture
 * @param texture {Texture} The PIXI texture that is displayed by the sprite
 */
PIXI.Sprite.prototype.setTexture = function(texture)
{
	if(texture === this.texture) return;
	// stop current texture;
	if(this.texture.baseTexture != texture.baseTexture)
	{
		this.textureChange = true;	
		this.texture = texture;
		
		if(this.__renderGroup)
		{
			this.__renderGroup.updateTexture(this);
		}
	}
	else
	{
		this.texture = texture;
	}
	
	this.updateFrame = true;
}

/**
 * When the texture is updated, this event will fire to update the scale and frame
 *
 * @method onTextureUpdate
 * @param event
 * @private
 */
PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
	//this.texture.removeEventListener( 'update', this.onTextureUpdateBind );
	
	/*if(this.texture.realSize)
	{
		this.pivot.x = this.texture.realSize.x;
		this.pivot.y = this.texture.realSize.y;
	}*/
	
	// so if _width is 0 then width was not set..
	if(this._width)this.scale.x = this._width / this.texture.width;
	if(this._height)this.scale.y = this._height / this.texture.height;
	
	this.updateFrame = true;
}

// some helper functions..

/**
 * 
 * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
 * The frame ids are created when a Texture packer file has been loaded
 *
 * @method fromFrame
 * @static
 * @param frameId {String} The frame Id of the texture in the cache
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the frameId
 */
PIXI.Sprite.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache" + this);
	return new PIXI.Sprite(texture);
}

/**
 * 
 * Helper function that creates a sprite that will contain a texture based on an image url
 * If the image is not in the texture cache it will be loaded
 *
 * @method fromImage
 * @static
 * @param imageId {String} The image url of the texture
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the image id
 */
PIXI.Sprite.fromImage = function(imageId)
{
	var texture = PIXI.Texture.fromImage(imageId);
	return new PIXI.Sprite(texture);
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A MovieClip is a simple way to display an animation depicted by a list of textures.
 *
 * @class MovieClip
 * @extends Sprite
 * @constructor
 * @param textures {Array<Texture>} an array of {Texture} objects that make up the animation
 */
PIXI.MovieClip = function(textures)
{
	PIXI.Sprite.call(this, textures[0]);

	/**
	 * The array of textures that make up the animation
	 *
	 * @property textures
	 * @type Array
	 */
	this.textures = textures;

	/**
	 * The speed that the MovieClip will play at. Higher is faster, lower is slower
	 *
	 * @property animationSpeed
	 * @type Number
	 * @default 1
	 */
	this.animationSpeed = 1;

	/**
	 * Whether or not the movie clip repeats after playing.
	 *
	 * @property loop
	 * @type Boolean
	 * @default true
	 */
	this.loop = true;

	/**
	 * Function to call when a MovieClip finishes playing
	 *
	 * @property onComplete
	 * @type Function
	 */
	this.onComplete = null;

	/**
	 * [read-only] The index MovieClips current frame (this may not have to be a whole number)
	 *
	 * @property currentFrame
	 * @type Number
	 * @default 0
	 * @readOnly
	 */
	this.currentFrame = 0;

	/**
	 * [read-only] Indicates if the MovieClip is currently playing
	 *
	 * @property playing
	 * @type Boolean
	 * @readOnly
	 */
	this.playing = false;
	
	/**
	 * This is the MovieClip's target animation rate - the rate at which the animation was created. 
	 * @property _animFrameRate
	 * @type Number
	 * @default 0
	 * @private
	 */
	this._animFrameRate = 30;
	
	/**
	 * This is the time elapsed in the animation from frame 0 in seconds.
	 * @property _elapsedTime
	 * @type Number
	 * @default 0
	 * @private
	 */
	this._elapsedTime = 0;
	
	/**
	 * This is the total time for the animation.
	 * @property _animDuration
	 * @type Number
	 * @default 0
	 * @private
	 */
	this._animDuration = 0;
}

// constructor
PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );
PIXI.MovieClip.prototype.constructor = PIXI.MovieClip;

Object.defineProperty(PIXI.MovieClip.prototype, "fps", {
	get: function() { return this._animFrameRate; },
	set: function(value) {
		this._animFrameRate = value;
		this._elapsedTime = 0;
		if(this.textures)
			this._duration = value ? this.textures.length / value : 0;
		else
			this._duration = 0;
	}
})

PIXI.MovieClip.prototype.updateDuration = function()
{
	this._duration = this._animFrameRate ? this.textures.length / this._animFrameRate : 0;
}

/**
* [read-only] totalFrames is the total number of frames in the MovieClip. This is the same as number of textures
* assigned to the MovieClip.
*
* @property totalFrames
* @type Number
* @default 0
* @readOnly
*/
Object.defineProperty( PIXI.MovieClip.prototype, 'totalFrames', {
	get: function() {

		return this.textures.length;
	}
});


/**
 * Stops the MovieClip
 *
 * @method stop
 */
PIXI.MovieClip.prototype.stop = function()
{
	this.playing = false;
}

/**
 * Plays the MovieClip
 *
 * @method play
 */
PIXI.MovieClip.prototype.play = function()
{
	this.playing = true;
}

/**
 * Stops the MovieClip and goes to a specific frame
 *
 * @method gotoAndStop
 * @param frameNumber {Number} frame index to stop at
 */
PIXI.MovieClip.prototype.gotoAndStop = function(frameNumber)
{
	this.playing = false;
	this.currentFrame = frameNumber;
	this._elapsedTime = frameNumber / this._animFrameRate;
	var round = (this.currentFrame + 0.5) | 0;
	this.setTexture(this.textures[round % this.textures.length]);
}

/**
 * Goes to a specific frame and begins playing the MovieClip
 *
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */
PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber)
{
	this._elapsedTime = frameNumber / this._animFrameRate;
	this.currentFrame = frameNumber;
	this.playing = true;
	this.setTexture(this.textures[this.currentFrame]);
}

/**
 * Updates the animation given a delta time.
 * @method updateAnim
 * @param deltaSec {Number} The time to advance the animation by in seconds.
 */
PIXI.MovieClip.prototype.updateAnim = function(deltaSec)
{
	this._elapsedTime += deltaSec * this.animationSpeed;
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.MovieClip.prototype.updateTransform = function()
{
	if(this.playing)
	{
		var complete = false;
		if(this._elapsedTime > this._duration)
		{
			if(this.loop)
				this._elapsedTime = this._elapsedTime % this._duration;
			else
			{
				this._elapsedTime = this._duration;
				complete = true;
				this.playing = false;
			}
		}
		this.currentFrame = (this._elapsedTime * this._animFrameRate) | 0;
		//sanity check
		if(this.currentFrame >= this.textures.length)
			this.currentFrame = this.textures.length - 1;
		this.setTexture(this.textures[this.currentFrame]);
		if(complete && this.onComplete)
		{
			this.onComplete();
		}
	}
	PIXI.Sprite.prototype.updateTransform.call(this);
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



PIXI.FilterBlock = function()
{
	this.visible = true;
	this.renderable = true;
}
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Text Object will create a line(s) of text to split a line you can use "\n"
 *
 * @class Text
 * @extends Sprite
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param [style] {Object} The style parameters
 * @param [style.font] {String} default "bold 20pt Arial" The style and size of the font
 * @param [style.fill="black"] {Object} A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 * @param [style.stroke] {String} A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
 */
PIXI.Text = function(text, style)
{
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas));

    this.setText(text);
    this.setStyle(style);

    this.updateText();
    this.dirty = false;
};

// constructor
PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.Text.prototype.constructor = PIXI.Text;

/**
 * Set the style of the text
 *
 * @method setStyle
 * @param [style] {Object} The style parameters
 * @param [style.font="bold 20pt Arial"] {String} The style and size of the font
 * @param [style.fill="black"] {Object} A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 * @param [style.stroke="black"] {String} A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
 */
PIXI.Text.prototype.setStyle = function(style)
{
    style = style || {};
    style.font = style.font || "bold 20pt Arial";
    style.fill = style.fill || "black";
    style.align = style.align || "left";
    style.stroke = style.stroke || "black"; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.wordWrapWidth = style.wordWrapWidth || 100;
    this.style = style;
    this.dirty = true;
};

/**
 * Set the copy for the text object. To split a line you can use "\n"
 *
 * @methos setText
 * @param {String} text The copy that you would like the text to display
 */
PIXI.Text.prototype.setText = function(text)
{
    this.text = text.toString() || " ";
    this.dirty = true;
};

/**
 * Renders text
 *
 * @method updateText
 * @private
 */
PIXI.Text.prototype.updateText = function()
{
	this.context.font = this.style.font;

	var outputText = this.text;

	// word wrap
	// preserve original text
	if(this.style.wordWrap)outputText = this.wordWrap(this.text);

	//split text into lines
	var lines = outputText.split(/(?:\r\n|\r|\n)/);

	//calculate text width
	var lineWidths = [];
	var maxLineWidth = 0;
	for (var i = 0; i < lines.length; i++)
	{
		var lineWidth = this.context.measureText(lines[i]).width;
		lineWidths[i] = lineWidth;
		maxLineWidth = Math.max(maxLineWidth, lineWidth);
	}
	this.canvas.width = maxLineWidth + this.style.strokeThickness;

	//calculate text height
	var lineHeight = this.determineFontHeight("font: " + this.style.font  + ";") + this.style.strokeThickness;
	this.canvas.height = lineHeight * lines.length;

	//set canvas text styles
	this.context.fillStyle = this.style.fill;
	this.context.font = this.style.font;
	
	if(this.style.stroke)
		this.context.strokeStyle = this.style.stroke;
	this.context.lineWidth = this.style.strokeThickness;

	this.context.textBaseline = "top";

	//draw lines line by line
	var linePosition = new PIXI.Point(this.style.strokeThickness * 0.5, 0);
	for (i = 0; i < lines.length; i++)
	{
		linePosition.x = 0;
		linePosition.y = this.style.strokeThickness * 0.5 + i * lineHeight;
	
		if(this.style.align == "right")
		{
			linePosition.x += maxLineWidth - lineWidths[i];
		}
		else if(this.style.align == "center")
		{
			linePosition.x += (maxLineWidth - lineWidths[i]) * 0.5;
		}

		if(this.style.stroke && this.style.strokeThickness)
		{
			this.context.strokeText(lines[i], linePosition.x, linePosition.y);
		}

		if(this.style.fill)
		{
			this.context.fillText(lines[i], linePosition.x, linePosition.y);
		}
	}

    this.updateTexture();
};

/**
 * Updates texture size based on canvas size
 *
 * @method updateTexture
 * @private
 */
PIXI.Text.prototype.updateTexture = function()
{
    this._width = this.texture.width = this.texture.frame.width = this.texture.baseTexture.width = this.canvas.width;
    this._height = this.texture.height = this.texture.frame.height = this.texture.baseTexture.height = this.canvas.height;
	
    PIXI.texturesToUpdate.push(this.texture.baseTexture);
};

/**
 * Updates the transfor of this object
 *
 * @method updateTransform
 * @private
 */
PIXI.Text.prototype.updateTransform = function()
{
	if(this.dirty)
	{
		this.updateText();
		this.dirty = false;
	}

	PIXI.Sprite.prototype.updateTransform.call(this);
};

/*
 * http://stackoverflow.com/users/34441/ellisbben
 * great solution to the problem!
 *
 * @method determineFontHeight
 * @param fontStyle {Object}
 * @private
 */
PIXI.Text.prototype.determineFontHeight = function(fontStyle)
{
	// build a little reference dictionary so if the font style has been used return a
	// cached version...
	var result = PIXI.Text.heightCache[fontStyle];

	if(!result)
	{
		var body = document.getElementsByTagName("body")[0];
		var dummy = document.createElement("div");
		var dummyText = document.createTextNode("M");
		dummy.appendChild(dummyText);
		dummy.setAttribute("style", fontStyle + ';position:absolute;top:0;left:0');
		body.appendChild(dummy);

		result = dummy.offsetHeight;
		PIXI.Text.heightCache[fontStyle] = result;

		body.removeChild(dummy);
	}

	return result;
};

/**
 * A Text Object will apply wordwrap
 *
 * @method wordWrap
 * @param text {String}
 * @private
 */
PIXI.Text.prototype.wordWrap = function(text)
{
	// search good wrap position
	var searchWrapPos = function(ctx, text, start, end, wrapWidth)
	{
		var p = Math.floor((end-start) / 2) + start;
		if(p == start) {
			return 1;
		}

		if(ctx.measureText(text.substring(0,p)).width <= wrapWidth)
		{
			if(ctx.measureText(text.substring(0,p+1)).width > wrapWidth)
			{
				return p;
			}
			else
			{
				return arguments.callee(ctx, text, p, end, wrapWidth);
			}
		}
		else
		{
			return arguments.callee(ctx, text, start, p, wrapWidth);
		}
	};

	var lineWrap = function(ctx, text, wrapWidth)
	{
		if(ctx.measureText(text).width <= wrapWidth || text.length < 1)
		{
			return text;
		}
		var pos = searchWrapPos(ctx, text, 0, text.length, wrapWidth);
		return text.substring(0, pos) + "\n" + arguments.callee(ctx, text.substring(pos), wrapWidth);
	};

	var result = "";
	var lines = text.split("\n");
	for (var i = 0; i < lines.length; i++)
	{
		result += lineWrap(this.context, lines[i], this.style.wordWrapWidth) + "\n";
	}

	return result;
};

/**
 * Destroys this text object
 *
 * @method destroy
 * @param destroyTexture {Boolean}
 */
PIXI.Text.prototype.destroy = function(destroyTexture)
{
	if(destroyTexture)
	{
		this.texture.destroy();
	}

};

PIXI.Text.heightCache = {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Text Object will create a line(s) of text using bitmap font. To split a line you can use "\n", "\r" or "\r\n"
 * You can generate the fnt files using
 * http://www.angelcode.com/products/bmfont/ for windows or
 * http://www.bmglyph.com/ for mac.
 *
 * @class BitmapText
 * @extends DisplayObjectContainer
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param style {Object} The style parameters
 * @param style.font {String} The size (optional) and bitmap font id (required) eq "Arial" or "20px Arial" (must have loaded previously)
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 */
PIXI.BitmapText = function(text, style)
{
    PIXI.DisplayObjectContainer.call(this);

    this.setText(text);
    this.setStyle(style);
    this.updateText();
    this.dirty = false

};

// constructor
PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;

/**
 * Set the copy for the text object
 *
 * @method setText
 * @param text {String} The copy that you would like the text to display
 */
PIXI.BitmapText.prototype.setText = function(text)
{
    this.text = text || " ";
    this.dirty = true;
};

/**
 * Set the style of the text
 *
 * @method setStyle
 * @param style {Object} The style parameters
 * @param style.font {String} The size (optional) and bitmap font id (required) eq "Arial" or "20px Arial" (must have loaded previously)
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 */
PIXI.BitmapText.prototype.setStyle = function(style)
{
    style = style || {};
    style.align = style.align || "left";
    this.style = style;

    var font = style.font.split(" ");
    this.fontName = font[font.length - 1];
    this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;

    this.dirty = true;
};

/**
 * Renders text
 *
 * @method updateText
 * @private
 */
PIXI.BitmapText.prototype.updateText = function()
{
    var data = PIXI.BitmapText.fonts[this.fontName];
    var pos = new PIXI.Point();
    var prevCharCode = null;
    var chars = [];
    var maxLineWidth = 0;
    var lineWidths = [];
    var line = 0;
    var scale = this.fontSize / data.size;
	var text = this.text;
	var newLineTest = /(?:\r\n|\r|\n)/;
    for(var i = 0, len = text.length; i < len; i++)
    {
        if(newLineTest.test(text.charAt(i)))
        {
            lineWidths.push(pos.x);
            maxLineWidth = Math.max(maxLineWidth, pos.x);
            line++;

            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
            continue;
        }
        
	    var charCode = text.charCodeAt(i);
		var charData = data.chars[charCode];
		if(!charData) continue;

		if(prevCharCode && charData[prevCharCode])
        {
           pos.x += charData.kerning[prevCharCode];
        }
        chars.push({texture:charData.texture, line: line, charCode: charCode, position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)});
        pos.x += charData.xAdvance;

        prevCharCode = charCode;
    }

    lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, pos.x);

    var lineAlignOffsets = [];
	var a = this.style.align;
    for(i = 0; i <= line; i++)
    {
        var alignOffset = 0;
        if(a == "right")
        {
            alignOffset = maxLineWidth - lineWidths[i];
        }
        else if(a == "center")
        {
            alignOffset = (maxLineWidth - lineWidths[i]) * 0.5;
        }
        lineAlignOffsets.push(alignOffset);
    }

    for(i = 0; i < chars.length; i++)
    {
        var c = new PIXI.Sprite(chars[i].texture)//PIXI.Sprite.fromFrame(chars[i].charCode);
        c.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
        c.position.y = chars[i].position.y * scale;
        c.scale.x = c.scale.y = scale;
        this.addChild(c);
    }
	
    this.width = pos.x * scale;
    this.height = (pos.y + data.lineHeight) * scale;
};

/**
 * Forces an update of the text, if you need to know the width after setting the text. Use carefully.
 * @method forceUpdateText
 */
PIXI.BitmapText.prototype.forceUpdateText = function()
{
	var c = this.children;
	while(c.length > 0)
    {
        this.removeChild(this.getChildAt(0));
    }
    this.updateText();

    this.dirty = false;
}

/**
 * Updates the transform of this object
 *
 * @method updateTransform
 * @private
 */
PIXI.BitmapText.prototype.updateTransform = function()
{
	if(this.dirty)
	{
        this.forceUpdateText();
	}

	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

PIXI.BitmapText.fonts = {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */
 
 /**
 * The interaction manager deals with mouse and touch events. Any DisplayObject can be interactive
 * This manager also supports multitouch.
 *
 * @class InteractionManager
 * @constructor
 * @param stage {Stage} The stage to handle interactions
 */
PIXI.InteractionManager = function(stage)
{
	/**
	 * a refference to the stage
	 *
	 * @property stage
	 * @type Stage
	 */
	this.stage = stage;

	/**
	 * the mouse data
	 *
	 * @property mouse
	 * @type InteractionData
	 */
	this.mouse = new PIXI.InteractionData();

	/**
	 * an object that stores current touches (InteractionData) by id reference
	 *
	 * @property touchs
	 * @type Object
	 */
	this.touchs = {};
	
	// helpers
	this.tempPoint = new PIXI.Point();
	//this.tempMatrix =  mat3.create();

	this.mouseoverEnabled = true;

	//tiny little interactiveData pool!
	this.pool = [];

	this.interactiveItems = [];
	this.interactionDOMElement = null;

	//this will make it so that you dont have to call bind all the time
	this.onMouseMove = this.onMouseMove.bind( this );
	this.onMouseDown = this.onMouseDown.bind(this);
	this.onMouseOut = this.onMouseOut.bind(this);
	this.onMouseOver = this.onMouseOver.bind(this);
	this.onMouseUp = this.onMouseUp.bind(this);

	this.onTouchStart = this.onTouchStart.bind(this);
	this.onTouchEnd = this.onTouchEnd.bind(this);
	this.onTouchMove = this.onTouchMove.bind(this);
	
	/** The cursor to use for the default cursor. This can be a function (called on changes) or a String CSS value. */
	this.defaultCursor = "default";
	/** The cursor to use for the pointer cursor. This can be a function (called on changes) or a String CSS value. */
	this.pointerCursor = "pointer";
	/** The current mode of the cursor (always 'default' or 'pointer') */
	this.currentCursor = "default";
	
	this.stageIn = null;
	this.stageOut = null;
	
	this.last = 0;
}

// constructor
PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager;

/**
 * Collects an interactive sprite recursively to have their interactions managed
 *
 * @method collectInteractiveSprite
 * @param displayObject {DisplayObject} the displayObject to collect
 * @param iParent {DisplayObject}
 * @private
 */
PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject, iParent)
{
	var children = displayObject.children;
	var length = children.length;
	
	/// make an interaction tree... {item.__interactiveParent}
	for (var i = length-1; i >= 0; i--)
	{
		var child = children[i];
		
		if(!child.visible) continue;
		
		// push all interactive bits
		if(child.interactive)
		{
			iParent.interactiveChildren = true;
			//child.__iParent = iParent;
			this.interactiveItems.push(child);

			if(child.children.length > 0)
			{
				this.collectInteractiveSprite(child, child);
			}
		}
		else
		{
			child.__iParent = null;

			if(child.children.length > 0)
			{
				this.collectInteractiveSprite(child, iParent);
			}
		}
	}
}

/**
 * Sets the target for event delegation
 *
 * @method setTarget
 * @param target {WebGLRenderer|CanvasRenderer} the renderer to bind events to
 * @private
 */
PIXI.InteractionManager.prototype.setTarget = function(target)
{
	this.target = target;

	//check if the dom element has been set. If it has don't do anything
	if( this.interactionDOMElement === null ) {

		this.setTargetDomElement( target.view );
	}

 	document.body.addEventListener('mouseup',  this.onMouseUp, true);
}


/**
 * Sets the dom element which will receive mouse/touch events. This is useful for when you have other DOM
 * elements ontop of the renderers Canvas element. With this you'll be able to delegate another dom element
 * to receive those events
 *
 * @method setTargetDomElement
 * @param domElement {DOMElement} the dom element which will receive mouse and touch events
 * @private
 */
PIXI.InteractionManager.prototype.setTargetDomElement = function(domElement)
{
	//remove previouse listeners
	if( this.interactionDOMElement !== null ) 
	{
		var oldDOM = this.interactionDOMElement;
		oldDOM.style['-ms-content-zooming'] = '';
    	oldDOM.style['-ms-touch-action'] = '';

		oldDOM.removeEventListener('mousemove',  this.onMouseMove, true);
		oldDOM.removeEventListener('mousedown',  this.onMouseDown, true);
	 	oldDOM.removeEventListener('mouseout',   this.onMouseOut, true);

	 	// aint no multi touch just yet!
		oldDOM.removeEventListener('touchstart', this.onTouchStart, true);
		oldDOM.removeEventListener('touchend', this.onTouchEnd, true);
		oldDOM.removeEventListener('touchmove', this.onTouchMove, true);
	}

	if (window.navigator.msPointerEnabled) 
	{
		// time to remove some of that zoom in ja..
		domElement.style['-ms-content-zooming'] = 'none';
    	domElement.style['-ms-touch-action'] = 'none';
    
		// DO some window specific touch!
	}

	this.interactionDOMElement = domElement;

	domElement.addEventListener('mousemove',  this.onMouseMove, true);
	domElement.addEventListener('mousedown',  this.onMouseDown, true);
 	domElement.addEventListener('mouseout',   this.onMouseOut, true);
 	domElement.addEventListener('mouseover',   this.onMouseOver, true);

 	// aint no multi touch just yet!
	domElement.addEventListener('touchstart', this.onTouchStart, true);
	domElement.addEventListener('touchend', this.onTouchEnd, true);
	domElement.addEventListener('touchmove', this.onTouchMove, true);
}

PIXI.InteractionManager.prototype.cleanup = function()
{
	if(!this.target) return;
	var domElement = this.interactionDOMElement;
	domElement.removeEventListener('mousemove',  this.onMouseMove, true);
	domElement.removeEventListener('mousedown',  this.onMouseDown, true);
	domElement.removeEventListener('mouseout',   this.onMouseOut, true);
 	domElement.removeEventListener('mouseover',   this.onMouseOver, true);
	document.body.removeEventListener('mouseup',  this.onMouseUp, true);

	// aint no multi touch just yet!
	domElement.removeEventListener("touchstart", this.onTouchStart, true);
	domElement.removeEventListener("touchend", this.onTouchEnd, true);
	domElement.removeEventListener("touchmove", this.onTouchMove, true);
}

/**
 * updates the state of interactive objects
 *
 * @method update
 * @private
 */
PIXI.InteractionManager.prototype.update = function(forceUpdate)
{
	if(!forceUpdate)
	{
		if(!this.target)return;
	
		// frequency of 30fps??
		var now = Date.now();
		var diff = now - this.last;
		diff = diff * 0.030;// * 30 / 1000
		if(diff < 1)return;
		this.last = now;
		//
	}
	
	var items = this.interactiveItems;
	var length = items.length;
	// ok.. so mouse events??
	// yes for now :)
	// OPTIMSE - how often to check??
	if(this.dirty)
	{
		this.dirty = false;
		
		for (var i=0; i < length; i++) {
		  items[i].interactiveChildren = false;
		}
		
		items.length = 0;
		
		if(this.stage.interactive)
		{
			items.push(this.stage);
			// go through and collect all the objects that are interactive..
			this.collectInteractiveSprite(this.stage, this.stage);
		}
		length = items.length;//update, since this changed
	}
	
	// loop through interactive objects!
	var mode = "default";
				
	for (var i = 0; i < length; i++)
	{
		var item = items[i];
		
		//if(!item.visible)continue;
		
		// OPTIMISATION - only calculate every time if the mousemove function exists..
		// OK so.. does the object have any other interactive functions?
		// hit-test the clip!
		
		if(item.mouseover || item.mouseout || item.buttonMode)
		{
			// ok so there are some functions so lets hit test it..
			item.__hit = this.hitTest(item, this.mouse, 1);
			this.mouse.target = item;
			// ok so deal with interactions..
			// loks like there was a hit!
			if(item.__hit)
			{
				if(item.buttonMode) mode = "pointer";
				
				if(!item.__isOver)
				{
					
					if(item.mouseover)item.mouseover(this.mouse);
					item.__isOver = true;	
				}
			}
			else
			{
				if(item.__isOver)
				{
					// roll out!
					if(item.mouseout)item.mouseout(this.mouse);
					item.__isOver = false;	
				}
			}
		}
		
		// --->
	}
	//update cursor status
	this.updateCursor(mode);
}

PIXI.InteractionManager.prototype.updateCursor = function(mode)
{
	if(mode != this.currentCursor)
	{
		this.currentCursor = mode;
		var cursor = mode == "pointer" ? this.pointerCursor : this.defaultCursor;
		if(typeof cursor == "function")
			cursor();
		else
			this.interactionDOMElement.style.cursor = cursor;
	}
}

/**
 * Is called when the mouse moves accross the renderer element
 *
 * @method onMouseMove
 * @param event {Event} The DOM event of the mouse moving
 * @private
 */
PIXI.InteractionManager.prototype.onMouseMove = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	// TODO optimize by not check EVERY TIME! maybe half as often? //
	var rect = this.interactionDOMElement.getBoundingClientRect();
	
	this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
	this.mouse.global.y = (event.clientY - rect.top) * ( this.target.height / rect.height);
	
	var length = this.interactiveItems.length;
	var global = this.mouse.global;
	
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mousemove)
		{
			//call the function!
			item.mousemove(this.mouse);
		}
	}
}

/**
 * Is called when the mouse button is pressed down on the renderer element
 *
 * @method onMouseDown
 * @param event {Event} The DOM event of a mouse button being pressed down
 * @private
 */
PIXI.InteractionManager.prototype.onMouseDown = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	
	// loop through inteaction tree...
	// hit test each item! -> 
	// get interactive items under point??
	//stage.__i
	var length = this.interactiveItems.length;
	var global = this.mouse.global;
	
	var index = 0;
	var parent = this.stage;
	
	// while 
	// hit test 
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mousedown || item.click)
		{
			item.__mouseIsDown = true;
			item.__hit = this.hitTest(item, this.mouse);
			
			if(item.__hit)
			{
				//call the function!
				if(item.mousedown)item.mousedown(this.mouse);
				item.__isDown = true;
				
				// just the one!
				if(!item.interactiveChildren)break;
			}
		}
	}
}


PIXI.InteractionManager.prototype.onMouseOut = function(event)
{
	var length = this.interactiveItems.length;
	
	this.updateCursor("default");
				
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.__isOver)
		{
			this.mouse.target = item;
			if(item.mouseout)item.mouseout(this.mouse);
			item.__isOver = false;	
		}
	}
	
	if(this.stageOut)
		this.stageOut();
}

PIXI.InteractionManager.prototype.onMouseOver = function(event)
{
	if(this.stageIn)
		this.stageIn();
}

/**
 * Is called when the mouse button is released on the renderer element
 *
 * @method onMouseUp
 * @param event {Event} The DOM event of a mouse button being released
 * @private
 */
PIXI.InteractionManager.prototype.onMouseUp = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	
	var global = this.mouse.global;
	
	var length = this.interactiveItems.length;
	var up = false;
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		if(!item) continue;
		
		if(item.mouseup || item.mouseupoutside || item.click)
		{
			item.__hit = this.hitTest(item, this.mouse);
			
			if(item.__hit && !up)
			{
				//call the function!
				if(item.mouseup)
				{
					item.mouseup(this.mouse);
				}
				if(item.__isDown)
				{
					if(item.click)item.click(this.mouse);
				}
				
				if(!item.interactiveChildren)up = true;
			}
			else
			{
				if(item.__isDown)
				{
					if(item.mouseupoutside)item.mouseupoutside(this.mouse);
				}
			}
		
			item.__isDown = false;	
		}
	}
	if(this.stageUp)
		this.stageUp(this.mouse.originalEvent);
}

/**
 * Tests if the current mouse coords hit a sprite
 *
 * @method hitTest
 * @param item {DisplayObject} The displayObject to test for a hit
 * @param interactionData {InteractionData} The interactiondata object to update in the case of a hit
 * @private
 */
PIXI.InteractionManager.prototype.hitTest = function(item, interactionData, vcountOffset)
{
	//I changed the interaction manager to run before the display objects get updated, so here the vcount will always be off by one during update()
	vcountOffset = vcountOffset || 0;
	if(item.vcount + vcountOffset !== PIXI.visibleCount)return false;
	
	var global = interactionData.global;

	var isSprite = (item instanceof PIXI.Sprite),
		worldTransform = item.worldTransform,
		a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
		a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
		id = 1 / (a00 * a11 + a01 * -a10),
		x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
		y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;

	interactionData.target = item;
	
	//a sprite or display object with a hit area defined
	if(item.hitArea && item.hitArea.contains) {
		if(item.hitArea.contains(x, y)) {
			//if(isSprite)
			interactionData.target = item;

			return true;
		}
		
		return false;
	}
	// a sprite with no hitarea defined
	else if(isSprite)
	{
		var texture = item.texture;
		var width = texture.frame.width,
			height = texture.frame.height;
			
		var aX = item.anchor.x;
		var aY = item.anchor.y;
		if(texture.realSize)
		{
			var rs = texture.realSize;
			aX = (rs.width * aX + rs.x) / width;
			aY = (rs.height * aY + rs.y) / height;
		}
		var x1 = -width * aX,
			y1;
		
		if(x > x1 && x < x1 + width)
		{
			y1 = -height * aY;
		
			if(y > y1 && y < y1 + height)
			{
				// set the target property if a hit is true!
				interactionData.target = item;
				return true;
			}
		}
	}

	var length = item.children.length;
	
	for (var i = 0; i < length; i++)
	{
		var tempItem = item.children[i];
		var hit = this.hitTest(tempItem, interactionData, vcountOffset);
		if(hit)
		{
			// hmm.. TODO SET CORRECT TARGET?
			interactionData.target = item
			return true;
		}
	}

	return false;	
}

/**
 * Is called when a touch is moved accross the renderer element
 *
 * @method onTouchMove
 * @param event {Event} The DOM event of a touch moving accross the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchMove = function(event)
{
	var rect = this.interactionDOMElement.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	var targWidthByRectWidth = (this.target.width / rect.width);
	var targHeightByRectHeight = (this.target.height / rect.height);
	for (var i=0, len = changedTouches.length; i < len; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		touchData.originalEvent = event || window.event;
		
		// update the touch position
		touchData.global.x = (touchEvent.clientX - rect.left) * targWidthByRectWidth;
		touchData.global.y = (touchEvent.clientY - rect.top)  * targHeightByRectHeight;
	}
	
	var length = this.interactiveItems.length;
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		if(item.touchmove)item.touchmove(touchData);
	}
}

/**
 * Is called when a touch is started on the renderer element
 *
 * @method onTouchStart
 * @param event {Event} The DOM event of a touch starting on the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchStart = function(event)
{
	var rect = this.interactionDOMElement.getBoundingClientRect();
	
	var changedTouches = event.changedTouches;
	var targWidthByRectWidth = (this.target.width / rect.width);
	var targHeightByRectHeight = (this.target.height / rect.height);
	for (var i=0, len = changedTouches.length; i < len; i++) 
	{
		var touchEvent = changedTouches[i];
		
		var touchData = this.pool.pop();
		if(!touchData)touchData = new PIXI.InteractionData();
		
		touchData.originalEvent =  event || window.event;
		
		this.touchs[touchEvent.identifier] = touchData;
		touchData.global.x = (touchEvent.clientX - rect.left) * targWidthByRectWidth;
		touchData.global.y = (touchEvent.clientY - rect.top)  * targHeightByRectHeight;
		
		var length = this.interactiveItems.length;
		
		for (var j = 0; j < length; j++)
		{
			var item = this.interactiveItems[j];
			
			if(item.touchstart || item.tap)
			{
				item.__hit = this.hitTest(item, touchData);
				
				if(item.__hit)
				{
					//call the function!
					if(item.touchstart)item.touchstart(touchData);
					item.__isDown = true;
					item.__touchData = touchData;
					
					if(!item.interactiveChildren)break;
				}
			}
		}
	}
}

/**
 * Is called when a touch is ended on the renderer element
 *
 * @method onTouchEnd
 * @param event {Event} The DOM event of a touch ending on the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchEnd = function(event)
{
	//this.mouse.originalEvent = event || window.event; //IE uses window.event
	var rect = this.interactionDOMElement.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	var targWidthByRectWidth = (this.target.width / rect.width);
	var targHeightByRectHeight = (this.target.height / rect.height);
	for (var i=0, len = changedTouches.length; i < len; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		var up = false;
		touchData.global.x = (touchEvent.clientX - rect.left) * targWidthByRectWidth;
		touchData.global.y = (touchEvent.clientY - rect.top)  * targHeightByRectHeight;
		
		var length = this.interactiveItems.length;
		for (var j = 0; j < length; j++)
		{
			var item = this.interactiveItems[j];
			if(!item) continue;//if for some reason there isn't an item, don't throw an error
			var itemTouchData = item.__touchData; // <-- Here!
			item.__hit = this.hitTest(item, touchData);
		
			if(itemTouchData == touchData)
			{
				// so this one WAS down...
				touchData.originalEvent =  event || window.event;
				// hitTest??
				
				if(item.touchend || item.tap)
				{
					if(item.__hit && !up)
					{
						if(item.touchend)item.touchend(touchData);
						if(item.__isDown)
						{
							if(item.tap)item.tap(touchData);
						}
						
						if(!item.interactiveChildren)up = true;
					}
					else
					{
						if(item.__isDown)
						{
							if(item.touchendoutside)item.touchendoutside(touchData);
						}
					}
					
					item.__isDown = false;
				}
				
				item.__touchData = null;
					
			}
			else
			{
				
			}
		}
		// remove the touch..
		this.pool.push(touchData);
		this.touchs[touchEvent.identifier] = null;
	}
	if(this.stageUp)
		this.stageUp(event);
}

/**
 * Holds all information related to an Interaction event
 *
 * @class InteractionData
 * @constructor
 */
PIXI.InteractionData = function()
{
	/**
	 * This point stores the global coords of where the touch/mouse event happened
	 *
	 * @property global 
	 * @type Point
	 */
	this.global = new PIXI.Point();
	
	// this is here for legacy... but will remove
	this.local = new PIXI.Point();

	/**
	 * The target Sprite that was interacted with
	 *
	 * @property target
	 * @type Sprite
	 */
	this.target;

	/**
	 * When passed to an event handler, this will be the original DOM Event that was captured
	 *
	 * @property originalEvent
	 * @type Event
	 */
	this.originalEvent;
}

/**
 * This will return the local coords of the specified displayObject for this InteractionData
 *
 * @method getLocalPosition
 * @param displayObject {DisplayObject} The DisplayObject that you would like the local coords off
 * @param outPoint {Point} An optional point to use instead of creating a new point
 * @return {Point} A point containing the coords of the InteractionData position relative to the DisplayObject
 */
PIXI.InteractionData.prototype.getLocalPosition = function(displayObject, outPoint)
{
	var worldTransform = displayObject.worldTransform;
	var global = this.global;
	
	// do a cheeky transform to get the mouse coords;
	var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
        a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
        id = 1 / (a00 * a11 + a01 * -a10);
	// set the mouse coords...
	var x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id;
	var y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;
	if(outPoint)
	{
		outPoint.x = x;
		outPoint.y = y;
		return outPoint;
	}
	else
		return new PIXI.Point(x, y);
}

// constructor
PIXI.InteractionData.prototype.constructor = PIXI.InteractionData;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Stage represents the root of the display tree. Everything connected to the stage is rendered
 *
 * @class Stage
 * @extends DisplayObjectContainer
 * @constructor
 * @param backgroundColor {Number} the background color of the stage, easiest way to pass this in is in hex format
 *		like: 0xFFFFFF for white
 */
PIXI.Stage = function(backgroundColor)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * [read-only] Current transform of the object based on world (parent) factors
	 *
	 * @property worldTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.worldTransform = PIXI.mat3.create();

	/**
	 * Whether or not the stage is interactive
	 *
	 * @property interactive
	 * @type Boolean
	 */
	this.interactive = true;

	/**
	 * The interaction manage for this stage, manages all interactive activity on the stage
	 *
	 * @property interactive
	 * @type InteractionManager
	 */
	this.interactionManager = new PIXI.InteractionManager(this);

	/**
	 * Whether the stage is dirty and needs to have interactions updated
	 *
	 * @property dirty
	 * @type Boolean
	 * @private
	 */
	this.dirty = true;

	this.__childrenAdded = [];
	this.__childrenRemoved = [];

	//the stage is it's own stage
	this.stage = this;

	//optimize hit detection a bit
	this.stage.hitArea = new PIXI.Rectangle(0,0,100000, 100000);

	this.setBackgroundColor(backgroundColor);
	this.worldVisible = true;
}

// constructor
PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Stage.prototype.constructor = PIXI.Stage;

/**
 * Sets another DOM element which can receive mouse/touch interactions instead of the default Canvas element.
 * This is useful for when you have other DOM elements ontop of the Canvas element.
 *
 * @method setInteractionDelegate
 * @param domElement {DOMElement} This new domElement which will receive mouse/touch events
 */
PIXI.Stage.prototype.setInteractionDelegate = function(domElement)
{
	this.interactionManager.setTargetDomElement( domElement );
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.Stage.prototype.updateTransform = function()
{
	//update the interaction manager first, so it detects stuff based on the frame that was just shown
	//this also fixes issues when it triggers changes to sprite anchor points, as opposed to updating 
	//the interaction manager after updating tranforms on all children
	if(this.interactive)this.interactionManager.update();
	
	this.worldAlpha = 1;
	this.vcount = PIXI.visibleCount;
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
	
	if(this.dirty)
	{
		this.dirty = false;
		// update interactive!
		this.interactionManager.dirty = true;
	}
}

/**
 * Updates the interaction manager with no regard to if it has happened recently. Use carefully as such.
 * @method forceUpdateIntraction
 */
PIXI.Stage.prototype.forceUpdateInteraction = function()
{
	this.interactionManager.dirty = true;
	this.interactionManager.update(true);
}

/**
 * Sets the background color for the stage
 *
 * @method setBackgroundColor
 * @param backgroundColor {Number} the color of the background, easiest way to pass this in is in hex format
 *		like: 0xFFFFFF for white
 */
PIXI.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
	this.backgroundColor = backgroundColor || 0x000000;
	this.backgroundColorSplit = HEXtoRGB(this.backgroundColor);
	var hex = this.backgroundColor.toString(16);
	hex = "000000".substr(0, 6 - hex.length) + hex;
	this.backgroundColorString = "#" + hex;
}

/**
 * This will return the point containing global coords of the mouse.
 *
 * @method getMousePosition
 * @return {Point} The point containing the coords of the global InteractionData position.
 */
PIXI.Stage.prototype.getMousePosition = function()
{
	return this.interactionManager.mouse.global;
}

PIXI.Stage.prototype.destroy = function()
{
	this.removeChildren(true);
	this.__childrenAdded = null;
	this.__childrenRemoved = null;
	this.stage = null;
	this.hitArea = null;
	this.interactionManager.cleanup();
	this.interactionManager = null;
}

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
{
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

	if (!window.cancelAnimationFrame)//only set this up if the corresponding requestAnimationFrame was set up
	    window.cancelAnimationFrame = function(id) {
	        clearTimeout(id);
	    };
}
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
	var activexmodes = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"] //activeX versions to check for in IE

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
 * @return {String} The filename (excluding extension).
 */
function filenameFromUrl(url)
{
	var name = url.substring(url.lastIndexOf("/") + 1);
	var i = name.lastIndexOf(".");
	if(i != -1)
		name = name.substring(0, i);
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
		tmp = tmp._iNext;
		console.log(tmp);
	//	console.log(tmp);

		if(safe > 100)
		{
			console.log("BREAK")
			break
		}
	}
}





/**
 * https://github.com/mrdoob/eventtarget.js/
 * THankS mr DOob!
 */

/**
 * Adds event emitter functionality to a class
 *
 * @class EventTarget
 * @example
 *		function MyEmitter() {
 *			PIXI.EventTarget.call(this); //mixes in event target stuff
 *		}
 *
 *		var em = new MyEmitter();
 *		em.emit({ type: 'eventName', data: 'some data' });
 */
PIXI.EventTarget = function () {

	var listeners = {};
	
	this.addEventListener = this.on = function ( type, listener )
	{	
		if ( listeners[ type ] === undefined ) {
			listeners[ type ] = [listener];	
		}
		else if ( listeners[ type ].indexOf( listener ) === -1 )
		{
			listeners[ type ].push( listener );
		}
	};

	this.dispatchEvent = this.emit = function ( event ) {
		var t = event.type;
		if ( !listeners[ t ] || !listeners[ t ].length )
		{
			return;
		}
		
		var arr = listeners[t];
		for(var i = 0, l = arr.length; i < l; i++)
		{
			arr[ i ]( event );
		}
	};

	this.removeEventListener = this.off = function ( type, listener )
	{
		if(listeners[type] === undefined) return;
		var index = listeners[ type ].indexOf( listener );
		if ( index !== - 1 )
		{
			listeners[ type ].splice( index, 1 );
		}
	};
	
	this.hasEventListener = function(type)
	{
		return listeners[type] ? listeners[type].length > 0 : false;
	};
	
	this.removeAllListeners = function(destroy)
	{
		if(destroy)
			listeners = null;
		else
			listeners = {};
	};
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This helper function will automatically detect which renderer you should be using.
 * WebGL is the preferred renderer as it is a lot fastest. If webGL is not supported by
 * the browser then this function will return a canvas renderer
 *
 * @method autoDetectRenderer
 * @static
 * @param width {Number} the width of the renderers view
 * @param height {Number} the height of the renderers view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 * @param antialias=false {Boolean} sets antialias (only applicable in webGL chrome at the moment)
 *
 * antialias
 */
PIXI.autoDetectRenderer = function(width, height, view, transparent, antialias, preMultAlpha)
{
	if(!width)width = 800;
	if(!height)height = 600;

	// BORROWED from Mr Doob (mrdoob.com)
	var webgl = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();

	if(webgl)
	{
		var ie =  (navigator.userAgent.toLowerCase().indexOf('msie') != -1);
		 webgl = !ie;
	}
	
	//console.log(webgl);
	if( webgl )
	{
		return new PIXI.WebGLRenderer(width, height, view, transparent, antialias, preMultAlpha);
	}

	return	new PIXI.CanvasRenderer(width, height, view, transparent);
};



/*
	PolyK library
	url: http://polyk.ivank.net
	Released under MIT licence.

	Copyright (c) 2012 Ivan Kuckir

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	This is an amazing lib!

	slightly modified by mat groves (matgroves.com);
*/

PIXI.PolyK = {};

/**
 * Triangulates shapes for webGL graphic fills
 *
 * @method Triangulate
 * @namespace PolyK
 * @constructor
 */
PIXI.PolyK.Triangulate = function(p)
{
	var sign = true;

	var n = p.length>>1;
	if(n<3) return [];
	var tgs = [];
	var avl = [];
	for(var i=0; i<n; i++) avl.push(i);

	var i = 0;
	var al = n;
	while(al > 3)
	{
		var i0 = avl[(i+0)%al];
		var i1 = avl[(i+1)%al];
		var i2 = avl[(i+2)%al];

		var ax = p[2*i0],  ay = p[2*i0+1];
		var bx = p[2*i1],  by = p[2*i1+1];
		var cx = p[2*i2],  cy = p[2*i2+1];

		var earFound = false;
		if(PIXI.PolyK._convex(ax, ay, bx, by, cx, cy, sign))
		{
			earFound = true;
			for(var j=0; j<al; j++)
			{
				var vi = avl[j];
				if(vi==i0 || vi==i1 || vi==i2) continue;
				if(PIXI.PolyK._PointInTriangle(p[2*vi], p[2*vi+1], ax, ay, bx, by, cx, cy)) {earFound = false; break;}
			}
		}
		if(earFound)
		{
			tgs.push(i0, i1, i2);
			avl.splice((i+1)%al, 1);
			al--;
			i = 0;
		}
		else if(i++ > 3*al)
		{
			// need to flip flip reverse it!
			// reset!
			if(sign)
			{
				var tgs = [];
				avl = [];
				for(var i=0; i<n; i++) avl.push(i);

				i = 0;
				al = n;

				sign = false;
			}
			else
			{
				console.log("PIXI Warning: shape too complex to fill")
				return [];
			}
		}
	}
	tgs.push(avl[0], avl[1], avl[2]);
	return tgs;
}

/**
 * Checks if a point is within a triangle
 *
 * @class _PointInTriangle
 * @namespace PolyK
 * @private
 */
PIXI.PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy)
{
	var v0x = cx-ax;
	var v0y = cy-ay;
	var v1x = bx-ax;
	var v1y = by-ay;
	var v2x = px-ax;
	var v2y = py-ay;

	var dot00 = v0x*v0x+v0y*v0y;
	var dot01 = v0x*v1x+v0y*v1y;
	var dot02 = v0x*v2x+v0y*v2y;
	var dot11 = v1x*v1x+v1y*v1y;
	var dot12 = v1x*v2x+v1y*v2y;

	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

	// Check if point is in triangle
	return (u >= 0) && (v >= 0) && (u + v < 1);
}

/**
 * Checks if a shape is convex
 *
 * @class _convex
 * @namespace PolyK
 * @private
 */
PIXI.PolyK._convex = function(ax, ay, bx, by, cx, cy, sign)
{
	return ((ay-by)*(cx-bx) + (bx-ax)*(cy-by) >= 0) == sign;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


PIXI.initDefaultShaders = function() 
{
	PIXI.primitiveShader = new PIXI.PrimitiveShader();
  PIXI.primitiveShader.init();

  PIXI.stripShader = new PIXI.StripShader();
  PIXI.stripShader.init();

	PIXI.defaultShader = new PIXI.PixiShader();
	PIXI.defaultShader.init();

  var gl = PIXI.gl; 
  var shaderProgram = PIXI.defaultShader.program;
 

  gl.useProgram(shaderProgram);
  
  gl.enableVertexAttribArray(PIXI.defaultShader.aVertexPosition);
  gl.enableVertexAttribArray(PIXI.defaultShader.colorAttribute);
  gl.enableVertexAttribArray(PIXI.defaultShader.aTextureCoord);
}

PIXI.activatePrimitiveShader = function()
{
  var gl = PIXI.gl;
  
  gl.useProgram(PIXI.primitiveShader.program);
  
  gl.disableVertexAttribArray(PIXI.defaultShader.aVertexPosition);
  gl.disableVertexAttribArray(PIXI.defaultShader.colorAttribute);
  gl.disableVertexAttribArray(PIXI.defaultShader.aTextureCoord);

  gl.enableVertexAttribArray(PIXI.primitiveShader.aVertexPosition);
  gl.enableVertexAttribArray(PIXI.primitiveShader.colorAttribute);
} 

PIXI.deactivatePrimitiveShader = function()
{
  var gl = PIXI.gl;

  gl.useProgram(PIXI.defaultShader.program);
  
  gl.disableVertexAttribArray(PIXI.primitiveShader.aVertexPosition);
  gl.disableVertexAttribArray(PIXI.primitiveShader.colorAttribute);

  gl.enableVertexAttribArray(PIXI.defaultShader.aVertexPosition);
  gl.enableVertexAttribArray(PIXI.defaultShader.colorAttribute);
  gl.enableVertexAttribArray(PIXI.defaultShader.aTextureCoord);

}

PIXI.activateStripShader = function()
{
  var gl = PIXI.gl;
  
  gl.useProgram(PIXI.stripShader.program);
 // gl.disableVertexAttribArray(PIXI.defaultShader.aTextureCoord);
} 

PIXI.deactivateStripShader = function()
{
  var gl = PIXI.gl;

  gl.useProgram(PIXI.defaultShader.program);
  //gl.enableVertexAttribArray(PIXI.defaultShader.aTextureCoord);
}

/*

SHADER COMPILER HELPERS
*/

PIXI.CompileVertexShader = function(gl, shaderSrc)
{
  return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
}

PIXI.CompileFragmentShader = function(gl, shaderSrc)
{
  return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
}

PIXI._CompileShader = function(gl, shaderSrc, shaderType)
{
  var src = shaderSrc.join("\n");
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


PIXI.compileProgram = function(vertexSrc, fragmentSrc)
{
	var gl = PIXI.gl;
	var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
	var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);
	
	var shaderProgram = gl.createProgram();
	
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Could not initialise shaders");
    }

	return shaderProgram;
} 

PIXI.deleteShaders = function()
{
	var gl = PIXI.gl;
	if(!gl) return;
	gl.deleteProgram(PIXI.primitiveProgram.program);
	gl.deleteProgram(PIXI.stripShaderProgram.program);
	gl.deleteProgram(PIXI.defaultProgram.program);
}
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


PIXI.PixiShader = function()
{
	// the webGL program..
	this.program;
	
	this.fragmentSrc = [
	  "precision lowp float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform sampler2D uSampler;",
	  "void main(void) {",
	    "gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;",
	  "}"
	];
	
}

PIXI.PixiShader.prototype.init = function()
{
	var program = PIXI.compileProgram(this.vertexSrc || PIXI.PixiShader.defaultVertexSrc, this.fragmentSrc)
	
	var gl = PIXI.gl;
	
    gl.useProgram(program);
	
	// get and store the uniforms for the shader
	this.uSampler = gl.getUniformLocation(program, "uSampler");
	this.projectionVector = gl.getUniformLocation(program, "projectionVector");
	this.offsetVector = gl.getUniformLocation(program, "offsetVector");
    //this.dimensions = gl.getUniformLocation(this.program, "dimensions");
    
    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
	this.colorAttribute = gl.getAttribLocation(program, "aColor");
	this.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
	  
    // add those custom shaders!
    for (var key in this.uniforms)
    {
       
    	// get the uniform locations..
	//	program[key] = 
        this.uniforms[key].uniformLocation = gl.getUniformLocation(program, key);

      
    }
  
	this.program = program;
}

PIXI.PixiShader.prototype.syncUniforms = function()
{
	var gl = PIXI.gl;
	
	for (var key in this.uniforms) 
    {
    	//var 
    	var type = this.uniforms[key].type;
    	
    	// need to grow this!
    	if(type == "f")
    	{
			gl.uniform1f(this.uniforms[key].uniformLocation, this.uniforms[key].value);
    	}
    	if(type == "f2")
    	{
    	//	console.log(this.program[key])
			gl.uniform2f(this.uniforms[key].uniformLocation, this.uniforms[key].value.x, this.uniforms[key].value.y);
    	}
        else if(type == "f4")
        {
           // console.log(this.uniforms[key].value)
            gl.uniform4fv(this.uniforms[key].uniformLocation, this.uniforms[key].value);
        }
    	else if(type == "mat4")
    	{
    		gl.uniformMatrix4fv(this.uniforms[key].uniformLocation, false, this.uniforms[key].value);
    	}
    	else if(type == "sampler2D")
    	{
    		// first texture...
    		var texture = this.uniforms[key].value;
    		
    		gl.activeTexture(gl.TEXTURE1);
	    	gl.bindTexture(gl.TEXTURE_2D, texture.baseTexture._glTexture);
	    	
    		gl.uniform1i(this.uniforms[key].uniformLocation, 1);
    		
    		// activate texture..
    		// gl.uniformMatrix4fv(this.program[key], false, this.uniforms[key].value);
    		// gl.uniformMatrix4fv(this.program[key], false, this.uniforms[key].value);
    	}
    }
    
}

PIXI.PixiShader.defaultVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  
  "uniform vec2 projectionVector;",
 "uniform vec2 offsetVector;",
  "varying vec2 vTextureCoord;",
  
  "varying float vColor;",

  "const vec2 center = vec2(-1.0, 1.0);",
  "void main(void) {",
    "gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "vColor = aColor;",
  "}"
];

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


PIXI.StripShader = function()
{
	// the webGL program..
	this.program;
	
    this.fragmentSrc = [
      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "varying float vColor;",
      "uniform float alpha;",
      "uniform sampler2D uSampler;",
      "void main(void) {",
        "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
        "gl_FragColor = gl_FragColor * alpha;",
      "}"
    ];

    this.vertexSrc = [
      "attribute vec2 aVertexPosition;",
      "attribute vec2 aTextureCoord;",
      "attribute float aColor;",
      "uniform mat3 translationMatrix;",
      "uniform vec2 projectionVector;",
      "varying vec2 vTextureCoord;",
      "varying vec2 offsetVector;",
      "varying float vColor;",
      "void main(void) {",
        "vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
        "v -= offsetVector.xyx;",
        "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);",
        "vTextureCoord = aTextureCoord;",
        "vColor = aColor;",
      "}"
    ];
}

PIXI.StripShader.prototype.init = function()
{
	var program = PIXI.compileProgram(this.vertexSrc, this.fragmentSrc)
	
	var gl = PIXI.gl;
	
    gl.useProgram(program);

	// get and store the uniforms for the shader
	this.uSampler = gl.getUniformLocation(program, "uSampler");
	this.projectionVector = gl.getUniformLocation(program, "projectionVector");
	this.offsetVector = gl.getUniformLocation(program, "offsetVector");
	this.colorAttribute = gl.getAttribLocation(program, "aColor");
	//this.dimensions = gl.getUniformLocation(this.program, "dimensions");
	
	// get and store the attributes
	this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
	this.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
	  
    this.translationMatrix = gl.getUniformLocation(program, "translationMatrix");
    this.alpha = gl.getUniformLocation(program, "alpha");
  
	this.program = program;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


PIXI.PrimitiveShader = function()
{
	// the webGL program..
	this.program;
    	
    this.fragmentSrc = [
      "precision mediump float;",
      "varying vec4 vColor;",
      "void main(void) {",
        "gl_FragColor = vColor;",
      "}"
    ];

    this.vertexSrc  = [
      "attribute vec2 aVertexPosition;",
      "attribute vec4 aColor;",
      "uniform mat3 translationMatrix;",
      "uniform vec2 projectionVector;",
      "uniform vec2 offsetVector;",
      "uniform float alpha;",
      "varying vec4 vColor;",
      "void main(void) {",
        "vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);",
        "v -= offsetVector.xyx;",
        "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
        "vColor = aColor  * alpha;",
      "}"
    ];
	
}

PIXI.PrimitiveShader.prototype.init = function()
{
	var program = PIXI.compileProgram(this.vertexSrc, this.fragmentSrc);
	
	var gl = PIXI.gl;
	
  gl.useProgram(program);
	
	// get and store the uniforms for the shader
	this.projectionVector = gl.getUniformLocation(program, "projectionVector");
	this.offsetVector = gl.getUniformLocation(program, "offsetVector");
  
  // get and store the attributes
  this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
	this.colorAttribute = gl.getAttribLocation(program, "aColor");
	
  this.translationMatrix = gl.getUniformLocation(program, "translationMatrix");
  this.alpha = gl.getUniformLocation(program, "alpha");

	this.program = program;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A set of functions used by the webGL renderer to draw the primitive graphics data
 *
 * @class CanvasGraphics
 */
PIXI.WebGLGraphics = function()
{
	
}

/**
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics {Graphics}
 * @param projection {Object}
 */
PIXI.WebGLGraphics.renderGraphics = function(graphics, projection)
{
	var gl = PIXI.gl;
	
	if(!graphics._webGL)graphics._webGL = {points:[], indices:[], lastIndex:0, 
										   buffer:gl.createBuffer(),
										   indexBuffer:gl.createBuffer()};
	
	if(graphics.dirty)
	{
		graphics.dirty = false;
		
		if(graphics.clearDirty)
		{
			graphics.clearDirty = false;
			
			graphics._webGL.lastIndex = 0;
			graphics._webGL.points = [];
			graphics._webGL.indices = [];
			
		}
		
		PIXI.WebGLGraphics.updateGraphics(graphics);
	}
	
	PIXI.activatePrimitiveShader();
	
	// This  could be speeded up fo sure!
	var m = PIXI.mat3.clone(graphics.worldTransform);
	
	PIXI.mat3.transpose(m);
	
	// set the matrix transform for the 
 	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

 	gl.uniformMatrix3fv(PIXI.primitiveShader.translationMatrix, false, m);
 	
	gl.uniform2f(PIXI.primitiveShader.projectionVector, projection.x, -projection.y);
	gl.uniform2f(PIXI.primitiveShader.offsetVector, -PIXI.offset.x, -PIXI.offset.y);
	
	gl.uniform1f(PIXI.primitiveShader.alpha, graphics.worldAlpha);
	gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
	
	gl.vertexAttribPointer(PIXI.primitiveShader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
	gl.vertexAttribPointer(PIXI.primitiveShader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);
	
	// set the index buffer!
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
	

	gl.drawElements(gl.TRIANGLE_STRIP,  graphics._webGL.indices.length, gl.UNSIGNED_SHORT, 0 );
	
	PIXI.deactivatePrimitiveShader();
	
	
	// return to default shader...
//	PIXI.activateShader(PIXI.defaultShader);
}

/**
 * Updates the graphics object
 *
 * @static
 * @private
 * @method updateGraphics
 * @param graphics {Graphics}
 */
PIXI.WebGLGraphics.updateGraphics = function(graphics)
{
	for (var i=graphics._webGL.lastIndex; i < graphics.graphicsData.length; i++) 
	{
		var data = graphics.graphicsData[i];
		
		if(data.type == PIXI.Graphics.POLY)
		{
			if(data.fill)
			{
				if(data.points.length>3) 
				PIXI.WebGLGraphics.buildPoly(data, graphics._webGL);
			}
			
			if(data.lineWidth > 0)
			{
				PIXI.WebGLGraphics.buildLine(data, graphics._webGL);
			}
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			PIXI.WebGLGraphics.buildRectangle(data, graphics._webGL);
		}
		else if(data.type == PIXI.Graphics.CIRC || data.type == PIXI.Graphics.ELIP)
		{
			PIXI.WebGLGraphics.buildCircle(data, graphics._webGL);
		}
	};
	
	graphics._webGL.lastIndex = graphics.graphicsData.length;
	
	var gl = PIXI.gl;

	graphics._webGL.glPoints = new Float32Array(graphics._webGL.points);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, graphics._webGL.glPoints, gl.STATIC_DRAW);
	
	graphics._webGL.glIndicies = new Uint16Array(graphics._webGL.indices);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.glIndicies, gl.STATIC_DRAW);
}

/**
 * Builds a rectangle to draw
 *
 * @static
 * @private
 * @method buildRectangle
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
{
	// --- //
	// need to convert points to a nice regular data
	// 
	var rectData = graphicsData.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	
	
	if(graphicsData.fill)
	{
		var color = HEXtoRGB(graphicsData.fillColor);
		var alpha = graphicsData.fillAlpha;
		
		var r = color[0] * alpha;
		var g = color[1] * alpha;
		var b = color[2] * alpha;
	
		var verts = webGLData.points;
		var indices = webGLData.indices;
	
		var vertPos = verts.length/6;
		
		// start
		verts.push(x, y);
		verts.push(r, g, b, alpha);
		
		verts.push(x + width, y);
		verts.push(r, g, b, alpha);
		
		verts.push(x , y + height);
		verts.push(r, g, b, alpha);
		
		verts.push(x + width, y + height);
		verts.push(r, g, b, alpha);
		
		// insert 2 dead triangles..
		indices.push(vertPos, vertPos, vertPos+1, vertPos+2, vertPos+3, vertPos+3)
	}
	
	if(graphicsData.lineWidth)
	{
		graphicsData.points = [x, y,
				  x + width, y,
				  x + width, y + height,
				  x, y + height,
				  x, y];
	
		PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
	}
	
}

/**
 * Builds a circle to draw
 *
 * @static
 * @private
 * @method buildCircle
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData)
{
	// --- //
	// need to convert points to a nice regular data
	// 
	var rectData = graphicsData.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	
	var totalSegs = 40;
	var seg = (Math.PI * 2) / totalSegs ;
		
	if(graphicsData.fill)
	{
		var color = HEXtoRGB(graphicsData.fillColor);
		var alpha = graphicsData.fillAlpha;

		var r = color[0] * alpha;
		var g = color[1] * alpha;
		var b = color[2] * alpha;
	
		var verts = webGLData.points;
		var indices = webGLData.indices;
	
		var vecPos = verts.length/6;
		
		indices.push(vecPos);
		
		for (var i=0; i < totalSegs + 1 ; i++) 
		{
			verts.push(x,y, r, g, b, alpha);
			
			verts.push(x + Math.sin(seg * i) * width,
					   y + Math.cos(seg * i) * height,
					   r, g, b, alpha);
		
			indices.push(vecPos++, vecPos++);
		};
		
		indices.push(vecPos-1);
	}
	
	if(graphicsData.lineWidth)
	{
		graphicsData.points = [];
		
		for (var i=0; i < totalSegs + 1; i++) 
		{
			graphicsData.points.push(x + Math.sin(seg * i) * width,
									 y + Math.cos(seg * i) * height)
		};
		
		PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
	}
	
}

/**
 * Builds a line to draw
 *
 * @static
 * @private
 * @method buildLine
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData)
{
	// TODO OPTIMISE!
	
	var wrap = true;
	var points = graphicsData.points;
	if(points.length == 0)return;
	
	// if the line width is an odd number add 0.5 to align to a whole pixel
	if(graphicsData.lineWidth%2)
	{
		for (var i = 0; i < points.length; i++) {
			points[i] += 0.5;
		};
	}

	// get first and last point.. figure out the middle!
	var firstPoint = new PIXI.Point( points[0], points[1] );
	var lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );
	
	// if the first point is the last point - goona have issues :)
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y)
	{
		points.pop();
		points.pop();
		
		lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );
		
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;
		
		points.unshift(midPointX, midPointY);
		points.push(midPointX, midPointY)
	}
	
	var verts = webGLData.points;
	var indices = webGLData.indices;
	var length = points.length / 2;
	var indexCount = points.length;
	var indexStart = verts.length/6;
	
	// DRAW the Line
	var width = graphicsData.lineWidth / 2;
	
	// sort color
	var color = HEXtoRGB(graphicsData.lineColor);
	var alpha = graphicsData.lineAlpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	
	var p1x, p1y, p2x, p2y, p3x, p3y;
	var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
	var ipx, ipy;
	var a1, b1, c1, a2, b2, c2;
	var denom, pdist, dist;
	
	p1x = points[0];
	p1y = points[1];
	
	p2x = points[2];
	p2y = points[3];
	
	perpx = -(p1y - p2y);
	perpy =  p1x - p2x;
	
	dist = Math.sqrt(perpx*perpx + perpy*perpy);
	
	perpx /= dist;
	perpy /= dist;
	perpx *= width;
	perpy *= width;
	
	// start
	verts.push(p1x - perpx , p1y - perpy,
				r, g, b, alpha);
	
	verts.push(p1x + perpx , p1y + perpy,
				r, g, b, alpha);
	
	for (var i = 1; i < length-1; i++) 
	{
		p1x = points[(i-1)*2];
		p1y = points[(i-1)*2 + 1];
		
		p2x = points[(i)*2]
		p2y = points[(i)*2 + 1]
		
		p3x = points[(i+1)*2];
		p3y = points[(i+1)*2 + 1];
		
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		
		dist = Math.sqrt(perpx*perpx + perpy*perpy);
		perpx /= dist;
		perpy /= dist;
		perpx *= width;
		perpy *= width;

		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		
		dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
		perp2x /= dist;
		perp2y /= dist;
		perp2x *= width;
		perp2y *= width;
		
		a1 = (-perpy + p1y) - (-perpy + p2y);
	    b1 = (-perpx + p2x) - (-perpx + p1x);
	    c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
	    a2 = (-perp2y + p3y) - (-perp2y + p2y);
	    b2 = (-perp2x + p2x) - (-perp2x + p3x);
	    c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
	 
	    denom = a1*b2 - a2*b1;

	   if(Math.abs(denom) < 0.1 )
		{
		
			denom+=10.1;
			verts.push(p2x - perpx , p2y - perpy,
				r, g, b, alpha);
	
			verts.push(p2x + perpx , p2y + perpy,
				r, g, b, alpha);
			
			continue;
		}
	    
	    px = (b1*c2 - b2*c1)/denom;
	    py = (a2*c1 - a1*c2)/denom;
		
			
		pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);
		

		if(pdist > 140 * 140)
		{
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			
			dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
			perp3x /= dist;
			perp3y /= dist;
			perp3x *= width;
			perp3y *= width;
			
			verts.push(p2x - perp3x, p2y -perp3y);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x + perp3x, p2y +perp3y);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x - perp3x, p2y -perp3y);
			verts.push(r, g, b, alpha);
			
			indexCount++;
		}
		else
		{

			verts.push(px , py);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x - (px-p2x), p2y - (py - p2y));
			verts.push(r, g, b, alpha);
		}
	}
	
	p1x = points[(length-2)*2]
	p1y = points[(length-2)*2 + 1] 
	
	p2x = points[(length-1)*2]
	p2y = points[(length-1)*2 + 1]
	
	perpx = -(p1y - p2y)
	perpy = p1x - p2x;
	
	dist = Math.sqrt(perpx*perpx + perpy*perpy);
	perpx /= dist;
	perpy /= dist;
	perpx *= width;
	perpy *= width;
	
	verts.push(p2x - perpx , p2y - perpy)
	verts.push(r, g, b, alpha);
	
	verts.push(p2x + perpx , p2y + perpy)
	verts.push(r, g, b, alpha);
	
	indices.push(indexStart);
	
	for (var i=0; i < indexCount; i++) 
	{
		indices.push(indexStart++);
	};
	
	indices.push(indexStart-1);
}

/**
 * Builds a polygon to draw
 *
 * @static
 * @private
 * @method buildPoly
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData)
{
	var points = graphicsData.points;
	if(points.length < 6)return;
	
	// get first and last point.. figure out the middle!
	var verts = webGLData.points;
	var indices = webGLData.indices;
	
	var length = points.length / 2;
	
	// sort color
	var color = HEXtoRGB(graphicsData.fillColor);
	var alpha = graphicsData.fillAlpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	
	var triangles = PIXI.PolyK.Triangulate(points);
	
	var vertPos = verts.length / 6;
	
	for (var i=0; i < triangles.length; i+=3) 
	{
		indices.push(triangles[i] + vertPos);
		indices.push(triangles[i] + vertPos);
		indices.push(triangles[i+1] + vertPos);
		indices.push(triangles[i+2] +vertPos);
		indices.push(triangles[i+2] + vertPos);
	};
	
	for (var i = 0; i < length; i++) 
	{
		verts.push(points[i * 2], points[i * 2 + 1],
				   r, g, b, alpha);
	};
}

function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}





/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._defaultFrame = new PIXI.Rectangle(0,0,1,1);

// an instance of the gl context..
// only one at the moment :/
PIXI.gl;

/**
 * the WebGLRenderer is draws the stage and all its content onto a webGL enabled canvas. This renderer
 * should be used for browsers support webGL. This Render works by automatically managing webGLBatchs.
 * So no need for Sprite Batch's or Sprite Cloud's
 * Dont forget to add the view to your DOM or you will not see anything :)
 *
 * @class WebGLRenderer
 * @constructor
 * @param width=0 {Number} the width of the canvas view
 * @param height=0 {Number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 * @param antialias=false {Boolean} sets antialias (only applicable in chrome at the moment)
 * 
 */
PIXI.WebGLRenderer = function(width, height, view, transparent, antialias, preMultAlpha)
{
	// do a catch.. only 1 webGL renderer..

	this.transparent = !!transparent;

	this.width = width || 800;
	this.height = height || 600;
	
	/**
	 * If the view should be cleared before each render.
	 * @property clearView
	 * @type Boolean
	 * @default true
	 */
	this.clearView = true;
	
	this.view = view || document.createElement( 'canvas' ); 
    this.view.width = this.width;
	this.view.height = this.height;

	// deal with losing context..	
    var scope = this;
	this.onContextLost = function(event) { scope.handleContextLost(event); };
	this.onContextRestored = function(event) { scope.handleContextRestored(event); };
	this.view.addEventListener('webglcontextlost', this.onContextLost, false);
	this.view.addEventListener('webglcontextrestored', this.onContextRestored, false);

	this.batchs = [];

	var options = {
		alpha: this.transparent,
		antialias:!!antialias, // SPEED UP??
		premultipliedAlpha:!!preMultAlpha,
		stencil:true
	}

	//try 'experimental-webgl'
	try {
		PIXI.gl = this.gl = this.view.getContext("experimental-webgl",  options);
	} catch (e) {
		//try 'webgl'
		try {
			PIXI.gl = this.gl = this.view.getContext("webgl",  options);
		} catch (e) {
			// fail, not able to get a context
			throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
		}
	}

    PIXI.initDefaultShaders();
 

	

   // PIXI.activateDefaultShader();

    var gl = this.gl;
    
    gl.useProgram(PIXI.defaultShader.program);


    PIXI.WebGLRenderer.gl = gl;

    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
   	gl.disable(gl.CULL_FACE);

    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, this.transparent); 

    PIXI.projection = new PIXI.Point(400, 300);
    PIXI.offset = new PIXI.Point(0, 0);

    // TODO remove thease globals..

    this.resize(this.width, this.height);
    this.contextLost = false;

	//PIXI.pushShader(PIXI.defaultShader);

    this.stageRenderGroup = new PIXI.WebGLRenderGroup(this.gl);
    
}

// constructor
PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;

/**
 * Gets a new WebGLBatch from the pool
 *
 * @static
 * @method getBatch
 * @return {WebGLBatch}
 * @private 
 */
PIXI.WebGLRenderer.getBatch = function()
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(PIXI.WebGLRenderer.gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * Puts a batch back into the pool
 *
 * @static
 * @method returnBatch
 * @param batch {WebGLBatch} The batch to return
 * @private
 */
PIXI.WebGLRenderer.returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

PIXI.WebGLRenderer.prototype.destroy = function()
{
	if(this.stageRenderGroup.root)
		this.stageRenderGroup.removeDisplayObjectAndChildren(this.stageRenderGroup.root);
	this.stageRenderGroup.root = null;
	this.stageRenderGroup.gl = null;
	this.stageRenderGroup.batchs= null;
	this.stageRenderGroup.toRemove = null;
	this.stageRenderGroup = null;
	this.view.removeEventListener('webglcontextlost', this.onContextLost, false);
	this.view.removeEventListener('webglcontextrestored', this.onContextRestored, false);
	this.view = null;
	PIXI.WebGLRenderer.gl = this.gl = PIXI.gl = null;
	PIXI.deleteShaders();
}

/**
 * Renders the stage to its webGL view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.WebGLRenderer.prototype.render = function(stage)
{
	if(this.contextLost)return;
	
	
	// if rendering a new stage clear the batchs..
	var renderGroup = this.stageRenderGroup;
	if(this.__stage !== stage)
	{
		// TODO make this work
		// dont think this is needed any more?
		this.__stage = stage;
		renderGroup.setRenderable(stage);
	}

	// update any textures	
	PIXI.WebGLRenderer.updateTextures();
		
	// update the scene graph	
	PIXI.visibleCount++;
	stage.updateTransform();
	
	var gl = this.gl;
	
	// -- Does this need to be set every frame? -- //
	gl.colorMask(true, true, true, this.transparent); 
	gl.viewport(0, 0, this.width, this.height);	
	
   	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		
	if(this.clearView)
	{
		var bcs = stage.backgroundColorSplit;
		gl.clearColor(bcs[0], bcs[1], bcs[2], !this.transparent);     
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	// HACK TO TEST
	
	renderGroup.backgroundColor = stage.backgroundColorSplit;
	
	PIXI.projection.x =  this.width/2;
	PIXI.projection.y =  -this.height/2;
	
	renderGroup.render(PIXI.projection);
	
	// interaction
	// run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
	
	// after rendering lets confirm all frames that have been uodated..
	var updates = PIXI.Texture.frameUpdates;
	var len = updates.length;
	if(len > 0)
	{
		for (var i=0; i < len; i++) 
		{
		  	updates[i].updateFrame = false;
		};
		updates.length = 0;
	}
}

/**
 * Updates the textures loaded into this webgl renderer
 *
 * @static
 * @method updateTextures
 * @private
 */
PIXI.WebGLRenderer.updateTextures = function()
{
	//TODO break this out into a texture manager...
	var renderer = PIXI.WebGLRenderer;
	var arr = PIXI.texturesToUpdate;
	for (var i=0, len = arr.length; i < len; i++) renderer.updateTexture(arr[i]);
	arr.length = 0;
	arr = PIXI.texturesToDestroy;
	for (var i=0, len = arr.length; i < len; i++) renderer.destroyTexture(arr[i]);
	arr.length = 0;
}

/**
 * Updates a loaded webgl texture
 *
 * @static
 * @method updateTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.updateTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;
	
	if(!texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
	}

	if(texture.hasLoaded)
	{
		var TEX_2D = gl.TEXTURE_2D;
		gl.bindTexture(TEX_2D, texture._glTexture);
	 	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

		gl.texImage2D(TEX_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
		gl.texParameteri(TEX_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(TEX_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

		// reguler...

		if(!texture._powerOf2)
		{
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}
		else
		{
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}

		gl.bindTexture(TEX_2D, null);
	}
}

/**
 * Destroys a loaded webgl texture
 *
 * @method destroyTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.destroyTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;

	if(texture._glTexture)
	{
		//texture._glTexture = gl.createTexture();//why would we want to create a texture in order to destroy it?
		gl.deleteTexture(texture._glTexture);
		texture._glTexture = null;
	}
}

/**
 * resizes the webGL view to the specified width and height
 *
 * @method resize
 * @param width {Number} the new width of the webGL view
 * @param height {Number} the new height of the webGL view
 */
PIXI.WebGLRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;

	this.view.width = width;
	this.view.height = height;

	this.gl.viewport(0, 0, this.width, this.height);	

	//var projectionMatrix = this.projectionMatrix;

	PIXI.projection.x =  this.width/2;
	PIXI.projection.y =  -this.height/2;
	
	//PIXI.size.x =  this.width/2;
	//PIXI.size.y =  -this.height/2;

//	projectionMatrix[0] = 2/this.width;
//	projectionMatrix[5] = -2/this.height;
//	projectionMatrix[12] = -1;
//	projectionMatrix[13] = 1;
}

/**
 * Handles a lost webgl context
 *
 * @method handleContextLost
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
{
	event.preventDefault();
	this.contextLost = true;
}

/**
 * Handles a restored webgl context
 *
 * @method handleContextRestored
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextRestored = function(event)
{
	this.gl = this.view.getContext("experimental-webgl",  {  	
		alpha: true
    });

	this.initShaders();	

	for(var key in PIXI.TextureCache) 
	{
        var texture = PIXI.TextureCache[key].baseTexture;
        texture._glTexture = null;
        PIXI.WebGLRenderer.updateTexture(texture);
	};
	
	array = this.batches;
	len = array.length;
	for (var i=0; i < len; i++) 
	{
		var b = array[i];
		b.restoreLostContext(this.gl)//
		b.dirty = true;
	};

	PIXI._restoreBatchs(this.gl);

	this.contextLost = false;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._batchs = [];

/**
 * @private
 */
PIXI._getBatch = function(gl)
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * @private
 */
PIXI._returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

/**
 * @private
 */
PIXI._restoreBatchs = function(gl)
{
	for (var i=0; i < PIXI._batchs.length; i++) 
	{
	  PIXI._batchs[i].restoreLostContext(gl);
	};
}

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be grouped into a batch.
 * All the sprites in a batch can then be drawn in one go by the GPU which is hugely efficient. ALL sprites
 * in the webGL renderer are added to a batch even if the batch only contains one sprite. Batching is handled
 * automatically by the webGL renderer. A good tip is: the smaller the number of batchs there are, the faster
 * the webGL renderer will run.
 *
 * @class WebGLBatch
 * @constructor
 * @param gl {WebGLContext} an instance of the webGL context
 */
PIXI.WebGLBatch = function(gl)
{
	this.gl = gl;
	
	this.size = 0;

	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
	this.blendMode = PIXI.blendModes.NORMAL;
	this.dynamicSize = 1;
}

// constructor
PIXI.WebGLBatch.prototype.constructor = PIXI.WebGLBatch;

/**
 * Cleans the batch so that is can be returned to an object pool and reused
 *
 * @method clean
 */
PIXI.WebGLBatch.prototype.clean = function()
{
	this.verticies = [];
	this.uvs = [];
	this.indices = [];
	this.colors = [];
	this.dynamicSize = 1;
	this.texture = null;
	this.last = null;
	this.size = 0;
	this.head;
	this.tail;
}

/**
 * Recreates the buffers in the event of a context loss
 *
 * @method restoreLostContext
 * @param gl {WebGLContext}
 */
PIXI.WebGLBatch.prototype.restoreLostContext = function(gl)
{
	this.gl = gl;
	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
}

/**
 * inits the batch's texture and blend mode based if the supplied sprite
 *
 * @method init
 * @param sprite {Sprite} the first sprite to be added to the batch. Only sprites with
 *		the same base texture and blend mode will be allowed to be added to this batch
 */	
PIXI.WebGLBatch.prototype.init = function(sprite)
{
	sprite.batch = this;
	this.dirty = true;
	this.blendMode = sprite.blendMode;
	this.texture = sprite.texture.baseTexture;
	this.head = sprite;
	this.tail = sprite;
	this.size = 1;

	this.growBatch();
}

/**
 * inserts a sprite before the specified sprite
 *
 * @method insertBefore
 * @param sprite {Sprite} the sprite to be added
 * @param nextSprite {nextSprite} the first sprite will be inserted before this sprite
 */	
PIXI.WebGLBatch.prototype.insertBefore = function(sprite, nextSprite)
{
	this.size++;

	sprite.batch = this;
	this.dirty = true;
	var tempPrev = nextSprite.__prev;
	nextSprite.__prev = sprite;
	sprite.__next = nextSprite;

	if(tempPrev)
	{
		sprite.__prev = tempPrev;
		tempPrev.__next = sprite;
	}
	else
	{
		this.head = sprite;
	}
}

/**
 * inserts a sprite after the specified sprite
 *
 * @method insertAfter
 * @param sprite {Sprite} the sprite to be added
 * @param  previousSprite {Sprite} the first sprite will be inserted after this sprite
 */	
PIXI.WebGLBatch.prototype.insertAfter = function(sprite, previousSprite)
{
	this.size++;

	sprite.batch = this;
	this.dirty = true;

	var tempNext = previousSprite.__next;
	previousSprite.__next = sprite;
	sprite.__prev = previousSprite;

	if(tempNext)
	{
		sprite.__next = tempNext;
		tempNext.__prev = sprite;
	}
	else
	{
		this.tail = sprite
	}
}

/**
 * removes a sprite from the batch
 *
 * @method remove
 * @param sprite {Sprite} the sprite to be removed
 */	
PIXI.WebGLBatch.prototype.remove = function(sprite)
{
	this.size--;

	if(this.size == 0)
	{
		sprite.batch = null;
		sprite.__prev = null;
		sprite.__next = null;
		return;
	}

	if(sprite.__prev)
	{
		sprite.__prev.__next = sprite.__next;
	}
	else
	{
		this.head = sprite.__next;
		this.head.__prev = null;
	}

	if(sprite.__next)
	{
		sprite.__next.__prev = sprite.__prev;
	}
	else
	{
		this.tail = sprite.__prev;
		this.tail.__next = null
	}

	sprite.batch = null;
	sprite.__next = null;
	sprite.__prev = null;
	this.dirty = true;
}

/**
 * Splits the batch into two with the specified sprite being the start of the new batch.
 *
 * @method split
 * @param sprite {Sprite} the sprite that indicates where the batch should be split
 * @return {WebGLBatch} the new batch
 */
PIXI.WebGLBatch.prototype.split = function(sprite)
{
	this.dirty = true;

	var batch = new PIXI.WebGLBatch(this.gl);
	batch.init(sprite);
	batch.texture = this.texture;
	batch.tail = this.tail;

	this.tail = sprite.__prev;
	this.tail.__next = null;

	sprite.__prev = null;
	// return a splite batch!

	// TODO this size is wrong!
	// need to recalculate :/ problem with a linked list!
	// unless it gets calculated in the "clean"?

	// need to loop through items as there is no way to know the length on a linked list :/
	var tempSize = 0;
	while(sprite)
	{
		tempSize++;
		sprite.batch = batch;
		sprite = sprite.__next;
	}

	batch.size = tempSize;
	this.size -= tempSize;

	return batch;
}

/**
 * Merges two batchs together
 *
 * @method merge
 * @param batch {WebGLBatch} the batch that will be merged 
 */
PIXI.WebGLBatch.prototype.merge = function(batch)
{
	this.dirty = true;

	this.tail.__next = batch.head;
	batch.head.__prev = this.tail;

	this.size += batch.size;

	this.tail = batch.tail;

	var sprite = batch.head;
	while(sprite)
	{
		sprite.batch = this;
		sprite = sprite.__next;
	}
}

/**
 * Grows the size of the batch. As the elements in the batch cannot have a dynamic size this
 * function is used to increase the size of the batch. It also creates a little extra room so
 * that the batch does not need to be resized every time a sprite is added
 *
 * @method growBatch
 */
PIXI.WebGLBatch.prototype.growBatch = function()
{
	var gl = this.gl;
	if( this.size == 1)
	{
		this.dynamicSize = 1;
	}
	else
	{
		this.dynamicSize = this.size * 1.5
	}
	// grow verts
	this.verticies = new Float32Array(this.dynamicSize * 8);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,this.verticies , gl.DYNAMIC_DRAW);

	this.uvs  = new Float32Array( this.dynamicSize * 8 );
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.uvs , gl.DYNAMIC_DRAW);

	this.dirtyUVS = true;

	this.colors  = new Float32Array( this.dynamicSize * 4 );
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors , gl.DYNAMIC_DRAW);

	this.dirtyColors = true;

	this.indices = new Uint16Array(this.dynamicSize * 6); 
	var length = this.indices.length/6;

	for (var i=0; i < length; i++) 
	{
	    var index2 = i * 6;
	    var index3 = i * 4;
		this.indices[index2 + 0] = index3 + 0;
		this.indices[index2 + 1] = index3 + 1;
		this.indices[index2 + 2] = index3 + 2;
		this.indices[index2 + 3] = index3 + 0;
		this.indices[index2 + 4] = index3 + 2;
		this.indices[index2 + 5] = index3 + 3;
	};

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
}

/**
 * Refresh's all the data in the batch and sync's it with the webGL buffers
 *
 * @method refresh
 */
PIXI.WebGLBatch.prototype.refresh = function()
{
	var gl = this.gl;

	if (this.dynamicSize < this.size)
	{
		this.growBatch();
	}

	var indexRun = 0;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index;
	var a, b, c, d, tx, ty;

	var displayObject = this.head;

	while(displayObject)
	{
		index = indexRun * 8;

		var texture = displayObject.texture;

		var frame = texture.frame;
		var tw = texture.baseTexture.width;
		var th = texture.baseTexture.height;

		this.uvs[index + 0] = frame.x / tw;
		this.uvs[index +1] = frame.y / th;

		this.uvs[index +2] = (frame.x + frame.width) / tw;
		this.uvs[index +3] = frame.y / th;

		this.uvs[index +4] = (frame.x + frame.width) / tw;
		this.uvs[index +5] = (frame.y + frame.height) / th; 

		this.uvs[index +6] = frame.x / tw;
		this.uvs[index +7] = (frame.y + frame.height) / th;

		displayObject.updateFrame = false;

		colorIndex = indexRun * 4;
		this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;

		displayObject = displayObject.__next;

		indexRun ++;
	}

	this.dirtyUVS = true;
	this.dirtyColors = true;
}

/**
 * Updates all the relevant geometry and uploads the data to the GPU
 *
 * @method update
 */
PIXI.WebGLBatch.prototype.update = function()
{
	var gl = this.gl;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, index2, index3

	var a, b, c, d, tx, ty;

	var indexRun = 0;

	var displayObject = this.head;
	var verticies = this.verticies;
	var uvs = this.uvs;
	var colors = this.colors;
	
	while(displayObject)
	{
		if(displayObject.vcount === PIXI.visibleCount)
		{
			width = displayObject.texture.frame.width;
			height = displayObject.texture.frame.height;

			// TODO trim??
			aX = displayObject.anchor.x;// - displayObject.texture.trim.x
			aY = displayObject.anchor.y; //- displayObject.texture.trim.y
			if(displayObject.texture.realSize)
			{
				var rs = displayObject.texture.realSize;
				aX = (rs.width * aX + rs.x) / width;
				aY = (rs.height * aY + rs.y) / height;
			}
			w0 = width * (1-aX);
			w1 = width * -aX;

			h0 = height * (1-aY);
			h1 = height * -aY;

			index = indexRun * 8;

			worldTransform = displayObject.worldTransform;

			a = worldTransform[0];
			b = worldTransform[3];
			c = worldTransform[1];
			d = worldTransform[4];
			tx = worldTransform[2];
			ty = worldTransform[5];

			verticies[index + 0 ] = a * w1 + c * h1 + tx; 
			verticies[index + 1 ] = d * h1 + b * w1 + ty;

			verticies[index + 2 ] = a * w0 + c * h1 + tx; 
			verticies[index + 3 ] = d * h1 + b * w0 + ty; 

			verticies[index + 4 ] = a * w0 + c * h0 + tx; 
			verticies[index + 5 ] = d * h0 + b * w0 + ty; 

			verticies[index + 6] =  a * w1 + c * h0 + tx; 
			verticies[index + 7] =  d * h0 + b * w1 + ty; 

			if(displayObject.updateFrame || displayObject.texture.updateFrame)
			{
				this.dirtyUVS = true;

				var texture = displayObject.texture;

				var frame = texture.frame;
				var tw = texture.baseTexture.width;
				var th = texture.baseTexture.height;

				var uv0 = uvs[index + 0] = frame.x / tw;
				var uv1 = uvs[index + 1] = frame.y / th;
				
				var uv2 = uvs[index + 2] = (frame.x + frame.width) / tw;
				uvs[index + 3] = uv1;//frame.y / th;
				
				uvs[index + 4] = uv2;//(frame.x + frame.width) / tw;
				var uv5 = uvs[index + 5] = (frame.y + frame.height) / th; 
				
				uvs[index + 6] = uv0;//frame.x / tw;
				uvs[index + 7] = uv5;//(frame.y + frame.height) / th;
				
				displayObject.updateFrame = false;
			}

			// TODO this probably could do with some optimisation....
			if(displayObject.cacheAlpha != displayObject.worldAlpha)
			{
				displayObject.cacheAlpha = displayObject.worldAlpha;

				var colorIndex = indexRun * 4;
				colors[colorIndex] = colors[colorIndex + 1] = colors[colorIndex + 2] = colors[colorIndex + 3] = displayObject.worldAlpha;
				this.dirtyColors = true;
			}
		}
		else
		{
			index = indexRun * 8;

			verticies[index + 0 ] = verticies[index + 1 ] = verticies[index + 2 ] = verticies[index + 3 ] = verticies[index + 4 ] = verticies[index + 5 ] = verticies[index + 6] = 	verticies[index + 7] = 0;
		}

		indexRun++;
		displayObject = displayObject.__next;
   }
}

/**
 * Draws the batch to the frame buffer
 *
 * @method render
 */
PIXI.WebGLBatch.prototype.render = function(start, end)
{
	start = start || 0;

	if(end == undefined)end = this.size;
	
	if(this.dirty)
	{
		this.refresh();
		this.dirty = false;
	}

	if (this.size == 0)return;

	this.update();
	var gl = this.gl;
	var GL_ARRAY_BUFFER = gl.ARRAY_BUFFER;
	var GL_FLOAT = gl.FLOAT;
	
	//TODO optimize this!

	var shaderProgram = PIXI.defaultShader;
	
	//gl.useProgram(shaderProgram);

	// update the verts..
	gl.bindBuffer(GL_ARRAY_BUFFER, this.vertexBuffer);
	// ok..
	gl.bufferSubData(GL_ARRAY_BUFFER, 0, this.verticies)
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, 2, GL_FLOAT, false, 0, 0);
	
	// update the uvs
   	gl.bindBuffer(GL_ARRAY_BUFFER, this.uvBuffer);

    if(this.dirtyUVS)
    {
    	this.dirtyUVS = false;
    	gl.bufferSubData(GL_ARRAY_BUFFER,  0, this.uvs);
    }
    
    gl.vertexAttribPointer(shaderProgram.aTextureCoord, 2, GL_FLOAT, false, 0, 0);
	
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture);

	// update color!
	gl.bindBuffer(GL_ARRAY_BUFFER, this.colorBuffer);

	if(this.dirtyColors)
    {
    	this.dirtyColors = false;
    	gl.bufferSubData(GL_ARRAY_BUFFER, 0, this.colors);
	}
	
    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, GL_FLOAT, false, 0, 0);
	
	// dont need to upload!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

	var len = end - start;

    // DRAW THAT this!
    gl.drawElements(gl.TRIANGLES, len * 6, gl.UNSIGNED_SHORT, start * 2 * 6 );
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be
 * grouped into a batch. All the sprites in a batch can then be drawn in one go by the
 * GPU which is hugely efficient. ALL sprites in the webGL renderer are added to a batch
 * even if the batch only contains one sprite. Batching is handled automatically by the
 * webGL renderer. A good tip is: the smaller the number of batchs there are, the faster
 * the webGL renderer will run.
 *
 * @class WebGLBatch
 * @contructor
 * @param gl {WebGLContext} An instance of the webGL context
 */
PIXI.WebGLRenderGroup = function(gl)
{
	this.gl = gl;
	this.root;
	
	this.backgroundColor;
	this.batchs = [];
	this.toRemove = [];
	
	this.filterManager = new PIXI.WebGLFilterManager();
}

// constructor
PIXI.WebGLRenderGroup.prototype.constructor = PIXI.WebGLRenderGroup;

/**
 * Add a display object to the webgl renderer
 *
 * @method setRenderable
 * @param displayObject {DisplayObject}
 * @private 
 */
PIXI.WebGLRenderGroup.prototype.setRenderable = function(displayObject)
{
	// has this changed??
	if(this.root)this.removeDisplayObjectAndChildren(this.root);
	
	displayObject.worldVisible = displayObject.visible;
	
	// soooooo //
	// to check if any batchs exist already??
	
	// TODO what if its already has an object? should remove it
	this.root = displayObject;
	this.addDisplayObjectAndChildren(displayObject);
}

/**
 * Renders the stage to its webgl view
 *
 * @method render
 * @param projection {Object}
 */
PIXI.WebGLRenderGroup.prototype.render = function(projection, buffer)
{
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;
	gl.uniform2f(PIXI.defaultShader.projectionVector, projection.x, projection.y);

	this.filterManager.begin(projection, buffer);

	
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	// will render all the elements in the group
	var renderable;

	for (var i=0; i < this.batchs.length; i++) 
	{
		renderable = this.batchs[i];
		if(renderable instanceof PIXI.WebGLBatch)
		{
			renderable.render();
			continue;
		}
		
		// render special
		this.renderSpecial(renderable, projection);
	}
	
}

/**
 * Renders a specific displayObject
 *
 * @method renderSpecific
 * @param displayObject {DisplayObject}
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderSpecific = function(displayObject, projection, buffer)
{
	PIXI.WebGLRenderer.updateTextures();
	var gl = this.gl;

	gl.uniform2f(PIXI.defaultShader.projectionVector, projection.x, projection.y);

	this.filterManager.begin(projection, buffer);

	// to do!
	// render part of the scene...
	
	var startIndex;
	var startBatchIndex;
	
	var endIndex;
	var endBatchIndex;
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.first;
	while(nextRenderable._iNext)
	{
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
		nextRenderable = nextRenderable._iNext;
	}
	var startBatch = nextRenderable.batch;
	//console.log(nextRenderable);
	
	//console.log(renderable)
	if(nextRenderable instanceof PIXI.Sprite)
	{
		startBatch = nextRenderable.batch;
		
		var head = startBatch.head;
		var next = head;
		
		// ok now we have the batch.. need to find the start index!
		if(head == nextRenderable)
		{
			startIndex = 0;
		}
		else
		{
			startIndex = 1;
			
			while(head.__next != nextRenderable)
			{
				startIndex++;
				head = head.__next;
			}
		}
	}
	else
	{
		startBatch = nextRenderable;
	}
	
	// Get the LAST renderable object
	var lastRenderable = displayObject.last;
	while(lastRenderable._iPrev)
	{
		if(lastRenderable.renderable && lastRenderable.__renderGroup)break;
		lastRenderable = lastRenderable._iNext;
	}
	
	if(lastRenderable instanceof PIXI.Sprite)
	{
		endBatch = lastRenderable.batch;
		
		var head = endBatch.head;
		
		if(head == lastRenderable)
		{
			endIndex = 0;
		}
		else
		{
			endIndex = 1;
			
			while(head.__next != lastRenderable)
			{
				endIndex++;
				head = head.__next;
			}
		}
	}
	else
	{
		endBatch = lastRenderable;
	}
	
	//console.log(endBatch);
	// TODO - need to fold this up a bit!
	
	if(startBatch == endBatch)
	{
		if(startBatch instanceof PIXI.WebGLBatch)
		{
			startBatch.render(startIndex, endIndex+1);
		}
		else
		{
			this.renderSpecial(startBatch, projection);
		}
		return;
	}
	
	// now we have first and last!
	startBatchIndex = this.batchs.indexOf(startBatch);
	endBatchIndex = this.batchs.indexOf(endBatch);
	
	// DO the first batch
	if(startBatch instanceof PIXI.WebGLBatch)
	{
		startBatch.render(startIndex);
	}
	else
	{
		this.renderSpecial(startBatch, projection);
	}
	
	// DO the middle batchs..
	for (var i=startBatchIndex+1; i < endBatchIndex; i++) 
	{
		renderable = this.batchs[i];
	
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else
		{
			this.renderSpecial(renderable, projection);
		}
	}
	
	// DO the last batch..
	if(endBatch instanceof PIXI.WebGLBatch)
	{
		endBatch.render(0, endIndex+1);
	}
	else
	{
		this.renderSpecial(endBatch, projection);
	}
}

/**
 * Renders a specific renderable
 *
 * @method renderSpecial
 * @param renderable {DisplayObject}
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderSpecial = function(renderable, projection)
{
	
	var worldVisible = renderable.vcount === PIXI.visibleCount


	if(renderable instanceof PIXI.TilingSprite)
	{
		if(worldVisible)this.renderTilingSprite(renderable, projection);
	}
	else if(renderable instanceof PIXI.Strip)
	{
		if(worldVisible)this.renderStrip(renderable, projection);
	}
	else if(renderable instanceof PIXI.CustomRenderable)
	{
		if(worldVisible) renderable.renderWebGL(this, projection);
	}
	else if(renderable instanceof PIXI.Graphics)
	{
		if(worldVisible && renderable.renderable) PIXI.WebGLGraphics.renderGraphics(renderable, projection);
	}
	else if(renderable instanceof PIXI.FilterBlock)
	{
		this.handleFilterBlock(renderable, projection);
	}
}

flip = false;
var maskStack = [];
var maskPosition = 0;

//var usedMaskStack = [];

PIXI.WebGLRenderGroup.prototype.handleFilterBlock = function(filterBlock, projection)
{
	/*
	 * for now only masks are supported..
	 */
	var gl = PIXI.gl;
	var KEEP = gl.KEEP;
	
	if(filterBlock.open)
	{
		if(filterBlock.data instanceof Array)
		{
			this.filterManager.pushFilter(filterBlock);
			// ok so..
			
		}
		else
		{	
			maskPosition++;

			maskStack.push(filterBlock)
	
			gl.enable(gl.STENCIL_TEST);
			
			gl.colorMask(false, false, false, false);
			
			gl.stencilFunc(gl.ALWAYS,1,1);
			gl.stencilOp(KEEP,KEEP,gl.INCR);
	
			PIXI.WebGLGraphics.renderGraphics(filterBlock.data, projection);
			
			gl.colorMask(true, true, true, true);
			gl.stencilFunc(gl.NOTEQUAL,0,maskStack.length);
			gl.stencilOp(KEEP,KEEP,KEEP);
		}
	}
	else
	{
		if(filterBlock.data instanceof Array)
		{
			this.filterManager.popFilter();
		}
		else
		{
			var maskData = maskStack.pop(filterBlock)


			if(maskData)
			{
				gl.colorMask(false, false, false, false);
			
				gl.stencilFunc(gl.ALWAYS,1,1);
				gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);

				PIXI.WebGLGraphics.renderGraphics(maskData.data, projection);
			
				gl.colorMask(true, true, true, true);
				gl.stencilFunc(gl.NOTEQUAL,0,maskStack.length);
				gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
			};

			gl.disable(gl.STENCIL_TEST);
		}
	}
}

/**
 * Updates a webgl texture
 *
 * @method updateTexture
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.updateTexture = function(displayObject)
{
	
	// TODO definitely can optimse this function..
	
	this.removeObject(displayObject);
	
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousRenderable = displayObject.first;
	while(previousRenderable != this.root)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.last;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	
	this.insertObject(displayObject, previousRenderable, nextRenderable);
}

/**
 * Adds filter blocks
 *
 * @method addFilterBlocks
 * @param start {FilterBlock}
 * @param end {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.addFilterBlocks = function(start, end)
{
	start.__renderGroup = this;
	end.__renderGroup = this;
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousRenderable = start;
	while(previousRenderable != this.root.first)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	this.insertAfter(start, previousRenderable);
		
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var previousRenderable2 = end;
	while(previousRenderable2 != this.root.first)
	{
		previousRenderable2 = previousRenderable2._iPrev;
		if(previousRenderable2.renderable && previousRenderable2.__renderGroup)break;
	}
	this.insertAfter(end, previousRenderable2);
}

/**
 * Remove filter blocks
 *
 * @method removeFilterBlocks
 * @param start {FilterBlock}
 * @param end {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeFilterBlocks = function(start, end)
{
	this.removeObject(start);
	this.removeObject(end);
}

/**
 * Adds a display object and children to the webgl context
 *
 * @method addDisplayObjectAndChildren
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.addDisplayObjectAndChildren = function(displayObject)
{
	if(displayObject.__renderGroup)displayObject.__renderGroup.removeDisplayObjectAndChildren(displayObject);
	
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	
	var previousRenderable = displayObject.first;
	while(previousRenderable != this.root.first)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.last;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	
	// one the display object hits this. we can break the loop	
	
	var tempObject = displayObject.first;
	var testObject = displayObject.last._iNext;
	do	
	{
		tempObject.__renderGroup = this;
		
		if(tempObject.renderable)
		{
		
			this.insertObject(tempObject, previousRenderable, nextRenderable);
			previousRenderable = tempObject;
		}
		
		tempObject = tempObject._iNext;
	}
	while(tempObject != testObject)
}

/**
 * Removes a display object and children to the webgl context
 *
 * @method removeDisplayObjectAndChildren
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren = function(displayObject)
{
	if(displayObject.__renderGroup != this)return;
	
//	var displayObject = displayObject.first;
	var lastObject = displayObject.last;
	do	
	{
		displayObject.__renderGroup = null;
		if(displayObject.renderable)this.removeObject(displayObject);
		displayObject = displayObject._iNext;
	}
	while(displayObject)
}

/**
 * Inserts a displayObject into the linked list
 *
 * @method insertObject
 * @param displayObject {DisplayObject}
 * @param previousObject {DisplayObject}
 * @param nextObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.insertObject = function(displayObject, previousObject, nextObject)
{
	// while looping below THE OBJECT MAY NOT HAVE BEEN ADDED
	var previousSprite = previousObject;
	var nextSprite = nextObject;
	
	/*
	 * so now we have the next renderable and the previous renderable
	 * 
	 */
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch
		var nextBatch
		
		if(previousSprite instanceof PIXI.Sprite)
		{
			previousBatch = previousSprite.batch;
			if(previousBatch)
			{
				if(previousBatch.texture == displayObject.texture.baseTexture && previousBatch.blendMode == displayObject.blendMode)
				{
					previousBatch.insertAfter(displayObject, previousSprite);
					return;
				}
			}
		}
		else
		{
			// TODO reword!
			previousBatch = previousSprite;
		}
	
		if(nextSprite)
		{
			if(nextSprite instanceof PIXI.Sprite)
			{
				nextBatch = nextSprite.batch;
			
				//batch may not exist if item was added to the display list but not to the webGL
				if(nextBatch)
				{
					if(nextBatch.texture == displayObject.texture.baseTexture && nextBatch.blendMode == displayObject.blendMode)
					{
						nextBatch.insertBefore(displayObject, nextSprite);
						return;
					}
					else
					{
						if(nextBatch == previousBatch)
						{
							// THERE IS A SPLIT IN THIS BATCH! //
							var splitBatch = previousBatch.split(nextSprite);
							// COOL!
							// add it back into the array	
							/*
							 * OOPS!
							 * seems the new sprite is in the middle of a batch
							 * lets split it.. 
							 */
							var batch = PIXI.WebGLRenderer.getBatch();

							var index = this.batchs.indexOf( previousBatch );
							batch.init(displayObject);
							this.batchs.splice(index+1, 0, batch, splitBatch);
							
							return;
						}
					}
				}
			}
			else
			{
				// TODO re-word!
				
				nextBatch = nextSprite;
			}
		}
		
		/*
		 * looks like it does not belong to any batch!
		 * but is also not intersecting one..
		 * time to create anew one!
		 */
		
		var batch =  PIXI.WebGLRenderer.getBatch();
		batch.init(displayObject);

		if(previousBatch) // if this is invalid it means 
		{
			var index = this.batchs.indexOf( previousBatch );
			this.batchs.splice(index+1, 0, batch);
		}
		else
		{
			this.batchs.push(batch);
		}
		
		return;
	}
	else if(displayObject instanceof PIXI.TilingSprite)
	{
		
		// add to a batch!!
		this.initTilingSprite(displayObject);
	//	this.batchs.push(displayObject);
		
	}
	else if(displayObject instanceof PIXI.Strip)
	{
		// add to a batch!!
		this.initStrip(displayObject);
	//	this.batchs.push(displayObject);
	}
	else if(displayObject)// instanceof PIXI.Graphics)
	{
		//displayObject.initWebGL(this);
		
		// add to a batch!!
		//this.initStrip(displayObject);
		//this.batchs.push(displayObject);
	}
	
	this.insertAfter(displayObject, previousSprite);
			
	// insert and SPLIT!

}

/**
 * Inserts a displayObject into the linked list
 *
 * @method insertAfter
 * @param item {DisplayObject}
 * @param displayObject {DisplayObject} The object to insert
 * @private
 */
PIXI.WebGLRenderGroup.prototype.insertAfter = function(item, displayObject)
{
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch = displayObject.batch;
		
		if(previousBatch)
		{
			// so this object is in a batch!
			
			// is it not? need to split the batch
			if(previousBatch.tail == displayObject)
			{
				// is it tail? insert in to batchs	
				var index = this.batchs.indexOf( previousBatch );
				this.batchs.splice(index+1, 0, item);
			}
			else
			{
				// TODO MODIFY ADD / REMOVE CHILD TO ACCOUNT FOR FILTERS (also get prev and next) //
				
				// THERE IS A SPLIT IN THIS BATCH! //
				var splitBatch = previousBatch.split(displayObject.__next);
				
				// COOL!
				// add it back into the array	
				/*
				 * OOPS!
				 * seems the new sprite is in the middle of a batch
				 * lets split it.. 
				 */
				var index = this.batchs.indexOf( previousBatch );
				this.batchs.splice(index+1, 0, item, splitBatch);
			}
		}
		else
		{
			this.batchs.push(item);
		}
	}
	else
	{
		var index = this.batchs.indexOf( displayObject );
		this.batchs.splice(index+1, 0, item);
	}
}

/**
 * Removes a displayObject from the linked list
 *
 * @method removeObject
 * @param displayObject {DisplayObject} The object to remove
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeObject = function(displayObject)
{
	// loop through children..
	// display object //
	
	// add a child from the render group..
	// remove it and all its children!
	//displayObject.cacheVisible = false;//displayObject.visible;

	/*
	 * removing is a lot quicker..
	 * 
	 */
	var batchToRemove;
	
	if(displayObject instanceof PIXI.Sprite)
	{
		// should always have a batch!
		var batch = displayObject.batch;
		if(!batch)return; // this means the display list has been altered befre rendering
		
		batch.remove(displayObject);
		
		if(batch.size==0)
		{
			batchToRemove = batch;
		}
	}
	else
	{
		batchToRemove = displayObject;
	}
	
	/*
	 * Looks like there is somthing that needs removing!
	 */
	if(batchToRemove)	
	{
		var index = this.batchs.indexOf( batchToRemove );
		if(index == -1)return;// this means it was added then removed before rendered
		
		// ok so.. check to see if you adjacent batchs should be joined.
		// TODO may optimise?
		if(index == 0 || index == this.batchs.length-1)
		{
			// wha - eva! just get of the empty batch!
			this.batchs.splice(index, 1);
			if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
		
			return;
		}
		
		if(this.batchs[index-1] instanceof PIXI.WebGLBatch && this.batchs[index+1] instanceof PIXI.WebGLBatch)
		{
			if(this.batchs[index-1].texture == this.batchs[index+1].texture && this.batchs[index-1].blendMode == this.batchs[index+1].blendMode)
			{
				//console.log("MERGE")
				this.batchs[index-1].merge(this.batchs[index+1]);
				
				if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
				PIXI.WebGLRenderer.returnBatch(this.batchs[index+1]);
				this.batchs.splice(index, 2);
				return;
			}
		}
		
		this.batchs.splice(index, 1);
		if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
	}
}


/**
 * Initializes a tiling sprite
 *
 * @method initTilingSprite
 * @param sprite {TilingSprite} The tiling sprite to initialize
 * @private
 */
PIXI.WebGLRenderGroup.prototype.initTilingSprite = function(sprite)
{
	var gl = this.gl;

	// make the texture tilable..
			
	sprite.verticies = new Float32Array([0, 0,
										  sprite.width, 0,
										  sprite.width,  sprite.height,
										 0,  sprite.height]);
					
	sprite.uvs = new Float32Array([0, 0,
									1, 0,
									1, 1,
									0, 1]);
				
	sprite.colors = new Float32Array([1,1,1,1]);
	
	sprite.indices =  new Uint16Array([0, 1, 3,2])//, 2]);
	
	sprite._vertexBuffer = gl.createBuffer();
	sprite._indexBuffer = gl.createBuffer();
	sprite._uvBuffer = gl.createBuffer();
	sprite._colorBuffer = gl.createBuffer();
						
	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sprite.verticies, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  sprite.uvs, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, sprite._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sprite.colors, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sprite._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sprite.indices, gl.STATIC_DRAW);
    
//    return ( (x > 0) && ((x & (x - 1)) == 0) );

	if(sprite.texture.baseTexture._glTexture)
	{
    	gl.bindTexture(gl.TEXTURE_2D, sprite.texture.baseTexture._glTexture);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		sprite.texture.baseTexture._powerOf2 = true;
	}
	else
	{
		sprite.texture.baseTexture._powerOf2 = true;
	}
}

/**
 * Renders a Strip
 *
 * @method renderStrip
 * @param strip {Strip} The strip to render
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderStrip = function(strip, projection)
{
	var gl = this.gl;

	PIXI.activateStripShader();

	var shader = PIXI.stripShader;

	var program = shader.program;
	
	var m = PIXI.mat3.clone(strip.worldTransform);
	
	PIXI.mat3.transpose(m);
	
//	console.log(projection)
	// set the matrix transform for the 
 	gl.uniformMatrix3fv(shader.translationMatrix, false, m);
	gl.uniform2f(shader.projectionVector, projection.x, projection.y);
	gl.uniform2f(shader.offsetVector, -PIXI.offset.x, -PIXI.offset.y);
	
	gl.uniform1f(shader.alpha, strip.worldAlpha);

	/*
	if(strip.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	*/
	
	//console.log("!!")
	if(!strip.dirty)
	{	
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, strip.verticies)
	    gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	    gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	    gl.vertexAttribPointer(shader.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
	}
	else
	{
		strip.dirty = false;
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	   	gl.bufferData(gl.ARRAY_BUFFER, strip.uvs, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
	//	console.log(strip.texture.baseTexture._glTexture)
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shader.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
	    
	}
	
	gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
    
    PIXI.deactivateStripShader();
  	//gl.useProgram(PIXI.currentProgram);
}

/**
 * Renders a TilingSprite
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} The tiling sprite to render
 * @param projectionMatrix {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderTilingSprite = function(sprite, projectionMatrix)
{
	var gl = this.gl;


	var shaderProgram = PIXI.shaderProgram;
	
	var tilePosition = sprite.tilePosition;
	var tileScale = sprite.tileScale;
	
	var offsetX =  tilePosition.x/sprite.texture.baseTexture.width;
	var offsetY =  tilePosition.y/sprite.texture.baseTexture.height;
	
	var scaleX =  (sprite.width / sprite.texture.baseTexture.width)  / tileScale.x;
	var scaleY =  (sprite.height / sprite.texture.baseTexture.height) / tileScale.y;

	sprite.uvs[0] = 0 - offsetX;
	sprite.uvs[1] = 0 - offsetY;
	
	sprite.uvs[2] = (1 * scaleX)  -offsetX;
	sprite.uvs[3] = 0 - offsetY;
	
	sprite.uvs[4] = (1 *scaleX) - offsetX;
	sprite.uvs[5] = (1 *scaleY) - offsetY;
	
	sprite.uvs[6] = 0 - offsetX;
	sprite.uvs[7] = (1 *scaleY) - offsetY;
	
	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, sprite.uvs)
	
	this.renderStrip(sprite, projectionMatrix);
}

/**
 * Initializes a strip to be rendered
 *
 * @method initStrip
 * @param strip {Strip} The strip to initialize
 * @private
 */
PIXI.WebGLRenderGroup.prototype.initStrip = function(strip)
{
	// build the strip!
	var gl = this.gl;
	var shaderProgram = this.shaderProgram;
	
	strip._vertexBuffer = gl.createBuffer();
	strip._indexBuffer = gl.createBuffer();
	strip._uvBuffer = gl.createBuffer();
	strip._colorBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.DYNAMIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  strip.uvs, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW);

	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


PIXI.WebGLFilterManager = function()
{
	this.filterStack = [];
	this.texturePool = [];
	
	this.offsetX = 0;
	this.offsetY = 0;
	
	this.initShaderBuffers();
}

// API

PIXI.WebGLFilterManager.prototype.begin = function(projection, buffer)
{
	this.width = projection.x * 2;
	this.height = -projection.y * 2;
	this.buffer = buffer;
}

PIXI.WebGLFilterManager.prototype.pushFilter = function(filterBlock)
{
	var gl = PIXI.gl;

	// filter program
	// OPTIMISATION - the first filter is free if its a simple color change?
	this.filterStack.push(filterBlock);

	var filter = filterBlock.filterPasses[0];

	

	this.offsetX += filterBlock.target.filterArea.x;
	this.offsetY += filterBlock.target.filterArea.y;
	
	
	
	
	
	var texture = this.texturePool.pop();
	if(!texture)texture = new PIXI.FilterTexture(this.width, this.height);
	
	gl.bindTexture(gl.TEXTURE_2D,  texture.texture);
	
	this.getBounds(filterBlock.target);
		
	// addpadding?
	//displayObject.filterArea.x

	var filterArea = filterBlock.target.filterArea;

	var padidng = filter.padding;
	filterArea.x -= padidng;
	filterArea.y -= padidng;
	filterArea.width += padidng * 2;
	filterArea.height += padidng * 2;

	// cap filter to screen size..
	if(filterArea.x < 0)filterArea.x = 0;	
	if(filterArea.width > this.width)filterArea.width = this.width;
	if(filterArea.y < 0)filterArea.y = 0;	
	if(filterArea.height > this.height)filterArea.height = this.height;


	//gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  filterArea.width, filterArea.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, texture.frameBuffer);
   
  // console.log(filterArea)
	// set view port
	gl.viewport(0, 0, filterArea.width, filterArea.height);	
	
	PIXI.projection.x = filterArea.width/2;
	PIXI.projection.y = -filterArea.height/2;
	
	PIXI.offset.x = -filterArea.x; 
	PIXI.offset.y = -filterArea.y;

	//console.log(PIXI.defaultShader.projectionVector)
	// update projection
	gl.uniform2f(PIXI.defaultShader.projectionVector, filterArea.width/2, -filterArea.height/2);
	gl.uniform2f(PIXI.defaultShader.offsetVector, -filterArea.x, -filterArea.y);
	//PIXI.primitiveProgram

	gl.colorMask(true, true, true, true); 
	gl.clearColor(0,0,0, 0);     
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	//filter.texture = texture;
	filterBlock._glFilterTexture = texture;

	//console.log("PUSH")
}


PIXI.WebGLFilterManager.prototype.popFilter = function()
{
	
	var gl = PIXI.gl;
	
	var filterBlock = this.filterStack.pop();



	var filterArea = filterBlock.target.filterArea;

	var texture = filterBlock._glFilterTexture;

	if(filterBlock.filterPasses.length > 1)
	{
		gl.viewport(0, 0, filterArea.width, filterArea.height);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	
		this.vertexArray[0] = 0;
		this.vertexArray[1] = filterArea.height;
		
		this.vertexArray[2] = filterArea.width;
		this.vertexArray[3] = filterArea.height;
		
		this.vertexArray[4] = 0;
		this.vertexArray[5] = 0;
		
		this.vertexArray[6] = filterArea.width;
		this.vertexArray[7] = 0;


		gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);

	
		gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
		// nnow set the uvs..
		this.uvArray[2] = filterArea.width/this.width;
		this.uvArray[5] = filterArea.height/this.height;
		this.uvArray[6] = filterArea.width/this.width;
		this.uvArray[7] = filterArea.height/this.height;
		
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);

		var inputTexture = texture;
		var outputTexture = this.texturePool.pop();
		if(!outputTexture)outputTexture = new PIXI.FilterTexture(this.width, this.height);
		
		// need to clear this FBO as it may have some left over elements from a prvious filter.
		gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer );     
		gl.clear(gl.COLOR_BUFFER_BIT);
	 
		gl.disable(gl.BLEND);
		
		for (var i = 0; i < filterBlock.filterPasses.length-1; i++) 
		{
			var filterPass = filterBlock.filterPasses[i];
	
			gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer );
			
			// set texture
		    gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, inputTexture.texture);
			
			// draw texture..
			//filterPass.applyFilterPass(filterArea.width, filterArea.height);
			this.applyFilterPass(filterPass, filterArea, filterArea.width, filterArea.height);

			// swap the textures..
			var temp = inputTexture;
			inputTexture = outputTexture;
			outputTexture = temp;
			
		};

		gl.enable(gl.BLEND);

		texture = inputTexture;
		this.texturePool.push(outputTexture);
	}

	var filter = filterBlock.filterPasses[filterBlock.filterPasses.length-1];
	
	this.offsetX -= filterArea.x;
	this.offsetY -= filterArea.y;

	
	var sizeX = this.width;
	var sizeY = this.height;
	
	var offsetX = 0;
	var offsetY = 0;
	
	var buffer = this.buffer;
	
	// time to render the filters texture to the previous scene
	if(this.filterStack.length === 0)
	{
		gl.colorMask(true, true, true, this.buffer); 
	}
	else
	{
		var currentFilter = this.filterStack[this.filterStack.length-1];
		var filterArea = currentFilter.target.filterArea;
		
		sizeX = filterArea.width;
		sizeY = filterArea.height;
		
		offsetX = filterArea.x;
		offsetY = filterArea.y;
		
		buffer =  currentFilter._glFilterTexture.frameBuffer;
	}
	
	

	// TODO need toremove thease global elements..
	PIXI.projection.x = sizeX/2;
	PIXI.projection.y = -sizeY/2;

	PIXI.offset.x = offsetX;
	PIXI.offset.y = offsetY; 
	

	var filterArea =  filterBlock.target.filterArea;
	var x = filterArea.x-offsetX;
	var y = filterArea.y-offsetY;
	
	// update the buffers..	
	// make sure to flip the y!
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	
	this.vertexArray[0] = x;
	this.vertexArray[1] = y + filterArea.height;
	
	this.vertexArray[2] = x + filterArea.width;
	this.vertexArray[3] = y + filterArea.height;
	
	this.vertexArray[4] = x;
	this.vertexArray[5] = y;
	
	this.vertexArray[6] = x + filterArea.width;
	this.vertexArray[7] = y;

	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);

	this.uvArray[2] = filterArea.width/this.width;
	this.uvArray[5] = filterArea.height/this.height;
	this.uvArray[6] = filterArea.width/this.width;
	this.uvArray[7] = filterArea.height/this.height;
	
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);

	gl.viewport(0, 0, sizeX, sizeY);	
	// bind the buffer
	gl.bindFramebuffer(gl.FRAMEBUFFER, buffer );
	
	// set texture
    gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture.texture);
	
	// apply!
	//filter.applyFilterPass(sizeX, sizeY);
	this.applyFilterPass(filter, filterArea, sizeX, sizeY);

	// now restore the regular shader..
    gl.useProgram(PIXI.defaultShader.program);
	gl.uniform2f(PIXI.defaultShader.projectionVector, sizeX/2, -sizeY/2);
	gl.uniform2f(PIXI.defaultShader.offsetVector, -offsetX, -offsetY);

	// return the texture to the pool
	this.texturePool.push(texture);
	filterBlock._glFilterTexture = null;	
}

PIXI.WebGLFilterManager.prototype.applyFilterPass = function(filter, filterArea, width, height)
{
	// use program
	var gl = PIXI.gl;

	if(!filter.shader)
	{
		var shader = new PIXI.PixiShader();
				
		shader.fragmentSrc = filter.fragmentSrc;
		shader.uniforms = filter.uniforms;
		shader.init();
		
		filter.shader = shader;
	}

	var shader = filter.shader;
	
	// set the shader
	gl.useProgram(shader.program);

	gl.uniform2f(shader.projectionVector, width/2, -height/2);
	gl.uniform2f(shader.offsetVector, 0,0)

	if(filter.uniforms.dimensions)
	{
		//console.log(filter.uniforms.dimensions)
		filter.uniforms.dimensions.value[0] = this.width;//width;
		filter.uniforms.dimensions.value[1] = this.height;//height;
		filter.uniforms.dimensions.value[2] = this.vertexArray[0];
		filter.uniforms.dimensions.value[3] = this.vertexArray[5];//filterArea.height;
	//	console.log(this.vertexArray[5])
	}

	shader.syncUniforms();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
   
   	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    
	// draw the filter...
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );
}

PIXI.WebGLFilterManager.prototype.initShaderBuffers = function()
{
	var gl = PIXI.gl;
	
	// create some buffers
	this.vertexBuffer = gl.createBuffer();	
	this.uvBuffer = gl.createBuffer();
	this.indexBuffer = gl.createBuffer();
	
	// bind and upload the vertexs..
	// keep a refferance to the vertexFloatData..
	this.vertexArray = new Float32Array([0.0, 0.0, 
								         1.0, 0.0, 
								         0.0, 1.0, 
								         1.0, 1.0]);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(
    gl.ARRAY_BUFFER, 
    this.vertexArray, 
    gl.STATIC_DRAW);
    
    
    // bind and upload the uv buffer
	this.uvArray = new Float32Array([0.0, 0.0, 
								     1.0, 0.0, 
								     0.0, 1.0, 
								     1.0, 1.0]);
								         
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(
    gl.ARRAY_BUFFER, 
    this.uvArray, 
    gl.STATIC_DRAW);
    
	// bind and upload the index
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER, 
    new Uint16Array([0, 1, 2, 1, 3, 2]), 
    gl.STATIC_DRAW);
}

PIXI.WebGLFilterManager.prototype.getBounds = function(displayObject)
{
	// time to get the width and height of the object!
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, doTest;
	var a, b, c, d, tx, ty, x1, x2, x3, x4, y1, y2, y3, y4;

	var tempObject = displayObject.first;
	var testObject = displayObject.last._iNext;
	
	var maxX = -Infinity;
	var maxY = -Infinity;
	
	var minX = Infinity;
	var minY = Infinity;
	
	do	
	{
		// TODO can be optimized! - what if there is no scale / rotation?
		
		if(tempObject.visible)
		{
			if(tempObject instanceof PIXI.Sprite)
			{
				width = tempObject.texture.frame.width;
				height = tempObject.texture.frame.height;

				// TODO trim??
				aX = tempObject.anchor.x;
				aY = tempObject.anchor.y;
				w0 = width * (1-aX);
				w1 = width * -aX;

				h0 = height * (1-aY);
				h1 = height * -aY;

				doTest = true;
			}
			else if(tempObject instanceof PIXI.Graphics)
			{
				tempObject.updateFilterBounds();

				var bounds = tempObject.bounds;

				width = bounds.width;
				height = bounds.height;

				w0 = bounds.x
				w1 = bounds.x + bounds.width;

				h0 = bounds.y
				h1 = bounds.y + bounds.height;

				doTest = true;	
			}
		}
		
		if(doTest)
		{
			worldTransform = tempObject.worldTransform;

			a = worldTransform[0];
			b = worldTransform[3];
			c = worldTransform[1];
			d = worldTransform[4];
			tx = worldTransform[2];
			ty = worldTransform[5];

			x1 = a * w1 + c * h1 + tx; 
			y1 = d * h1 + b * w1 + ty;

			x2 = a * w0 + c * h1 + tx; 
			y2 = d * h1 + b * w0 + ty; 

			x3 = a * w0 + c * h0 + tx; 
			y3 = d * h0 + b * w0 + ty; 

			x4 =  a * w1 + c * h0 + tx; 
			y4 =  d * h0 + b * w1 + ty; 

			minX = x1 < minX ? x1 : minX;
			minX = x2 < minX ? x2 : minX;
			minX = x3 < minX ? x3 : minX;
			minX = x4 < minX ? x4 : minX;
			
			minY = y1 < minY ? y1 : minY;
			minY = y2 < minY ? y2 : minY;
			minY = y3 < minY ? y3 : minY;
			minY = y4 < minY ? y4 : minY;
			
			maxX = x1 > maxX ? x1 : maxX;
			maxX = x2 > maxX ? x2 : maxX;
			maxX = x3 > maxX ? x3 : maxX;
			maxX = x4 > maxX ? x4 : maxX;
			
			maxY = y1 > maxY ? y1 : maxY;
			maxY = y2 > maxY ? y2 : maxY;
			maxY = y3 > maxY ? y3 : maxY;
			maxY = y4 > maxY ? y4 : maxY;
		}

		doTest = false;
		tempObject = tempObject._iNext;

	}
	while(tempObject != testObject)
	
	// maximum bounds is the size of the screen..
	//minX = minX > 0 ? minX : 0;
	//minY = minY > 0 ? minY : 0;

	displayObject.filterArea.x = minX;
	displayObject.filterArea.y = minY;

//	console.log(maxX+ " : " + minX)
	displayObject.filterArea.width = maxX - minX;
	displayObject.filterArea.height = maxY - minY;
}

PIXI.FilterTexture = function(width, height)
{
	var gl = PIXI.gl;
	
    // next time to create a frame buffer and texture
	this.frameBuffer = gl.createFramebuffer();
    this.texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D,  this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer );
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer );
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	
	this.resize(width, height);
}

PIXI.FilterTexture.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;

	var gl = PIXI.gl;

	gl.bindTexture(gl.TEXTURE_2D,  this.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
}
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * the CanvasRenderer draws the stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
 * Dont forget to add the view to your DOM or you will not see anything :)
 *
 * @class CanvasRenderer
 * @constructor
 * @param width=0 {Number} the width of the canvas view
 * @param height=0 {Number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 */
PIXI.CanvasRenderer = function(width, height, view, transparent)
{
	this.transparent = transparent;

	/**
	 * The width of the canvas view
	 *
	 * @property width
	 * @type Number
	 * @default 800
	 */
	this.width = width || 800;

	/**
	 * The height of the canvas view
	 *
	 * @property height
	 * @type Number
	 * @default 600
	 */
	this.height = height || 600;

	/**
	 * If the view should be cleared before each render.
	 * @property clearView
	 * @type Boolean
	 * @default true
	 */
	this.clearView = true;
	
	/**
	 * The canvas element that the everything is drawn to
	 *
	 * @property view
	 * @type Canvas
	 */
	this.view = view || document.createElement( 'canvas' );

	/**
	 * The canvas context that the everything is drawn to
	 * @property context
	 * @type Canvas 2d Context
	 */
	this.context = this.view.getContext("2d");

	this.refresh = true;
	// hack to enable some hardware acceleration!
	//this.view.style["transform"] = "translatez(0)";
	
    this.view.width = this.width;
	this.view.height = this.height;  
	this.count = 0;
}

// constructor
PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;

PIXI.CanvasRenderer.prototype.destroy = function()
{
	this.view = null;
	this.context = null;
}

/**
 * Renders the stage to its canvas view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.CanvasRenderer.prototype.render = function(stage)
{
	
	//stage.__childrenAdded = [];
	//stage.__childrenRemoved = [];
	
	// update textures if need be
	PIXI.texturesToUpdate.length = 0;
	PIXI.texturesToDestroy.length = 0;
	
	PIXI.visibleCount++;
	stage.updateTransform();
	
	// update the background color
	if(!this.transparent && this.view.style.backgroundColor!=stage.backgroundColorString)this.view.style.backgroundColor = stage.backgroundColorString;

	this.context.setTransform(1,0,0,1,0,0);
	if(this.clearView)
	{
		this.context.clearRect(0, 0, this.width, this.height);
	}
    this.renderDisplayObject(stage);
    //as
   
    // run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
	
	// remove frame updates..
	if(PIXI.Texture.frameUpdates.length > 0)
	{
		PIXI.Texture.frameUpdates.length = 0;
	}
	
	
}

/**
 * resizes the canvas view to the specified width and height
 *
 * @method resize
 * @param width {Number} the new width of the canvas view
 * @param height {Number} the new height of the canvas view
 */
PIXI.CanvasRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.view.width = width;
	this.view.height = height;
}

/**
 * Renders a display object
 *
 * @method renderDisplayObject
 * @param displayObject {DisplayObject} The displayObject to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject)
{
	// no loger recurrsive!
	var transform;
	var context = this.context;
	
	context.globalCompositeOperation = 'source-over';
	
	// one the display object hits this. we can break the loop	
	var testObject = displayObject.last._iNext;
	displayObject = displayObject.first;
	
	do	
	{
		transform = displayObject.worldTransform;
		
		if(!displayObject.visible)
		{
			displayObject = displayObject.last._iNext;
			continue;
		}
		
		if(!displayObject.renderable)
		{
			displayObject = displayObject._iNext;
			continue;
		}
		
		if(displayObject instanceof PIXI.Sprite)
		{
			var texture = displayObject.texture;
			var frame = texture.frame;
			
			if(frame && frame.width && frame.height)
			{
				context.globalAlpha = displayObject.worldAlpha;
				
				context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
				
				var w = frame.width;
				var h = frame.height;
				var aX = displayObject.anchor.x;
				var aY = displayObject.anchor.y;
				if(texture.realSize)
				{
					var rs = texture.realSize;
					aX = (rs.width * aX + rs.x) / w;
					aY = (rs.height * aY + rs.y) / h;
				}
				context.drawImage(texture.baseTexture.source, 
								   frame.x,
								   frame.y,
								   w,
								   h,
								   aX * -w, 
								   aY * -h,
								   w,
								   h);
			}					   
   		}
	   	else if(displayObject instanceof PIXI.Strip)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			this.renderStrip(displayObject);
		}
		else if(displayObject instanceof PIXI.TilingSprite)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			this.renderTilingSprite(displayObject);
		}
		else if(displayObject instanceof PIXI.CustomRenderable)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
			displayObject.renderCanvas(this);
		}
		else if(displayObject instanceof PIXI.Graphics)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			PIXI.CanvasGraphics.renderGraphics(displayObject, context);
		}
		else if(displayObject instanceof PIXI.FilterBlock)
		{
			if(displayObject.data instanceof PIXI.Graphics)
 			{
				var mask = displayObject.data;

				if(displayObject.open)
				{
					context.save();
					
					var cacheAlpha = mask.alpha;
					var maskTransform = mask.worldTransform;
					
					context.setTransform(maskTransform[0], maskTransform[3], maskTransform[1], maskTransform[4], maskTransform[2], maskTransform[5])
					
					mask.worldAlpha = 0.5;
					
					context.worldAlpha = 0;
					
					PIXI.CanvasGraphics.renderGraphicsMask(mask, context);
					context.clip();
					
					mask.worldAlpha = cacheAlpha;
				}
				else
				{
					context.restore();
				}
			}
			else
			{
				// only masks supported right now!
			}
		}
	//	count++
		displayObject = displayObject._iNext;
	}
	while(displayObject != testObject)
}

/**
 * Renders a flat strip
 *
 * @method renderStripFlat
 * @param strip {Strip} The Strip to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStripFlat = function(strip)
{
	var context = this.context;
	var verticies = strip.verticies;
	var uvs = strip.uvs;
	
	var length = verticies.length/2;
	this.count++;
	
	context.beginPath();
	for (var i=1; i < length-2; i++) 
	{
		
		// draw some triangles!
		var index = i*2;
		
		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];
 		 
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		
	};	
	
	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
}

/**
 * Renders a tiling sprite
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} The tilingsprite to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderTilingSprite = function(sprite)
{
	var context = this.context;
	
	context.globalAlpha = sprite.worldAlpha;
	
 	if(!sprite.__tilePattern) sprite.__tilePattern = context.createPattern(sprite.texture.baseTexture.source, "repeat");
 	
	context.beginPath();
	
	var tilePosition = sprite.tilePosition;
	var tileScale = sprite.tileScale;
	
    // offset
    context.scale(tileScale.x,tileScale.y);
    context.translate(tilePosition.x, tilePosition.y);
 	
	context.fillStyle = sprite.__tilePattern;
	context.fillRect(-tilePosition.x,-tilePosition.y,sprite.width / tileScale.x, sprite.height / tileScale.y);
	
	context.scale(1/tileScale.x, 1/tileScale.y);
    context.translate(-tilePosition.x, -tilePosition.y);
    
    context.closePath();
}

/**
 * Renders a strip
 *
 * @method renderStrip
 * @param strip {Strip} The Strip to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
{
	var context = this.context;

	// draw triangles!!
	var verticies = strip.verticies;
	var uvs = strip.uvs;
	
	var length = verticies.length/2;
	this.count++;
	for (var i=1; i < length-2; i++) 
	{
		
		// draw some triangles!
		var index = i*2;
		
		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];
 		 
  		 var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2] * strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
   		 var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3] * strip.texture.height, v2 = uvs[index+5]* strip.texture.height;


		context.save();
		context.beginPath();
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();
		
		context.clip();
		
		
        // Compute matrix transform
        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;
		
		
		
		    
        context.transform(delta_a/delta, delta_d/delta,
                      delta_b/delta, delta_e/delta,
                      delta_c/delta, delta_f/delta);
                 
		context.drawImage(strip.texture.baseTexture.source, 0, 0);
	  	context.restore();
	};
	
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A set of functions used by the canvas renderer to draw the primitive graphics data
 *
 * @class CanvasGraphics
 */
PIXI.CanvasGraphics = function()
{

}


/*
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics {Graphics}
 * @param context {Context2D}
 */
PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
{
	var worldAlpha = graphics.worldAlpha;

	for (var i=0; i < graphics.graphicsData.length; i++)
	{
		var data = graphics.graphicsData[i];
		var points = data.points;

		context.strokeStyle = color = '#' + ('00000' + ( data.lineColor | 0).toString(16)).substr(-6);

		context.lineWidth = data.lineWidth;

		if(data.type == PIXI.Graphics.POLY)
		{
			context.beginPath();

			context.moveTo(points[0], points[1]);

			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			}

	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}

			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.RECT)
		{

			if(data.fillColor || data.fillColor === 0)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
				context.fillRect(points[0], points[1], points[2], points[3]);

			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
				context.strokeRect(points[0], points[1], points[2], points[3]);
			}

		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();

			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{

			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

			var elipseData =  data.points;

			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;

			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;

      		context.beginPath();

			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle

			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

			context.closePath();

			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}

	};
}

/*
 * Renders a graphics mask
 *
 * @static
 * @private
 * @method renderGraphicsMask
 * @param graphics {Graphics}
 * @param context {Context2D}
 */
PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context)
{
	var worldAlpha = graphics.worldAlpha;

	var len = graphics.graphicsData.length;
	if(len === 0)return;

	if(len > 1)
	{
		len = 1;
		console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object")
	}

	for (var i=0; i < 1; i++)
	{
		var data = graphics.graphicsData[i];
		var points = data.points;

		if(data.type == PIXI.Graphics.POLY)
		{
			context.beginPath();
			context.moveTo(points[0], points[1]);

			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			}

	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}

		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			context.beginPath();
			context.rect(points[0], points[1], points[2], points[3]);
			context.closePath();
		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{

			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
			var elipseData =  data.points;

			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;

			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;

      		context.beginPath();

			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle

			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
			context.closePath();
		}


	};
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * The Graphics class contains a set of methods that you can use to create primitive shapes and lines.
 * It is important to know that with the webGL renderer only simple polys can be filled at this stage
 * Complex polys will not be filled. Heres an example of a complex poly: http://www.goodboydigital.com/wp-content/uploads/2013/06/complexPolygon.png
 *
 * @class Graphics
 * @extends DisplayObjectContainer
 * @constructor
 */
PIXI.Graphics = function()
{
	PIXI.DisplayObjectContainer.call( this );

	this.renderable = true;

    /**
     * The alpha of the fill of this graphics object
     *
     * @property fillAlpha
     * @type Number
     */
	this.fillAlpha = 1;

    /**
     * The width of any lines drawn
     *
     * @property lineWidth
     * @type Number
     */
	this.lineWidth = 0;

    /**
     * The color of any lines drawn
     *
     * @property lineColor
     * @type String
     */
	this.lineColor = "black";

    /**
     * Graphics data
     *
     * @property graphicsData
     * @type Array
     * @private
     */
	this.graphicsData = [];

    /**
     * Current path
     *
     * @property currentPath
     * @type Object
     * @private
     */
	this.currentPath = {points:[]};
}

// constructor
PIXI.Graphics.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Graphics.prototype.constructor = PIXI.Graphics;

/**
 * Specifies a line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
 *
 * @method lineStyle
 * @param lineWidth {Number} width of the line to draw, will update the object's stored style
 * @param color {Number} color of the line to draw, will update the object's stored style
 * @param alpha {Number} alpha of the line to draw, will update the object's stored style
 */
PIXI.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();

	this.lineWidth = lineWidth || 0;
	this.lineColor = color || 0;
	this.lineAlpha = (alpha == undefined) ? 1 : alpha;

	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};

	this.graphicsData.push(this.currentPath);
}

/**
 * Moves the current drawing position to (x, y).
 *
 * @method moveTo
 * @param x {Number} the X coord to move to
 * @param y {Number} the Y coord to move to
 */
PIXI.Graphics.prototype.moveTo = function(x, y)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();

	this.currentPath = this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};

	this.currentPath.points.push(x, y);

	this.graphicsData.push(this.currentPath);
}

/**
 * Draws a line using the current line style from the current drawing position to (x, y);
 * the current drawing position is then set to (x, y).
 *
 * @method lineTo
 * @param x {Number} the X coord to draw to
 * @param y {Number} the Y coord to draw to
 */
PIXI.Graphics.prototype.lineTo = function(x, y)
{
	this.currentPath.points.push(x, y);
	this.dirty = true;
}

/**
 * Specifies a simple one-color fill that subsequent calls to other Graphics methods
 * (such as lineTo() or drawCircle()) use when drawing.
 *
 * @method beginFill
 * @param color {uint} the color of the fill
 * @param alpha {Number} the alpha
 */
PIXI.Graphics.prototype.beginFill = function(color, alpha)
{
	this.filling = true;
	this.fillColor = color || 0;
	this.fillAlpha = (alpha == undefined) ? 1 : alpha;
}

/**
 * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
 *
 * @method endFill
 */
PIXI.Graphics.prototype.endFill = function()
{
	this.filling = false;
	this.fillColor = null;
	this.fillAlpha = 1;
}

/**
 * @method drawRect
 *
 * @param x {Number} The X coord of the top-left of the rectangle
 * @param y {Number} The Y coord of the top-left of the rectangle
 * @param width {Number} The width of the rectangle
 * @param height {Number} The height of the rectangle
 */
PIXI.Graphics.prototype.drawRect = function( x, y, width, height )
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();

	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
						points:[x, y, width, height], type:PIXI.Graphics.RECT};

	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Draws a circle.
 *
 * @method drawCircle
 * @param x {Number} The X coord of the center of the circle
 * @param y {Number} The Y coord of the center of the circle
 * @param radius {Number} The radius of the circle
 */
PIXI.Graphics.prototype.drawCircle = function( x, y, radius)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();

	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
						points:[x, y, radius, radius], type:PIXI.Graphics.CIRC};

	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Draws an elipse.
 *
 * @method drawElipse
 * @param x {Number}
 * @param y {Number}
 * @param width {Number}
 * @param height {Number}
 */
PIXI.Graphics.prototype.drawElipse = function( x, y, width, height)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();

	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
						points:[x, y, width, height], type:PIXI.Graphics.ELIP};

	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
 *
 * @method clear
 */
PIXI.Graphics.prototype.clear = function()
{
	this.lineWidth = 0;
	this.filling = false;

	this.dirty = true;
	this.clearDirty = true;
	this.graphicsData = [];

	this.bounds = null//new PIXI.Rectangle();
}


PIXI.Graphics.prototype.updateFilterBounds = function()
{
	if(!this.bounds)
	{
		var minX = Infinity;
		var maxX = -Infinity;

		var minY = Infinity;
		var maxY = -Infinity;

		var points, x, y;

		for (var i = 0; i < this.graphicsData.length; i++) {
			

			var data = this.graphicsData[i];
			var type = data.type;
			var lineWidth = data.lineWidth;

			points = data.points;

			if(type === PIXI.Graphics.RECT)
			{
				x = points.x - lineWidth/2;
				y = points.y - lineWidth/2;
				var width = points.width + lineWidth;
				var height = points.height + lineWidth;

				minX = x < minX ? x : minX;
				maxX = x + width > maxX ? x + width : maxX;

				minY = y < minY ? x : minY;
				maxY = y + height > maxY ? y + height : maxY;
			}
			else if(type === PIXI.Graphics.CIRC || type === PIXI.Graphics.ELIP)
			{
				x = points.x;
				y = points.y;
				var radius = points.radius + lineWidth/2;
				
				minX = x - radius < minX ? x - radius : minX;
				maxX = x + radius > maxX ? x + radius : maxX;

				minY = y - radius < minY ? y - radius : minY;
				maxY = y + radius > maxY ? y + radius : maxY;
			}
			else
			{
				// POLY
				for (var j = 0; j < points.length; j+=2) 
				{
					
					x = points[j];
					y = points[j+1];

					minX = x-lineWidth < minX ? x-lineWidth : minX;
					maxX = x+lineWidth > maxX ? x+lineWidth : maxX;

					minY = y-lineWidth < minY ? y-lineWidth : minY;
					maxY = y+lineWidth > maxY ? y+lineWidth : maxY;
				};
			}

		};

		this.bounds = new PIXI.Rectangle(minX, minY, maxX - minX, maxY - minY);

	}

//	console.log(this.bounds);
}

// SOME TYPES:
PIXI.Graphics.POLY = 0;
PIXI.Graphics.RECT = 1;
PIXI.Graphics.CIRC = 2;
PIXI.Graphics.ELIP = 3;

/**
 * @author Mat Groves http://matgroves.com/
 */

PIXI.Strip = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );
	this.texture = texture;
	this.blendMode = PIXI.blendModes.NORMAL;

	try
	{
		this.uvs = new Float32Array([0, 1,
				1, 1,
				1, 0, 0,1]);

		this.verticies = new Float32Array([0, 0,
						  0,0,
						  0,0, 0,
						  0, 0]);

		this.colors = new Float32Array([1, 1, 1, 1]);

		this.indices = new Uint16Array([0, 1, 2, 3]);
	}
	catch(error)
	{
		this.uvs = [0, 1,
				1, 1,
				1, 0, 0,1];

		this.verticies = [0, 0,
						  0,0,
						  0,0, 0,
						  0, 0];

		this.colors = [1, 1, 1, 1];

		this.indices = [0, 1, 2, 3];
	}


	/*
	this.uvs = new Float32Array()
	this.verticies = new Float32Array()
	this.colors = new Float32Array()
	this.indices = new Uint16Array()
*/
	this.width = width;
	this.height = height;

	// load the texture!
	if(texture.baseTexture.hasLoaded)
	{
		this.width   = this.texture.frame.width;
		this.height  = this.texture.frame.height;
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}

	this.renderable = true;
}

// constructor
PIXI.Strip.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Strip.prototype.constructor = PIXI.Strip;

PIXI.Strip.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY

	// stop current texture
	this.texture = texture;
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
}

PIXI.Strip.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}
// some helper functions..


/**
 * @author Mat Groves http://matgroves.com/
 */


PIXI.Rope = function(texture, points)
{
	PIXI.Strip.call( this, texture );
	this.points = points;

	try
	{
		this.verticies = new Float32Array( points.length * 4);
		this.uvs = new Float32Array( points.length * 4);
		this.colors = new Float32Array(  points.length * 2);
		this.indices = new Uint16Array( points.length * 2);
	}
	catch(error)
	{
		this.verticies = verticies

		this.uvs = uvs
		this.colors = colors
		this.indices = indices
	}

	this.refresh();
}


// constructor
PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );
PIXI.Rope.prototype.constructor = PIXI.Rope;

PIXI.Rope.prototype.refresh = function()
{
	var points = this.points;
	if(points.length < 1)return;

	var uvs = this.uvs
	var indices = this.indices;
	var colors = this.colors;

	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];

	this.count-=0.2;


	uvs[0] = 0
	uvs[1] = 1
	uvs[2] = 0
	uvs[3] = 1

	colors[0] = 1;
	colors[1] = 1;

	indices[0] = 0;
	indices[1] = 1;

	var total = points.length;

	for (var i =  1; i < total; i++)
	{

		var point = points[i];
		var index = i * 4;
		// time to do some smart drawing!
		var amount = i/(total-1)

		if(i%2)
		{
			uvs[index] = amount;
			uvs[index+1] = 0;

			uvs[index+2] = amount
			uvs[index+3] = 1

		}
		else
		{
			uvs[index] = amount
			uvs[index+1] = 0

			uvs[index+2] = amount
			uvs[index+3] = 1
		}

		index = i * 2;
		colors[index] = 1;
		colors[index+1] = 1;

		index = i * 2;
		indices[index] = index;
		indices[index + 1] = index + 1;

		lastPoint = point;
	}
}

PIXI.Rope.prototype.updateTransform = function()
{

	var points = this.points;
	if(points.length < 1)return;

	var verticies = this.verticies

	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];

	this.count-=0.2;

	verticies[0] = point.x + perp.x
	verticies[1] = point.y + perp.y //+ 200
	verticies[2] = point.x - perp.x
	verticies[3] = point.y - perp.y//+200
	// time to do some smart drawing!

	var total = points.length;

	for (var i =  1; i < total; i++)
	{

		var point = points[i];
		var index = i * 4;

		if(i < points.length-1)
		{
			nextPoint = points[i+1];
		}
		else
		{
			nextPoint = point
		}

		perp.y = -(nextPoint.x - lastPoint.x);
		perp.x = nextPoint.y - lastPoint.y;

		var ratio = (1 - (i / (total-1))) * 10;
				if(ratio > 1)ratio = 1;

		var perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
		var num = this.texture.height/2//(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;
		perp.x /= perpLength;
		perp.y /= perpLength;

		perp.x *= num;
		perp.y *= num;

		verticies[index] = point.x + perp.x
		verticies[index+1] = point.y + perp.y
		verticies[index+2] = point.x - perp.x
		verticies[index+3] = point.y - perp.y

		lastPoint = point;
	}

	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

PIXI.Rope.prototype.setTexture = function(texture)
{
	// stop current texture
	this.texture = texture;
	this.updateFrame = true;
}





/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 * @class TilingSprite
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture} the texture of the tiling sprite
 * @param width {Number}  the width of the tiling sprite
 * @param height {Number} the height of the tiling sprite
 */
PIXI.TilingSprite = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * The texture that the sprite is using
	 *
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;

	/**
	 * The width of the tiling sprite
	 *
	 * @property width
	 * @type Number
	 */
	this.width = width;

	/**
	 * The height of the tiling sprite
	 *
	 * @property height
	 * @type Number
	 */
	this.height = height;

	/**
	 * The scaling of the image that is being tiled
	 *
	 * @property tileScale
	 * @type Point
	 */
	this.tileScale = new PIXI.Point(1,1);

	/**
	 * The offset position of the image that is being tiled
	 *
	 * @property tilePosition
	 * @type Point
	 */
	this.tilePosition = new PIXI.Point(0,0);

	this.renderable = true;

	this.blendMode = PIXI.blendModes.NORMAL
}

// constructor
PIXI.TilingSprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;

/**
 * Sets the texture of the tiling sprite
 *
 * @method setTexture
 * @param texture {Texture} The PIXI texture that is displayed by the sprite
 */
PIXI.TilingSprite.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY

	// stop current texture
	this.texture = texture;
	this.updateFrame = true;
}

/**
 * When the texture is updated, this event will fire to update the frame
 *
 * @method onTextureUpdate
 * @param event
 * @private
 */
PIXI.TilingSprite.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * based on pixi impact spine implementation made by Eemeli Kelokorpi (@ekelokorpi) https://github.com/ekelokorpi
 *
 * Awesome JS run time provided by EsotericSoftware
 * https://github.com/EsotericSoftware/spine-runtimes
 *
 */

/**
 * A class that enables the you to import and run your spine animations in pixi.
 * Spine animation data needs to be loaded using the PIXI.AssetLoader or PIXI.SpineLoader before it can be used by this class
 * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
 *
 * @class Spine
 * @extends DisplayObjectContainer
 * @constructor
 * @param url {String} The url of the spine anim file to be used
 * @param textureScale {Number} (CloudKid change) The scale to apply to all textures to size them properly for the animation.
 */
PIXI.Spine = function(url, textureScale)
{
	PIXI.DisplayObjectContainer.call(this);
	
	this.spineData = PIXI.AnimCache[filenameFromUrl(url)];
	
	if(!this.spineData)
	{
		throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + url);
	}
	
	this.textureScale = textureScale || 1;//CLOUDKID CHANGE
	
	this.skeleton = new spine.Skeleton(this.spineData);
	this.skeleton.updateWorldTransform();

	this.stateData = new spine.AnimationStateData(this.spineData);
	this.state = new spine.AnimationState(this.stateData);

	this.slotContainers = [];

	for (var i = 0, n = this.skeleton.drawOrder.length; i < n; i++) {
		var slot = this.skeleton.drawOrder[i];
		var attachment = slot.attachment;
		var slotContainer = new PIXI.DisplayObjectContainer();
		this.slotContainers.push(slotContainer);
		this.addChild(slotContainer);
		if (!(attachment instanceof spine.RegionAttachment)) {
			continue;
		}
		var spriteName = attachment.rendererObject.name;
		var sprite = this.createSprite(slot, attachment.rendererObject, this.textureScale);
		slot.currentSprite = sprite;
		slot.currentSpriteName = spriteName;
		slotContainer.addChild(sprite);
	}
};

PIXI.Spine.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Spine.prototype.constructor = PIXI.Spine;

PIXI.Spine.prototype.updateAnim = function(deltaSec)
{
	this.state.update(deltaSec);
	this.state.apply(this.skeleton);
};

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.Spine.prototype.updateTransform = function () {
	this.skeleton.updateWorldTransform();

	var PI_OVER_180 = Math.PI_OVER_180;
	var drawOrder = this.skeleton.drawOrder;
	for (var i = 0, n = drawOrder.length; i < n; i++) {
		var slot = drawOrder[i];
		var attachment = slot.attachment;
		var slotContainer = this.slotContainers[i];
		if (!(attachment instanceof spine.RegionAttachment)) {
			slotContainer.visible = false;
			continue;
		}

		if (attachment.rendererObject) {
			if (!slot.currentSpriteName || slot.currentSpriteName != attachment.name) {
				var spriteName = attachment.rendererObject.name;
				if (slot.currentSprite !== undefined) {
					slot.currentSprite.visible = false;
				}
				slot.sprites = slot.sprites || {};
				if (slot.sprites[spriteName] !== undefined) {
					slot.sprites[spriteName].visible = true;
				} else {
					var sprite = this.createSprite(slot, attachment.rendererObject, this.textureScale);
					slotContainer.addChild(sprite);
				}
				slot.currentSprite = slot.sprites[spriteName];
				slot.currentSpriteName = spriteName;
			}
		}
		slotContainer.visible = true;

		var bone = slot.bone;
		
		slotContainer.position.x = bone.worldX + attachment.x * bone.m00 + attachment.y * bone.m01;
		slotContainer.position.y = bone.worldY + attachment.x * bone.m10 + attachment.y * bone.m11;
		slotContainer.scale.x = bone.worldScaleX;
		slotContainer.scale.y = bone.worldScaleY;
		slotContainer.alpha = slot.a;//actually apply alpha to things?

		slotContainer.rotation = -(slot.bone.worldRotation * PI_OVER_180);
	}

	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};


PIXI.Spine.prototype.createSprite = function (slot, descriptor, textureScale) {
	var name = PIXI.TextureCache[descriptor.name] ? descriptor.name : descriptor.name + ".png";
	var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(filenameFromUrl(name)));
	sprite.scale.x = descriptor.scale.x * textureScale;
	sprite.scale.y = descriptor.scale.y * textureScale;
	sprite.rotation = descriptor.rotation;
	sprite.anchor.x = sprite.anchor.y = 0.5;

	slot.sprites = slot.sprites || {};
	slot.sprites[descriptor.name] = sprite;
	return sprite;
};

/*
 * Awesome JS run time provided by EsotericSoftware
 *
 * https://github.com/EsotericSoftware/spine-runtimes
 *
 */

var spine = PIXI.spine = {};

spine.BoneData = function (name, parent) {
	this.name = name;
	this.parent = parent;
};
spine.BoneData.prototype = {
	length: 0,
	x: 0, y: 0,
	rotation: 0,
	scaleX: 1, scaleY: 1
};

spine.SlotData = function (name, boneData) {
	this.name = name;
	this.boneData = boneData;
};
spine.SlotData.prototype = {
	r: 1, g: 1, b: 1, a: 1,
	attachmentName: null
};

spine.Bone = function (boneData, parent) {
	this.data = boneData;
	this.parent = parent;
	this.setToSetupPose();
};
spine.Bone.yDown = false;
spine.Bone.prototype = {
	x: 0, y: 0,
	rotation: 0,
	scaleX: 1, scaleY: 1,
	m00: 0, m01: 0, worldX: 0, // a b x
	m10: 0, m11: 0, worldY: 0, // c d y
	worldRotation: 0,
	worldScaleX: 1, worldScaleY: 1,
	updateWorldTransform: function (flipX, flipY) {
		var parent = this.parent;
		if (parent != null) {
			this.worldX = this.x * parent.m00 + this.y * parent.m01 + parent.worldX;
			this.worldY = this.x * parent.m10 + this.y * parent.m11 + parent.worldY;
			this.worldScaleX = parent.worldScaleX * this.scaleX;
			this.worldScaleY = parent.worldScaleY * this.scaleY;
			this.worldRotation = parent.worldRotation + this.rotation;
		} else {
			this.worldX = this.x;
			this.worldY = this.y;
			this.worldScaleX = this.scaleX;
			this.worldScaleY = this.scaleY;
			this.worldRotation = this.rotation;
		}
		var radians = this.worldRotation * Math.PI_OVER_180;
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		this.m00 = cos * this.worldScaleX;
		this.m10 = sin * this.worldScaleX;
		this.m01 = -sin * this.worldScaleY;
		this.m11 = cos * this.worldScaleY;
		if (flipX) {
			this.m00 = -this.m00;
			this.m01 = -this.m01;
		}
		if (flipY) {
			this.m10 = -this.m10;
			this.m11 = -this.m11;
		}
		if (spine.Bone.yDown) {
			this.m10 = -this.m10;
			this.m11 = -this.m11;
		}
	},
	setToSetupPose: function () {
		var data = this.data;
		this.x = data.x;
		this.y = data.y;
		this.rotation = data.rotation;
		this.scaleX = data.scaleX;
		this.scaleY = data.scaleY;
	}
};

spine.Slot = function (slotData, skeleton, bone) {
	this.data = slotData;
	this.skeleton = skeleton;
	this.bone = bone;
	this.setToSetupPose();
};
spine.Slot.prototype = {
	r: 1, g: 1, b: 1, a: 1,
	_attachmentTime: 0,
	attachment: null,
	setAttachment: function (attachment) {
		this.attachment = attachment;
		this._attachmentTime = this.skeleton.time;
	},
	setAttachmentTime: function (time) {
		this._attachmentTime = this.skeleton.time - time;
	},
	getAttachmentTime: function () {
		return this.skeleton.time - this._attachmentTime;
	},
	setToSetupPose: function () {
		var data = this.data;
		this.r = data.r;
		this.g = data.g;
		this.b = data.b;
		this.a = data.a;

		var slotDatas = this.skeleton.data.slots;
		for (var i = 0, n = slotDatas.length; i < n; i++) {
			if (slotDatas[i] == data) {
				this.setAttachment(!data.attachmentName ? null : this.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
				break;
			}
		}
	}
};

spine.Skin = function (name) {
	this.name = name;
	this.attachments = {};
};
spine.Skin.prototype = {
	addAttachment: function (slotIndex, name, attachment) {
		this.attachments[slotIndex + ":" + name] = attachment;
	},
	getAttachment: function (slotIndex, name) {
		return this.attachments[slotIndex + ":" + name];
	},
	_attachAll: function (skeleton, oldSkin) {
		for (var key in oldSkin.attachments) {
			var colon = key.indexOf(":");
			var slotIndex = parseInt(key.substring(0, colon));
			var name = key.substring(colon + 1);
			var slot = skeleton.slots[slotIndex];
			if (slot.attachment && slot.attachment.name == name) {
				var attachment = this.getAttachment(slotIndex, name);
				if (attachment) slot.setAttachment(attachment);
			}
		}
	}
};

spine.Animation = function (name, timelines, duration) {
	this.name = name;
	this.timelines = timelines;
	this.duration = duration;
};
spine.Animation.prototype = {
	apply: function (skeleton, time, loop) {
		if (loop && this.duration != 0) time %= this.duration;
		var timelines = this.timelines;
		for (var i = 0, n = timelines.length; i < n; i++)
			timelines[i].apply(skeleton, time, 1);
	},
	mix: function (skeleton, time, loop, alpha) {
		if (loop && this.duration != 0) time %= this.duration;
		var timelines = this.timelines;
		for (var i = 0, n = timelines.length; i < n; i++)
			timelines[i].apply(skeleton, time, alpha);
	}
};

spine.binarySearch = function (values, target, step) {
	var low = 0;
	var high = Math.floor(values.length / step) - 2;
	if (high == 0) return step;
	var current = high >>> 1;
	while (true) {
		if (values[(current + 1) * step] <= target)
			low = current + 1;
		else
			high = current;
		if (low == high) return (low + 1) * step;
		current = (low + high) >>> 1;
	}
};
spine.linearSearch = function (values, target, step) {
	for (var i = 0, last = values.length - step; i <= last; i += step)
		if (values[i] > target) return i;
	return -1;
};

spine.Curves = function (frameCount) {
	this.curves = []; // dfx, dfy, ddfx, ddfy, dddfx, dddfy, ...
	this.curves.length = (frameCount - 1) * 6;
};
spine.Curves.prototype = {
	setLinear: function (frameIndex) {
		this.curves[frameIndex * 6] = 0/*LINEAR*/;
	},
	setStepped: function (frameIndex) {
		this.curves[frameIndex * 6] = -1/*STEPPED*/;
	},
	/** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
	 * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
	 * the difference between the keyframe's values. */
	setCurve: function (frameIndex, cx1, cy1, cx2, cy2) {
		var subdiv_step = 1 / 10/*BEZIER_SEGMENTS*/;
		var subdiv_step2 = subdiv_step * subdiv_step;
		var subdiv_step3 = subdiv_step2 * subdiv_step;
		var pre1 = 3 * subdiv_step;
		var pre2 = 3 * subdiv_step2;
		var pre4 = 6 * subdiv_step2;
		var pre5 = 6 * subdiv_step3;
		var tmp1x = -cx1 * 2 + cx2;
		var tmp1y = -cy1 * 2 + cy2;
		var tmp2x = (cx1 - cx2) * 3 + 1;
		var tmp2y = (cy1 - cy2) * 3 + 1;
		var i = frameIndex * 6;
		var curves = this.curves;
		curves[i] = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
		curves[i + 1] = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;
		curves[i + 2] = tmp1x * pre4 + tmp2x * pre5;
		curves[i + 3] = tmp1y * pre4 + tmp2y * pre5;
		curves[i + 4] = tmp2x * pre5;
		curves[i + 5] = tmp2y * pre5;
	},
	getCurvePercent: function (frameIndex, percent) {
		percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent);
		var curveIndex = frameIndex * 6;
		var curves = this.curves;
		var dfx = curves[curveIndex];
		if (!dfx/*LINEAR*/) return percent;
		if (dfx == -1/*STEPPED*/) return 0;
		var dfy = curves[curveIndex + 1];
		var ddfx = curves[curveIndex + 2];
		var ddfy = curves[curveIndex + 3];
		var dddfx = curves[curveIndex + 4];
		var dddfy = curves[curveIndex + 5];
		var x = dfx, y = dfy;
		var i = 10/*BEZIER_SEGMENTS*/ - 2;
		while (true) {
			if (x >= percent) {
				var lastX = x - dfx;
				var lastY = y - dfy;
				return lastY + (y - lastY) * (percent - lastX) / (x - lastX);
			}
			if (i == 0) break;
			i--;
			dfx += ddfx;
			dfy += ddfy;
			ddfx += dddfx;
			ddfy += dddfy;
			x += dfx;
			y += dfy;
		}
		return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
	}
};

spine.RotateTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, angle, ...
	this.frames.length = frameCount * 2;
};
spine.RotateTimeline.prototype = {
	boneIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 2;
	},
	setFrame: function (frameIndex, time, angle) {
		frameIndex *= 2;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = angle;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var bone = skeleton.bones[this.boneIndex];

		if (time >= frames[frames.length - 2]) { // Time is after last frame.
			var amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
			while (amount > 180)
				amount -= 360;
			while (amount < -180)
				amount += 360;
			bone.rotation += amount * alpha;
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 2);
		var lastFrameValue = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex - 2/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 2 - 1, percent);

		var amount = frames[frameIndex + 1/*FRAME_VALUE*/] - lastFrameValue;
		while (amount > 180)
			amount -= 360;
		while (amount < -180)
			amount += 360;
		amount = bone.data.rotation + (lastFrameValue + amount * percent) - bone.rotation;
		while (amount > 180)
			amount -= 360;
		while (amount < -180)
			amount += 360;
		bone.rotation += amount * alpha;
	}
};

spine.TranslateTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, x, y, ...
	this.frames.length = frameCount * 3;
};
spine.TranslateTimeline.prototype = {
	boneIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 3;
	},
	setFrame: function (frameIndex, time, x, y) {
		frameIndex *= 3;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = x;
		this.frames[frameIndex + 2] = y;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var bone = skeleton.bones[this.boneIndex];

		if (time >= frames[frames.length - 3]) { // Time is after last frame.
			bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
			bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 3);
		var lastFrameX = frames[frameIndex - 2];
		var lastFrameY = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

		bone.x += (bone.data.x + lastFrameX + (frames[frameIndex + 1/*FRAME_X*/] - lastFrameX) * percent - bone.x) * alpha;
		bone.y += (bone.data.y + lastFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - lastFrameY) * percent - bone.y) * alpha;
	}
};

spine.ScaleTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, x, y, ...
	this.frames.length = frameCount * 3;
};
spine.ScaleTimeline.prototype = {
	boneIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 3;
	},
	setFrame: function (frameIndex, time, x, y) {
		frameIndex *= 3;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = x;
		this.frames[frameIndex + 2] = y;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var bone = skeleton.bones[this.boneIndex];

		if (time >= frames[frames.length - 3]) { // Time is after last frame.
			bone.scaleX += (bone.data.scaleX - 1 + frames[frames.length - 2] - bone.scaleX) * alpha;
			bone.scaleY += (bone.data.scaleY - 1 + frames[frames.length - 1] - bone.scaleY) * alpha;
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 3);
		var lastFrameX = frames[frameIndex - 2];
		var lastFrameY = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

		bone.scaleX += (bone.data.scaleX - 1 + lastFrameX + (frames[frameIndex + 1/*FRAME_X*/] - lastFrameX) * percent - bone.scaleX) * alpha;
		bone.scaleY += (bone.data.scaleY - 1 + lastFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - lastFrameY) * percent - bone.scaleY) * alpha;
	}
};

spine.ColorTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, r, g, b, a, ...
	this.frames.length = frameCount * 5;
};
spine.ColorTimeline.prototype = {
	slotIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 5;
	},
	setFrame: function (frameIndex, time, r, g, b, a) {
		frameIndex *= 5;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = r;
		this.frames[frameIndex + 2] = g;
		this.frames[frameIndex + 3] = b;
		this.frames[frameIndex + 4] = a;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var slot = skeleton.slots[this.slotIndex];

		if (time >= frames[frames.length - 5]) { // Time is after last frame.
			var i = frames.length - 1;
			slot.r = frames[i - 3];
			slot.g = frames[i - 2];
			slot.b = frames[i - 1];
			slot.a = frames[i];
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 5);
		var lastFrameR = frames[frameIndex - 4];
		var lastFrameG = frames[frameIndex - 3];
		var lastFrameB = frames[frameIndex - 2];
		var lastFrameA = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex - 5/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent);

		var r = lastFrameR + (frames[frameIndex + 1/*FRAME_R*/] - lastFrameR) * percent;
		var g = lastFrameG + (frames[frameIndex + 2/*FRAME_G*/] - lastFrameG) * percent;
		var b = lastFrameB + (frames[frameIndex + 3/*FRAME_B*/] - lastFrameB) * percent;
		var a = lastFrameA + (frames[frameIndex + 4/*FRAME_A*/] - lastFrameA) * percent;
		if (alpha < 1) {
			slot.r += (r - slot.r) * alpha;
			slot.g += (g - slot.g) * alpha;
			slot.b += (b - slot.b) * alpha;
			slot.a += (a - slot.a) * alpha;
		} else {
			slot.r = r;
			slot.g = g;
			slot.b = b;
			slot.a = a;
		}
	}
};

spine.AttachmentTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, ...
	this.frames.length = frameCount;
	this.attachmentNames = []; // time, ...
	this.attachmentNames.length = frameCount;
};
spine.AttachmentTimeline.prototype = {
	slotIndex: 0,
	getFrameCount: function () {
		return this.frames.length;
	},
	setFrame: function (frameIndex, time, attachmentName) {
		this.frames[frameIndex] = time;
		this.attachmentNames[frameIndex] = attachmentName;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var frameIndex;
		if (time >= frames[frames.length - 1]) // Time is after last frame.
			frameIndex = frames.length - 1;
		else
			frameIndex = spine.binarySearch(frames, time, 1) - 1;

		var attachmentName = this.attachmentNames[frameIndex];
		skeleton.slots[this.slotIndex].setAttachment(!attachmentName ? null : skeleton.getAttachmentBySlotIndex(this.slotIndex, attachmentName));
	}
};

spine.SkeletonData = function () {
	this.bones = [];
	this.slots = [];
	this.skins = [];
	this.animations = [];
};
spine.SkeletonData.prototype = {
	defaultSkin: null,
	/** @return May be null. */
	findBone: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].name == boneName) return bones[i];
		return null;
	},
	/** @return -1 if the bone was not found. */
	findBoneIndex: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].name == boneName) return i;
		return -1;
	},
	/** @return May be null. */
	findSlot: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++) {
			if (slots[i].name == slotName) return slot[i];
		}
		return null;
	},
	/** @return -1 if the bone was not found. */
	findSlotIndex: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			if (slots[i].name == slotName) return i;
		return -1;
	},
	/** @return May be null. */
	findSkin: function (skinName) {
		var skins = this.skins;
		for (var i = 0, n = skins.length; i < n; i++)
			if (skins[i].name == skinName) return skins[i];
		return null;
	},
	/** @return May be null. */
	findAnimation: function (animationName) {
		var animations = this.animations;
		for (var i = 0, n = animations.length; i < n; i++)
			if (animations[i].name == animationName) return animations[i];
		return null;
	}
};

spine.Skeleton = function (skeletonData) {
	this.data = skeletonData;

	this.bones = [];
	for (var i = 0, n = skeletonData.bones.length; i < n; i++) {
		var boneData = skeletonData.bones[i];
		var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
		this.bones.push(new spine.Bone(boneData, parent));
	}

	this.slots = [];
	this.drawOrder = [];
	for (var i = 0, n = skeletonData.slots.length; i < n; i++) {
		var slotData = skeletonData.slots[i];
		var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
		var slot = new spine.Slot(slotData, this, bone);
		this.slots.push(slot);
		this.drawOrder.push(slot);
	}
};
spine.Skeleton.prototype = {
	x: 0, y: 0,
	skin: null,
	r: 1, g: 1, b: 1, a: 1,
	time: 0,
	flipX: false, flipY: false,
	/** Updates the world transform for each bone. */
	updateWorldTransform: function () {
		var flipX = this.flipX;
		var flipY = this.flipY;
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			bones[i].updateWorldTransform(flipX, flipY);
	},
	/** Sets the bones and slots to their setup pose values. */
	setToSetupPose: function () {
		this.setBonesToSetupPose();
		this.setSlotsToSetupPose();
	},
	setBonesToSetupPose: function () {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			bones[i].setToSetupPose();
	},
	setSlotsToSetupPose: function () {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			slots[i].setToSetupPose(i);
	},
	/** @return May return null. */
	getRootBone: function () {
		return this.bones.length == 0 ? null : this.bones[0];
	},
	/** @return May be null. */
	findBone: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].data.name == boneName) return bones[i];
		return null;
	},
	/** @return -1 if the bone was not found. */
	findBoneIndex: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].data.name == boneName) return i;
		return -1;
	},
	/** @return May be null. */
	findSlot: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			if (slots[i].data.name == slotName) return slots[i];
		return null;
	},
	/** @return -1 if the bone was not found. */
	findSlotIndex: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			if (slots[i].data.name == slotName) return i;
		return -1;
	},
	setSkinByName: function (skinName) {
		var skin = this.data.findSkin(skinName);
		if (!skin) throw "Skin not found: " + skinName;
		this.setSkin(skin);
	},
	/** Sets the skin used to look up attachments not found in the {@link SkeletonData#getDefaultSkin() default skin}. Attachments
	 * from the new skin are attached if the corresponding attachment from the old skin was attached.
	 * @param newSkin May be null. */
	setSkin: function (newSkin) {
		if (this.skin && newSkin) newSkin._attachAll(this, this.skin);
		this.skin = newSkin;
	},
	/** @return May be null. */
	getAttachmentBySlotName: function (slotName, attachmentName) {
		return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
	},
	/** @return May be null. */
	getAttachmentBySlotIndex: function (slotIndex, attachmentName) {
		if (this.skin) {
			var attachment = this.skin.getAttachment(slotIndex, attachmentName);
			if (attachment) return attachment;
		}
		if (this.data.defaultSkin) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
		return null;
	},
	/** @param attachmentName May be null. */
	setAttachment: function (slotName, attachmentName) {
		var slots = this.slots;
		for (var i = 0, n = slots.size; i < n; i++) {
			var slot = slots[i];
			if (slot.data.name == slotName) {
				var attachment = null;
				if (attachmentName) {
					attachment = this.getAttachment(i, attachmentName);
					if (attachment == null) throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
				}
				slot.setAttachment(attachment);
				return;
			}
		}
		throw "Slot not found: " + slotName;
	},
	update: function (delta) {
		time += delta;
	}
};

spine.AttachmentType = {
	region: 0
};

spine.RegionAttachment = function () {
	this.offset = [];
	this.offset.length = 8;
	this.uvs = [];
	this.uvs.length = 8;
};
spine.RegionAttachment.prototype = {
	x: 0, y: 0,
	rotation: 0,
	scaleX: 1, scaleY: 1,
	width: 0, height: 0,
	rendererObject: null,
	regionOffsetX: 0, regionOffsetY: 0,
	regionWidth: 0, regionHeight: 0,
	regionOriginalWidth: 0, regionOriginalHeight: 0,
	setUVs: function (u, v, u2, v2, rotate) {
		var uvs = this.uvs;
		if (rotate) {
			uvs[2/*X2*/] = u;
			uvs[3/*Y2*/] = v2;
			uvs[4/*X3*/] = u;
			uvs[5/*Y3*/] = v;
			uvs[6/*X4*/] = u2;
			uvs[7/*Y4*/] = v;
			uvs[0/*X1*/] = u2;
			uvs[1/*Y1*/] = v2;
		} else {
			uvs[0/*X1*/] = u;
			uvs[1/*Y1*/] = v2;
			uvs[2/*X2*/] = u;
			uvs[3/*Y2*/] = v;
			uvs[4/*X3*/] = u2;
			uvs[5/*Y3*/] = v;
			uvs[6/*X4*/] = u2;
			uvs[7/*Y4*/] = v2;
		}
	},
	updateOffset: function () {
		var regionScaleX = this.width / this.regionOriginalWidth * this.scaleX;
		var regionScaleY = this.height / this.regionOriginalHeight * this.scaleY;
		var localX = -this.width / 2 * this.scaleX + this.regionOffsetX * regionScaleX;
		var localY = -this.height / 2 * this.scaleY + this.regionOffsetY * regionScaleY;
		var localX2 = localX + this.regionWidth * regionScaleX;
		var localY2 = localY + this.regionHeight * regionScaleY;
		var radians = this.rotation * Math.PI_OVER_180;
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		var localXCos = localX * cos + this.x;
		var localXSin = localX * sin;
		var localYCos = localY * cos + this.y;
		var localYSin = localY * sin;
		var localX2Cos = localX2 * cos + this.x;
		var localX2Sin = localX2 * sin;
		var localY2Cos = localY2 * cos + this.y;
		var localY2Sin = localY2 * sin;
		var offset = this.offset;
		offset[0/*X1*/] = localXCos - localYSin;
		offset[1/*Y1*/] = localYCos + localXSin;
		offset[2/*X2*/] = localXCos - localY2Sin;
		offset[3/*Y2*/] = localY2Cos + localXSin;
		offset[4/*X3*/] = localX2Cos - localY2Sin;
		offset[5/*Y3*/] = localY2Cos + localX2Sin;
		offset[6/*X4*/] = localX2Cos - localYSin;
		offset[7/*Y4*/] = localYCos + localX2Sin;
	},
	computeVertices: function (x, y, bone, vertices) {
		x += bone.worldX;
		y += bone.worldY;
		var m00 = bone.m00;
		var m01 = bone.m01;
		var m10 = bone.m10;
		var m11 = bone.m11;
		var offset = this.offset;
		vertices[0/*X1*/] = offset[0/*X1*/] * m00 + offset[1/*Y1*/] * m01 + x;
		vertices[1/*Y1*/] = offset[0/*X1*/] * m10 + offset[1/*Y1*/] * m11 + y;
		vertices[2/*X2*/] = offset[2/*X2*/] * m00 + offset[3/*Y2*/] * m01 + x;
		vertices[3/*Y2*/] = offset[2/*X2*/] * m10 + offset[3/*Y2*/] * m11 + y;
		vertices[4/*X3*/] = offset[4/*X3*/] * m00 + offset[5/*X3*/] * m01 + x;
		vertices[5/*X3*/] = offset[4/*X3*/] * m10 + offset[5/*X3*/] * m11 + y;
		vertices[6/*X4*/] = offset[6/*X4*/] * m00 + offset[7/*Y4*/] * m01 + x;
		vertices[7/*Y4*/] = offset[6/*X4*/] * m10 + offset[7/*Y4*/] * m11 + y;
	}
}

spine.AnimationStateData = function (skeletonData) {
	this.skeletonData = skeletonData;
	this.animationToMixTime = {};
};
spine.AnimationStateData.prototype = {
        defaultMix: 0,
	setMixByName: function (fromName, toName, duration) {
		var from = this.skeletonData.findAnimation(fromName);
		if (!from) throw "Animation not found: " + fromName;
		var to = this.skeletonData.findAnimation(toName);
		if (!to) throw "Animation not found: " + toName;
		this.setMix(from, to, duration);
	},
	setMix: function (from, to, duration) {
		this.animationToMixTime[from.name + ":" + to.name] = duration;
	},
	getMix: function (from, to) {
		var time = this.animationToMixTime[from.name + ":" + to.name];
            return time ? time : this.defaultMix;
	}
};

spine.AnimationState = function (stateData) {
	this.data = stateData;
	this.queue = [];
};
spine.AnimationState.prototype = {
	current: null,
	previous: null,
	currentTime: 0,
	previousTime: 0,
	currentLoop: false,
	previousLoop: false,
	mixTime: 0,
	mixDuration: 0,
	update: function (delta) {
		this.currentTime += delta;
		this.previousTime += delta;
		this.mixTime += delta;

		if (this.queue.length > 0) {
			var entry = this.queue[0];
			if (this.currentTime >= entry.delay) {
				this._setAnimation(entry.animation, entry.loop);
				this.queue.shift();
			}
		}
	},
	apply: function (skeleton) {
		if (!this.current) return;
		if (this.previous) {
			this.previous.apply(skeleton, this.previousTime, this.previousLoop);
			var alpha = this.mixTime / this.mixDuration;
			if (alpha >= 1) {
				alpha = 1;
				this.previous = null;
			}
			this.current.mix(skeleton, this.currentTime, this.currentLoop, alpha);
		} else
			this.current.apply(skeleton, this.currentTime, this.currentLoop);
	},
	clearAnimation: function () {
		this.previous = null;
		this.current = null;
		this.queue.length = 0;
	},
	_setAnimation: function (animation, loop) {
		this.previous = null;
		if (animation && this.current) {
			this.mixDuration = this.data.getMix(this.current, animation);
			if (this.mixDuration > 0) {
				this.mixTime = 0;
				this.previous = this.current;
				this.previousTime = this.currentTime;
				this.previousLoop = this.currentLoop;
			}
		}
		this.current = animation;
		this.currentLoop = loop;
		this.currentTime = 0;
	},
	/** @see #setAnimation(Animation, Boolean) */
	setAnimationByName: function (animationName, loop) {
		var animation = this.data.skeletonData.findAnimation(animationName);
		if (!animation) throw "Animation not found: " + animationName;
		this.setAnimation(animation, loop);
	},
	/** Set the current animation. Any queued animations are cleared and the current animation time is set to 0.
	 * @param animation May be null. */
	setAnimation: function (animation, loop) {
		this.queue.length = 0;
		this._setAnimation(animation, loop);
	},
	/** @see #addAnimation(Animation, Boolean, Number) */
	addAnimationByName: function (animationName, loop, delay) {
		var animation = this.data.skeletonData.findAnimation(animationName);
		if (!animation) throw "Animation not found: " + animationName;
		this.addAnimation(animation, loop, delay);
	},
	/** Adds an animation to be played delay seconds after the current or last queued animation.
	 * @param delay May be <= 0 to use duration of previous animation minus any mix duration plus the negative delay. */
	addAnimation: function (animation, loop, delay) {
		var entry = {};
		entry.animation = animation;
		entry.loop = loop;

		if (!delay || delay <= 0) {
			var previousAnimation = this.queue.length == 0 ? this.current : this.queue[this.queue.length - 1].animation;
			if (previousAnimation != null)
				delay = previousAnimation.duration - this.data.getMix(previousAnimation, animation) + (delay || 0);
			else
				delay = 0;
		}
		entry.delay = delay;

		this.queue.push(entry);
	},
	/** Returns true if no animation is set or if the current time is greater than the animation duration, regardless of looping. */
	isComplete: function () {
		return !this.current || this.currentTime >= this.current.duration;
	}
};

spine.SkeletonJson = function (attachmentLoader) {
	this.attachmentLoader = attachmentLoader;
};
spine.SkeletonJson.prototype = {
	scale: 1,
	readSkeletonData: function (root) {
		var skeletonData = new spine.SkeletonData();

		// Bones.
		var bones = root["bones"];
		for (var i = 0, n = bones.length; i < n; i++) {
			var boneMap = bones[i];
			var parent = null;
			if (boneMap["parent"]) {
				parent = skeletonData.findBone(boneMap["parent"]);
				if (!parent) throw "Parent bone not found: " + boneMap["parent"];
			}
			var boneData = new spine.BoneData(boneMap["name"], parent);
			boneData.length = (boneMap["length"] || 0) * this.scale;
			boneData.x = (boneMap["x"] || 0) * this.scale;
			boneData.y = (boneMap["y"] || 0) * this.scale;
			boneData.rotation = (boneMap["rotation"] || 0);
			boneData.scaleX = boneMap["scaleX"] || 1;
			boneData.scaleY = boneMap["scaleY"] || 1;
			skeletonData.bones.push(boneData);
		}

		// Slots.
		var slots = root["slots"];
		for (var i = 0, n = slots.length; i < n; i++) {
			var slotMap = slots[i];
			var boneData = skeletonData.findBone(slotMap["bone"]);
			if (!boneData) throw "Slot bone not found: " + slotMap["bone"];
			var slotData = new spine.SlotData(slotMap["name"], boneData);

			var color = slotMap["color"];
			if (color) {
				slotData.r = spine.SkeletonJson.toColor(color, 0);
				slotData.g = spine.SkeletonJson.toColor(color, 1);
				slotData.b = spine.SkeletonJson.toColor(color, 2);
				slotData.a = spine.SkeletonJson.toColor(color, 3);
			}

			slotData.attachmentName = slotMap["attachment"];

			skeletonData.slots.push(slotData);
		}

		// Skins.
		var skins = root["skins"];
		for (var skinName in skins) {
			if (!skins.hasOwnProperty(skinName)) continue;
			var skinMap = skins[skinName];
			var skin = new spine.Skin(skinName);
			for (var slotName in skinMap) {
				if (!skinMap.hasOwnProperty(slotName)) continue;
				var slotIndex = skeletonData.findSlotIndex(slotName);
				var slotEntry = skinMap[slotName];
				for (var attachmentName in slotEntry) {
					if (!slotEntry.hasOwnProperty(attachmentName)) continue;
					var attachment = this.readAttachment(skin, attachmentName, slotEntry[attachmentName]);
					if (attachment != null) skin.addAttachment(slotIndex, attachmentName, attachment);
				}
			}
			skeletonData.skins.push(skin);
			if (skin.name == "default") skeletonData.defaultSkin = skin;
		}

		// Animations.
		var animations = root["animations"];
		for (var animationName in animations) {
			if (!animations.hasOwnProperty(animationName)) continue;
			this.readAnimation(animationName, animations[animationName], skeletonData);
		}

		return skeletonData;
	},
	readAttachment: function (skin, name, map) {
		name = map["name"] || name;

		var type = spine.AttachmentType[map["type"] || "region"];

		if (type == spine.AttachmentType.region) {
			var attachment = new spine.RegionAttachment();
			attachment.x = (map["x"] || 0) * this.scale;
			attachment.y = (map["y"] || 0) * this.scale;
			attachment.scaleX = map["scaleX"] || 1;
			attachment.scaleY = map["scaleY"] || 1;
			attachment.rotation = map["rotation"] || 0;
			attachment.width = (map["width"] || 32) * this.scale;
			attachment.height = (map["height"] || 32) * this.scale;
			attachment.updateOffset();

			attachment.rendererObject = {};
			attachment.rendererObject.name = name;
			attachment.rendererObject.scale = {};
			attachment.rendererObject.scale.x = attachment.scaleX;
			attachment.rendererObject.scale.y = attachment.scaleY;
			attachment.rendererObject.rotation = -attachment.rotation * Math.PI_OVER_180;
			return attachment;
		}

            throw "Unknown attachment type: " + type;
	},

	readAnimation: function (name, map, skeletonData) {
		var timelines = [];
		var duration = 0;

		var bones = map["bones"];
		for (var boneName in bones) {
			if (!bones.hasOwnProperty(boneName)) continue;
			var boneIndex = skeletonData.findBoneIndex(boneName);
			if (boneIndex == -1) throw "Bone not found: " + boneName;
			var boneMap = bones[boneName];

			for (var timelineName in boneMap) {
				if (!boneMap.hasOwnProperty(timelineName)) continue;
				var values = boneMap[timelineName];
				if (timelineName == "rotate") {
					var timeline = new spine.RotateTimeline(values.length);
					timeline.boneIndex = boneIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
						spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
						frameIndex++;
					}
					timelines.push(timeline);
					duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);

				} else if (timelineName == "translate" || timelineName == "scale") {
					var timeline;
					var timelineScale = 1;
					if (timelineName == "scale")
						timeline = new spine.ScaleTimeline(values.length);
					else {
						timeline = new spine.TranslateTimeline(values.length);
						timelineScale = this.scale;
					}
					timeline.boneIndex = boneIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						var x = (valueMap["x"] || 0) * timelineScale;
						var y = (valueMap["y"] || 0) * timelineScale;
						timeline.setFrame(frameIndex, valueMap["time"], x, y);
						spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
						frameIndex++;
					}
					timelines.push(timeline);
					duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);

				} else
					throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
			}
		}
		var slots = map["slots"];
		for (var slotName in slots) {
			if (!slots.hasOwnProperty(slotName)) continue;
			var slotMap = slots[slotName];
			var slotIndex = skeletonData.findSlotIndex(slotName);

			for (var timelineName in slotMap) {
				if (!slotMap.hasOwnProperty(timelineName)) continue;
				var values = slotMap[timelineName];
				if (timelineName == "color") {
					var timeline = new spine.ColorTimeline(values.length);
					timeline.slotIndex = slotIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						var color = valueMap["color"];
						var r = spine.SkeletonJson.toColor(color, 0);
						var g = spine.SkeletonJson.toColor(color, 1);
						var b = spine.SkeletonJson.toColor(color, 2);
						var a = spine.SkeletonJson.toColor(color, 3);
						timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
						spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
						frameIndex++;
					}
					timelines.push(timeline);
					duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);
				} else if (timelineName == "attachment") {
					var timeline = new spine.AttachmentTimeline(values.length);
					timeline.slotIndex = slotIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
					}
					timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);

				} else
					throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
			}
		}
		skeletonData.animations.push(new spine.Animation(name, timelines, duration));
	}
};
spine.SkeletonJson.readCurve = function (timeline, frameIndex, valueMap) {
	var curve = valueMap["curve"];
	if (!curve) return;
	if (curve == "stepped")
		timeline.curves.setStepped(frameIndex);
	else if (curve instanceof Array)
		timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
};
spine.SkeletonJson.toColor = function (hexString, colorIndex) {
	if (hexString.length != 8) throw "Color hexidecimal length must be 8, recieved: " + hexString;
	return parseInt(hexString.substr(colorIndex * 2, 2), 16) / 255;
};

spine.Atlas = function (atlasText, textureLoader) {
	this.textureLoader = textureLoader;
	this.pages = [];
	this.regions = [];

	var reader = new spine.AtlasReader(atlasText);
	var tuple = [];
	tuple.length = 4;
	var page = null;
	while (true) {
		var line = reader.readLine();
		if (line == null) break;
		line = reader.trim(line);
		if (line.length == 0)
			page = null;
		else if (!page) {
			page = new spine.AtlasPage();
			page.name = line;

			page.format = spine.Atlas.Format[reader.readValue()];

			reader.readTuple(tuple);
			page.minFilter = spine.Atlas.TextureFilter[tuple[0]];
			page.magFilter = spine.Atlas.TextureFilter[tuple[1]];

			var direction = reader.readValue();
			page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
			page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
			if (direction == "x")
				page.uWrap = spine.Atlas.TextureWrap.repeat;
			else if (direction == "y")
				page.vWrap = spine.Atlas.TextureWrap.repeat;
			else if (direction == "xy")
				page.uWrap = page.vWrap = spine.Atlas.TextureWrap.repeat;

			textureLoader.load(page, line);

			this.pages.push(page);

		} else {
			var region = new spine.AtlasRegion();
			region.name = line;
			region.page = page;

			region.rotate = reader.readValue() == "true";

			reader.readTuple(tuple);
			var x = parseInt(tuple[0]);
			var y = parseInt(tuple[1]);

			reader.readTuple(tuple);
			var width = parseInt(tuple[0]);
			var height = parseInt(tuple[1]);

			region.u = x / page.width;
			region.v = y / page.height;
			if (region.rotate) {
				region.u2 = (x + height) / page.width;
				region.v2 = (y + width) / page.height;
			} else {
				region.u2 = (x + width) / page.width;
				region.v2 = (y + height) / page.height;
			}
			region.x = x;
			region.y = y;
			region.width = Math.abs(width);
			region.height = Math.abs(height);

			if (reader.readTuple(tuple) == 4) { // split is optional
				region.splits = [parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3])];

				if (reader.readTuple(tuple) == 4) { // pad is optional, but only present with splits
					region.pads = [parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3])];

					reader.readTuple(tuple);
				}
			}

			region.originalWidth = parseInt(tuple[0]);
			region.originalHeight = parseInt(tuple[1]);

			reader.readTuple(tuple);
			region.offsetX = parseInt(tuple[0]);
			region.offsetY = parseInt(tuple[1]);

			region.index = parseInt(reader.readValue());

			this.regions.push(region);
		}
	}
};
spine.Atlas.prototype = {
	findRegion: function (name) {
		var regions = this.regions;
		for (var i = 0, n = regions.length; i < n; i++)
			if (regions[i].name == name) return regions[i];
		return null;
	},
	dispose: function () {
		var pages = this.pages;
		for (var i = 0, n = pages.length; i < n; i++)
			this.textureLoader.unload(pages[i].rendererObject);
	},
	updateUVs: function (page) {
		var regions = this.regions;
		for (var i = 0, n = regions.length; i < n; i++) {
			var region = regions[i];
			if (region.page != page) continue;
			region.u = region.x / page.width;
			region.v = region.y / page.height;
			if (region.rotate) {
				region.u2 = (region.x + region.height) / page.width;
				region.v2 = (region.y + region.width) / page.height;
			} else {
				region.u2 = (region.x + region.width) / page.width;
				region.v2 = (region.y + region.height) / page.height;
			}
		}
	}
};

spine.Atlas.Format = {
	alpha: 0,
	intensity: 1,
	luminanceAlpha: 2,
	rgb565: 3,
	rgba4444: 4,
	rgb888: 5,
	rgba8888: 6
};

spine.Atlas.TextureFilter = {
	nearest: 0,
	linear: 1,
	mipMap: 2,
	mipMapNearestNearest: 3,
	mipMapLinearNearest: 4,
	mipMapNearestLinear: 5,
	mipMapLinearLinear: 6
};

spine.Atlas.TextureWrap = {
	mirroredRepeat: 0,
	clampToEdge: 1,
	repeat: 2
};

spine.AtlasPage = function () {};
spine.AtlasPage.prototype = {
	name: null,
	format: null,
	minFilter: null,
	magFilter: null,
	uWrap: null,
	vWrap: null,
	rendererObject: null,
	width: 0,
	height: 0
};

spine.AtlasRegion = function () {};
spine.AtlasRegion.prototype = {
	page: null,
	name: null,
	x: 0, y: 0,
	width: 0, height: 0,
	u: 0, v: 0, u2: 0, v2: 0,
	offsetX: 0, offsetY: 0,
	originalWidth: 0, originalHeight: 0,
	index: 0,
	rotate: false,
	splits: null,
	pads: null,
};

spine.AtlasReader = function (text) {
	this.lines = text.split(/\r\n|\r|\n/);
};
spine.AtlasReader.prototype = {
	index: 0,
	trim: function (value) {
		return value.replace(/^\s+|\s+$/g, "");
	},
	readLine: function () {
		if (this.index >= this.lines.length) return null;
		return this.lines[this.index++];
	},
	readValue: function () {
		var line = this.readLine();
		var colon = line.indexOf(":");
		if (colon == -1) throw "Invalid line: " + line;
		return this.trim(line.substring(colon + 1));
	},
	/** Returns the number of tuple values read (2 or 4). */
	readTuple: function (tuple) {
		var line = this.readLine();
		var colon = line.indexOf(":");
		if (colon == -1) throw "Invalid line: " + line;
		var i = 0, lastMatch= colon + 1;
		for (; i < 3; i++) {
			var comma = line.indexOf(",", lastMatch);
			if (comma == -1) {
				if (i == 0) throw "Invalid line: " + line;
				break;
			}
			tuple[i] = this.trim(line.substr(lastMatch, comma - lastMatch));
			lastMatch = comma + 1;
		}
		tuple[i] = this.trim(line.substring(lastMatch));
		return i + 1;
	}
}

spine.AtlasAttachmentLoader = function (atlas) {
	this.atlas = atlas;
}
spine.AtlasAttachmentLoader.prototype = {
	newAttachment: function (skin, type, name) {
		switch (type) {
		case spine.AttachmentType.region:
			var region = this.atlas.findRegion(name);
			if (!region) throw "Region not found in atlas: " + name + " (" + type + ")";
			var attachment = new spine.RegionAttachment(name);
			attachment.rendererObject = region;
			attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
			attachment.regionOffsetX = region.offsetX;
			attachment.regionOffsetY = region.offsetY;
			attachment.regionWidth = region.width;
			attachment.regionHeight = region.height;
			attachment.regionOriginalWidth = region.originalWidth;
			attachment.regionOriginalHeight = region.originalHeight;
			return attachment;
		}
		throw "Unknown attachment type: " + type;
	}
}

PIXI.AnimCache = {};
spine.Bone.yDown = true;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * This object is one that will allow you to specify custom rendering functions based on render type
 *
 * @class CustomRenderable
 * @extends DisplayObject
 * @constructor
 */
PIXI.CustomRenderable = function()
{
	PIXI.DisplayObject.call( this );
	
	this.renderable = true;
}

// constructor
PIXI.CustomRenderable.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.CustomRenderable.prototype.constructor = PIXI.CustomRenderable;

/**
 * If this object is being rendered by a CanvasRenderer it will call this callback
 *
 * @method renderCanvas
 * @param renderer {CanvasRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.renderCanvas = function(renderer)
{
	// override!
}

/**
 * If this object is being rendered by a WebGLRenderer it will call this callback to initialize
 *
 * @method initWebGL
 * @param renderer {WebGLRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.initWebGL = function(renderer)
{
	// override!
}

/**
 * If this object is being rendered by a WebGLRenderer it will call this callback
 *
 * @method renderWebGL
 * @param renderer {WebGLRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.renderWebGL = function(renderGroup, projectionMatrix)
{
	// not sure if both needed? but ya have for now!
	// override!
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];
PIXI.texturesToDestroy = [];

/**
 * A texture stores the information that represents an image. All textures have a base texture
 *
 * @class BaseTexture
 * @uses EventTarget
 * @constructor
 * @param source {String} the source object (image or canvas)
 */
PIXI.BaseTexture = function(source, generateCanvas)
{
	PIXI.EventTarget.call( this );

	/**
	 * [read-only] The width of the base texture set when the image has loaded
	 *
	 * @property width
	 * @type Number
	 * @readOnly
	 */
	this.width = 100;

	/**
	 * [read-only] The height of the base texture set when the image has loaded
	 *
	 * @property height
	 * @type Number
	 * @readOnly
	 */
	this.height = 100;

	/**
	 * [read-only] Describes if the base texture has loaded or not
	 *
	 * @property hasLoaded
	 * @type Boolean
	 * @readOnly
	 */
	this.hasLoaded = false;

	/**
	 * The source that is loaded to create the texture
	 *
	 * @property source
	 * @type Image
	 */
	this.source = source;

	if(!source)return;

	if(this.source instanceof Image || this.source instanceof HTMLImageElement)
	{
		if(this.source.complete)
		{
			this.hasLoaded = true;
			this.width = this.source.width;
			this.height = this.source.height;
			
			if(generateCanvas)
			{
				var canvas = document.createElement("canvas");
				canvas.width = this.width;
				canvas.height = this.height;
			    var context = canvas.getContext("2d");
				context.webkitImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.oImageSmoothingEnabled = false;
				context.drawImage(this.source, 0, 0);
				this.source.src = null;
				this.source = canvas;
			}
			
			PIXI.texturesToUpdate.push(this);
		}
		else
		{

			var scope = this;
			this.source.onload = function(){

				scope.hasLoaded = true;
				scope.source.onload = null;
				scope.width = scope.source.width;
				scope.height = scope.source.height;
				
				if(generateCanvas)
				{
					var canvas = document.createElement("canvas");
					canvas.width = scope.width;
					canvas.height = scope.height;
				    var context = canvas.getContext("2d");
					context.webkitImageSmoothingEnabled = false;
					context.imageSmoothingEnabled = false;
					context.mozImageSmoothingEnabled = false;
					context.oImageSmoothingEnabled = false;
					context.drawImage(scope.source, 0, 0);
					scope.source.src = null;
					scope.source = canvas;
				}
			
				// add it to somewhere...
				PIXI.texturesToUpdate.push(scope);
				if(scope.hasEventListener("loaded"))
					scope.dispatchEvent( { type: 'loaded', content: scope } );
			}
			/*this.source.onerror = function()
			{
			}*/
			//	this.image.src = imageUrl;
		}
	}
	else
	{
		this.hasLoaded = true;
		this.width = this.source.width;
		this.height = this.source.height;

		PIXI.texturesToUpdate.push(this);
	}

	this._powerOf2 = false;
	
	this.destroyed = false;
}

PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;

/**
 * Destroys this base texture
 *
 * @method destroy
 */
PIXI.BaseTexture.prototype.destroy = function()
{
	if(this.destroyed) return;
	
	if(this.source instanceof Image)
	{
		this.source.src = null;
	}
	this.source = null;
	PIXI.texturesToDestroy.push(this);
	this.destroyed = true;
	this.removeAllListeners(true);
	delete PIXI.BaseTextureCache[this._id];
}

/**
 * Helper function that returns a base texture based on an image url
 * If the image is not in the base texture cache it will be  created and loaded
 *
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @return BaseTexture
 */
PIXI.BaseTexture.fromImage = function(imageUrl, crossorigin, generateCanvas)
{
	var id = filenameFromUrl(imageUrl);
	var baseTexture = PIXI.BaseTextureCache[id];
	if(!baseTexture)
	{
		// new Image() breaks tex loading in some versions of Chrome.
		// See https://code.google.com/p/chromium/issues/detail?id=238071
		var image = new Image();//document.createElement('img');
		if (crossorigin)
		{
			image.crossOrigin = '';
		}
		image.src = imageUrl;
		baseTexture = new PIXI.BaseTexture(image, generateCanvas);
		//PIXI.BaseTextureCache[imageUrl] = baseTexture;
		PIXI.BaseTextureCache[id] = baseTexture;
		baseTexture._id = id;
	}

	return baseTexture;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.TextureCache = {};
PIXI.FrameCache = {};

/**
 * A texture stores the information that represents an image or part of an image. It cannot be added
 * to the display list directly. To do this use PIXI.Sprite. If no frame is provided then the whole image is used
 *
 * @class Texture
 * @uses EventTarget
 * @constructor
 * @param baseTexture {BaseTexture} The base texture source to create the texture from
 * @param frame {Rectangle} The rectangle frame of the texture to show
 */
PIXI.Texture = function(baseTexture, frame)
{
	PIXI.EventTarget.call( this );

	if(!frame)
	{
		this.noFrame = true;
		frame = new PIXI.Rectangle(0,0,1,1);
	}
	
	this.height = 1;
	this.width = 1;
	if(baseTexture instanceof PIXI.Texture)
	{
		frame.x += baseTexture.frame.x;
		frame.y += baseTexture.frame.y;
		baseTexture = baseTexture.baseTexture;
	}
	
	/**
	 * The base texture of this texture
	 *
	 * @property baseTexture
	 * @type BaseTexture
	 */
	this.baseTexture = baseTexture;
	
	/**
	 * The frame specifies the region of the base texture that this texture uses
	 * @property frame
	 * @type Rectangle
	 */
	this.frame = frame;

	if(baseTexture.hasLoaded)
	{
		if(this.noFrame)frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
		//console.log(frame)

		this.setFrame(frame);
	}
	else
	{
		var scope = this;
		baseTexture.addEventListener( 'loaded', function(){ scope.onBaseTextureLoaded()} );
	}
}

PIXI.Texture.prototype.constructor = PIXI.Texture;

/**
 * Called when the base texture is loaded
 *
 * @method onBaseTextureLoaded
 * @param event
 * @private
 */
PIXI.Texture.prototype.onBaseTextureLoaded = function(event)
{
	var baseTexture = this.baseTexture;
	baseTexture.removeEventListener( 'loaded', this.onLoaded );

	if(this.noFrame)this.frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
	this.noFrame = false;
	if(this.realSize)
	{
		this.width = this.realSize.width;
		this.height = this.realSize.height;
	}
	else
	{
		this.width = this.frame.width;
		this.height = this.frame.height;
	}
	
	if(this.hasEventListener("update"))
		this.dispatchEvent( { type: 'update', content: this } );
}

/**
 * Destroys this texture
 *
 * @method destroy
 * @param destroyBase {Boolean} Whether to destroy the base texture as well
 */
PIXI.Texture.prototype.destroy = function(destroyBase)
{
	if(destroyBase)this.baseTexture.destroy();
	this.baseTexture = null;
	this.frame = null;
	this.realSize = null;
	this.removeAllListeners(true);
}

/**
 * Specifies the rectangle region of the baseTexture
 *
 * @method setFrame
 * @param frame {Rectangle} The frame of the texture to set it to
 */
PIXI.Texture.prototype.setFrame = function(frame)
{
	this.frame = frame;
	if(this.realSize)
	{
		this.width = this.realSize.width;
		this.height = this.realSize.height;
	}
	else
	{
		this.width = frame.width;
		this.height = frame.height;
	}
	
	if(frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height)
	{
		throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
	}

	this.updateFrame = true;

	PIXI.Texture.frameUpdates.push(this);
	//this.dispatchEvent( { type: 'update', content: this } );
}

/**
 * Helper function that returns a texture based on an image url
 * If the image is not in the texture cache it will be  created and loaded
 *
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 * @return Texture
 */
PIXI.Texture.fromImage = function(imageUrl, crossorigin, generateCanvas)
{
	var id = filenameFromUrl(imageUrl);
	var texture = PIXI.TextureCache[id];
	
	if(!texture)
	{
		texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl, crossorigin, generateCanvas));
		PIXI.TextureCache[id] = texture;
	}

	return texture;
}

/**
 * Helper function that returns a texture based on a frame id
 * If the frame id is not in the texture cache an error will be thrown
 *
 * @static
 * @method fromFrame
 * @param frameId {String} The frame id of the texture
 * @return Texture
 */
PIXI.Texture.fromFrame = function(frameId)
{
	var id = filenameFromUrl(frameId);
	var texture = PIXI.TextureCache[id];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache - id was converted to " + id);
	return texture;
}

/**
 * Helper function that returns a texture based on a canvas element
 * If the canvas is not in the texture cache it will be  created and loaded
 *
 * @static
 * @method fromCanvas
 * @param canvas {Canvas} The canvas element source of the texture
 * @return Texture
 */
PIXI.Texture.fromCanvas = function(canvas)
{
	var	baseTexture = new PIXI.BaseTexture(canvas);
	return new PIXI.Texture(baseTexture);
}


/**
 * Adds a texture to the textureCache.
 *
 * @static
 * @method addTextureToCache
 * @param texture {Texture}
 * @param id {String} the id that the texture will be stored against.
 */
PIXI.Texture.addTextureToCache = function(texture, id)
{
	PIXI.TextureCache[id] = texture;
}

/**
 * Remove a texture from the textureCache.
 *
 * @static
 * @method removeTextureFromCache
 * @param id {String} the id of the texture to be removed
 * @return {Texture} the texture that was removed
 */
PIXI.Texture.removeTextureFromCache = function(id)
{
	var texture = PIXI.TextureCache[id];
	PIXI.TextureCache[id] = null;
	return texture;
}

PIXI.Texture.destroyTexture = function(id)
{
	id = filenameFromUrl(id);
	var tc = PIXI.TextureCache;
	var texture = tc[id];
	if(!texture) return;
	var base = texture.baseTexture;
	delete tc[id];
	if(texture)
		texture.destroy(true);
	for(id in tc)
	{
		texture = tc[id];
		if(texture.baseTexture == base)
		{
			delete tc[id];
			texture.destroy();
		}
	}
}

PIXI.Texture.destroyAllTextures = function()
{
	var tc = PIXI.TextureCache;
	for(var id in tc)
	{
		var texture = tc[id];
		if(!texture) return;
		delete tc[id];
		if(texture)
			texture.destroy(true);
	}
}

// this is more for webGL.. it contains updated frames..
PIXI.Texture.frameUpdates = [];


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 A RenderTexture is a special texture that allows any pixi displayObject to be rendered to it.

 __Hint__: All DisplayObjects (exmpl. Sprites) that renders on RenderTexture should be preloaded. 
 Otherwise black rectangles will be drawn instead.  
 
 RenderTexture takes snapshot of DisplayObject passed to render method. If DisplayObject is passed to render method, position and rotation of it will be ignored. For example:
 
	var renderTexture = new PIXI.RenderTexture(800, 600);
	var sprite = PIXI.Sprite.fromImage("spinObj_01.png");
	sprite.position.x = 800/2;
	sprite.position.y = 600/2;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	renderTexture.render(sprite);

 Sprite in this case will be rendered to 0,0 position. To render this sprite at center DisplayObjectContainer should be used:

	var doc = new PIXI.DisplayObjectContainer();
	doc.addChild(sprite);
	renderTexture.render(doc);  // Renders to center of renderTexture

 @class RenderTexture
 @extends Texture
 @constructor
 @param width {Number} The width of the render texture
 @param height {Number} The height of the render texture
 */
PIXI.RenderTexture = function(width, height)
{
	PIXI.EventTarget.call( this );

	this.width = width || 100;
	this.height = height || 100;

	this.indetityMatrix = PIXI.mat3.create();

	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);	

	if(PIXI.gl)
	{
		this.initWebGL();
	}
	else
	{
		this.initCanvas();
	}
}

PIXI.RenderTexture.prototype = Object.create( PIXI.Texture.prototype );
PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;

/**
 * Initializes the webgl data for this texture
 *
 * @method initWebGL
 * @private
 */
PIXI.RenderTexture.prototype.initWebGL = function()
{
	var gl = PIXI.gl;
	this.glFramebuffer = gl.createFramebuffer();

   	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );

    this.glFramebuffer.width = this.width;
    this.glFramebuffer.height = this.height;	

	this.baseTexture = new PIXI.BaseTexture();

	this.baseTexture.width = this.width;
	this.baseTexture.height = this.height;

    this.baseTexture._glTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width,  this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.baseTexture.isRender = true;

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.baseTexture._glTexture, 0);

	// create a projection matrix..
	this.projection = new PIXI.Point(this.width/2 , -this.height/2);

	// set the correct render function..
	this.render = this.renderWebGL;
}


PIXI.RenderTexture.prototype.resize = function(width, height)
{

	this.width = width;
	this.height = height;
	
	if(PIXI.gl)
	{
		this.projection.x = this.width/2
		this.projection.y = -this.height/2;
	
		var gl = PIXI.gl;
		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width,  this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	}
	else
	{
		
		this.frame.width = this.width
		this.frame.height = this.height;
		this.renderer.resize(this.width, this.height);
	}
}

/**
 * Initializes the canvas data for this texture
 *
 * @method initCanvas
 * @private
 */
PIXI.RenderTexture.prototype.initCanvas = function()
{
	this.renderer = new PIXI.CanvasRenderer(this.width, this.height, null, 0);

	this.baseTexture = new PIXI.BaseTexture(this.renderer.view);
	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);

	this.render = this.renderCanvas;
}

/**
 * This function will draw the display object to the texture.
 *
 * @method renderWebGL
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
PIXI.RenderTexture.prototype.renderWebGL = function(displayObject, position, clear)
{
	var gl = PIXI.gl;

	// enable the alpha color mask..
	gl.colorMask(true, true, true, true); 

	gl.viewport(0, 0, this.width, this.height);	

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );

	if(clear)
	{
		gl.clearColor(0,0,0, 0);     
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	// THIS WILL MESS WITH HIT TESTING!
	var children = displayObject.children;

	//TODO -? create a new one??? dont think so!
	var originalWorldTransform = displayObject.worldTransform;
	displayObject.worldTransform = PIXI.mat3.create();//sthis.indetityMatrix;
	// modify to flip...
	displayObject.worldTransform[4] = -1;
	displayObject.worldTransform[5] = this.projection.y * -2;

	if(position)
	{
		displayObject.worldTransform[2] = position.x;
		displayObject.worldTransform[5] -= position.y;
	}
	
	PIXI.visibleCount++;
	displayObject.vcount = PIXI.visibleCount;
	
	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	var renderGroup = displayObject.__renderGroup;

	if(renderGroup)
	{
		if(displayObject == renderGroup.root)
		{
			renderGroup.render(this.projection, this.glFramebuffer);
		}
		else
		{
			renderGroup.renderSpecific(displayObject, this.projection, this.glFramebuffer);
		}
	}
	else
	{
		if(!this.renderGroup)this.renderGroup = new PIXI.WebGLRenderGroup(gl);
		this.renderGroup.setRenderable(displayObject);
		this.renderGroup.render(this.projection, this.glFramebuffer);
	}
	
	displayObject.worldTransform = originalWorldTransform;
}


/**
 * This function will draw the display object to the texture.
 *
 * @method renderCanvas
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
PIXI.RenderTexture.prototype.renderCanvas = function(displayObject, position, clear)
{
	var children = displayObject.children;

	displayObject.worldTransform = PIXI.mat3.create();
	
	if(position)
	{
		displayObject.worldTransform[2] = position.x;
		displayObject.worldTransform[5] = position.y;
	}
	

	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	if(clear)this.renderer.context.clearRect(0,0, this.width, this.height);
	
    this.renderer.renderDisplayObject(displayObject);
    
    this.renderer.context.setTransform(1,0,0,1,0,0); 
    

  //  PIXI.texturesToUpdate.push(this.baseTexture);
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Class that loads a bunch of images / sprite sheet / bitmap font files. Once the
 * assets have been loaded they are added to the PIXI Texture cache and can be accessed
 * easily through PIXI.Texture.fromImage() and PIXI.Sprite.fromImage()
 * When all items have been loaded this class will dispatch a "onLoaded" event
 * As each individual item is loaded this class will dispatch a "onProgress" event
 *
 * @class AssetLoader
 * @constructor
 * @uses EventTarget
 * @param {Array<String>} assetURLs an array of image/sprite sheet urls that you would like loaded
 *      supported. Supported image formats include "jpeg", "jpg", "png", "gif". Supported
 *      sprite sheet data formats only include "JSON" at this time. Supported bitmap font
 *      data formats include "xml" and "fnt".
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.AssetLoader = function(assetURLs, crossorigin, generateCanvasFromTexture)
{
	PIXI.EventTarget.call(this);

	/**
	 * The array of asset URLs that are going to be loaded
     *
	 * @property assetURLs
	 * @type Array<String>
	 */
	this.assetURLs = assetURLs;

    /**
     * Whether the requests should be treated as cross origin
     *
     * @property crossorigin
     * @type Boolean
     */
	this.crossorigin = crossorigin;
	
	this.generateCanvas = generateCanvasFromTexture || false;
	
	/**
	 * Maps file extension to loader types
	 *
	 * @property loadersByType
	 * @type Object
	 */
	if(!PIXI.AssetLoader.loadersByType)
	{
		PIXI.AssetLoader.loadersByType = {
		    "jpg":  PIXI.ImageLoader,
		    "jpeg": PIXI.ImageLoader,
		    "png":  PIXI.ImageLoader,
		    "gif":  PIXI.ImageLoader,
		    "json": PIXI.JsonLoader,
		    "anim": PIXI.SpineLoader,
		    "xml":  PIXI.BitmapFontLoader,
		    "fnt":  PIXI.BitmapFontLoader
		};
	}
};

/**
 * Fired when an item has loaded
 * @event onProgress
 */

/**
 * Fired when all the assets have loaded
 * @event onComplete
 */

// constructor
PIXI.AssetLoader.prototype.constructor = PIXI.AssetLoader;

/**
 * Starts loading the assets sequentially
 *
 * @method load
 */
PIXI.AssetLoader.prototype.load = function()
{
	this.loadCount = this.assetURLs.length;
	
	var loadCallback = function(load)
    {
        this.onAssetLoaded();
		load.removeAllListeners();
    };
    for (var i=0; i < this.assetURLs.length; i++)
	{
		var fileName = this.assetURLs[i];
		var fileType = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		if(fileType.indexOf("?") != -1)
			fileType = fileType.substring(0, fileType.indexOf("?"));

        var loaderClass = PIXI.AssetLoader.loadersByType[fileType];
        if(!loaderClass)
            throw new Error(fileType + " is an unsupported file type");

        var loader = new loaderClass(fileName, this.crossorigin, this.generateCanvas);

        loader.addEventListener("loaded", loadCallback.bind(this, loader));
        loader.load();
	}
};

/**
 * Invoked after each file is loaded
 *
 * @method onAssetLoaded
 * @private
 */
PIXI.AssetLoader.prototype.onAssetLoaded = function()
{
    this.loadCount--;
	if(this.hasEventListener("onProgress"))
		this.dispatchEvent({type: "onProgress", content: this});
	if(this.onProgress) this.onProgress();

	if(this.loadCount == 0)
	{
		if(this.hasEventListener("onComplete"))
			this.dispatchEvent({type: "onComplete", content: this});
		if(this.onComplete) this.onComplete();
	}
};


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The json file loader is used to load in JSON data and parsing it
 * When loaded this class will dispatch a "loaded" event
 * If load failed this class will dispatch a "error" event
 *
 * @class JsonLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.JsonLoader = function (url, crossorigin, generateCanvasFromTexture) {
	PIXI.EventTarget.call(this);

	/**
	 * The url of the bitmap font data
	 *
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Whether the requests should be treated as cross origin
	 *
	 * @property crossorigin
	 * @type Boolean
	 */
	this.crossorigin = crossorigin;

	/**
	 * [read-only] The base url of the bitmap font data
	 *
	 * @property baseUrl
	 * @type String
	 * @readOnly
	 */
	this.baseUrl = url.replace(/[^\/]*$/, "");

	/**
	 * [read-only] Whether the data has loaded yet
	 *
	 * @property loaded
	 * @type Boolean
	 * @readOnly
	 */
	this.loaded = false;
	this.versioning = null;
	if(url.indexOf("?") != -1)
		this.versioning = url.substring(url.indexOf("?"));
	
	this.generateCanvas = generateCanvasFromTexture || false;
};

// constructor
PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;

//Utility functions borrowed from PreloadJS
var _parseURI = function(path) {
	if (!path) { return null; }
	return path.match(/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/);//a pattern for parsing file URIs
};
var _formatQueryString = function(data, query) {
	if (data == null) {
		throw new Error('You must specify data.');
	}
	var params = [];
	for (var n in data) {
		params.push(n+'='+escape(data[n]));
	}
	if (query) {
		params = params.concat(query);
	}
	return params.join('&');
};
var buildPath = function(src, _basePath, data) {
	if (_basePath != null) {
		var match = _parseURI(src);
		// IE 7,8 Return empty string here.
		if (match[1] == null || match[1] == '') {
			src = _basePath + src;
		}
	}
	if (data == null) {
		return src;
	}

	var query = [];
	var idx = src.indexOf('?');

	if (idx != -1) {
		var q = src.slice(idx+1);
		query = query.concat(q.split('&'));
	}

	if (idx != -1) {
		return src.slice(0, idx) + '?' + _formatQueryString(data, query);
	} else {
		return src + '?' + _formatQueryString(data, query);
	}
};

/**
 * Loads the JSON data
 *
 * @method load
 */
PIXI.JsonLoader.prototype.load = function()
{
	/*this.ajaxRequest = new AjaxRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange = function() {
		scope.onJSONLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
	this.ajaxRequest.send(null);*/
	
	// Create the request. Fall back to whatever support we have.
	var req = null;
	//attempt to only use cross domain requests if needed, because IE9 - code borrowed from PreloadJS
	if(this.crossorigin)
	{
		var target = document.createElement("a");
		target.href = buildPath(this.url, this.baseUrl);
		var host = document.createElement("a");
		host.href = location.href;
		var crossDomain = (target.hostname != "") &&
						 	(target.port != host.port ||
							 target.protocol != host.protocol ||
							 target.hostname != host.hostname);
	}
	else
		var crossDomain = false;
	if (crossDomain && window.XDomainRequest) {
		req = new XDomainRequest(); // Note: IE9 will fail if this is not actually cross-domain.
	} else if (window.XMLHttpRequest) { // Old IE versions use a different approach
		req = new XMLHttpRequest();
	} else {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (e) {
				try {
					req = new ActiveXObject("Msxml2.XMLHTTP");
					console.log("Created ActiveXObject - Msxml2.XMLHTTP");
				} catch (e) {
					return;
				}
			}
		}
	}
	if(req.overrideMimeType)
		req.overrideMimeType("application/json");
	// Determine the XHR level
	var xhrLevel = (typeof req.responseType === "string") ? 2 : 1;

	var src = this.url;

	// Open the request.  Set cross-domain flags if it is supported (XHR level 1 only)
	req.open("GET", src, true);

	if (crossDomain && req instanceof XMLHttpRequest && xhrLevel == 1) {
		req.setRequestHeader("Origin", location.origin);
	}

	this._request = req;
	
	if(this._loadTimeout)
	{
		clearTimeout(this._loadTimeout);
		this._loadTimeout = 0;
	}
	var scope = this;
	req.onloadstart = function(){};
	req.onprogress = function(){};
	var timeoutFunc = function(){
		if(window.console)console.error("load of json " + src + " timeout");
		if(++scope._loadFails <= 3)
			scope.load();//try loading again
	};
	req.ontimeout = timeoutFunc;
	// Set up a timeout if we don't have XHR2
	if (xhrLevel == 1) {
		this._loadTimeout = setTimeout(timeoutFunc, 8000);
	}
	req.onabort = function(){
		if(window.console)console.log("load of json " + src + " aborted");
		if(++scope._loadFails <= 3)
			scope.load();
	};
	req.onerror = function(){
		if(window.console)console.log("load of json " + src + " had an error!");
		if(++scope._loadFails <= 3)
			scope.load();
	};
	req.onload = req.onreadystatechange = this.onJSONLoaded.bind(this);
	
	try
	{
		setTimeout(function(){req.send();}, 0);
	}
	catch(e)
	{
		if(window.console)
			console.error("Error in trying to send load request of " + src + ": " + e);
		setTimeout(function(){
			if(++scope._loadFails <= 3)
				scope.load();
			},
			10);
	}
};

/**
 * Invoke when JSON file is loaded
 *
 * @method onJSONLoaded
 * @private
 */
PIXI.JsonLoader.prototype.onJSONLoaded = function()
{
	var isLoaded = this._request.readyState == undefined;//newer versions of IE don't do the readyState thing, apparently
	if (isLoaded || this._request.readyState == 4) {
		if (isLoaded || this._request.status == 200 || this._request.status == 304 || window.location.href.indexOf("http") == -1)
		{
			if(this._loadTimeout)
				clearTimeout(this._loadTimeout);
			this._request.onabort = this._request.onerror = this._request.onload = this._request.onreadystatechange = null;
			if(this._request.response)
				this.json = JSON.parse(this._request.response);
			else
				this.json = JSON.parse(this._request.responseText);
			
			if(this.json.frames)
			{
				// sprite sheet
				var scope = this;
				var textureUrl = this.baseUrl + this.json.meta.image + (this.versioning ? this.versioning : "");
				var image = new PIXI.ImageLoader(textureUrl, this.crossorigin, this.generateCanvas);
				var frameData = this.json.frames;
			
				this.texture = image.texture;
				image.addEventListener("loaded", function (event) {
					image.removeAllListeners();
					scope.onLoaded();
				});
			
				for (var i in frameData)
				{
					if(PIXI.TextureCache[filenameFromUrl(i)])
						continue;
					var f = frameData[i];
					var rect = f.frame;
					if (rect)
					{
						var t = PIXI.TextureCache[filenameFromUrl(i)] = new PIXI.Texture(this.texture,
						new PIXI.Rectangle(
							rect.x,
							rect.y,
							rect.w,
							rect.h
						));
						if (f.trimmed)
						{
							t.realSize = new PIXI.Rectangle(-f.spriteSourceSize.x, -f.spriteSourceSize.y, f.sourceSize.w, f.sourceSize.h);
							//update these in case the base texture was already loaded for some reason
							t.width = t.realSize.width;
							t.height = t.realSize.height;
						}
					}
				}
				image.load();
			}
			else if(this.json.bones)
			{
				// spine animation
				var spineJsonParser = new spine.SkeletonJson();
				var skeletonData = spineJsonParser.readSkeletonData(this.json);
				PIXI.AnimCache[filenameFromUrl(this.url)] = skeletonData;
				this.onLoaded();
			}
			else
			{
				this.onLoaded();
			}
		}
		else
		{
			this.onError();
		}
	}
};

/**
 * Invoke when json file loaded
 *
 * @method onLoaded
 * @private
 */
PIXI.JsonLoader.prototype.onLoaded = function()
{
	this.loaded = true;
	if(this.hasEventListener("loaded"))
	{
		this.dispatchEvent({
			type: "loaded",
			content: this
		});
	}
};

/**
 * Invoke when error occured
 *
 * @method onError
 * @private
 */
PIXI.JsonLoader.prototype.onError = function()
{
	if(this.hasEventListener("error"))
	{
		this.dispatchEvent({
			type: "error",
			content: this
		});
	}
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The sprite sheet loader is used to load in JSON sprite sheet data
 * To generate the data you can use http://www.codeandweb.com/texturepacker and publish the "JSON" format
 * There is a free version so thats nice, although the paid version is great value for money.
 * It is highly recommended to use Sprite sheets (also know as texture atlas") as it means sprite"s can be batched and drawn together for highly increased rendering speed.
 * Once the data has been loaded the frames are stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFromeId()
 * This loader will also load the image file that the Spritesheet points to as well as the data.
 * When loaded this class will dispatch a "loaded" event
 *
 * @class SpriteSheetLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the sprite sheet JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */

PIXI.SpriteSheetLoader = function (url, crossorigin) {
	/*
	 * i use texture packer to load the assets..
	 * http://www.codeandweb.com/texturepacker
	 * make sure to set the format as "JSON" ("JSON-Map" in newer versions)
	 */
	PIXI.EventTarget.call(this);

	/**
	 * The url of the bitmap font data
	 *
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Whether the requests should be treated as cross origin
	 *
	 * @property crossorigin
	 * @type Boolean
	 */
	this.crossorigin = crossorigin;

	/**
	 * [read-only] The base url of the bitmap font data
	 *
	 * @property baseUrl
	 * @type String
	 * @readOnly
	 */
	this.baseUrl = url.replace(/[^\/]*$/, "");
	this.versioning = null;
	if(url.indexOf("?") != -1)
		this.versioning = url.substring(url.indexOf("?"));
	/**
	* The texture being loaded
	*
	* @property texture
	* @type Texture
	*/
	this.texture = null;
	
	/**
	* The frames of the sprite sheet
	*
	* @property frames
	* @type Object
	*/
	this.frames = {};
};

// constructor
PIXI.SpriteSheetLoader.prototype.constructor = PIXI.SpriteSheetLoader;

/**
 * This will begin loading the JSON file
 *
 * @method load
 */
PIXI.SpriteSheetLoader.prototype.load = function () {
	var scope = this;
	var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
	jsonLoader.addEventListener("loaded", function (event) {
		scope.json = event.content.json;
		scope.onJSONLoaded();
		jsonLoader.removeAllListeners();
	});
	jsonLoader.load();
};

/**
 * Invoke when JSON file is loaded
 *
 * @method onJSONLoaded
 * @private
 */
PIXI.SpriteSheetLoader.prototype.onJSONLoaded = function () {
	var scope = this;
	var textureUrl = this.baseUrl + this.json.meta.image + (this.versioning ? this.versioning : "");
	var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
	var frameData = this.json.frames;

	this.texture = image.texture;
	image.addEventListener("loaded", function (event) {
		image.removeAllListeners();
		scope.onLoaded();
	});

	for (var i in frameData) {
		if(PIXI.TextureCache[filenameFromUrl(i)])
			continue;
		var f = frameData[i];
		var rect = f.frame;
		if (rect) {
			var t = PIXI.TextureCache[filenameFromUrl(i)] = new PIXI.Texture(this.texture, {
				x: rect.x,
				y: rect.y,
				width: rect.w,
				height: rect.h
			});
			if (f.trimmed) {
				t.realSize = new PIXI.Rectangle(-f.spriteSourceSize.x, -f.spriteSourceSize.y, f.sourceSize.w, f.sourceSize.h);
				//update these in case the base texture was already loaded for some reason
				t.width = t.realSize.width;
				t.height = t.realSize.height;
			}
		}
	}

	image.load();
};
/**
 * Invoke when all files are loaded (json and texture)
 *
 * @method onLoaded
 * @private
 */
PIXI.SpriteSheetLoader.prototype.onLoaded = function () {
	if(this.hasEventListener("loaded"))
	{
		this.dispatchEvent({
			type: "loaded",
			content: this
		});
	}
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The image loader class is responsible for loading images file formats ("jpeg", "jpg", "png" and "gif")
 * Once the image has been loaded it is stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFromeId()
 * When loaded this class will dispatch a 'loaded' event
 *
 * @class ImageLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the image
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.ImageLoader = function(url, crossorigin, generateCanvas)
{
    PIXI.EventTarget.call(this);

    /**
     * The texture being loaded
     *
     * @property texture
     * @type Texture
     */
    this.texture = PIXI.Texture.fromImage(url, crossorigin, generateCanvas);

    /**
     * if the image is loaded with loadFramedSpriteSheet
     * frames will contain the sprite sheet frames
     *
     */
    this.frames = [];
};

// constructor
PIXI.ImageLoader.prototype.constructor = PIXI.ImageLoader;

/**
 * Loads image or takes it from cache
 *
 * @method load
 */
PIXI.ImageLoader.prototype.load = function()
{
    if(!this.texture.baseTexture.hasLoaded)
    {
        var scope = this;
        this.texture.baseTexture.addEventListener("loaded", function()
        {
			scope.texture.baseTexture.removeAllListeners();
            scope.onLoaded();
        });
    }
    else
    {
        this.onLoaded();
    }
};

/**
 * Invoked when image file is loaded or it is already cached and ready to use
 *
 * @method onLoaded
 * @private
 */
PIXI.ImageLoader.prototype.onLoaded = function()
{
	if(this.hasEventListener("loaded"))
    	this.dispatchEvent({type: "loaded", content: this});
};

/**
 * Loads image and split it to uniform sized frames
 *
 *
 * @method loadFramedSpriteSheet
 * @param frameWidth {Number} with of each frame
 * @param frameHeight {Number} height of each frame
 * @param textureName {String} if given, the frames will be cached in <textureName>-<ord> format 
 */
PIXI.ImageLoader.prototype.loadFramedSpriteSheet = function(frameWidth, frameHeight, textureName)
{
    this.frames = [];
    var cols = Math.floor(this.texture.width / frameWidth);
    var rows = Math.floor(this.texture.height / frameHeight);

    var i=0;
    for (var y=0; y<rows; y++)
    {
        for (var x=0; x<cols; x++,i++)
        {
            var texture = new PIXI.Texture(this.texture, {
                x: x*frameWidth,
                y: y*frameHeight,
                width: frameWidth,
                height: frameHeight
            });

            this.frames.push(texture);
            if (textureName) PIXI.TextureCache[textureName+'-'+i] = texture;
        }
    }

    if(!this.texture.baseTexture.hasLoaded)
    {
        var scope = this;
        this.texture.baseTexture.addEventListener("loaded", function() {
            scope.onLoaded();
        });
    }
    else
    {
        this.onLoaded();
    }
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The xml loader is used to load in XML bitmap font data ("xml" or "fnt")
 * To generate the data you can use http://www.angelcode.com/products/bmfont/
 * This loader will also load the image file as the data.
 * When loaded this class will dispatch a "loaded" event
 *
 * @class BitmapFontLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the sprite sheet JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.BitmapFontLoader = function(url, crossorigin)
{
    /*
     * i use texture packer to load the assets..
     * http://www.codeandweb.com/texturepacker
     * make sure to set the format as "JSON"
     */
    PIXI.EventTarget.call(this);

    /**
     * The url of the bitmap font data
     *
     * @property url
     * @type String
     */
    this.url = url;

    /**
     * Whether the requests should be treated as cross origin
     *
     * @property crossorigin
     * @type Boolean
     */
    this.crossorigin = crossorigin;

    /**
     * [read-only] The base url of the bitmap font data
     *
     * @property baseUrl
     * @type String
     * @readOnly
     */
    this.baseUrl = url.replace(/[^\/]*$/, "");

    /**
     * [read-only] The texture of the bitmap font
     *
     * @property baseUrl
     * @type String
     */
    this.texture = null;

	
	this.versioning = null;
	if(url.indexOf("?") != -1)
		this.versioning = url.substring(url.indexOf("?"));
	
	this._loadFails = 0;
};

// constructor
PIXI.BitmapFontLoader.prototype.constructor = PIXI.BitmapFontLoader;

/**
 * Loads the XML font data
 *
 * @method load
 */
PIXI.BitmapFontLoader.prototype.load = function()
{
	/*this.ajaxRequest = new XMLHttpRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange = function()
	{
		scope.onXMLLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/xml");
	this.ajaxRequest.send(null)*/
	
	// Create the request. Fall back to whatever support we have.
	var req = null;
	if (this.crossorigin && window.XDomainRequest) {
		req = new XDomainRequest(); // Note: IE9 will fail if this is not actually cross-domain.
	} else if (window.XMLHttpRequest) { // Old IE versions use a different approach
		req = new XMLHttpRequest();
	} else {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (e) {
				try {
					req = new ActiveXObject("Msxml2.XMLHTTP");
					console.log("Created ActiveXObject - Msxml2.XMLHTTP");
				} catch (e) {
					return;
				}
			}
		}
	}
	if(req.overrideMimeType)
		req.overrideMimeType("application/xml");
	// Determine the XHR level
	var xhrLevel = (typeof req.responseType === "string") ? 2 : 1;

	var src = this.url;

	// Open the request.  Set cross-domain flags if it is supported (XHR level 1 only)
	req.open("GET", src, true);

	if (this.crossorigin && req instanceof XMLHttpRequest && xhrLevel == 1) {
		req.setRequestHeader("Origin", location.origin);
	}

	this._request = req;
	
	if(this._loadTimeout)
	{
		clearTimeout(this._loadTimeout);
		this._loadTimeout = 0;
	}
	var scope = this;
	this._request.onloadstart = function(){};
	this._request.onprogress = function(){};
	var timeoutFunc = function(){
		if(window.console)console.error("load of bitmap font " + src + " timeout");
		if(++scope._loadFails <= 3)
			scope.load();//try loading again
	};
	this._request.ontimeout = timeoutFunc
	// Set up a timeout if we don't have XHR2
	if (xhrLevel == 1) {
		this._loadTimeout = setTimeout(timeoutFunc, 8000);
	}
	this._request.onabort = function(){
		if(window.console)console.log("load of bitmap font " + src + " aborted");
		if(++scope._loadFails <= 3)
			scope.load();
	};
	this._request.onerror = function(){
		if(window.console)console.log("load of bitmap font " + src + " had an error!");
		if(++scope._loadFails <= 3)
			scope.load();
	};
	this._request.onload = this.onXMLLoaded.bind(this);
	this._request.onreadystatechange = this.onXMLLoaded.bind(this);
	
	try
	{
		setTimeout(function(){req.send();}, 0);
	}
	catch(e)
	{
		if(window.console)
			console.error("Error in trying to send load request of " + src + ": " + e);
		setTimeout(function(){
			if(++scope._loadFails <= 3)
				scope.load();
			},
			10);
	}
};

/**
 * Invoked when XML file is loaded, parses the data
 *
 * @method onXMLLoaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onXMLLoaded = function()
{
	var isLoaded = this._request.readyState == undefined;//newer versions of IE don't do the readyState thing, apparently
	if (isLoaded || this._request.readyState == 4)
	{
		if (isLoaded || this._request.status == 200 || this._request.status == 304 || window.location.href.indexOf("http") == -1)
		{
			if(this._loadTimeout)
				clearTimeout(this._loadTimeout);
			this._request.onabort = this._request.onerror = this._request.onload = this._request.onreadystatechange = null;
			var xml = this._request.responseXML || this._request.response || this._request.responseText;
			if(typeof xml == "string")
			{
				if(xml.xml)
					xml = xml.xml;
				else
				{
					var text = xml;
					if (window.DOMParser)
					{
						parser=new DOMParser();
						xml = parser.parseFromString(text,"text/xml");
					}
					else // Internet Explorer
					{
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async=false;
						xml.loadXML(text);
					}
				}
			}
			var textureUrl = this.baseUrl + xml.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue + (this.versioning ? this.versioning : "");
			var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
			this.texture = image.texture;

			var data = {};
			var info = xml.getElementsByTagName("info")[0];
			var common = xml.getElementsByTagName("common")[0];
			data.font = info.attributes.getNamedItem("face").nodeValue;
			data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
			data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
			data.chars = {};

			//parse letters
			var letters = xml.getElementsByTagName("char");

			var tempAttributes;
			for (var i = 0, len = letters.length; i < len; i++)
			{
				tempAttributes = letters[i].attributes;
				var charCode = parseInt(tempAttributes.getNamedItem("id").nodeValue, 10);

                var textureRect = new PIXI.Rectangle(
                    parseInt(tempAttributes.getNamedItem("x").nodeValue, 10),
                    parseInt(tempAttributes.getNamedItem("y").nodeValue, 10),
                    parseInt(tempAttributes.getNamedItem("width").nodeValue, 10),
                    parseInt(tempAttributes.getNamedItem("height").nodeValue, 10)
                );

                data.chars[charCode] = {
                    xOffset: parseInt(tempAttributes.getNamedItem("xoffset").nodeValue, 10),
                    yOffset: parseInt(tempAttributes.getNamedItem("yoffset").nodeValue, 10),
                    xAdvance: parseInt(tempAttributes.getNamedItem("xadvance").nodeValue, 10),
                    kerning: {},
                    texture: new PIXI.Texture(this.texture, textureRect)

                };
            }

			//parse kernings
			var kernings = xml.getElementsByTagName("kerning");
			for (i = 0, len = kernings.length; i < len; i++)
			{
				tempAttributes = kernings[i].attributes;
				var first = parseInt(tempAttributes.getNamedItem("first").nodeValue, 10);
				var second = parseInt(tempAttributes.getNamedItem("second").nodeValue, 10);
				var amount = parseInt(tempAttributes.getNamedItem("amount").nodeValue, 10);

				data.chars[second].kerning[first] = amount;
			}

			PIXI.BitmapText.fonts[data.font] = data;

			var scope = this;
			image.addEventListener("loaded", function() {
				image.removeAllListeners();
				scope.onLoaded();
			});
			image.load();
		}
	}
};

/**
 * Invoked when all files are loaded (xml/fnt and texture)
 *
 * @method onLoaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onLoaded = function()
{
	if(this.hasEventListener("loaded"))
		this.dispatchEvent({type: "loaded", content: this});
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * based on pixi impact spine implementation made by Eemeli Kelokorpi (@ekelokorpi) https://github.com/ekelokorpi
 *
 * Awesome JS run time provided by EsotericSoftware
 * https://github.com/EsotericSoftware/spine-runtimes
 *
 */

/**
 * The Spine loader is used to load in JSON spine data
 * To generate the data you need to use http://esotericsoftware.com/ and export the "JSON" format
 * Due to a clash of names  You will need to change the extension of the spine file from *.json to *.anim for it to load
 * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
 * You will need to generate a sprite sheet to accompany the spine data
 * When loaded this class will dispatch a "loaded" event
 *
 * @class Spine
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.SpineLoader = function(url, crossorigin)
{
	PIXI.EventTarget.call(this);

	/**
	 * The url of the bitmap font data
	 *
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Whether the requests should be treated as cross origin
	 *
	 * @property crossorigin
	 * @type Boolean
	 */
	this.crossorigin = crossorigin;

	/**
	 * [read-only] Whether the data has loaded yet
	 *
	 * @property loaded
	 * @type Boolean
	 * @readOnly
	 */
	this.loaded = false;
}

PIXI.SpineLoader.prototype.constructor = PIXI.SpineLoader;

/**
 * Loads the JSON data
 *
 * @method load
 */
PIXI.SpineLoader.prototype.load = function () {

	var scope = this;
	var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
	jsonLoader.addEventListener("loaded", function (event) {
		scope.json = event.content.json;
		scope.onJSONLoaded();
	});
	jsonLoader.load();
};

/**
 * Invoke when JSON file is loaded
 *
 * @method onJSONLoaded
 * @private
 */
PIXI.SpineLoader.prototype.onJSONLoaded = function (event) {
	var spineJsonParser = new spine.SkeletonJson();
	var skeletonData = spineJsonParser.readSkeletonData(this.json);
	
	PIXI.AnimCache[filenameFromUrl(this.url)] = skeletonData;

	this.onLoaded();
};

/**
 * Invoke when JSON file is loaded
 *
 * @method onLoaded
 * @private
 */
PIXI.SpineLoader.prototype.onLoaded = function () {
	this.loaded = true;
    this.dispatchEvent({type: "loaded", content: this});
};


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * This is the base class for  creating a pixi.js filter. Currently only webGL supports filters.
 * If you want to make a custom filter this should be your base class.
 * @class AbstractFilter
 * @constructor
 * @param fragmentSrc
 * @param unifroms  
 */
PIXI.AbstractFilter = function(fragmentSrc, unifroms)
{
	/**
	* An array of passes - some filters contain a few steps this array simply stores the steps in a liniear fashion.
	* For example the blur filter has two passes blurX and blurY.
	* @property passes
	* @type Array an array of filter objects
	* @private
	*/
	this.passes = [this];


	this.dirty = true;
	this.padding = 0;

	/**
	@property uniforms
	@private
	*/
	this.uniforms = unifroms || {};
	
	this.fragmentSrc = fragmentSrc || [];
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * 
 * The ColorMatrixFilter class lets you apply a 4x4 matrix transformation on the RGBA 
 * color and alpha values of every pixel on your displayObject to produce a result 
 * with a new set of RGBA color and alpha values. Its pretty powerful!
 * @class ColorMatrixFilter
 * @contructor
 */
PIXI.ColorMatrixFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		matrix: {type: 'mat4', value: [1,0,0,0,
									   0,1,0,0,
									   0,0,1,0,
									   0,0,0,1]},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform float invert;",
	  "uniform mat4 matrix;",
	  "uniform sampler2D uSampler;",
	  "void main(void) {",
	    "gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;",
	    "gl_FragColor = gl_FragColor * vColor;",
	  "}"
	];
	
}

PIXI.ColorMatrixFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.ColorMatrixFilter.prototype.constructor = PIXI.ColorMatrixFilter;

/**
 * Sets the matrix of the color matrix filter
 *
 * @property matrix
 * @type Array and array of 26 numbers
 * @default [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
 */
Object.defineProperty(PIXI.ColorMatrixFilter.prototype, 'matrix', {
    get: function() {
        return this.uniforms.matrix.value;
    },
    set: function(value) {
    	this.uniforms.matrix.value = value;
    }
});
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * 
 * This turns your displayObjects to black and white.
 * @class GreyFilter
 * @contructor
 */
PIXI.GreyFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		grey: {type: 'f', value: 1},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform sampler2D uSampler;",
	  "uniform float grey;",
	  "void main(void) {",
	    "gl_FragColor = texture2D(uSampler, vTextureCoord);",
		"gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), grey);",
	    "gl_FragColor = gl_FragColor * vColor;",
	  "}"
	];
}

PIXI.GreyFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.GreyFilter.prototype.constructor = PIXI.GreyFilter;

/**
The strength of the grey. 1 will make the object black and white, 0 will make the object its normal color
@property grey
*/
Object.defineProperty(PIXI.GreyFilter.prototype, 'grey', {
    get: function() {
        return this.uniforms.grey.value;
    },
    set: function(value) {
    	this.uniforms.grey.value = value;
    }
});

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * 
 * The DisplacementFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object. 
 * You can use this filter to apply all manor of crazy warping effects
 * Currently the r property of the texture is used offset the x and the g propery of the texture is used to offset the y.
 * @class DisplacementFilter
 * @contructor
 * @param texture {Texture} The texture used for the displacemtent map * must be power of 2 texture at the moment
 */
PIXI.DisplacementFilter = function(texture)
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	texture.baseTexture._powerOf2 = true;

	// set the uniforms
	//console.log()
	this.uniforms = {
		displacementMap: {type: 'sampler2D', value:texture},
		scale:			 {type: 'f2', value:{x:30, y:30}},
		offset:			 {type: 'f2', value:{x:0, y:0}},
		mapDimensions:   {type: 'f2', value:{x:1, y:5112}},
		dimensions:   {type: 'f4', value:[0,0,0,0]}
	};
	

	if(texture.baseTexture.hasLoaded)
	{
		this.uniforms.mapDimensions.value.x = texture.width;
		this.uniforms.mapDimensions.value.y = texture.height;
	}
	else
	{
		this.boundLoadedFunction = this.onTextureLoaded.bind(this);

		texture.baseTexture.on("loaded", this.boundLoadedFunction);
	}

	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform sampler2D displacementMap;",
	  "uniform sampler2D uSampler;",
	  "uniform vec2 scale;",
	  "uniform vec2 offset;",
	  "uniform vec4 dimensions;",
	  "uniform vec2 mapDimensions;",// = vec2(256.0, 256.0);",
	 // "const vec2 textureDimensions = vec2(750.0, 750.0);",
	  
	  "void main(void) {",
	  	"vec2 mapCords = vTextureCoord.xy;",
//	  	"mapCords -= ;",
	 	"mapCords += (dimensions.zw + offset)/ dimensions.xy ;",
	 	"mapCords.y *= -1.0;",
	 	"mapCords.y += 1.0;",
	  	"vec2 matSample = texture2D(displacementMap, mapCords).xy;",
		"matSample -= 0.5;",	  
	 	"matSample *= scale;",
	 	"matSample /= mapDimensions;",
	    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));",
		"gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);",
		"vec2 cord = vTextureCoord;",
		
		//"gl_FragColor =  texture2D(displacementMap, cord);",
	    "gl_FragColor = gl_FragColor * vColor;",
	    
	  "}"
	];
	
}

PIXI.DisplacementFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.DisplacementFilter.prototype.constructor = PIXI.DisplacementFilter;

PIXI.DisplacementFilter.prototype.onTextureLoaded = function()
{
	
	this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width;
	this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height;

	this.uniforms.displacementMap.value.baseTexture.off("loaded", this.boundLoadedFunction)

}

/**
 * The texture used for the displacemtent map * must be power of 2 texture at the moment
 *
 * @property map
 * @type Texture
 */
Object.defineProperty(PIXI.DisplacementFilter.prototype, 'map', {
    get: function() {
        return this.uniforms.displacementMap.value;
    },
    set: function(value) {
    	this.uniforms.displacementMap.value = value;
    }
});

/**
 * The multiplier used to scale the displacement result from the map calculation.
 *
 * @property scale
 * @type Point
 */
Object.defineProperty(PIXI.DisplacementFilter.prototype, 'scale', {
    get: function() {
        return this.uniforms.scale.value;
    },
    set: function(value) {
    	this.uniforms.scale.value = value;
    }
});

/**
 * The offset used to move the displacement map.
 *
 * @property offset
 * @type Point
 */
Object.defineProperty(PIXI.DisplacementFilter.prototype, 'offset', {
    get: function() {
        return this.uniforms.offset.value;
    },
    set: function(value) {
    	this.uniforms.offset.value = value;
    }
});
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * 
 * This filter applies a pixlate effect making display objects appear "blocky"
 * @class PixelateFilter
 * @contructor
 */
PIXI.PixelateFilter = function()
{
	PIXI.AbstractFilter.call( this );

	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		invert: {type: 'f', value: 0},
		dimensions: {type: 'f4', value:new Float32Array([10000, 100, 10, 10])},
		pixelSize: {type: 'f2', value:{x:10, y:10}},
	};

	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform vec2 testDim;",
	  "uniform vec4 dimensions;",
	  "uniform vec2 pixelSize;",
	  "uniform sampler2D uSampler;",
	  "void main(void) {",
	 	"vec2 coord = vTextureCoord;",

	 	"vec2 size = dimensions.xy/pixelSize;",

	 	"vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;",
	    "gl_FragColor = texture2D(uSampler, color);",
	  "}"
	];
	

}

PIXI.PixelateFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.PixelateFilter.prototype.constructor = PIXI.PixelateFilter;

/**
 * 
 * This a point that describes the size of the blocs. x is the width of the block and y is the the height
 * @property size
 * @type Point
 */
Object.defineProperty(PIXI.PixelateFilter.prototype, 'size', {
    get: function() {
        return this.uniforms.pixelSize.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.pixelSize.value = value;
    }
});
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



PIXI.BlurXFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		blur: {type: 'f', value: 1/512},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform float blur;",
	  "uniform sampler2D uSampler;",
	    "void main(void) {",
	  	"vec4 sum = vec4(0.0);",

	  	"sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;",
	 
		"gl_FragColor = sum;",

	  "}"
	];
}

PIXI.BlurXFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.BlurXFilter.prototype.constructor = PIXI.BlurXFilter;


Object.defineProperty(PIXI.BlurXFilter.prototype, 'blur', {
    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },
    set: function(value) {
    
    	this.dirty = true;
    	this.uniforms.blur.value = (1/7000) * value;
    }
});

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



PIXI.BlurYFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		blur: {type: 'f', value: 1/512},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform float blur;",
	  "uniform sampler2D uSampler;",
	    "void main(void) {",
	  	"vec4 sum = vec4(0.0);",

	  	"sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;",
	    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;",
	 
		"gl_FragColor = sum;",

	  "}"
	];
}

PIXI.BlurYFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.BlurYFilter.prototype.constructor = PIXI.BlurYFilter;

Object.defineProperty(PIXI.BlurYFilter.prototype, 'blur', {
    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },
    set: function(value) {
    	//this.padding = value;
    	this.uniforms.blur.value = (1/7000) * value;
    }
});

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * 
 * The BlurFilter applies a Gaussian blur to an object. 
 * The strength of the blur can be set for x- and y-axis separately (always relative to the stage).
 *
 * @class BlurFilter
 * @contructor
 */
PIXI.BlurFilter = function()
{
    
	this.blurXFilter = new PIXI.BlurXFilter();
	this.blurYFilter = new PIXI.BlurYFilter();

	this.passes =[this.blurXFilter, this.blurYFilter];
	
}

/**
 * Sets the strength of both the blurX and blurY properties simultaneously
 *
 * @property blur
 * @type Number the strength of the blur
 * @default 2
 */
Object.defineProperty(PIXI.BlurFilter.prototype, 'blur', {
    get: function() {
        return this.blurXFilter.blur;
    },
    set: function(value) {
  		this.blurXFilter.blur = this.blurYFilter.blur = value;
    }
});

/**
 * Sets the strength of the blurX property simultaneously
 *
 * @property blurX
 * @type Number the strength of the blurX
 * @default 2
 */
Object.defineProperty(PIXI.BlurFilter.prototype, 'blurX', {
    get: function() {
        return this.blurXFilter.blur;
    },
    set: function(value) {
    	this.blurXFilter.blur = value;
    }
});

/**
 * Sets the strength of the blurX property simultaneously
 *
 * @property blurY
 * @type Number the strength of the blurY
 * @default 2
 */
Object.defineProperty(PIXI.BlurFilter.prototype, 'blurY', {
    get: function() {
        return this.blurYFilter.blur;
    },
    set: function(value) {
    	this.blurYFilter.blur = value;
    }
});

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * 
 * This inverts your displayObjects colors.
 * @class InvertFilter
 * @contructor
 */
PIXI.InvertFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		invert: {type: 'f', value: 1},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform float invert;",
	  "uniform sampler2D uSampler;",
	  "void main(void) {",
	    "gl_FragColor = texture2D(uSampler, vTextureCoord);",
		"gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);",
		//"gl_FragColor.rgb = gl_FragColor.rgb  * gl_FragColor.a;",
	    "gl_FragColor = gl_FragColor * vColor;",
	  "}"
	];
	
}

PIXI.InvertFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.InvertFilter.prototype.constructor = PIXI.InvertFilter;

/**
The strength of the invert. 1 will fully invert the colors, 0 will make the object its normal color
@property invert
*/
Object.defineProperty(PIXI.InvertFilter.prototype, 'invert', {
    get: function() {
        return this.uniforms.invert.value;
    },
    set: function(value) {
    	this.uniforms.invert.value = value;
    }
});
/**
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * 
 * This applies a sepia effect to your displayObjects.
 * @class SepiaFilter
 * @contructor
 */
PIXI.SepiaFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		sepia: {type: 'f', value: 1},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform float sepia;",
	  "uniform sampler2D uSampler;",
	 	   
	  "const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);",
	  "void main(void) {",
	    "gl_FragColor = texture2D(uSampler, vTextureCoord);",
		"gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);",
	    "gl_FragColor = gl_FragColor * vColor;",
	  "}"
	];
	
}

PIXI.SepiaFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.SepiaFilter.prototype.constructor = PIXI.SepiaFilter;

/**
The strength of the sepia. 1 will apply the full sepia effect, 0 will make the object its normal color
@property sepia
*/
Object.defineProperty(PIXI.SepiaFilter.prototype, 'sepia', {
    get: function() {
        return this.uniforms.sepia.value;
    },
    set: function(value) {
    	this.uniforms.sepia.value = value;
    }
});

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * 
 * This filter applies a pixlate effect making display objects appear "blocky"
 * @class PixelateFilter
 * @contructor
 */
PIXI.TwistFilter = function()
{
	PIXI.AbstractFilter.call( this );

	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		radius: {type: 'f', value:0.5},
		angle: {type: 'f', value:5},
		offset: {type: 'f2', value:{x:0.5, y:0.5}},
	};

	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform vec4 dimensions;",
	  "uniform sampler2D uSampler;",
	  
	  "uniform float radius;",
      "uniform float angle;",
      "uniform vec2 offset;",

	  "void main(void) {",
	 	"vec2 coord = vTextureCoord - offset;",
		"float distance = length(coord);",
	 	
	 	"if (distance < radius){",

		 	"float ratio = (radius - distance) / radius;",
		 	"float angleMod = ratio * ratio * angle;",
		 	"float s = sin(angleMod);",
		 	"float c = cos(angleMod);",
		 	"coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);",

	 	"}",

	    "gl_FragColor = texture2D(uSampler, coord+offset);",
	  "}"
	];
}

PIXI.TwistFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.TwistFilter.prototype.constructor = PIXI.TwistFilter;

/**
 * 
 * This point describes the the offset of the twist
 * @property size
 * @type Point
 */
Object.defineProperty(PIXI.TwistFilter.prototype, 'offset', {
    get: function() {
        return this.uniforms.offset.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.offset.value = value;
    }
});

/**
 * 
 * This radius describes size of the twist
 * @property size
 * @type Number
 */
Object.defineProperty(PIXI.TwistFilter.prototype, 'radius', {
    get: function() {
        return this.uniforms.radius.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.radius.value = value;
    }
});

/**
 * 
 * This radius describes angle of the twist
 * @property angle
 * @type Number
 */
Object.defineProperty(PIXI.TwistFilter.prototype, 'angle', {
    get: function() {
        return this.uniforms.angle.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.angle.value = value;
    }
});
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * 
 * This turns your displayObjects to black and white.
 * @class GreyFilter
 * @contructor
 */
PIXI.ColorStepFilter = function()
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		step: {type: 'f', value: 5},
	};
	
	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform sampler2D uSampler;",
	  "uniform float step;",
	  "void main(void) {",
	    "vec4 color = texture2D(uSampler, vTextureCoord);",
	    "color = floor(color * step) / step;",
	    "gl_FragColor = color * vColor;",
	  "}"
	];
}

PIXI.ColorStepFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.ColorStepFilter.prototype.constructor = PIXI.ColorStepFilter;

/**
The number of steps.
@property step
*/
Object.defineProperty(PIXI.ColorStepFilter.prototype, 'step', {
    get: function() {
        return this.uniforms.step.value;
    },
    set: function(value) {
    	this.uniforms.step.value = value;
    }
});

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/fun/dotscreen.js
 */

/**
 * 
 * This filter applies a pixlate effect making display objects appear "blocky"
 * @class PixelateFilter
 * @contructor
 */
PIXI.DotScreenFilter = function()
{
	PIXI.AbstractFilter.call( this );

	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		scale: {type: 'f', value:1},
		angle: {type: 'f', value:5},
		dimensions:   {type: 'f4', value:[0,0,0,0]}
	};

	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform vec4 dimensions;",
	  "uniform sampler2D uSampler;",

	    "uniform float angle;",
	    "uniform float scale;",

	    "float pattern() {",
	    	"float s = sin(angle), c = cos(angle);",
	    	"vec2 tex = vTextureCoord * dimensions.xy;",
	    	"vec2 point = vec2(",
	    		"c * tex.x - s * tex.y,",
	    		"s * tex.x + c * tex.y",
	    	") * scale;",
	    	"return (sin(point.x) * sin(point.y)) * 4.0;",
	    "}",

	    "void main() {",
            "vec4 color = texture2D(uSampler, vTextureCoord);",
            "float average = (color.r + color.g + color.b) / 3.0;",
            "gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);",
        "}",
	];
}

PIXI.DotScreenFilter.prototype = Object.create( PIXI.DotScreenFilter.prototype );
PIXI.DotScreenFilter.prototype.constructor = PIXI.DotScreenFilter;

/**
 * 
 * This describes the the scale
 * @property scale
 * @type Number
 */
Object.defineProperty(PIXI.DotScreenFilter.prototype, 'scale', {
    get: function() {
        return this.uniforms.scale.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.scale.value = value;
    }
});

/**
 * 
 * This radius describes angle
 * @property angle
 * @type Number
 */
Object.defineProperty(PIXI.DotScreenFilter.prototype, 'angle', {
    get: function() {
        return this.uniforms.angle.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.angle.value = value;
    }
});
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = PIXI;
        }
        exports.PIXI = PIXI;
    } else if (typeof define !== 'undefined' && define.amd) {
        define(PIXI);
    } else {
        root.PIXI = PIXI;
    }
}).call(this);
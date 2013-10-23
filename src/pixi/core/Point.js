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


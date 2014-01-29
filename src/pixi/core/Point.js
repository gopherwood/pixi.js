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

PIXI.Point.localToGlobal = function(displayObject, localX, localY, outPoint)
{
	var append = PIXI.mat3.create();
	append[6] = localX;//tX
	append[7] = localY;//tY
	var mat = PIXI.mat3.clone(displayObject.worldTransform);
	mat = PIXI.mat3.multiply(mat, append);//it's changing mat anyway
	var x = mat[6];//tX
	var y = mat[7];//tY
	if(outPoint)
	{
		outPoint.x = x;
		outPoint.y = y;
		return outPoint;
	}
	else
		return new PIXI.Point(x, y);
}

PIXI.Point.globalToLocal = function(displayObject, globalX, globalY, outPoint)
{
	var worldTransform = displayObject.worldTransform;
	
	// do a cheeky transform to get the mouse coords;
	var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
        a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
        id = 1 / (a00 * a11 + a01 * -a10);
	// set the mouse coords...
	var x = a11 * id * globalX + -a01 * id * globalX + (a12 * a01 - a02 * a11) * id;
	var y = a00 * id * globalY + -a10 * id * globalY + (-a12 * a00 + a02 * a10) * id;
	if(outPoint)
	{
		outPoint.x = x;
		outPoint.y = y;
		return outPoint;
	}
	else
		return new PIXI.Point(x, y);
}

PIXI.Point.localToLocal = function(sourceDisplayObject, targetDisplayObject, x, y, outPoint)
{
	outPoint = PIXI.Point.localToGlobal(sourceDisplayObject, x, y, outPoint);
	return PIXI.Point.globalToLocal(targetDisplayObject, x, y, outPoint);
}

PIXI.Point.prototype.toString = function()
{
	return "(" + this.x + ", " + this.y + ")";
}

// constructor
PIXI.Point.prototype.constructor = PIXI.Point;


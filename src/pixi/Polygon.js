/**
 * @author Andrew Start
 */

/**
 * The Polygon object is an area defined by a list of points going clockwise.
 * @class Polygon
 * @constructor 
 * @param points {Array} The clockwise list of points
 */
PIXI.Polygon = function(points)
{
	/**
	 * @property points
	 * @type Array
	 * @default null
	 */
	this.points = points || null;
}

/**
 * Determines if a point is inside this polygon
 * @method containsPoint
 * @return True if the point is inside the polygon, false otherwise.
 */
PIXI.Polygon.prototype.containsPoint = function(x, y)
{
	/*
	Given a line segment between P0 (x0,y0) and P1 (x1,y1), another point P (x,y) has the following relationship to the line segment.
	Compute		(y - y0) (x1 - x0) - (x - x0) (y1 - y0)
	if it is less than 0 then P is to the right of the line segment, if greater than 0 it is to the left, if equal to 0 then it lies on the line segment.
	Going clockwise -> all points to the right of all the line segements are inside.
	Note: left & right are reversed (due to y:0 being at the top of the screen?)
	*/
	var points = this.points;
	for(var i = 0, len = this.points.length - 1; i < len; ++i)
	{
		var p = points[i];
		var x0 = p.x;
		var y0 = p.y;
		p = points[i + 1];
		var x1 = p.x;
		var y1 = p.y;
		if((y - y0) * (x1 - x0) - (x - x0) * (y1 - y0) < 0)
			return false;
	}
	return true;
}

/** 
 * @method clone
 * @return a copy of the rectangle
 */
PIXI.Polygon.prototype.clone = function()
{
	return new PIXI.Polygon(this.points);
}

// constructor
PIXI.Polygon.prototype.constructor = PIXI.Polygon;


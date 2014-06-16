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

PIXI.BitmapText._charSpritePool = [];//pool for character sprites
PIXI.BitmapText._charDataPool = [];//pool for temporary character data
PIXI.BitmapText._charDataArr = [];//reusable array for temporary character data
PIXI.BitmapText._lineWidthsArr = [];//reusable array for line widths
PIXI.BitmapText._lineOffsetsArr = [];//reusable array for line align offsets
PIXI.BitmapText._helperPoint = new PIXI.Point();

/**
 * Set the copy for the text object
 *
 * @method setText
 * @param text {String} The copy that you would like the text to display
 */
PIXI.BitmapText.prototype.setText = function(text)
{
	if(this.text == text) return;//don't update if the test already reads that way
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
    var pos = PIXI.BitmapText._helperPoint;
    pos.x = pos.y = 0;//reset the position, since we are using a helper point
    var prevCharCode = null;
    var chars = PIXI.BitmapText._charDataArr;
    chars.length = 0;
    var maxLineWidth = 0;
    var lineWidths = PIXI.BitmapText._lineWidthsArr;
    lineWidths.length = 0;
    var line = 0;
    var scale = this.fontSize / data.size;
	var text = this.text;
	var newLineTest = /(?:\r\n|\r|\n)/;
    var dataPool = PIXI.BitmapText._charDataPool;
    var poolIndex = 0;//keep track of what object from the pool should be used
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
        var charDataObj;
        if(poolIndex <= dataPool.length)
        {
            charDataObj = {texture:charData.texture, line: line, charCode: charCode, position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)};
            dataPool.push(dataPool);
            poolIndex++;
        }
        else
        {
            charDataObj = dataPool[poolIndex++];
            charDataObj.texture = charData.texture;
            charDataObj.line = line;
            charDataObj.charCode = charCode;
            charDataObj.position.x = pos.x + charData.xOffset;
            charDataObj.position.y = pos.y + charData.yOffset;
        }
        chars.push(charDataObj);
        pos.x += charData.xAdvance;

        prevCharCode = charCode;
    }

    lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, pos.x);

    var lineAlignOffsets = PIXI.BitmapText._lineOffsetsArr;
    lineAlignOffsets.length = 0;
	var a = this.style.align;
	switch(a)//have the entire text area be positioned based on the alignment, to make it easy to center text
	{
		case "center":
			this.pivot.x = maxLineWidth * 0.5 * scale;
			break;
		case "right":
			this.pivot.x = maxLineWidth * scale;
			break;
		default://left or unspecified
			this.pivot.x = 0;
			break;
	}
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

    var spritePool = PIXI.BitmapText._charSpritePool;
    for(i = 0; i < chars.length; i++)
    {
		var tempChar = chars[i];
        var c;
        if(spritePool.length)
        {
            c = spritePool.pop();
            c.setTexture(tempChar.texture);
        }
        else
            c = new PIXI.Sprite(tempChar.texture)//PIXI.Sprite.fromFrame(chars[i].charCode);
        c.position.x = (tempChar.position.x + lineAlignOffsets[tempChar.line]) * scale;
        c.position.y = tempChar.position.y * scale;
        c.scale.x = c.scale.y = scale;
        this.addChild(c);
    }
	
    this.width = maxLineWidth * scale;//pos.x * scale;
    this.height = (pos.y + data.lineHeight) * scale;
};

/**
 * Forces an update of the text, if you need to know the width after setting the text. Use carefully.
 * @method forceUpdateText
 */
PIXI.BitmapText.prototype.forceUpdateText = function()
{
	var c = this.children;
    var pool = PIXI.BitmapText._charSpritePool;
	while(c.length > 0)
    {
        var child = this.getChildAt(0);
        this.removeChild(child);
        pool.push(child);
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

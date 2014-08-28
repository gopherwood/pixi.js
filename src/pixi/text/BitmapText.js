/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Text Object will create a line(s) of text using bitmap font. To split a line you can use '\n', '\r' or '\r\n'
 * You can generate the fnt files using
 * http://www.angelcode.com/products/bmfont/ for windows or
 * http://www.bmglyph.com/ for mac.
 *
 * @class BitmapText
 * @extends DisplayObjectContainer
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param style {Object} The style parameters
 * @param style.font {String} The size (optional) and bitmap font id (required) eq 'Arial' or '20px Arial' (must have loaded previously)
 * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 */
PIXI.BitmapText = function(text, style)
{
    PIXI.DisplayObjectContainer.call(this);

    this._pool = [];

    this.setText(text);
    this.setStyle(style);
    this.updateText();
    this.dirty = false;
};

// constructor
PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;

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
	if(this.text === text) return;//don't update if the text already reads that way
    this.text = text || ' ';
    this.dirty = true;
};

/**
 * Set the style of the text
 * style.font {String} The size (optional) and bitmap font id (required) eq 'Arial' or '20px Arial' (must have loaded previously)
 * [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 *
 * @method setStyle
 * @param style {Object} The style parameters, contained as properties of an object
 */
PIXI.BitmapText.prototype.setStyle = function(style)
{
    style = style || {};
    style.align = style.align || 'left';
    this.style = style;

    var font = style.font.split(' ');
    this.fontName = font[font.length - 1];
    this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;

    this.dirty = true;
    this.tint = style.tint;
};

/**
 * Renders text and updates it when needed
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

    for(var i = 0, textLength = text.length; i < textLength; i++)
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
		case 'center':
			this.pivot.x = maxLineWidth * 0.5 * scale;
			break;
		case 'right':
			this.pivot.x = maxLineWidth * scale;
			break;
		default://left or unspecified
			this.pivot.x = 0;
			break;
	}
    for(i = 0; i <= line; i++)
    {
        var alignOffset = 0;
        if(a === 'right')
        {
            alignOffset = maxLineWidth - lineWidths[i];
        }
        else if(a === 'center')
        {
            alignOffset = (maxLineWidth - lineWidths[i]) * 0.5;
        }
        lineAlignOffsets.push(alignOffset);
    }

    var lenChildren = this.children.length;
    var lenChars = chars.length;
    var tint = this.tint || 0xFFFFFF;
    for(i = 0; i < lenChars; i++)
    {
		var tempChar = chars[i];
        var c = i < lenChildren ? this.children[i] : this._pool.pop(); // get old child if have. if not - take from pool.

        if (c) c.setTexture(tempChar.texture); // check if got one before.
        else c = new PIXI.Sprite(tempChar.texture); // if no create new one.

        c.position.x = (tempChar.position.x + lineAlignOffsets[tempChar.line]) * scale;
        c.position.y = tempChar.position.y * scale;
        c.scale.x = c.scale.y = scale;
        c.tint = tint;
        if (!c.parent) this.addChild(c);
    }

    // remove unnecessary children.
    // and put their into the pool.
    while(this.children.length > lenChars)
    {
        var child = this.getChildAt(this.children.length - 1);
        this._pool.push(child);
        this.removeChild(child);
    }

	this._width = maxLineWidth * scale;//pos.x * scale;
    this._height = (pos.y + data.lineHeight) * scale;
    /**
     * [read-only] The width of the overall text, different from fontSize,
     * which is defined in the style object
     *
     * @property textWidth
     * @type Number
     */
    this.textWidth = maxLineWidth * scale;

    /**
     * [read-only] The height of the overall text, different from fontSize,
     * which is defined in the style object
     *
     * @property textHeight
     * @type Number
     */
    this.textHeight = (pos.y + data.lineHeight) * scale;
};

/**
 * Forces an update of the text, if you need to know the width after setting the text. Use carefully.
 * @method forceUpdateText
 */
PIXI.BitmapText.prototype.forceUpdateText = function()
{
    this.updateText();

    this.dirty = false;
};

/**
 * Updates the transfor of this object
 *
 * @method updateTransform
 * @private
 */
PIXI.BitmapText.prototype.updateTransform = function()
{
    if(this.dirty)
    {
        this.updateText();
        this.dirty = false;
    }

    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

PIXI.BitmapText.fonts = {};

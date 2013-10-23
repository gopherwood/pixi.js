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


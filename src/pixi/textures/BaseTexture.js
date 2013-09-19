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

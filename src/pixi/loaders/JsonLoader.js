/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The json file loader is used to load in JSON data and parsing it
 * When loaded this class will dispatch a "loaded" event
 * If load failed this class will dispatch a "error" event
 * @class JsonLoader
 * @extends EventTarget
 * @constructor
 * @param {String} url the url of the JSON file
 * @param {Boolean} crossorigin
 */

PIXI.JsonLoader = function(url, crossorigin)
{
	PIXI.EventTarget.call(this);
	this.url = url;
	this.baseUrl = url.replace(/[^\/]*$/, "");
	this.crossorigin = crossorigin;
	this.loaded = false;
	this.versioning = null;
	if(url.indexOf("?") != -1)
		this.versioning = url.substring(url.indexOf("?"));
};

// constructor
PIXI.JsonLoader.constructor = PIXI.JsonLoader;

/**
 * This will begin loading the JSON file
 */
PIXI.JsonLoader.prototype.load = function()
{
	this.ajaxRequest = new AjaxRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange = function() {
		scope.onJSONLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
	this.ajaxRequest.send(null);
};

/**
 * Invoke when JSON file is loaded
 * @private
 */
PIXI.JsonLoader.prototype.onJSONLoaded = function()
{
	if (this.ajaxRequest.readyState == 4) {
		if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1)
		{
			this.json = JSON.parse(this.ajaxRequest.responseText);
			
			if(this.json.frames)
			{
				// sprite sheet
				var scope = this;
				var textureUrl = this.baseUrl + this.json.meta.image + (this.versioning ? this.versioning : "");
				var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
				var frameData = this.json.frames;
			
				this.texture = image.texture;
				image.addEventListener("loaded", function (event) {
					scope.onLoaded();
				});
			
				for (var i in frameData)
				{
					var f = frameData[i];
					var rect = f.frame;
					if (rect)
					{
						var t = PIXI.TextureCache[i] = new PIXI.Texture(this.texture,
						{
							x: rect.x,
							y: rect.y,
							width: rect.w,
							height: rect.h
						});
						if (f.trimmed)
						{
							t.realSize = new PIXI.Rectangle(-f.spriteSourceSize.x, -f.spriteSourceSize.y, f.sourceSize.w, f.sourceSize.h);
							// calculate the offset!
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
 * @private
 */
PIXI.JsonLoader.prototype.onLoaded = function()
{
	this.loaded = true;
	this.dispatchEvent({
		type: "loaded",
		content: this
	});
};

/**
 * Invoke when error occured
 * @private
 */
PIXI.JsonLoader.prototype.onError = function()
{
	this.dispatchEvent({
		type: "error",
		content: this
	});
};
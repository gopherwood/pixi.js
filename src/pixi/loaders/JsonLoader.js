/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The json file loader is used to load in JSON data and parse it
 * When loaded this class will dispatch a 'loaded' event
 * If loading fails this class will dispatch an 'error' event
 *
 * @class JsonLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.JsonLoader = function (url, crossorigin, baseUrl) {

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
	this.baseUrl = baseUrl;
	this.textureBaseUrl = url.replace(/[^\/]*$/, '');

	/**
	 * [read-only] Whether the data has loaded yet
	 *
	 * @property loaded
	 * @type Boolean
	 * @readOnly
	 */
	this.loaded = false;
	this.versioning = null;
	if(url.lastIndexOf('?') !== -1)
		this.versioning = url.substring(url.indexOf('?'));
};

// constructor
PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;

PIXI.EventTarget.mixin(PIXI.JsonLoader.prototype);

/**
 * Loads the JSON data
 *
 * @method load
 */
PIXI.JsonLoader.prototype.load = function()
{
	if(window.XDomainRequest && this.crossorigin)
        this.ajaxRequest = new window.XDomainRequest();
	else
		this.ajaxRequest = new PIXI.AjaxRequest();
    this.ajaxRequest.onload = this.ajaxRequest.onreadystatechange = this.onJSONLoaded.bind(this);

	var src = PIXI.buildPath(this.url, this.baseUrl);
        // XDomainRequest has a few quirks. Occasionally it will abort requests
    this.ajaxRequest.open('GET', src, true);
    if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType('application/json');
	// Determine the XHR level
	var xhrLevel = (typeof this.ajaxRequest.responseType === 'string') ? 2 : 1;
	//attempt to only use cross domain requests if needed, because IE9 - code borrowed from PreloadJS
	var crossDomain = false;
	if(this.crossorigin)
	{
		var target = document.createElement('a');
		target.href = PIXI.buildPath(this.url, this.baseUrl);
		var host = document.createElement('a');
		host.href = location.href;
		crossDomain = (target.hostname !== '') &&
						(target.port !== host.port ||
						target.protocol !== host.protocol ||
						target.hostname !== host.hostname);
	}
	if (crossDomain && this.ajaxRequest instanceof XMLHttpRequest && xhrLevel === 1) {
		this.ajaxRequest.setRequestHeader('Origin', location.origin);
	}
	
	if(this._loadTimeout)
	{
		clearTimeout(this._loadTimeout);
		this._loadTimeout = 0;
	}
	var scope = this;
	this.ajaxRequest.onloadstart = function(){};
	this.ajaxRequest.onprogress = function(){};
	var timeoutFunc = function(){
		if(window.console) window.console.error('load of json ' + src + ' timeout');
		if(++scope._loadFails <= 3)
			scope.load();//try loading again
	};
	this.ajaxRequest.ontimeout = timeoutFunc;
	// Set up a timeout if we don't have XHR2
	if (xhrLevel === 1) {
		this._loadTimeout = setTimeout(timeoutFunc, 8000);
	}
	this.ajaxRequest.onabort = function(){
		if(window.console) window.console.log('load of json ' + src + ' aborted');
		if(++scope._loadFails <= 3)
			scope.load();
	};
	this.ajaxRequest.onerror = function(){
		if(window.console) window.console.log('load of json ' + src + ' had an error!');
		if(++scope._loadFails <= 3)
			scope.load();
	};
	this.ajaxRequest.onload = this.onJSONLoaded.bind(this);
	this.ajaxRequest.onreadystatechange = this.onJSONLoaded.bind(this);
	try
	{
		setTimeout(function(){scope.ajaxRequest.send();}, 0);
	}
	catch(e)
	{
		if(window.console)
			window.console.error('Error in trying to send load request of ' + src + ': ' + e);
		setTimeout(function(){
			if(++scope._loadFails <= 3)
				scope.load();
		}, 10);
	}
};

/**
 * Invoked when the JSON file is loaded.
 *
 * @method onJSONLoaded
 * @private
 */
PIXI.JsonLoader.prototype.onJSONLoaded = function () {
	var isLoaded = this.ajaxRequest.readyState === undefined;//newer versions of IE don't do the readyState thing, apparently
	if (isLoaded || this.ajaxRequest.readyState === 4) {
		if (isLoaded || this.ajaxRequest.status === 200 || this.ajaxRequest.status === 304 || window.location.href.indexOf('http') === -1) {
			if(this._loadTimeout)
				clearTimeout(this._loadTimeout);
			this.ajaxRequest.onabort = this.ajaxRequest.onerror = this.ajaxRequest.onload = this.ajaxRequest.onreadystatechange = null;
			if(this.ajaxRequest.response)
				this.json = JSON.parse(this.ajaxRequest.response);
			else
				this.json = JSON.parse(this.ajaxRequest.responseText);

			if(this.json.frames)
			{
				// sprite sheet
				var textureUrl = this.textureBaseUrl + this.json.meta.image + (this.versioning ? this.versioning : '');
				var image = new PIXI.ImageLoader(textureUrl, this.crossorigin, this.baseUrl);
				var frameData = this.json.frames;

				this.texture = image.texture;
				image.addEventListener('loaded', this.onLoaded.bind(this));

				for (var i in frameData) {
					if(PIXI.TextureCache[PIXI.filenameFromUrl(i)])
						continue;
					var f = frameData[i];
					var rect = f.frame;
					if (rect) {
                var textureSize = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);
                var crop = textureSize.clone();
                var trim = null;
                
						//  Check to see if the sprite is trimmed
						if (f.trimmed)
						{
							var actualSize = f.sourceSize;
							var realSize = f.spriteSourceSize;
                    trim = new PIXI.Rectangle(realSize.x, realSize.y, actualSize.w, actualSize.h);
                }
                PIXI.TextureCache[i] = new PIXI.Texture(this.texture, textureSize, crop, trim);
					}
				}

				image.load();

			}
			else if(this.json.bones)
			{
				// spine animation
				var spineJsonParser = new spine.SkeletonJson();
				var skeletonData = spineJsonParser.readSkeletonData(this.json);
				PIXI.AnimCache[PIXI.filenameFromUrl(this.url)] = skeletonData;
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
 * Invoked when the json file has loaded.
 *
 * @method onLoaded
 * @private
 */
PIXI.JsonLoader.prototype.onLoaded = function () {
    this.loaded = true;
    this.dispatchEvent({
        type: 'loaded',
        content: this
    });
};

/**
 * Invoked if an error occurs.
 *
 * @method onError
 * @private
 */
PIXI.JsonLoader.prototype.onError = function () {

    this.dispatchEvent({
        type: 'error',
        content: this
    });
};

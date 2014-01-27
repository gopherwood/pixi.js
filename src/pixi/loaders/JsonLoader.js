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
PIXI.JsonLoader = function (url, crossorigin, generateCanvasFromTexture, baseUrl) {
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
	this.baseUrl = baseUrl;
	this.textureBaseUrl = url.replace(/[^\/]*$/, "");

	/**
	 * [read-only] Whether the data has loaded yet
	 *
	 * @property loaded
	 * @type Boolean
	 * @readOnly
	 */
	this.loaded = false;
	this.versioning = null;
	if(url.lastIndexOf("?") != -1)
		this.versioning = url.substring(url.indexOf("?"));
	
	this.generateCanvas = generateCanvasFromTexture || false;
};

// constructor
PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;

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
				var textureUrl = this.textureBaseUrl + this.json.meta.image + (this.versioning ? this.versioning : "");
				var image = new PIXI.ImageLoader(textureUrl, this.crossorigin, this.generateCanvas, this.baseUrl);
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

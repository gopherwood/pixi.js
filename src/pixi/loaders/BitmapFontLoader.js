/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The xml loader is used to load in XML bitmap font data ("xml" or "fnt")
 * To generate the data you can use http://www.angelcode.com/products/bmfont/
 * This loader will also load the image file as the data.
 * When loaded this class will dispatch a "loaded" event
 *
 * @class BitmapFontLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the sprite sheet JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.BitmapFontLoader = function(url, crossorigin)
{
    /*
     * i use texture packer to load the assets..
     * http://www.codeandweb.com/texturepacker
     * make sure to set the format as "JSON"
     */
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
    this.baseUrl = url.replace(/[^\/]*$/, "");

    /**
     * [read-only] The texture of the bitmap font
     *
     * @property baseUrl
     * @type String
     */
    this.texture = null;

	
	this.versioning = null;
	if(url.indexOf("?") != -1)
		this.versioning = url.substring(url.indexOf("?"));
};

// constructor
PIXI.BitmapFontLoader.prototype.constructor = PIXI.BitmapFontLoader;

/**
 * Loads the XML font data
 *
 * @method load
 */
PIXI.BitmapFontLoader.prototype.load = function()
{
	/*this.ajaxRequest = new XMLHttpRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange = function()
	{
		scope.onXMLLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/xml");
	this.ajaxRequest.send(null)*/
	
	// Create the request. Fall back to whatever support we have.
	var req = null;
	if (this.crossorigin && window.XDomainRequest) {
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
		req.overrideMimeType("application/xml");
	// Determine the XHR level
	var xhrLevel = (typeof req.responseType === "string") ? 2 : 1;

	var src = this.url;

	// Open the request.  Set cross-domain flags if it is supported (XHR level 1 only)
	req.open("GET", src, true);

	if (this.crossorigin && req instanceof XMLHttpRequest && xhrLevel == 1) {
		req.setRequestHeader("Origin", location.origin);
	}

	this._request = req;
	
	this._request.onabort = function(){if(window.console)console.log("load of bitmap font " + src + " aborted");};
	this._request.onerror = function(){if(window.console)console.log("load of bitmap font " + src + " had an error!");};
	this._request.onload = this.onXMLLoaded.bind(this);
	this._request.onreadystatechange = this.onXMLLoaded.bind(this);
	
	this._request.send();
};

/**
 * Invoked when XML file is loaded, parses the data
 *
 * @method onXMLLoaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onXMLLoaded = function()
{
	var isLoaded = this._request.readyState == undefined;//newer versions of IE don't do the readyState thing, apparently
	if (isLoaded || this._request.readyState == 4)
	{
		if (isLoaded || this._request.status == 200 || window.location.href.indexOf("http") == -1)
		{
			this._request.onabort = this._request.onerror = this._request.onload = this._request.onreadystatechange = null;
			var xml = this._request.responseXML || this._request.response;
			var textureUrl = this.baseUrl + xml.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue + (this.versioning ? this.versioning : "");
			var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
			this.texture = image.texture;

			var data = {};
			var info = xml.getElementsByTagName("info")[0];
			var common = xml.getElementsByTagName("common")[0];
			data.font = info.attributes.getNamedItem("face").nodeValue;
			data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
			data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
			data.chars = {};

			//parse letters
			var letters = xml.getElementsByTagName("char");

			var tempAttributes;
			for (var i = 0, len = letters.length; i < len; i++)
			{
				tempAttributes = letters[i].attributes;
				var charCode = parseInt(tempAttributes.getNamedItem("id").nodeValue, 10);

                var textureRect = new PIXI.Rectangle(
                    parseInt(tempAttributes.getNamedItem("x").nodeValue, 10),
                    parseInt(tempAttributes.getNamedItem("y").nodeValue, 10),
                    parseInt(tempAttributes.getNamedItem("width").nodeValue, 10),
                    parseInt(tempAttributes.getNamedItem("height").nodeValue, 10)
                );

                data.chars[charCode] = {
                    xOffset: parseInt(tempAttributes.getNamedItem("xoffset").nodeValue, 10),
                    yOffset: parseInt(tempAttributes.getNamedItem("yoffset").nodeValue, 10),
                    xAdvance: parseInt(tempAttributes.getNamedItem("xadvance").nodeValue, 10),
                    kerning: {},
                    texture: PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect)

                };
            }

			//parse kernings
			var kernings = xml.getElementsByTagName("kerning");
			for (i = 0, len = kernings.length; i < len; i++)
			{
				tempAttributes = kernings[i].attributes;
				var first = parseInt(tempAttributes.getNamedItem("first").nodeValue, 10);
				var second = parseInt(tempAttributes.getNamedItem("second").nodeValue, 10);
				var amount = parseInt(tempAttributes.getNamedItem("amount").nodeValue, 10);

				data.chars[second].kerning[first] = amount;
			}

			PIXI.BitmapText.fonts[data.font] = data;

			var scope = this;
			image.addEventListener("loaded", function() {
				scope.onLoaded();
			});
			image.load();
		}
	}
};

/**
 * Invoked when all files are loaded (xml/fnt and texture)
 *
 * @method onLoaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onLoaded = function()
{
	this.dispatchEvent({type: "loaded", content: this});
};

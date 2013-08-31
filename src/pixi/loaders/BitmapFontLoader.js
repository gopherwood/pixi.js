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
	this.ajaxRequest = new XMLHttpRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange = function()
	{
		scope.onXMLLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/xml");
	this.ajaxRequest.send(null)
};

/**
 * Invoked when XML file is loaded, parses the data
 *
 * @method onXMLLoaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onXMLLoaded = function()
{
	if (this.ajaxRequest.readyState == 4)
	{
		if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1)
		{
			var textureUrl = this.baseUrl + this.ajaxRequest.responseXML.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue + (this.versioning ? this.versioning : "");
			var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
			this.texture = image.texture;

			var data = {};
			var info = this.ajaxRequest.responseXML.getElementsByTagName("info")[0];
			var common = this.ajaxRequest.responseXML.getElementsByTagName("common")[0];
			data.font = info.attributes.getNamedItem("face").nodeValue;
			data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
			data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
			data.chars = {};

			//parse letters
			var letters = this.ajaxRequest.responseXML.getElementsByTagName("char");

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
			var kernings = this.ajaxRequest.responseXML.getElementsByTagName("kerning");
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

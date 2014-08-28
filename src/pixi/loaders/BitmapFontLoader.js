/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The xml loader is used to load in XML bitmap font data ('xml' or 'fnt')
 * To generate the data you can use http://www.angelcode.com/products/bmfont/
 * This loader will also load the image file as the data.
 * When loaded this class will dispatch a 'loaded' event
 *
 * @class BitmapFontLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the sprite sheet JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.BitmapFontLoader = function(url, crossorigin, baseUrl)
{
    /*
     * I use texture packer to load the assets..
     * http://www.codeandweb.com/texturepacker
     * make sure to set the format as 'JSON'
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
    this.baseUrl = baseUrl;
	this.textureBaseUrl = url.replace(/[^\/]*$/, '');

    /**
     * [read-only] The texture of the bitmap font
     *
     * @property baseUrl
     * @type String
     */
    this.texture = null;

	
	this.versioning = null;
	if(url.lastIndexOf('?') !== -1)
		this.versioning = url.substring(url.indexOf('?'));
	
	this._loadFails = 0;
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
    this.ajaxRequest = new PIXI.AjaxRequest();
    this.ajaxRequest.onload = this.ajaxRequest.onreadystatechange = this.onXMLLoaded.bind(this);

	var src = PIXI.buildPath(this.url, this.baseUrl);
    this.ajaxRequest.open('GET', src, true);
    if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType('application/xml');
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
		if(window.console) window.console.error('load of bitmap font ' + src + ' timeout');
		if(++scope._loadFails <= 3)
			scope.load();//try loading again
	};
	this.ajaxRequest.ontimeout = timeoutFunc;
	// Set up a timeout if we don't have XHR2
	if (xhrLevel === 1) {
		this._loadTimeout = setTimeout(timeoutFunc, 8000);
	}
	this.ajaxRequest.onabort = function(){
		if(window.console) window.console.log('load of bitmap font ' + src + ' aborted');
		if(++scope._loadFails <= 3)
			scope.load();
	};
	this.ajaxRequest.onerror = function(){
		if(window.console) window.console.log('load of bitmap font ' + src + ' had an error!');
		if(++scope._loadFails <= 3)
			scope.load();
	};
	this.ajaxRequest.onload = this.onXMLLoaded.bind(this);
	this.ajaxRequest.onreadystatechange = this.onXMLLoaded.bind(this);
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
		},10);
	}
};

/**
 * Invoked when the XML file is loaded, parses the data
 *
 * @method onXMLLoaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onXMLLoaded = function()
{
	var isLoaded = this.ajaxRequest.readyState === undefined;//newer versions of IE don't do the readyState thing, apparently
    if (isLoaded ||this.ajaxRequest.readyState === 4)
    {
        if (isLoaded ||this.ajaxRequest.status === 200 || this.ajaxRequest.status === 304 || window.location.href.indexOf('http') === -1)
        {
			if(this._loadTimeout)
				clearTimeout(this._loadTimeout);
			this.ajaxRequest.onabort = this.ajaxRequest.onerror = this.ajaxRequest.onload = this.ajaxRequest.onreadystatechange = null;
			var responseXML = this.ajaxRequest.responseXML || this.ajaxRequest.response || this.ajaxRequest.responseText;
            if(typeof responseXML === 'string')
			{
				if(responseXML.xml)
					responseXML = responseXML.xml;
				else
				{
					var text = responseXML;
					if (window.DOMParser)
					{
						var parser = new DOMParser();
						responseXML = parser.parseFromString(text,'text/xml');
					}
					else // Internet Explorer
					{
						responseXML = new window.ActiveXObject('Microsoft.XMLDOM');
						responseXML.async=false;
						responseXML.loadXML(text);
					}
				}
			}
            var textureUrl = this.textureBaseUrl + responseXML.getElementsByTagName('page')[0].getAttribute('file') + (this.versioning ? this.versioning : '');
            var image = new PIXI.ImageLoader(textureUrl, this.crossorigin, this.baseUrl);
            this.texture = image.texture;

            var data = {};
            var info = responseXML.getElementsByTagName('info')[0];
            var common = responseXML.getElementsByTagName('common')[0];
            data.font = info.getAttribute('face');
            data.size = parseInt(info.getAttribute('size'), 10);
            data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
            data.chars = {};

            //parse letters
            var letters = responseXML.getElementsByTagName('char');

            for (var i = 0; i < letters.length; i++)
            {
                var charCode = parseInt(letters[i].getAttribute('id'), 10);

                var textureRect = new PIXI.Rectangle(
                    parseInt(letters[i].getAttribute('x'), 10),
                    parseInt(letters[i].getAttribute('y'), 10),
                    parseInt(letters[i].getAttribute('width'), 10),
                    parseInt(letters[i].getAttribute('height'), 10)
                );

                data.chars[charCode] = {
                    xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
                    xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
                    kerning: {},
                    texture: new PIXI.Texture(this.texture, textureRect)

                };
            }

            //parse kernings
            var kernings = responseXML.getElementsByTagName('kerning');
            for (i = 0; i < kernings.length; i++)
            {
                var first = parseInt(kernings[i].getAttribute('first'), 10);
                var second = parseInt(kernings[i].getAttribute('second'), 10);
                var amount = parseInt(kernings[i].getAttribute('amount'), 10);

				data.chars[second].kerning[first] = amount;
			}

			PIXI.BitmapText.fonts[data.font] = data;

            image.addEventListener('loaded', this.onLoaded.bind(this));
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
    this.dispatchEvent({type: 'loaded', content: this});
};

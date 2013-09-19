/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._defaultFrame = new PIXI.Rectangle(0,0,1,1);

// an instance of the gl context..
// only one at the moment :/
PIXI.gl;

/**
 * the WebGLRenderer is draws the stage and all its content onto a webGL enabled canvas. This renderer
 * should be used for browsers support webGL. This Render works by automatically managing webGLBatchs.
 * So no need for Sprite Batch's or Sprite Cloud's
 * Dont forget to add the view to your DOM or you will not see anything :)
 *
 * @class WebGLRenderer
 * @constructor
 * @param width=0 {Number} the width of the canvas view
 * @param height=0 {Number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 * @param antialias=false {Boolean} sets antialias (only applicable in chrome at the moment)
 * 
 */
PIXI.WebGLRenderer = function(width, height, view, transparent, antialias)
{
	// do a catch.. only 1 webGL renderer..

	this.transparent = !!transparent;

	this.width = width || 800;
	this.height = height || 600;
	
	/**
	 * If the view should be cleared before each render.
	 * @property clearView
	 * @type Boolean
	 * @default true
	 */
	this.clearView = true;
	
	this.view = view || document.createElement( 'canvas' ); 
    this.view.width = this.width;
	this.view.height = this.height;

	// deal with losing context..	
    var scope = this;
	this.onContextLost = function(event) { scope.handleContextLost(event); };
	this.onContextRestored = function(event) { scope.handleContextRestored(event); };
	this.view.addEventListener('webglcontextlost', this.onContextLost, false);
	this.view.addEventListener('webglcontextrestored', this.onContextRestored, false);

	this.batchs = [];

	try 
 	{
        PIXI.gl = this.gl = this.view.getContext("experimental-webgl",  {  	
    		 alpha: this.transparent,
    		 antialias:!!antialias, // SPEED UP??
    		 premultipliedAlpha:false,
    		 stencil:true
        });
    } 
    catch (e) 
    {
    	throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }

    PIXI.initPrimitiveShader();
    PIXI.initDefaultShader();
    PIXI.initDefaultStripShader();

    PIXI.activateDefaultShader();

    var gl = this.gl;
    PIXI.WebGLRenderer.gl = gl;

    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
   	gl.disable(gl.CULL_FACE);

    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, this.transparent); 

    PIXI.projection = new PIXI.Point(400, 300);

    this.resize(this.width, this.height);
    this.contextLost = false;

    this.stageRenderGroup = new PIXI.WebGLRenderGroup(this.gl);
}

// constructor
PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;

/**
 * Gets a new WebGLBatch from the pool
 *
 * @static
 * @method getBatch
 * @return {WebGLBatch}
 * @private 
 */
PIXI.WebGLRenderer.getBatch = function()
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(PIXI.WebGLRenderer.gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * Puts a batch back into the pool
 *
 * @static
 * @method returnBatch
 * @param batch {WebGLBatch} The batch to return
 * @private
 */
PIXI.WebGLRenderer.returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

PIXI.WebGLRenderer.prototype.destroy = function()
{
	this.view.removeEventListener('webglcontextlost', this.onContextLost, false);
	this.view.removeEventListener('webglcontextrestored', this.onContextRestored, false);
	this.view = null;
	PIXI.WebGLRenderer.gl = this.gl = PIXI.gl = null;
	PIXI.deleteShaders();
}

/**
 * Renders the stage to its webGL view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.WebGLRenderer.prototype.render = function(stage)
{
	if(this.contextLost)return;
	
	
	// if rendering a new stage clear the batchs..
	var renderGroup = this.stageRenderGroup;
	if(this.__stage !== stage)
	{
		// TODO make this work
		// dont think this is needed any more?
		this.__stage = stage;
		renderGroup.setRenderable(stage);
	}
	
	// TODO not needed now... 
	// update children if need be
	// best to remove first!
	/*for (var i=0; i < stage.__childrenRemoved.length; i++)
	{
		var group = stage.__childrenRemoved[i].__renderGroup
		if(group)group.removeDisplayObject(stage.__childrenRemoved[i]);
	}*/

	// update any textures	
	PIXI.WebGLRenderer.updateTextures();
		
	// update the scene graph	
	PIXI.visibleCount++;
	stage.updateTransform();
	
	var gl = this.gl;
	
	// -- Does this need to be set every frame? -- //
	gl.colorMask(true, true, true, this.transparent); 
	gl.viewport(0, 0, this.width, this.height);	
	
   	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		
	if(this.clearView)
	{
		var bcs = stage.backgroundColorSplit;
		gl.clearColor(bcs[0], bcs[1], bcs[2], !this.transparent);     
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	// HACK TO TEST
	
	//renderGroup.backgroundColor = stage.backgroundColorSplit;
	renderGroup.render(PIXI.projection);
	
	// interaction
	// run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
	
	// after rendering lets confirm all frames that have been uodated..
	var updates = PIXI.Texture.frameUpdates;
	var len = updates.length;
	if(len > 0)
	{
		for (var i=0; i < len; i++) 
		{
		  	updates[i].updateFrame = false;
		};
		updates.length = 0;
	}
}

/**
 * Updates the textures loaded into this webgl renderer
 *
 * @static
 * @method updateTextures
 * @private
 */
PIXI.WebGLRenderer.updateTextures = function()
{
	//TODO break this out into a texture manager...
	var renderer = PIXI.WebGLRenderer;
	var arr = PIXI.texturesToUpdate;
	for (var i=0, len = arr.length; i < len; i++) renderer.updateTexture(arr[i]);
	arr.length = 0;
	arr = PIXI.texturesToDestroy;
	for (var i=0, len = arr.length; i < len; i++) renderer.destroyTexture(arr[i]);
	arr.length = 0;
}

/**
 * Updates a loaded webgl texture
 *
 * @static
 * @method updateTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.updateTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;
	
	if(!texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
	}

	if(texture.hasLoaded)
	{
		var TEX_2D = gl.TEXTURE_2D;
		gl.bindTexture(TEX_2D, texture._glTexture);
	 	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

		gl.texImage2D(TEX_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
		gl.texParameteri(TEX_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(TEX_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

		// reguler...

		if(!texture._powerOf2)
		{
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}
		else
		{
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(TEX_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}

		gl.bindTexture(TEX_2D, null);
	}
}

/**
 * Destroys a loaded webgl texture
 *
 * @method destroyTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.destroyTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;

	if(texture._glTexture)
	{
		//texture._glTexture = gl.createTexture();//why would we want to create a texture in order to destroy it?
		gl.deleteTexture(texture._glTexture);
		texture._glTexture = null;
	}
}

/**
 * resizes the webGL view to the specified width and height
 *
 * @method resize
 * @param width {Number} the new width of the webGL view
 * @param height {Number} the new height of the webGL view
 */
PIXI.WebGLRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;

	this.view.width = width;
	this.view.height = height;

	this.gl.viewport(0, 0, this.width, this.height);	

	//var projectionMatrix = this.projectionMatrix;

	PIXI.projection.x =  this.width/2;
	PIXI.projection.y =  this.height/2;

//	projectionMatrix[0] = 2/this.width;
//	projectionMatrix[5] = -2/this.height;
//	projectionMatrix[12] = -1;
//	projectionMatrix[13] = 1;
}

/**
 * Handles a lost webgl context
 *
 * @method handleContextLost
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
{
	event.preventDefault();
	this.contextLost = true;
}

/**
 * Handles a restored webgl context
 *
 * @method handleContextRestored
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextRestored = function(event)
{
	this.gl = this.view.getContext("experimental-webgl",  {  	
		alpha: true
    });

	this.initShaders();	

	for(var key in PIXI.TextureCache) 
	{
        var texture = PIXI.TextureCache[key].baseTexture;
        texture._glTexture = null;
        PIXI.WebGLRenderer.updateTexture(texture);
	};
	
	array = this.batches;
	len = array.length;
	for (var i=0; i < len; i++) 
	{
		var b = array[i];
		b.restoreLostContext(this.gl)//
		b.dirty = true;
	};

	PIXI._restoreBatchs(this.gl);

	this.contextLost = false;
}

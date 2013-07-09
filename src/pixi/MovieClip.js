/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A MovieClip is a simple way to display an animation depicted by a list of textures.
 * @class MovieClip
 * @extends Sprite
 * @constructor
 * @param textures {Array} an array of {Texture} objects that make up the animation
 */
PIXI.MovieClip = function(textures)
{
	PIXI.Sprite.call( this, textures[0]);
	
	/**
	 * The array of textures that make up the animation
	 * @property textures
	 * @type Array
	 */
	this.textures = textures;
	
	/**
	 * [read only] The index MovieClips current frame (this may not have to be a whole number)
	 * @property currentFrame
	 * @type Number
	 */
	this.currentFrame = 0; 
	
	/**
	 * The speed that the MovieClip will play at. Higher is faster, lower is slower
	 * @property animationSpeed
	 * @type Number
	 */
	this.animationSpeed = 1;

	/**
	 * Whether or not the movie clip repeats after playing.
	 * @property loop
	 * @type Boolean
	 */
	this.loop = true;

	/**
	 * Function to call when a MovieClip finishes playing
	 * @property onComplete
	 * @type Function
	 */
	this.onComplete = null;
	
	/**
	 * [read only] indicates if the MovieClip is currently playing
	 * @property playing
	 * @type Boolean
	 */
	this.playing;
	
	/**
	 * This is the MovieClip's target animation rate - the rate at which the animation was created. 
	 * @property _animFrameRate
	 * @type Number
	 * @default 0
	 * @private
	 */
	this._animFrameRate = 30;
	
	/**
	 * This is the time elapsed in the animation from frame 0 in seconds.
	 * @property _elapsedTime
	 * @type Number
	 * @default 0
	 * @private
	 */
	this._elapsedTime = 0;
	
	/**
	 * This is the total time for the animation.
	 * @property _animDuration
	 * @type Number
	 * @default 0
	 * @private
	 */
	this._animDuration = 0;
}

// constructor
PIXI.MovieClip.constructor = PIXI.MovieClip;
PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );

Object.defineProperty(PIXI.MovieClip.prototype, "fps", {
	get: function() { return this._animFrameRate; },
	set: function(value) {
		this._animFrameRate = value;
		this._elapsedTime = 0;
		this._duration = value ? this.textures.length / value : 0;
	}
})

PIXI.MovieClip.prototype.updateDuration = function()
{
	this._duration = this._animFrameRate ? this.textures.length / this._animFrameRate : 0;
}

/**
 * Stops the MovieClip
 * @method stop
 */
PIXI.MovieClip.prototype.stop = function()
{
	this.playing = false;
}

/**
 * Plays the MovieClip
 * @method play
 */
PIXI.MovieClip.prototype.play = function()
{
	this.playing = true;
}

/**
 * Stops the MovieClip and goes to a specific frame
 * @method gotoAndStop
 * @param frameNumber {Number} frame index to stop at
 */
PIXI.MovieClip.prototype.gotoAndStop = function(frameNumber)
{
	this.playing = false;
	this.currentFrame = frameNumber;
	this._elapsedTime = frameNumber / this._animFrameRate;
	this.setTexture(this.textures[frameNumber % this.textures.length]);
}

/**
 * Goes to a specific frame and begins playing the MovieClip
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */
PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber)
{
	this._elapsedTime = frameNumber / this._animFrameRate;
	this.currentFrame = frameNumber;
	this.playing = true;
}

/**
 * Updates the animation given a delta time.
 * @method updateAnim
 * @param deltaSec {Number} The time to advance the animation by in seconds.
 */
PIXI.MovieClip.prototype.updateAnim = function(deltaSec)
{
	this._elapsedTime += deltaSec * this.animationSpeed;
}

PIXI.MovieClip.prototype.updateTransform = function()
{
	if(this.playing)
	{
		var complete = false;
		if(this._elapsedTime > this._duration)
		{
			if(this.loop)
				this._elapsedTime = this._elapsedTime % this._duration;
			else
			{
				this._elapsedTime = this._duration;
				complete = true;
				this.playing = false;
			}
		}
		this.currentFrame = (this._elapsedTime * this._animFrameRate) | 0;
		//sanity check
		if(this.currentFrame >= this.textures.length)
			this.currentFrame = this.textures.length - 1;
		this.setTexture(this.textures[this.currentFrame]);	
		if(complete && this.onComplete)
		{
			this.onComplete();
		}
	}
	PIXI.Sprite.prototype.updateTransform.call(this);
}
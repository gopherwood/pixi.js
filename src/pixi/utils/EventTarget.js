/**
 * https://github.com/mrdoob/eventtarget.js/
 * THankS mr DOob!
 */

/**
 * Adds event emitter functionality to a class
 *
 * @class EventTarget
 * @example
 *		function MyEmitter() {
 *			PIXI.EventTarget.call(this); //mixes in event target stuff
 *		}
 *
 *		var em = new MyEmitter();
 *		em.emit({ type: 'eventName', data: 'some data' });
 */
PIXI.EventTarget = function () {

	var listeners = {};
	
	this.addEventListener = this.on = function ( type, listener )
	{	
		if ( listeners[ type ] === undefined ) {
			listeners[ type ] = [listener];	
		}
		else if ( listeners[ type ].indexOf( listener ) === -1 )
		{
			listeners[ type ].push( listener );
		}
	};

	this.dispatchEvent = this.emit = function ( event ) {
		var t = event.type;
		if ( !listeners[ t ] || !listeners[ t ].length )
		{
			return;
		}
		
		var arr = listeners[t];
		for(var i = 0, l = arr.length; i < l; i++)
		{
			arr[ i ]( event );
		}
	};

	this.removeEventListener = this.off = function ( type, listener )
	{
		if(listeners[type] === undefined) return;
		var index = listeners[ type ].indexOf( listener );
		if ( index !== - 1 )
		{
			listeners[ type ].splice( index, 1 );
		}
	};
	
	this.hasEventListener = function(type)
	{
		return listeners[type] ? listeners[type].length > 0 : false;
	};
	
	this.removeAllListeners = function(destroy)
	{
		if(destroy)
			listeners = null;
		else
			listeners = {};
	};
};

//Utility functions borrowed from PreloadJS
var _parseURI = function(path) {
	if (!path) { return null; }
	return path.match(/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/);//a pattern for parsing file URIs
};
var _formatQueryString = function(data, query) {
	if (data === null) {
		throw new Error('You must specify data.');
	}
	var params = [];
	for (var n in data) {
		params.push(n+'='+encodeURIComponent(data[n]));
	}
	if (query) {
		params = params.concat(query);
	}
	return params.join('&');
};
PIXI.buildPath = function(src, _basePath, data) {
	if(src.indexOf('data:') === 0)
		return src;
	if (_basePath !== null && src.indexOf(_basePath) === -1) {
		var match = _parseURI(src);
		// IE 7,8 Return empty string here.
		if (match[1] === null || match[1] === '') {
			src = _basePath + src;
		}
	}
	if (data === null) {
		return src;
	}

	var query = [];
	var idx = src.indexOf('?');

	if (idx !== -1) {
		var q = src.slice(idx+1);
		query = query.concat(q.split('&'));
	}

	if (idx !== -1) {
		return src.slice(0, idx) + '?' + _formatQueryString(data, query);
	} else {
		return src + '?' + _formatQueryString(data, query);
	}
};

function Font(){this.initialize.apply(this, arguments)};
(function(_class){
	_class.prototype.initialize = function(size, family) {
		this.size   = size;
		this.family = family;
		this.name   = size+"px "+family;
		this.height = Math.floor(size * 1.2);
	}
	
	_class.S = new _class(10, "sans-serif");
	_class.M = new _class(12, "sans-serif");
	_class.L = new _class(14, "sans-serif");
		
})(Font);
	
module.exports = function(context){

	var colorCode = {
		white: [255,255,255],
		red: [255,50,0],
		green: [50,255,50],
		blue: [40,170,255],
		gray: [120,120,120],
		purple: [255,120,255],
		yellow: [255,255,140],
		orange: [255,150,60],
		pink: [238,160,160],
	};

	const setRgbColor = function(rgb, text){
		return "\x1b[38;2;" + rgb[0] + ";" + rgb[1] + ";" + rgb[2] + "m" + text + "\x1b[0m";
	};

	this.rgb = function(text, color){
		return context.out(setRgbColor(color,text));
	};

	this.rgbn = function(text, color){
		return context.outn(setRgbColor(color,text));
	};

	this.white = function(text){
		return this.rgb(text,colorCode.white);
	};

	this.whiten = function(text){
		return this.rgbn(text,colorCode.white);
	};

	this.red = function(text){
		return this.rgb(text,colorCode.red);
	};

	this.redn = function(text){
		return this.rgbn(text,colorCode.red);
	};

	this.green = function(text){
		return this.rgb(text,colorCode.green);
	};

	this.greenn = function(text){
		return this.rgbn(text,colorCode.green);
	};

	this.blue = function(text){
		return this.rgb(text,colorCode.blue);
	};

	this.bluen = function(text){
		return this.rgbn(text,colorCode.blue);
	};

	this.gray = function(text){
		return this.rgb(text,colorCode.gray);
	};

	this.grayn = function(text){
		return this.rgbn(text,colorCode.gray);
	};

	this.purple = function(text){
		return this.rgb(text,colorCode.purple);
	};

	this.purplen = function(text){
		return this.rgbn(text,colorCode.purple);
	};

	this.yellow = function(text){
		return this.rgb(text,colorCode.yellow);
	};

	this.yellown = function(text){
		return this.rgbn(text,colorCode.yellow);
	};

	this.orange = function(text){
		return this.rgb(text,colorCode.orange);
	};

	this.orangen = function(text){
		return this.rgbn(text,colorCode.orange);
	};

	this.pink = function(text){
		return this.rgb(text,colorCode.pink);
	};

	this.pinkn = function(text){
		return this.rgbn(text,colorCode.pink);
	};

};
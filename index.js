const syncs = require("hachiware_sync");
const cliColor = require("./color.js");

module.exports = function(firstCallback){

	var args = process.argv;
	args.shift();
	args.shift();

	var cond = this;

	var inputUid = 0;
	var inputCallbacks = [];

	process.stdin.resume();
	process.stdin.setEncoding("utf8");
	process.stdin.on("data", function(input){

		var retry = function(){
			var test = inputCallbacks[inputUid].text;
			this.out(test + " :");
		};
		retry = retry.bind(cond);

		input = input.trim();
		if(inputCallbacks[inputUid]){
			inputCallbacks[inputUid].callback(input, retry);
		}
	});

	var constructor = function(){
		if(firstCallback){
			if(typeof firstCallback == "object"){
				return this.sync(firstCallback);
			}
			else if(typeof firstCallback == "function"){
				return this.then(firstCallback);
			}
		}
	};
	constructor = constructor.bind(this);

	/**
	 * out
	 * @param {*} text 
	 * @returns 
	 */
	this.out = function(text){

		if(!text){
			text = "";
		}
		else{
			text = String(text);
		}

		process.stdout.write(text);
		return this;
	};

	/**
	 * outn
	 * @param {*} text 
	 * @returns 
	 */
	this.outn = function(text){
		if(!text){
			text = "";
		}
		return this.out(text + "\n");
	};

	/**
	 * br
	 * @param {*} brCount 
	 * @returns 
	 */
	this.br = function(brCount){

		if(!brCount){
			brCount = 1;
		}

		for(var n = 0 ; n < brCount ; n++){
			this.outn();
		}

		return this;
	};

	/**
	 * color
	 */
	this.color = new cliColor(this);

	/**
	 * in
	 * @param {*} text 
	 * @param {*} callback 
	 * @returns 
	 */
	this.in = function(text, callback){

		if(text){
			this.out(text);
		}

		process.stdout.write(" : ");

		inputUid++;

		inputCallbacks[inputUid] = {
			text: text,
			callback: callback.bind(this),
		};

		return this;
	};

	/**
	 * exit 
	 */
	this.exit = function(){
		process.exit();
	};

	/**
	 * sync
	 * @param {*} callbackList 
	 * @returns 
	 */
	this.sync = function(callbackList){
		syncs.sync(callbackList, this);
		return this;
	};

	/**
	 * then
	 * @param {*} callback 
	 * @returns 
	 */
	this.then = function(callback){
		return syncs.then(callback, this);
	};

	/**
	 * for
	 * @param {*} start 
	 * @param {*} end 
	 * @param {*} callback 
	 * @param {*} completeCallback 
	 * @returns 
	 */
	this.for = function(start ,end ,callback ,completeCallback){
		return syncs.for(start ,end ,callback ,completeCallback, this);
	};

	/**
	 * foreach
	 * @param {*} data 
	 * @param {*} clalback 
	 * @param {*} completeCallback 
	 * @returns 
	 */
	this.foreach = function(data ,callback ,completeCallback){
		return syncs.foreach(data ,callback ,completeCallback, this);
	};

	/**
	 * asyncWait
	 * @param {*} callbackList 
	 * @param {*} completeCallback 
	 * @returns 
	 */
	this.asyncWait = function(callbackList ,completeCallback){
		return syncs.asyncWait(callbackList ,completeCallback, this);
	};

	/**
	 * loop
	 * @param {*} callback 
	 * @param {*} completeCallback 
	 * @returns 
	 */
	this.loop = function(callback ,completeCallback){
		return syncs.loop(callback ,completeCallback);
	};

	/**
	 * debug
	 * @param {*} data 
	 * @returns 
	 */
	this.debug = function(data){
		console.log(data);
		return this;
	};

	/**
	 * getArgs
	 * @returns 
	 */
	this.getArgs = function(){
		if(args.length){
			return args;
		}
		else{
			return null;
		}
	};

	/**
	 * line
	 * @param {*} length 
	 * @returns 
	 */
	this.line = function(length){
		var str = "";

		if(!length){
			length = 32;
		}

		for(var n = 0 ; n < length ; n++){
			str += "-";
		}

		return this.outn(str);
	};

	/**
	 * outData
	 * @param {*} data 
	 * @param {*} option 
	 * @returns 
	 */
	this.outData = function(data, option){

		if(!option){
			option = {};
		}

		if(!option.fieldMaxLength){
			option.fieldMaxLength = 10;
		}

		if(!option.valueMaxLength){
			option.valueMaxLength = 20;
		}

		indent = 0;

		var width = 0;

		var colums = Object.keys(data);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = data[field].toString();

			var buffStr = " " + field.padEnd(option.fieldMaxLength) + " : " + value.padEnd(option.valueMaxLength);
			if(buffStr.length > width){
				width = buffStr.length;
			}

			if(n == 0){
				if(!option.hiddenLine){
					this.line(width);
				}
			}

			this.outn(buffStr);

			if(option.nowSpace){
				this.outn();
			}

			if(!option.hiddenLine){
				this.line(width);
			}
		}

		return this;
	};

	/**
	 * outListData
	 * @param {*} data 
	 * @param {*} option 
	 * @returns 
	 */
	this.outListData = function(data, option){

		if(!option){
			option = {};
		}

		if(!option.fieldMaxLength){
			option.fieldMaxLength = 20;
		}

		if(!option.valueMaxLength){
			option.valueMaxLength = 20;
		}

		indent = 0;

		var width = null;

		var thHead = "";

		var colums = Object.keys(data[0]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			thHead += " " + field.padEnd(option.fieldMaxLength) + "\t";
		}

		width = thHead.length;

		this.line(width)
			.outn(thHead)
			.line(width)
		;

		for(var n = 0 ; n < data.length ; n++){

			var tdBody = "";

			var row = data[n];

			var colums = Object.keys(row);
			for(var n2 = 0 ; n2 < colums.length ; n2++){
				var field = colums[n2];
				var value = row[field].toString();

				tdBody += " " + value.padEnd(option.valueMaxLength) + "\t";
			}

			this.outn(tdBody).br();
		}

		return this;
	};

	/**
	 * outTitle
	 * @param {*} stringList 
	 * @param {*} maxWidth 
	 * @returns 
	 */
	this.outTitle = function(stringList, maxWidth){

		var lineString = "";
		var blankString = "";

		if(!maxWidth){
			maxWidth = 0;
			for(var n = 0 ; n < stringList.length ; n++){
				if(maxWidth < (stringList[n].length + 4)){
					maxWidth = stringList[n].length + 4;
				}
			}
		}

		for(var n = 0 ; n < maxWidth ; n++){
			lineString += "*";
			if(n == 0 || n == (maxWidth - 1)){
				blankString += "*";
			}
			else{
				blankString += " ";
			}
		}

		this.outn(lineString);
		this.outn(blankString.padEnd(maxWidth));

		for(var n = 0 ; n < stringList.length ; n++){
			var string = "* " + stringList[n];
			string = string.padEnd(maxWidth - 1) + "*";
			this.outn(string);
		}

		this.outn(blankString.padEnd(maxWidth));
		this.outn(lineString);

		return this;
	};

	/**
	 * loading
	 * @param {*} string 
	 * @returns 
	 */
	this.loading = function(string){
		var loadingStrs = ["｜","／", "ー","＼"];
		var cond = this;

		const resolve = function(){
			cond.out(string + "....OK!").br();
			clearInterval(ints);
		};

		var ind = 0;
		var ints = setInterval(function(){
			ind++;
			if(ind > loadingStrs.length - 1){
				ind = 0;
			}
			cond.out(string + "..." + loadingStrs[ind] + "\r");
		},100);

		return {
			resolve: resolve,
		};
	};

	/**
	 * progressBar
	 * @param {*} string 
	 * @param {*} maxValue 
	 * @param {*} value 
	 * @returns 
	 */
	this.progressBar = function(string ,maxValue ,value){

		var persec = parseInt(value / maxValue * 100);

		var loadingStr = "";
		for(var n = 0 ; n < 50 ; n++){
			if(persec > n * 2){
				loadingStr += "*";
			}
			else{
				loadingStr += " ";
			}
		}

		if(persec >= 100){
			persec = 100;
		}
		this.out(string + "[" + loadingStr + "] " + persec + "% " + "\r");

		return this;
	};

	return constructor();
};
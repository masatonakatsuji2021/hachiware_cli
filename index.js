/**
 * ====================================================================
 * Hachiware_CLI
 * 
 * CLI(Commandline Interface) Framework for Node.js.
 * 
 * License : MIT License. 
 * Since   : 2021.12.21
 * Author  : Nakatsuji Masato 
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_cli
 * npm     : https://www.npmjs.com/package/hachiware_cli
 * ====================================================================
 */

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

	/**
	 * constructor
	 * @returns 
	 */
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
	 * convertArgs
	 * @param {*} inputStr 
	 * @returns 
	 */
	this.convertArgs = function(inputStr){

		if(!inputStr){
			return convertOptionArgs();
		}

		var buffer = inputStr.split(" ");

		var input = [];

		var quoted = false;
		var spbuff = "";
		for(var n = 0 ; n < buffer.length ; n++){
			var b_ = buffer[n];
			if(b_.indexOf("\"") > -1){
				if(quoted){
					spbuff += " " + b_.split("\"").join("");
					input.push(spbuff);
					quoted = false;
				}
				else{
					var count = b_.split("\"").length;
					if(count % 2 == 1){
						input.push(b_.split("\"").join(""));
					}
					else{
						spbuff = b_.split("\"").join("");
						quoted = true;	
					}
				}
			}
			else{
				if(quoted){
					spbuff += " " + b_.split("\"").join("");
				}
				else{
					input.push(b_);
				}
			}
		}
		
		return convertOptionArgs(input);
	};

	const convertOptionArgs = function(input){

		if(!input){
			input = [];
		}

		for(var n = 0 ; n < input.length ; n++){
			if(input[n].substring(0,1) == "-"){
				var argSplit = input[n].split("=");
				if(argSplit.length == 2){
					input[n] = {
						name: argSplit[0].substring(1),
						value: argSplit[1],
					};
				}
				else{
					input[n] = {
						name: argSplit[0].substring(1),
						value: true,
					};
				}
			}
		}

		const Aregment = function(input){

			this.length = input.length;

			this.row = input;

			this.get = function(index){
				return input[index];
			};

			this.getExists = function(name){
				
				var result = false;
				for(var n = 0 ; n < input.length ; n++){
					var i_ = input[n];

					if(typeof i_ != "object"){
						continue;
					}

					if(i_.name == name){
						if(i_.value != undefined){
							result = true;
							break;
						}
					}
				}

				return result;
			};


			this.getOpt = function(name){

				var result = null;
				for(var n = 0 ; n < input.length ; n++){
					var i_ = input[n];

					if(typeof i_ != "object"){
						continue;
					}

					if(i_.name == name){
						result = i_.value;
						break;
					}
				}

				return result;
			};
		};

		return new Aregment(input);
	};

	/**
	 * getArgs
	 * @param {*} input 
	 * @returns 
	 */
	this.getArgs = function(){
		
		if(!args){
			return convertOptionArgs();
		}

		if(!args.length){
			return convertOptionArgs();
		}

		return convertOptionArgs(args);
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
	 * @param {*} indent 
	 * @param {*} maxLengthField 
	 * @returns 
	 */
	this.outData = function(data, option, indent, maxLengthField){
		
		const getMaxFieldLength = function(data, indent){

			var res = 0;

			var colums = Object.keys(data);
			for(var n = 0 ; n < colums.length ; n++){
				var field = colums[n];
				var value = data[field];

				if((field.length + indent * 2) > res){
					res = (field.length + indent * 2);				
				}

				if(!value){
					value = "".toString();
				}

				if(typeof value == "object"){
					var buff = getMaxFieldLength(value, indent + 1);
					if(buff > res){
						res = buff;
					}
				}
			}

			return res;
		};

		if(!option){
			option = {};
		}

		if(!indent){
			indent = 0;
		}

		if(!maxLengthField){
			maxLengthField = getMaxFieldLength(data, indent);
		}

		if(!option.maxLengthValue){
			option.maxLengthValue = 30;
		}

		var str = "";

		var indentStr = "";
		if(indent){
			for(var n = 0 ; n < indent ; n++){
				indentStr += "  ";
			}
		}

		var colums = Object.keys(data);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = data[field];

			str += "\n  "
				+ (indentStr + field.toString()).padEnd(maxLengthField)
			;

			if(!value && typeof value != "boolean"){
				value = "".toString();
			}

			if(
				typeof value == "string" ||
				typeof value == "number" ||
				typeof value == "boolean"
			){
				str += " : " + value.toString().padEnd(option.maxLengthValue);
			}
			else{

				if(Array.isArray(value)){

					str += " : ";

					for(var n2 = 0 ; n2 < value.length ; n2++){
						str += (value[n2] + ", ").toString();
					}
				}
				else{

					var nextIndent = 1;
					if(indent){
						nextIndent = parseInt(indent) + 1;
					}

					var addStr = this.outData(value, option, nextIndent, maxLengthField);

					str += indentStr + addStr;
				}
			}
		}

		if(indent){
			return str;
		}
		else{
			str += "\n\n";
			process.stdout.write(str);
		}
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
	 * progress
	 * @param {*} string 
	 * @param {*} unit 
	 * @param {*} maxValue 
	 * @returns 
	 */
	this.progress = function(string, unit, maxValue){
		var cond = this;

		const refresh = function(value){

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

			if(value > maxValue){
				value = maxValue;
			}

			cond.out(string + "[" + loadingStr + "] " + value + unit + "/" + maxValue + unit + "\r");
		};

		const resolve = function(){
			cond.br();
		};

		return {
			refresh: refresh,
			resolve: resolve,
		};

	};


	/**
	 * progressPersec
	 * @param {*} string 
	 * @returns 
	 */
	this.progressPersec = function(string){
		var cond = this;

		var maxValue = 100;

		const refresh = function(value){
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

			cond.out(string + "[" + loadingStr + "] " + persec + "% " + "\r");
		};

		const resolve = function(){
			cond.br();
		};

		return {
			refresh: refresh,
			resolve: resolve,
		};
	};

	return constructor();
};
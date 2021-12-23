const CLI = require("hachiware_cli");

var cli = new CLI();

var cmd0 = function(){

	cmd0 = cmd0.bind(this);

	this.in("Select Command [test1 / test2 / test3 / exit]", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found command. retry");
			return retry();
		}

		if(value == "test1"){
			cmd1.bind(this)();
		}
		else if(value == "test2"){
			cmd2.bind(this)();
		}
		else if(value == "test3"){
			cmd3.bind(this)();
		}
		else if(value == "exit"){
			this.br().outn(".....Bye!").exit();
		}
		else{
			this.color.redn(" [ERROR] \""+ value + "\" is not exist command. retry.");
			return retry();
		}
	});
};

var cmd1 = function(){

	this.br();
	this.outn("Command 1 ..... ");
	this.br(3);

	cmd0();
};


var cmd2 = function(){

	this.br();
	this.outn("Command 2 ..... ");
	this.br(3);

	cmd0();
};

var cmd3 = function(){

	this.br();
	this.outn("Command 3 ..... ");
	this.br(3);

	cmd0();
};

cli.then(function(){

	this.outn("CLI Test Sample 2");
	this.br();
	
	cmd0.bind(this)();

}).start();

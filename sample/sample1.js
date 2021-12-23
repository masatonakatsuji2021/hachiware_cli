const CLI = require("hachiware_cli");

var cli = new CLI();

var data = {};

cli.then(function(resolve){

	this.outn("CLI Test Sample 1");
	this.br();

	this.in("Q. your name?", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found name. retry.");
			return retry();
		}

		data.name =value;
		resolve();
	});


}).then(function(resolve){

	this.in("Q. your Age?", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found age. retry.");
			return retry();
		}

		value = parseInt(value);

		if(!value){
			this.color.redn(" [ERROR] Enter in half-width numbers. retry.");
			return retry();
		}

		data.age = value;
		resolve();
	});

}).then(function(resolve){

	this.in("Q. your from?", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found from. retry.");
			return retry();
		}

		data.from = value;
		resolve();
	});

}).then(function(resolve){

	this.in("Q. your like food?", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found like food. retry.");
			return retry();
		}

		data.food = value;
		resolve();
	});

}).then(function(resolve){

	this.outData(data);

	this.in("Are you sure you want the above content?[Y/N]", function(value, retry){

		value = value.toUpperCase();

		if(!(
			value == "Y" ||
			value == "N"
		)){
			this.color.redn(" [ERROR] Only accepts yes(y) or no (n). retry.");
			return retry();
		}

		data.status = value;
		resolve();
	});

}).then(function(resolve){

	this.br(2);

	if(data.status == "Y"){
		this.outn("..... Complete!");
	}
	else{
		this.outn("..... Cancel!");
	}

	this.exit();
	
}).start();
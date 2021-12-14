const CLI = require("../");

var cli = new CLI();

cli.then(function(resolve){

	this.outn("CLI Test Sample 2");
	this.br();

	this.in("=> Start the test.(Enter)", function(){
		resolve();
	});

}).then(function(resolve){
	var cond = this;

	var loading = cond.loading("Test Loading Aaa....");

	setTimeout(function(){
		loading.resolve();
		resolve();
	},3000);

}).then(function(resolve){
	var cond =this;

	var value = 0;
	var stt = setInterval(function(){
		value++;

		cond.progressBar("Test Loading Bbb....", 100, value);

		if(value == 100){
			cond.br();
			clearInterval(stt);
			resolve();
		}
	},20);

}).then(function(resolve){
	var cond =this;

	var value = 0;
	var stt = setInterval(function(){
		value++;

		cond.progressBar("Test Loading Ccc....", 100, value);

		if(value == 100){
			cond.br();
			clearInterval(stt);
			resolve();
		}
	},70);

}).then(function(){

	this.br().outn("..... Exit!").exit();

}).start();
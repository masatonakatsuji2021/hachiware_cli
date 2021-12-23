const CLI = require("hachiware_cli");

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

	var progress = this.progress("Test Download Bbb....", "KB", 3500);

	var value = 0;
	var stt = setInterval(function(){

		progress.refresh(value);

		if(value == 3500){
			progress.resolve();
			clearInterval(stt);
			resolve();
		}

		value += 5;
	},20);

}).then(function(resolve){
	var cond =this;

	var progressPersec = this.progressPersec("Test Install Bbb....");

	var value = 0;
	var stt = setInterval(function(){

		progressPersec.refresh(value);

		if(value == 100){
			progressPersec.resolve();
			clearInterval(stt);
			resolve();
		}

		value++;
	},70);

}).then(function(){

	this.br().outn("..... Exit!").exit();

}).start();
<p align="center">
    <img src="https://github.com/masatonakatsuji2021/hachiware_cli/raw/master/logo.png" alt="hachiware server">
</p>

# Hachiware_CLI

<a href="https://github.com/masatonakatsuji2021/hachiware_cli/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/masatonakatsuji2021/hachiware_cli"></a>
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/masatonakatsuji2021/hachiware_cli">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/masatonakatsuji2021/hachiware_cli">
<img src="https://img.shields.io/badge/author-Nakatsuji%20Masato-brightgreen" alt="author Nakatsuji Masato">
<img src="https://img.shields.io/badge/made%20in-Japan-brightgreen" alt="made in japan">

CLI Framework for Node.js.

---

## # Sample Source

Place the sample source in the test directory in the package.

```
L sample1.js
L sample2.js
L sample3.js
```

- sample1.js .... Basic interactive command creation sample.
- sample2.js .... Wait processing sample for loading and progress bar display.
- sample3.js .... Multiple interactive command samples.

---

## #  How do you use this?

First, install the npm package with the following command.

```
npm i hachiware_cli
```
  
All you have to do is add the package require code to index.js etc. and you're ready to go.  
The CLI is an object and needs to be initialized.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();
```

---

## # Console standard output

The standard console output uses the `` out`` method or the `` outn`` method if it also contains line breaks.  
Specify the character string to be displayed in the argument.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.out("....");
cli.outn("console text view....");
```

After executing, the following output result will be displayed.

```
....console text view....
```

It can also be described in a method chain.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.out("....").outn("console text view....");
```

---

## # Display by changing the font color

The text color is temporarily changed and output.  
Just specify the method as `` color.red``` or `` color.green``.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.color.red("Warning!");
cli.outn();
cli.color.green("OK!");
```

The font colors that have already been preset are as follows.

- red
- green
- blue
- yellow
- orange
- pink
- purple
- gray
- black
- white

If you want to output with line breaks, just add "n" after the method name.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.color.redn("Warning!");
cli.color.greenn("OK!");
```

---

## # Console standard input

Use the in method to add standard input from the console.  
Specify the display character string in the first argument and the callback after input in the second argument.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.in("prease text.", function(value){

	this.out("value=" + value);

});
```

The input value and the retry function `` retry`` are set for each callback argument.  
`` retry`` is a function to prompt you to input again when a value other than the default input value is input.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.in("prease text.", function(value, retry){

	if(!value){
		this.outn(" [ERROR] not found command. retry.");
		return retry;
	}

	this.out("value=" + value);

});
```

---
## # Exit console

Use the `` exit`` method to exit the console execution.  
If you do not use it, you will be prompted permanently.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.in("prease text.", function(value, retry){

	if(!value){
		this.outn(" [ERROR] not found command. retry.");
		return retry;
	}

	this.out("value=" + value);

	this.out(".....Exit");

	this.exit();
});
```

Method chain description is also possible.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.in("prease text.", function(value, retry){

	if(!value){
		this.outn(" [ERROR] not found command. retry.");
		return retry;
	}

	this.out("value=" + value)
		.out(".....Exit")
		.exit();
});
```

---

## # Console synchronization support

Hachiware_CLI makes is wrapped as a synchronization-enabled package.  
Use the ``then`` method to synchronize in parallel description in the method chain.

Since this in the callback points to the cli object, you can use the methods of the cli object.

Use the `` resolve`` method to end the processing in the callback and move to the next `` then`` callback.  
(It plays almost the same role as the resolve method of a promise.)

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

var inputData = {};

cli.then(function(resolve){

	this.outn("Console Test");

	this.in("Q. your name?", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found name. retry.");
			return retry();
		}

		inputData.name = value;

		resolve();
	});

}).then(function(resolve){

	this.in("Q. your like food?", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found like food. retry.");
			return retry();
		}

		inputData.likefood = value;

		resolve();
	});

}).then(function(resolve){

	this.in("Q. your other memo", function(value, retry){

		if(!value){
			this.color.redn(" [ERROR] not found other memo. retry.");
			return retry();
		}

		inputData.memo = value;

		resolve();
	});

}).then(function(resolve){

	conosle.log(inputData);

	this.outn("....Exit").exit();

}).start();
```

This allows you to implement a console with multiple and complex inputs in between.  

There are two ways to synchronize, one is to chain with the `` then`` method,   
and the other is to specify a list array on the constructor.

```javascript
const CLI = require("hachiware_cli");

var inputData = {};

new CLI([
	function(resolve){

		this.outn("Console Test");

		this.in("Q. your name?", function(value, retry){

			if(!value){
				this.color.redn(" [ERROR] not found name. retry.");
				return retry();
			}

			inputData.name = value;

			resolve();
		});

	},
	function(resolve){

		this.in("Q. your like food?", function(value, retry){

			if(!value){
				this.color.redn(" [ERROR] not found like food. retry.");
				return retry();
			}

			inputData.likefood = value;

			resolve();
		});
	},
	function(resolve){

		this.in("Q. your other memo", function(value, retry){

			if(!value){
				this.color.redn(" [ERROR] not found other memo. retry.");
				return retry();
			}

			inputData.memo = value;

			resolve();
		});

	},
	function(resolve){

		conosle.log(inputData);

		this.outn("....Exit").exit();

	},
]);
```

---

## # View data / list information

Normally, you have to write a little complicated code to parse and display the contents of data (keys and values) and list information, but this package provides easy methods in advance.

If you want to display the contents of the data (object), use the `` outData`` method.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.then(function(){

	var outData = {
		name : "yamada gorou",
		age : 27,
		gender : "man",
		from : "osaka",
	};

	this.outData(outData);

}).start();
```

In the above case, the output result will be as follows.

```
----------------------------------
 name       : yamada gorou
----------------------------------
 age        : 27
----------------------------------
 gender     : man
----------------------------------
 from       : osaka
----------------------------------
```

Then use the `` outListData`` method to display the list information.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.then(function(){

	var outData = [
		{
			name : "yamada gorou",
			age : 27,
			gender : "man",
			from : "osaka",
		},
		{
			name : "yamamoto hanako",
			age : 21,
			gender : "women",
			from : "tokyo",
		},
		{
			name : "ishida yuji",
			age : 35,
			gender : "man",
			from : "nagoya",
		},
	];

	this.outData(outData);

}).start();
```

In the above case, the output result will be as follows.

```
----------------------------------------------------------------------------------------
 name                    age                     gender                  from
----------------------------------------------------------------------------------------
 yamada gorou            27                      man                     osaka

 yamamoto hanako         21                      women                   tokyo

 ishida yuji             35                      man                     nagoya
```

You'll have to write complex code or write your own methods to get this kind of output, but you don't need them.

---

## # Display of loading

If you want to display the loading status at the stage when the process that causes a temporary wait is entered,  
you can easily display the loading status by using the `` loading`` method.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.then(function(){
	var cond = this;

	var loading = this.loading("loading now ... ");

	setTimeout(function(){

		loading.resolve();
		
		cond.outn("...OK");
	},4000);

}).start();
```

Specify the character string to be output in the argument.

Since the return value returns an object that contains the method that ends the loading display,  
call the `` resolve`` method at the end to end the loading state.

---

## # Progress bar display

If you want to display the progress bar like a progress bar, you can easily display it by using the `` progress`` method or the `` progressPersec`` method.

For the `` progress`` method, the arguments specify the display string, unit, and maximum value, respectively.

Since the object is returned as the return value, the value is updated with the `` refresh`` method on the callback that is executed periodically. (Display starts at this point.)

After that, execute the `` resolve`` method first when the value reaches the specified maximum value.
(If you do not run `` resolve``, the following output will be overwritten.)

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.then(function(){
	var cond = this;

	this.outn("Download start!");

	var progress = this.progress("Download...","KB",2500);

	var value = 0;

	var stt = setInterval(function(){

		progress.refresh(value);

		if(value == 2500){
			progress.resolve();
			clearInterval(stt);
			cond.outn("....Download Complete!").exit();
		}

		value += 5;
	},20);

}).start();
```

The output will be as follows.

```
Download start!
Download...[*****                                             ] 260KB/2500KB
```

On the other hand, `` progressPersec`` is a notation of progress rate.

It is basically the same as `` progress``, except that it is no longer necessary to specify the unit by specifying the maximum value in the second argument.

```javascript
const CLI = require("hachiware_cli");

var cli = new CLI();

cli.then(function(){
	var cond = this;

	this.outn("install start!");

	var progress = this.progressPersec("install...");

	var value = 0;

	var stt = setInterval(function(){

		progress.refresh(value);

		if(value == 100){
			progress.resolve();
			clearInterval(stt);
			cond.outn("....Install Complete!");
		}

		value++;
	},50);

}).start();
```

The output will be as follows.

```
install start!
install...[*************************************             ] 74%
```

---

Hachiware_CLI

CLI Framework for Node.js.
 
License : MIT License.   
Author  : Nakatsuji Masato  
HP URL  : [https://hachiware-js.com/](https://hachiware-js.com/)  
GitHub  : [https://github.com/masatonakatsuji2021/Hachiware_cli](https://github.com/masatonakatsuji2021/Hachiware_cli)  
npm     : [https://www.npmjs.com/package/Hachiware_cli](https://www.npmjs.com/package/Hachiware_cli)
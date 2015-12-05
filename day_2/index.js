let fs = require('fs');
// Load File Into Buffer
fs.readFile('./input.txt', function(err, data) {
	if (err) throw err;
	// Format Data
	let boxData = data.toString()
		.split("\n")
		.map(function(num) { 
			num = num.split('x');
			// no idea why map forcefully returns a String type..
			for(var i in num) {
				num[i] = parseInt(num[i]);
			}
			return num;
		});
	// Calculate Num Sqr Ft of Wrapping Paper
	let numSqrFtWrapping = boxData.reduce(function(a1, a2, index) {
		function calculate(args) {
			let eq = parseInt((2*args[0]*args[1])+(2*args[1]*args[2])+(2*args[2]*args[0]));
			args.sort(function(a,b ) {
				return a - b;
			});
			return parseInt(eq + (args[0] * args[1]));
		};
		return index === 1 ? calculate(a1) + calculate(a2) : a1 + calculate(a2);	
	});
	// Calculate Num Ft of Ribbon
	let numRibbonFt = boxData.reduce(function(a1, a2, index) {
		function calculate(args) {
			args.sort(function(a,b ) {
				return a - b;
			});
			return parseInt(2*(args[0]) + 2*(args[1])) + args.reduce(function(a1, a2, index) {
				return a1 * a2;
			});
		};
		return index === 1 ? calculate(a1) + calculate(a2) : a1 + calculate(a2);
	});
	// Return Answer
	console.log("Number of Square Feet of wrapping paper = ", numSqrFtWrapping);
	console.log("Number of Square Feet of rippon  = ", numRibbonFt);
});

var getImage64 = function getImage64(id, out){
	var request = require('request');
	var cheerio = require('cheerio');
	
	request('https://pt.grandfantasia.info/items/' + id, function (err, res, body) {
		// Log the error
		if (err) console.log('Erro: ' + err);

		// Load the DOM
		var $ = cheerio.load(body);
		
		// Get the aside.descbox.iconh elements
		$('.descbox.iconh').each(function (i, element) {
			//console.log($(this).find('img').attr('src').split(',')[1]);
			// return the image
			out = $(this).find('img').attr('src').split(',')[1];
		});
	});
}

// Export the ban func
exports.buildalch = async function(message) {
    await buildalch(message);
}

// Function to check if is banned
var buildalch = async function buildalch(message) {
	var imgs = {};

	let lines = require('fs').readFileSync('./inis/IDtoImage.txt', 'latin1')
		.split('\n')
		.filter(Boolean);
		
	let oldline = '';

	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');

		imgs[l[0]] = l[1];
	}

	// These are to be used in web crawler
	var alquimia =[[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]]];
	// Image processing
	var jimp = require('jimp');
	
	let tablein = jimp.read('./images/alq.png');

	Promise.apply(tablein).then(function(table) {
		return Promise.all(tablein);
	}).then(function(table) {
		for(let j = 0; j < 5; j = j + 1){
			for(let i = 0; i < 8; i = i + 1){
				let pathIn = "./GFIcons/" + imgs[alquimia[j][i][0]].toString().trim();
				
				let icon = jimp.read(pathIn);
				Promise.apply(icon).then(function(data2) {
					return Promise.all(icon);
				}).then(function(data2) {
					table.composite(data2, 3, 3);
				});
	
				console.log("lalala");
				table.write('./outs/endalq.png');
				return;
			}
		}
	});

	/*jimp.read('./images/alq.png').then(image => {
			for(let j = 0; j < 5; j = j + 1){
				for(let i = 0; i < 8; i = i + 1){
					let pathIn = ".\\GFIcons\\" + imgs[alquimia[j][i][0]].toString().trim();
					console.log(pathIn);
					
					let icon = jimp.read(pathIn);
					Promise.all(icon).then(function(data) {
						return Promise.all(icon);
					}).then(function(data) {
						image.composite(data, 3, 3);
					});

					//image.composite(icon, 3, 3);     // composites another Jimp image over this image at x, y
					console.log("lalala");
					image.write('./outs/endalq.png');
					return;
				}
			}
		}).catch(err => {
			message.channel.send('Erro ' + err);
		});*/
	
  return;
}



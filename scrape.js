var request = require('request'),
	cheerio = require('cheerio'),
	moment = require('moment');

// Use the request cookie jar to store session information for the main page
var request = request.defaults({jar: true});

// Login and load the webdiplomacy home page
var login = request.post('http://webdiplomacy.net/index.php', function(err, response, body) {

	request('http://webdiplomacy.net/index.php', function(err, response, body) {
		$ = cheerio.load(response.body);

		var games = {};

		// Scrape information about each active game
		$('.gamePanelHome').each(function(i, data) {
			var name = $('.homeGameTitleBar', this).text();
			game = {};
			game.home = $('.memberYourCountry', this).first().text() || "None";
			game.phase = $('.gamePhase', this).text();
			game.date = $('.gameDate', this).text();
			game.units = $('em', $('.memberUnitCount', this)).text() || 0;
			game.remaining = $('.timeremaining', this).text();
			game.messages = [];
			game.unread = 0;
			games[name] = game;
		});

		// Grap all the messages now!
		$('.homeNotice').each(function(i,data) {
			var name = $('a', this).text();
			var message = $('.homeForumMessage', this).text();
			var timestamp = moment.unix($('.timestamp', this).attr('unixtime'));

			// Only capture recent messages for games that are active
			if (timestamp > moment().subtract('days', 7) && games[name]) {
				// Augment the unread messages counter
				$('img', this).each(function(i, data) {
					if ($(this).attr('title') === 'Unread messages!') {
						game.unread += 1;
					}
				});

				// Add the message to the game's message list
				games[name].messages.push(message);
			}
		});

		// Write a JSON string of the game information to the output
		process.stdout.write(JSON.stringify(games));
	});
});

var form = login.form();
form.append('loginuser', process.env.DIPLOMACY_USER);
form.append('loginpass', process.env.DIPLOMACY_PASS);


process.stdout.on('error', function( err ) {
    if (err.code == "EPIPE") {
        process.exit(0);
    }
});

Webdiplomacy Scraper
====================

I love almost everything about the webdiplomacy.net game experience except the fact that there is no email notification or API.  As a result, I've sometimes lost track of time and ended up missing a turn.  To rectify that, I've built a small scraper that will scrape a handful of pages to get information about the current games you have on-going.  The results are returned as a JSON formatted string, which you can then use to do what whatever you'd like with (currently, I put them in a GeekTool geeklet on my desktop).

To use, you first need to setup to environment variables: 

- `DIPLOMACY_USER`: your webdiplomacy user name
- `DIPLOMACY_PASS`: your webdiplomacy password (*I know, this is a bad practice.  I'll improve it in a future version*)

Then you can simply run: `node scrape.js`.  If you haven't used the JSON tool `jq`, you should look into it as it can be nice for parsing the returned json string: `node scrape.js | jq -M "."` for example, will prettify the JSON string into something more readible.

###Current Scraped Data###
- For each active game:
    - Game name
    - Home country
    - Phase
    - Year
    - Unit count
    - Time remaining until next turn
    - System messages (not messages from each user) in the past 7 days

###Planned Scraped Data###
- For each active game, in addition to above:
    - Status of other countries (orders submitted, confirmed, not ready, etc)
    - Unit counts for other countries
    - Messages from other users in the current game

###Other to dos###
- Don't store password from environmental variables
- Allow arguments to be passed for supplying credentials
- Filtering of scrapped data (such that you can just scrape data for a single game, for example)
- Limiters on pace of scraping, such that the scraper doesn't overwhelm the server

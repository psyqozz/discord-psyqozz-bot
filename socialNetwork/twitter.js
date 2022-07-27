require('dotenv').config()
const twitter = require('twitter-v2')
const config = require('../config.json');

const t = new twitter({
    /*consumer_key:       process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token_key:     process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,*/
    bearer_token:         process.env.TWITTER_ACCESS_BEARER_TOKEN,
})

async function sendMessage (tweet, client) {
  console.log(tweet)
  var url = "https://twitter.com/user/status/" + tweet.id;
  try {
    const channel = await client.channels.fetch(config.twitter.channel_id)
    channel.send(`${config.twitter.channel_message} ${url}`)
    console.log('channel', [config.twitter.channel_id, channel])
  } catch (error) {
    console.error(error);
  }
}
  
async function listenForever(streamFactory, dataConsumer) {
  try {
    for await (const { data } of streamFactory()) {
      dataConsumer(data);
    }
      // The stream has been closed by Twitter. It is usually safe to reconnect.
      console.log('Stream disconnected healthily. Reconnecting.');
      listenForever(streamFactory, dataConsumer);
  } catch (error) {
      // An error occurred so we reconnect to the stream. Note that we should
      // probably have retry logic here to prevent reconnection after a number of
      // closely timed failures (may indicate a problem that is not downstream).
      console.log('Stream disconnected with error. Retrying.', error);
      listenForever(streamFactory, dataConsumer);
  }
}

module.exports = async(client) => {
  const endpointParameters = {
    'tweet.fields': [ 'author_id', 'conversation_id' ],
    'expansions': [ 'author_id', 'referenced_tweets.id' ],
    'media.fields': [ 'url' ]
  }

  try {
    console.log('Setting up Twitter....');
    const body = {
      "add": [
        {"value": `from:${config.twitter.tweet_username}`, "tag": "from Me!!"}
      ]
    }
    const r = await t.post("tweets/search/stream/rules", body);
    console.log(r);

  } catch (err) {
    console.log(err)
  }

  listenForever(
  () => t.stream('tweets/search/stream', endpointParameters),
  (data) => sendMessage(data, client)
  );
}

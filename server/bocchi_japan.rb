#!/usr/bin/env ruby
require 'json'

require 'bundler'
require 'twitter'
require 'sinatra'

def search_bocchi_tweets
  client = 
    Twitter::REST::Client.new(
                              consumer_key: 'AajbZWd3tf5D9yAvc38RCiDEK',
                              consumer_secret: 'ttFcfIKKu97eWBNWPFuOpB5N8qD6i1M5XxQFb5QvMTFMXbaJ8W',
                              access_token: '83496671-Dwu3SlqH4bIIFwfnQwuj2ekvHBwyuBGRQidjVSgBG',
                              access_token_secret: '1ZeKfR1UAu0vo0dGATnlcwff9U6511edmnyuKaPLWOfBm')

  tag = 'bocchijapan'

  since_id = nil
  query = "##{tag}"

  result_tweets = client.search(query, count: 10, result_type: 'recent', exclude: 'retweets', since_id: since_id)

  tweets = []
  result_tweets.take(10).each_with_index do |tw, i|
    u = tw.user
    user = {
      screen_name: u.screen_name,
      name: u.name,
      lang: u.lang,
      id: u.id.to_s
    }
    tweet = {
      full_text: tw.full_text,
      lang: tw.lang,
      create_at: tw.created_at,
      user: user
    }
    tweet[:geo] = tw.geo unless tw.geo.nil?
    tweet[:place] = { name: tw.place.name, country: tw.place.country } unless tw.place.nil?
    tweets << tweet
  end
  tweets
end

def make_pairs(tweets)
  ts = JSON.parse(JSON.generate(tweets))
  tweet_pairs = filter_tweets(ts)
  set_pair(tweet_pairs)
end

def filter_tweets(tweets)
  tweet_pairs = []
  tweets.reverse.each_with_index do |tweet, index|
    tweet_time = Time.parse(tweet['create_at'])
    tweets.reverse[index+1..-1].each do |t|
      t_time = Time.parse(t['create_at'])
      time_lag = t_time - tweet_time
      next if tweet['place'].nil? || t['place'].nil?  ||tweet['place']['name'] != t['place']['name']
      next if time_lag > 5 * 60 * 60
      next if tweet['user']['id'] == t['user']['id']
      # next if tweet_pairs.map{|t| t[1]}.includes?(tweet["user"]["id"])
      tweet_pairs << [tweet, t]
    end
  end
  tweet_pairs
end

def make_test_pairs
  path = File.expand_path(File.join(File.dirname(__FILE__), 'test_pair_data.json'))
  tweet_pairs = JSON.load(File.open(path))
  set_pair(tweet_pairs)
end

def set_pair(tweet_pairs)
  pairs = {}
  tweet_pairs.each do |tweet_pair|
    t1, t2 = tweet_pair[0], tweet_pair[1]
    pairs[t1['user']['id']] = t2
    pairs[t2['user']['id']] = t1
  end
  pairs
end

def out_pair(pairs, id)
  tweet = pairs[id] || {}
  JSON.pretty_generate(tweet)
end

get '/tweet' do
  tweets = search_bocchi_tweets
  pairs = make_pairs(tweets)
  id = params['id']
  response.headers['Access-Control-Allow-Origin'] = '*'
  content_type :json
  out_pair(pairs, id)
end

get '/tweet_demo' do
  pairs = make_test_pairs
  id = params['id']
  response.headers['Access-Control-Allow-Origin'] = '*'
  content_type :json
  out_pair(pairs, id)
end


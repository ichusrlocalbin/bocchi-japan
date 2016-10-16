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
    # puts "#{u.screen_name}, name: #{u.name},  location: #{u.location}, lang: #{u.lang}, id: #{u.id}.to_s"
    user = {
      screen_name: u.screen_name,
      name: u.name,
      lang: u.lang,
      id: u.id.to_s
    }
    # puts "user: #{user.to_json}"
    # puts "tw.full_text: #{tw.full_text}"
    # puts "tw.lang: #{tw.lang}"
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

get '/tweets' do
  content_type :json
  tweets = search_bocchi_tweets
  JSON.pretty_generate(tweets)
end

get '/tweets_demo' do
  content_type :json
  path = File.expand_path(File.join(File.dirname(__FILE__), 'test_data.json'))
  tweets = File.open(path).read
  JSON.pretty_generate(JSON.parse(tweets))
end

get '/tweet_demo' do
  content_type :json
  path = File.expand_path(File.join(File.dirname(__FILE__), 'test_pair_data.json'))
  tweet_pairs = JSON.parse(File.open(path).read)
  pairs = {}
  tweet_pairs.each do |tweet_pair|
    t1, t2 = tweet_pair[0], tweet_pair[1]
    pairs[t1['user']['id']] = t2
    pairs[t2['user']['id']] = t1
  end
  id = params['id']
  tweet = pairs[id] || {}
  JSON.pretty_generate(tweet)
end


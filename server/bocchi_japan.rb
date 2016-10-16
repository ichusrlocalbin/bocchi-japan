#!/usr/bin/env ruby
require 'bundler'
Bundler.require

client = Twitter::REST::Client.new(
  consumer_key: 'AajbZWd3tf5D9yAvc38RCiDEK',
  consumer_secret:   'ttFcfIKKu97eWBNWPFuOpB5N8qD6i1M5XxQFb5QvMTFMXbaJ8W',
  access_token:        '83496671-Dwu3SlqH4bIIFwfnQwuj2ekvHBwyuBGRQidjVSgBG',
  access_token_secret: '1ZeKfR1UAu0vo0dGATnlcwff9U6511edmnyuKaPLWOfBm',
)

query = "ruby"
since_id = nil
# count : 取得する件数
# result_type : 内容指定。recentで最近の内容、popularで人気の内容。
# exclude : 除外する内容。retweetsでリツイートを除外。
# since_id : 指定ID以降から検索だが、検索結果が100件以上の場合は無効。
result_tweets = client.search(query, count: 10, result_type: 'recent', exclude: 'retweets', since_id: since_id)

result_tweets.take(10).each_with_index do |tw, i|
  puts("#{i} : #{tw.user.screen_name} : #{tw.full_text}")
end

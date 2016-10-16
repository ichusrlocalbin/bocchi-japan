require 'json'
require 'uri'
require 'time'

json_data = open("test_data.json") do |file|
  JSON.load(file)
end

# puts json_data
# exit
#  json_data = JSON.parse(json_data)
# conpare = {}
# place = []

pair = []
json_data.reverse.each_with_index do |tweet,index|
  tweet_time = Time.parse(tweet["create_at"])
   json_data.reverse[index+1..-1].each do |t|
      t_time = Time.parse(t["create_at"])
      time_lag = t_time - tweet_time

     next if tweet["place"]["name"] != t["place"]["name"]
     next if time_lag > 3600
     next if tweet["user"]["id"] == t["user"]["id"]
     next if pair.map{|t| t[1]}.includes?(tweet["user"]["id"])
     pair << [tweet["user"]["id"], t["user"]["id"]]
   end
end

 p pair
# json_data.reverse_each do |data|
#     sample = {}
#     sample["place"] = data["place"]["name"]
#     sample["create_at"] =  data["create_at"]
#     sample["id"] = data["user"]["id"]
#       json_data.reverse_each do |data|
#       if sample["place"] = data["place"]
#
#       end
#   end

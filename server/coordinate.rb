require 'json'
require 'open-uri'

DISTANCE_API = "http://vldb.gsi.go.jp/sokuchi/surveycalc/surveycalc/bl2st_calc.pl?"

def distance(lat1, lng1, lat2, lng2)
  req_params = {
    outputType: "json",    # 出力タイプ
    ellipsoid:  "bessel",  # 楕円体
    latitude1:  lat1,      # 出発点緯度
    longitude1: lng1,      # 出発点経度
    latitude2:  lat2,      # 到着点緯度
    longitude2: lng2       # 到着点経度
  }
  req_param = req_params.map { |k, v| "#{k}=#{v}" }.join("&")
  result = JSON.parse(open(DISTANCE_API + req_param).read)
  result["OutputData"]["geoLength"]
end

 distance = distance(35.65757,139.6954883, 35.6587411,139.6952428)
 # distance = distance.gsub(/\"/,'')
 distance = distance.to_i
 if distance < 5000
   puts "true"
 else
   puts "false"
 end

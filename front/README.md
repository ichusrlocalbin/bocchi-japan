# bocchi japan クライアントサイド

## インストール方法

```
npm install
```

## 実行方法

```
npm start
```

## serverをlocalhostで動かす場合
front/src/js/components/MatchingList.jsxの16行目を以下のように変更する  
```
<修正前>
request.get("https://bocchi-japan.herokuapp.com/tweet?id=" + twitterId)
```
```
<修正後>
request.get("http://localhost:4567/tweet?id=" + twitterId)
```


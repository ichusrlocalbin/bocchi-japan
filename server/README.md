# bocchi japan サーバサイド

## インストール方法

```
bundle install --path vendor/bundle
```

## 実行方法

```
bundle exec ruby server/bocchi_japan.rb
```

## 動作確認

### テスト用(twitter検索をしないで結果決め打ち)

次のURLにアクセス。 `id` はtwitterのユーザID。

```
http://localhost:4567/tweet_demo?id=83496671
```

### 本番用(twitter検索を使う)

次のURLにアクセス。 `id` はtwitterのユーザID。

```
http://localhost:4567/tweet?id=83496671
```


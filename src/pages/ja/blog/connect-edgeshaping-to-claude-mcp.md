---
layout: ../../../layouts/Article.astro
title: EdgeShapingをClaudeにつなぐ：MCP接続の設定手順
description: EdgeShaping 2026.10.0から、サイトに来たAIボットの記録をClaudeから直接読めるようになりました。MCP Adapterとアプリケーションパスワードを使った接続手順を5ステップで解説し、エディションごとに使えるアビリティ、外部の人に見せる方法、つながらないときの切り分けまでまとめます。
date: 2026-10-10
lang: ja
path: /ja/blog/connect-edgeshaping-to-claude-mcp
altPath: /blog/connect-edgeshaping-to-claude-mcp
---

EdgeShaping 2026.10.0から、サイトに来たAIボットの記録をClaudeから直接読めるようになりました。つなぐ手順は5つで、EdgeShaping側の設定はありません。

## 必要なもの

| 必要なもの | 条件 |
| --- | --- |
| WordPress | 6.9以上 |
| MCP Adapter | 0.7.0以上（WordPress.orgの公式プラグイン） |
| EdgeShaping | 2026.10.0以上（Lite・有償版とも） |
| サイト | HTTPSで、インターネットから届くこと |
| Claude | カスタムコネクタで「リクエストヘッダー」が使えるアカウント |

「リクエストヘッダー」はベータ提供の機能で、アカウントによっては表示されません。表示されない場合は、後半の「Claude Desktopだけで使う場合」の方法でつなげます。

Claudeのコネクタは、Anthropic側からサイトへ接続します。手元のパソコンだけで動くローカル環境や、社内からしか見えないサイトにはつなげません。無料プランでは、カスタムコネクタは1つまでです。

## 手順1　MCP Adapterを有効にする

WordPressのプラグイン追加画面で「MCP Adapter」を検索し、作者が「WordPress.org」のものをインストールして有効化します。検索結果には、似た名前の別のプラグインも並びます。有効にすると、サイトの次のURLがMCPサーバーになります。

```
https://（あなたのサイト）/wp-json/mcp/mcp-adapter-default-server
```

EdgeShapingが入っていれば、その記録はこのサーバーから読めるようになります。EdgeShaping側で設定することはありません。

![プラグイン追加画面で「MCP Adapter」を検索した結果。作者がWordPress.orgのものを選ぶ](/images/blog/mcp-plugin-search.webp)

## 手順2　アプリケーションパスワードを発行する

アプリケーションパスワードは、WordPressに標準で備わっている外部アプリ用のパスワードです。普段のログインパスワードとは別のもので、あとから個別に取り消せます。

1. 管理画面の「ユーザー」→「プロフィール」を開く
2. 下のほうの「新しいアプリケーションパスワード名」に名前（例：Claude）を入れ、「アプリケーションパスワードを追加」を押す
3. 表示された24文字のパスワードを控える（表示されるのはこの1回だけ）

自分で使うだけなら、自分のアカウントで発行して構いません。

![プロフィール画面のアプリケーションパスワード欄。発行直後に一度だけパスワードが表示される](/images/blog/mcp-app-password.webp)

## 手順3　ヘッダーの値を作る

Claudeのコネクタには、ユーザー名とパスワードをそのまま入れる欄がありません。代わりに「ユーザー名:パスワード」をBase64という書き方に直した値を、1つだけ入れます。変換は手元で1回行うだけです。

Mac（ターミナル）

```
printf 'Basic %s' "$(printf '%s' 'ユーザー名:アプリケーションパスワード' | base64)" | pbcopy
```

Windows（PowerShell）

```
"Basic " + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("ユーザー名:アプリケーションパスワード")) | Set-Clipboard
```

`ユーザー名`はWordPressにログインするときのユーザー名、`アプリケーションパスワード`は手順2で控えたものに書き換えます。間のコロンと前後の引用符は残してください。実行しても画面には何も出ず、値がクリップボードに入ります。

たとえばユーザー名が`taro`、アプリケーションパスワードが`abcd efgh ijkl mnop qrst uvwx`なら、できあがる値はこうなります。

```
Basic dGFybzphYmNkIGVmZ2ggaWprbCBtbm9wIHFyc3QgdXZ3eA==
```

この値は暗号化されたものではなく、元のユーザー名とパスワードにそのまま戻せます。パスワードと同じ扱いにして、チャットやメモには貼らないでください。

## 手順4　Claudeにコネクタを追加する

Claudeの「カスタマイズ」→「コネクタ」を開き、「＋追加」→「カスタムコネクタを追加」を選びます。Webでもデスクトップアプリでも同じです。画面は2つに分かれていて、1つ目で「続ける」、2つ目で「追加」を押します。入れるのは次の4つです。

| 画面 | 項目 | 入れるもの |
| --- | --- | --- |
| 1つ目 | 名前 | 自由（例：自社サイト） |
| 1つ目 | MCPサーバーURL | 手順1のURL |
| 2つ目 | 認証 | 「サインインなし」 |
| 2つ目 | リクエストヘッダー | 名前は一覧から`authorization`を選ぶ。値の欄に、手順3で作ったものを貼り付ける。「必須」はチェックのまま |

![カスタムコネクタの追加画面。「サインインなし」を選び、リクエストヘッダーにauthorizationを追加する](/images/blog/mcp-connector-setup.webp)

気をつける点は3つです。

- 認証は必ず「サインインなし」にします。最初は「今すぐサインイン」が選ばれていて、そのまま追加するとつながりません。MCP Adapterが、そのサインイン方式（OAuth）に対応していないためです。
- 認証とリクエストヘッダーは、追加したあとでは変えられません。間違えたときは、コネクタを削除して追加し直します。
- ヘッダーの値は、保存すると画面には二度と表示されません。

「サインインなし」を選ぶと注意書きが出ますが、これは認証のないサーバー向けの警告です。今回はヘッダーの値で認証するので、値を持たない人はWordPress側で弾かれます。

## 手順5　つながったか確かめる

新しいチャットを開き、入力欄の「+」→「コネクタ」で、追加したコネクタをオンにします。そのうえで、こう聞きます。

> このサイトで使えるアビリティを一覧して

一覧に`edgeshaping/get-daily`が出れば、接続は完了です。

![アビリティ一覧が返ってきたチャット。edgeshaping/get-dailyとget-logsが並んでいる](/images/blog/mcp-abilities-list.webp)

## なぜ手順3の一手間が要るのか

接続と認証は、EdgeShapingではなくMCP AdapterとWordPress本体の持ち場です。EdgeShapingは、WordPressの仕組み（Abilities API）に読み出し専用の機能を登録しているだけで、MCPサーバーは同梱していません。

MCP Adapterは、接続してきた相手をWordPressのユーザーとして認証します。外部のAIから使える方法は、今のところアプリケーションパスワードです。「URLを入れてログインし、許可を押す」という流れ（OAuth）には、まだ対応していません。手順3の変換は、その差を埋めるためのものです。

MCP AdapterがOAuthに対応すれば、URLを入れて許可するだけになります。そのときEdgeShapingの更新は要りません。この記事も、認証の部分だけを書き換えます。

なお、MCP AdapterにOAuthを足すプラグインも出ています。入れればURLと「許可」だけでつなげますが、EdgeShapingとの組み合わせはこちらでは確認していません。使う場合の設定と問い合わせ先は、そのプラグイン側になります。

## つながると何ができるか

Claudeに見えるツールは、MCP Adapterの3つだけです（`mcp-adapter-discover-abilities`、`mcp-adapter-get-ability-info`、`mcp-adapter-execute-ability`）。EdgeShapingという名前のツールは出ません。EdgeShapingの機能（アビリティ）は、この3つを通して呼ばれます。呼び出しはClaudeが行うので、利用者は普通に質問するだけです。

| エディション | 使えるアビリティ | 読めるもの |
| --- | --- | --- |
| Lite | `edgeshaping/get-daily` | 日ごとのAIボットのアクセス集計 |
| 有償版 | `edgeshaping/get-daily` | 同じ集計に、ボットの用途分類が付く |
| 有償版＋Plusライセンス | 上に加えて`edgeshaping/get-logs` | 1件ずつのアクセス記録 |

どれも読み出し専用です。EdgeShapingの記録を書き換えたり消したりするアビリティはありません。

聞き方の例です。

- 先週、いちばん多く来たAIボットはどれ？
- 今月、AIボットによく読まれたページを上から10件、表にして
- GPTBotのアクセスは、先月と比べて増えた？

![「先週一番多く来たAIボットは？」という質問に、ボット別の件数とverified内訳の表で答えが返ってきたチャット](/images/blog/mcp-question-answer.webp)

2点、知っておくとよいことがあります。

- 同じコネクタから、ほかのプラグインが登録したアビリティも見えます。書き込みができるものが含まれることもあるので、一覧は一度確かめてください。
- MCPでつないだClaudeの通信も、EdgeShapingは`Claude-User`のアクセスとして記録します。

## Claude Desktopだけで使う場合

「リクエストヘッダー」が表示されないアカウントでは、Claude Desktopの設定ファイルに書く方法でつなげます。こちらはユーザー名とアプリケーションパスワードをそのまま書けて、手順3の変換は要りません。手順1・2は同じです。

|  | コネクタ（手順3〜5） | Claude Desktopの設定ファイル |
| --- | --- | --- |
| 入れるもの | URLと、変換した値を1つ | URL・ユーザー名・パスワードをそのまま |
| 別に要るもの | なし | Node.js 22以上 |
| 使える場所 | Web・デスクトップ・スマートフォン | 設定したパソコンのClaude Desktopだけ |

Claude Desktopの「設定」→「開発者」→「設定を編集」で`claude_desktop_config.json`を開き、次の内容を書きます。

```json
{
  "mcpServers": {
    "my-site": {
      "command": "npx",
      "args": ["-y", "@automattic/mcp-wordpress-remote@latest"],
      "env": {
        "WP_API_URL": "https://（あなたのサイト）/wp-json/mcp/mcp-adapter-default-server",
        "WP_API_USERNAME": "ユーザー名",
        "WP_API_PASSWORD": "アプリケーションパスワード",
        "OAUTH_ENABLED": "false"
      }
    }
  }
}
```

すでに`mcpServers`がある場合は、その中に`"my-site"`のブロックだけを足します。保存してClaude Desktopを再起動すると、手順5と同じ質問で確かめられます。

ここで使っている`mcp-wordpress-remote`は、Claude Desktopとサイトの間に入る中継プログラムです。ユーザー名とパスワードの変換は、この中継プログラムが代わりに行います。

## 外の人に見せるとき

EdgeShapingのアビリティは、寄稿者以上の権限で読めます。制作会社やコンサルタントなど外の人に分析を見せるときは、管理者のアカウントを渡す必要はありません。

1. 権限グループが「寄稿者」のユーザーを新しく作る
2. そのユーザーでアプリケーションパスワードを発行する
3. そのユーザー名とアプリケーションパスワードでつないでもらう

見せるのをやめるときは、そのアプリケーションパスワードを取り消すだけです。EdgeShapingの管理画面は、これまでどおり管理者だけが開けます。

## うまくいかないとき

| 症状 | 原因 | 対処 |
| --- | --- | --- |
| コネクタが「再接続が必要」になる、ツールが1つも見えない | 認証が「サインインなし」以外で保存されている | コネクタを削除し、「サインインなし」で追加し直す |
| 一覧に`edgeshaping/`で始まるアビリティが出ない | WordPressが6.8以前、またはEdgeShapingが2026.10.0より前 | どちらも更新する |
| アビリティの実行が権限エラーになる | つないだユーザーが購読者 | 権限グループを寄稿者以上にする |

認証が通っているかどうかは、Claudeを通さずに確かめられます。ターミナルで次を実行します（WindowsのPowerShellでは`curl`を`curl.exe`にします）。

```
curl -s -u 'ユーザー名:アプリケーションパスワード' 'https://（あなたのサイト）/wp-json/wp/v2/users/me'
```

| 返ってくるもの | 意味 |
| --- | --- |
| 自分のユーザー情報 | 認証は通っている。コネクタ側の入力を見直す |
| `incorrect_password` | ユーザー名かアプリケーションパスワードが違う |
| `rest_not_logged_in` | 認証情報がWordPressまで届いていない。サーバー、CDN、セキュリティ系プラグインのどこかで`Authorization`ヘッダーが落とされている |

## 参考

- [MCP Adapter（WordPress.org）](https://wordpress.org/plugins/mcp-adapter/)
- [WordPress/mcp-adapter（GitHub）](https://github.com/WordPress/mcp-adapter)
- [Automattic/mcp-wordpress-remote（GitHub）](https://github.com/Automattic/mcp-wordpress-remote)
- [Claude：ディレクトリにないコネクタを追加する（英語）](https://claude.com/docs/connectors/custom/add-unlisted)
- [Application Passwords: Integration Guide（WordPress、英語）](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)

---
layout: ../../../layouts/Article.astro
title: AIボット観測レポート 2026年10月：OAI-SearchBotは24時間周期、ChatGPT-Userは30分に1回
description: 2026年10月のAIボットの動きをボット別にまとめた月次レポート。OAI-SearchBotは同じページを6時間と24時間の周期で取りに来ており、ChatGPT-Userは同じページを約30分に1回までしか取りに来ません。同じ区分のPerplexityBotやClaude-Userには、こうした形は見えません。
date: 2026-11-09
lang: ja
path: /ja/blog/ai-bot-report-2026-10
altPath: /blog/ai-bot-report-2026-10
---

2026年10月のAIボットの動きを、ボットごとにまとめます。今月目立ったのは2点です。OAI-SearchBotは、同じページを6時間と24時間の周期で取りに来ています。ChatGPT-Userは、同じページを約30分に1回までしか取りに来ません。同じ用途の区分に入るPerplexityBotやClaude-Userには、こうした形は見えません。

## 1. 対象と条件

- **対象サイト**：自治体系の大規模観光サイト、資格・教育系の団体サイト（どちらもサーバーログ）、自社サイト（EdgeShaping CDN版のログ）
- **期間**：観光サイトは10月20日〜30日の240時間、団体サイトは10月1日〜31日。前月との比較には、観光サイトの9月20日〜30日の240時間を使っています。
- **数え方**：公開されたIPレンジで本物と確認できたボットの、ステータス200のページ取得だけを数えています。同じボットが同じページを取りに来た間隔を見ています。
- **用途の区分**：学習・クロール、検索・RAG、ユーザートリガーの区分は、各社の公式の説明に基づくEdgeShapingの辞書の分類です。

## 2. ボット別の観測

### OAI-SearchBot（検索・RAG）：6時間と24時間の周期

- 観光サイト：同じページへの取得の間隔は、6時間前後が14%、24時間前後が21%で、中央値は約23時間でした。
- 団体サイト：24時間前後が44%で、中央値はちょうど24時間でした。
- 自社サイト：2026年2月から、6時間と24時間の2段の取得を確認しています。

質問される前に、決まった周期でページを取りに来ています。Googleが検索のために索引を作るのと同じ形です。定期的な取得の詳しい様子は、[以前の記事](https://mare-interno.com/blog/ai-bot-search-rag-scheduled-crawl/)に書きました。

### PerplexityBot・Meta-WebIndexer（検索・RAG）：周期は見えない

- PerplexityBot：24時間前後の間隔は、観光サイトで8%、団体サイトで14%でした。6時間前後はどちらも0件です。
- Meta-WebIndexer：24時間前後の間隔は、観光サイトで8%、団体サイトで5%でした。

同じ検索・RAGの区分でも、決まった周期は見えません。

### ChatGPT-User（ユーザートリガー）：同じページは約30分に1回まで

- 観光サイト：同じページへの取得の間隔のうち、1分以上30分未満は0.1%しかなく、30〜40分に2.9%が集まっていました。
- 団体サイト：間隔の中央値は約11時間でした。30分に1回聞かれるページがほとんどないため、この形は表に出ていません。

取得数は、質問された回数そのものではありません。30分に1回より多く聞かれているページでは、それ以上の需要は取得数に表れません。

### Claude-User（ユーザートリガー）：30分の頭打ちは見えない

- 観光サイト：1分以上30分未満の間隔が0.9%、30〜40分が0.5%で、30分前後への集中はありませんでした。

## 3. 先月（9月）からの変化

観光サイトの9月と10月を、同じ240時間・同じ数え方で比べました。

| ボット | 取得数の変化 | 間隔の変化 |
| --- | --- | --- |
| OAI-SearchBot | 約6割減 | 24時間前後への偏り（9月63%）から、6時間（14%）と24時間（21%）の2段に分かれた |
| ChatGPT-User | 約84%減 | 30分の頭打ちは続いている（1分以上30分未満は9月0.03%、10月0.1%） |
| Claude-User | 約2.7倍 | 30分の頭打ちは見えないまま |
| PerplexityBot | 約1.9倍 | 周期が見えないのは同じ |
| Meta-WebIndexer | 約1.3倍 | 周期が見えないのは同じ |

## 4. ボット別の一覧（2026年10月）

| ボット | 用途の区分 | 公式の説明 | 今月の観測 |
| --- | --- | --- | --- |
| OAI-SearchBot | 検索・RAG | ChatGPTの検索でサイトを表示するため | 6時間と24時間の周期で同じページを取りに来る |
| PerplexityBot | 検索・RAG | Perplexityの検索結果でサイトを表示するため | 決まった周期は見えない |
| Meta-WebIndexer | 検索・RAG | Meta AIの検索結果の品質を上げるため | 決まった周期は見えない |
| ChatGPT-User | ユーザートリガー | ChatGPT上のユーザーの操作に応じた取得 | 同じページは約30分に1回まで。取得は前月から大きく減少 |
| Claude-User | ユーザートリガー | ユーザーの質問に応じた取得 | 30分の頭打ちは見えない。取得は前月から増加 |

## 5. まとめ：区分ではなくボット単位で、自分のサイトで見る

同じ検索・RAGでも、周期的に取りに来るのはOAI-SearchBotだけでした。同じユーザートリガーでも、30分の頭打ちが見えるのはChatGPT-Userだけで、取得数もChatGPT-Userは減り、Claude-Userは増えています。用途の区分で合算すると、こうした違いは打ち消し合って見えなくなります。

しかも、ここに書いた動きは3つのサイトで見えたもので、サイトによって違うかもしれません。だからこそ、自分のサイトに来ているAIボットを、ボット単位で、皆さん自身で可視化しておくことをおすすめします。

- **WordPressのサイト**：[EdgeShaping Lite](https://wordpress.org/plugins/edgeshaping-lite/)（無料）を入れると、どのAIボットがどのページを取りに来ているかを確認できます。
- **CDNやサーバーのログで継続して見たい、分析を任せたい**：EdgeShaping PROの導入や月次の分析を承っています。[mare interno](https://mareinterno.com/)からご相談ください。

このレポートは毎月更新します。

## 出典

- [Overview of OpenAI Crawlers](https://developers.openai.com/docs/gptbot)（OpenAI）
- [Does Anthropic crawl data from the web, and how can site owners block the crawler?](https://support.claude.com/en/articles/8896518)（Anthropic）
- [Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)（Perplexity）
- [Meta Web Crawlers](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers)（Meta）

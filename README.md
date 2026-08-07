# edgeshap.ing — EdgeShaping brand site

Astro + Cloudflare Pages。EN がルート、日本語は `/ja/`。日英は独立した2ツリー（対訳強制なし）。

## 構成

- `src/pages/` … 英語ページ（`/`, `/how-it-works`, `/editions`, `/about`, `/blog`）
- `src/pages/ja/` … 日本語ページ（同構成。ただし日英で構成が違ってよい）
- `src/pages/{,ja/}blog/*.md` … 記事。**Markdownファイルを置くだけで公開される**
- `src/components/HeroLog.astro` … ヒーローのログストリーム＋見出し復号演出（シグネチャー）
- `src/components/Matrix.astro` … AHTG/AHQG 4象限のスクロール連動アニメーション
- `public/_redirects` … Shopify時代のURLからの301（Cloudflare Pagesが解釈）

## 記事の追加

`src/pages/ja/blog/slug-name.md` を作り、frontmatterを書くだけ:

```yaml
---
layout: ../../../layouts/Article.astro
title: 記事タイトル
description: メタディスクリプション
date: 2026-08-07
lang: ja
path: /ja/blog/slug-name
---
```

英語記事は `src/pages/blog/` に同様に（layoutの相対パスは `../../layouts/Article.astro`）。

## ローカル開発

```
npm install
npm run dev
```

## Cloudflare Pages デプロイ

1. Cloudflare Pages → Create project → このリポジトリを接続
2. Build command: `npm run build` / Output directory: `dist`
3. Custom domain に `edgeshap.ing` を追加（DNS切替はカットオーバー時）

## カットオーバー前チェックリスト

- [ ] mareinterno.com に商品ページ・決済・特商法/返金ポリシーが公開済み
- [ ] `public/_redirects` の `/products/*` `/policies/*` の宛先を実URLに差し替え
- [ ] `src/pages/{ja/,}editions.astro` 内 `STORE` 定数を実際の商品ページURLに差し替え
- [ ] 記事内スクリーンショットを Shopify CDN から `public/images/` へ移設
- [ ] CDN版EdgeShaping（Cloudflare Workers）をこのドメインの前段に設置
- [ ] DNS を Cloudflare Pages に向ける

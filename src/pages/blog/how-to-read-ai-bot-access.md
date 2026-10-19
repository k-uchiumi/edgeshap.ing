---
layout: ../../layouts/Article.astro
title: How to Read AI Bot Traffic — Four Kinds of Visits, and What Each EdgeShaping Edition Shows You
description: Seeing that AI bots visit your site is step one. Reading what those visits mean is step two — and it needs two definitions first. This guide lays out how question specificity drives AI fetches, the four purposes behind AI bot traffic, and exactly where the free EdgeShaping Lite stops and the paid editions pick up.
date: 2026-09-21
lang: en
path: /blog/how-to-read-ai-bot-access
altPath: /ja/blog/how-to-read-ai-bot-access
---

In the previous article, we covered why AI bot traffic never appears in GA4 and how EdgeShaping Lite lets you confirm, with one plugin, that AI is in fact visiting your site.

Then the next question shows up, and it always does: **"OK — so what am I looking at?"** A table of bot names and hit counts doesn't mean anything on its own. It's the same dead end as staring at a GA4 pageview total.

This article gives you two definitions for reading AI bot traffic, and then draws a clear line: what EdgeShaping Lite can show you, and what you see once you move up.

## Definition 1: The more specific the question, the more likely the AI fetches your site

Start with a simpler question — when does an AI actually hit your server? Think of it in terms of how specific the person's question is. There are three stages.

**Stage 1 — a vague question.** "What's X like?" An AI can answer this from what it already learned. No fetch happens. This stage also covers systems like Google that answer from content they've already crawled — they don't necessarily revisit your page each time they answer.

**Stage 2 — the question gets conditions.** "If I'm going in winter," "for this particular use case." Now the AI needs current information, so it fetches your pages to build the answer. Call this a **real-time fetch for answer generation**.

**Stage 3 — the destination is chosen.** "Read this page for me." The person hands the AI a URL. Call this a **user-specified URL fetch**.

Stages 2 and 3 are what show up in your server log. Stage 1 doesn't — but it isn't zero, it's just invisible. Which leads to the first premise for reading any of this: **every AI hit in your log comes from a conversation that has already progressed past the vague stage.**

## Definition 2: Sort every AI visit by its purpose

Next, take the hits that do appear in the log and sort them by why the bot came. There are four buckets.

| Category | What it is | Label in EdgeShaping |
| --- | --- | --- |
| Real-time answer generation | The AI reads your site to build a search result or answer | Search / RAG |
| User-specified URL | A person gives the AI a page; the AI fetches it | User Trigger |
| AI training | The AI collects pages as training data | Learning |
| (Reference) General crawl | Conventional search-engine indexing | Crawl |

The first three are new kinds of traffic, created by the AI era. General crawl is old-fashioned SEO territory — it's in the table for comparison, not as a subject.

Split the traffic this way and it starts to mean something. Here's what one public site's server log looked like over a fixed period, after filtering out spoofed user agents by checking source IPs against each vendor's published ranges. Shares only:

- Across all four categories: user-specified URL fetches were about **half** of all hits. General crawl was about **30%**, AI training about **15%**, and real-time answer generation about **7%**.
- Pages that people explicitly told an AI to read outnumbered conventional search-engine crawls — by roughly **1.6x**.
- Over **99%** of user-specified URL fetches came through ChatGPT. When a person hands an AI a page to read, for all practical purposes that's happening inside ChatGPT.

## How to read each category

Four categories, four different things to look at.

**Real-time answer generation — read it as a surface.** The pages fetched here are entry points: the home page, index and listing pages, topic hubs. The top pages tend to cluster at similar counts rather than one page dominating — the AI is mapping the site, not zooming in. What you're reading here is *how the AI understands the structure of your site*.

**User-specified URL — read it as points.** This traffic concentrates on individual detail pages. A person named that page, so the demand is for that page's content specifically. In terms of Definition 1, this is Stage 3 — the end of the consideration process. What you're reading here is *which pages people wanted an AI to read for them*, and that is the most direct signal of human demand you'll find in AI bot data.

**AI training — read it as volume, not demand.** These counts run high, and none of it is demand. Training crawlers go wide and shallow; per-page counts don't carry meaning. This category is also where user-agent spoofing is most common. Read these numbers without source-IP verification and you're looking at something other than reality.

**General crawl — the old SEO layer.** Googlebot, bingbot, and their peers indexing for search. Keep it off to the side as a reference; it's not the subject when you're talking about AI.

## What EdgeShaping Lite shows you

The free edition, EdgeShaping Lite, gives you:

- Which AI bot came, when, and to which page
- Numbers with spoofed traffic removed — source IPs are checked against each vendor's published ranges, and every analytics view shows verified hits only
- Visit frequency per bot, and the most-fetched pages
- An AI × human traffic matrix (AHTG) that overlays AI fetches on human pageviews, so you can spot pages the AI reads that people don't visit

That's enough to say three things with confidence: AI is here, it's not spoofed, and these are the pages it's taking. Everything in the previous article fits inside Lite.

## Where Lite stops: it can't split traffic by purpose

Lite's limit is exactly the subject of this article. **Lite doesn't carry category information.**

Which means the surface / points / volume readings above aren't available in Lite. Real-time answer generation and user-specified URL fetches land in the same number. In the example above, the ~7% and the ~50% are indistinguishable.

An entry page fetched as part of a site map and a detail page a person explicitly asked an AI to read mean completely different things. In Lite, both are simply "pages an AI visited."

Beyond that, Lite doesn't show per-request detail such as purpose, has no API for pulling data out, and caps how many raw log rows it keeps.

## EdgeShaping (paid): the four readings work as-is

The paid edition, EdgeShaping, adds category information to the bot dictionary.

- **Category Analysis** breaks traffic into five categories — Learning, Crawl, Search / RAG, User Trigger, and Ads — so the readings in this article apply directly on screen.
- **Access Log detail** aggregates by bot × path.
- Daily aggregates are available via API.

Moving from "AI is here" to "AI is here for *this* purpose, on *these* pages" — that's the line between Lite and the paid edition.

The fifth category, Ads, separates the ad-related crawlers from OpenAI and Meta out of the other four. Their axis is different — ad delivery and relevance checks, not how an AI reads content — so they get their own bucket.

## EdgeShaping Plus: raw logs into your own pipeline

Plus is unlocked with a license key on top of the paid edition. It adds a raw-log API: every request, with its source IP.

Traffic that the verification filter drops from the screens is still returned by the API, along with the verification result. If you want to pull everything into your own data platform and apply your own rules, this is the tier.

## EdgeShaping PRO (CDN edition): the whole log, at the edge

The WordPress plugin has two structural limits.

First, it only records bots that are in its dictionary. An unknown bot never shows up — not in Lite, not in the paid edition. Second, behind a CDN or reverse proxy, the IP the plugin sees is the proxy's, and source-IP verification can't work.

EdgeShaping PRO runs at the CDN edge and records every request with the real client IP. Discovering unknown bots and verifying traffic behind a CDN both happen at this layer. The plugin's dictionary is, in fact, built from what this layer finds.

The analysis behind the shares quoted earlier was done on logs at this layer.

## The layer before GA, not after it

GA4 watches what people do after they arrive on your site. Reading AI bot traffic means watching the layer before that — the moment an AI comes to fetch your site on someone's behalf.

They're different layers, so extending GA4 habits to AI bot numbers gets you nowhere. Put the definitions first: how far along was **the person's question to the AI**, and what was the AI's purpose in fetching? Then read the numbers. That's what the two definitions in this article are for.

Start with Lite to confirm AI is here. When you're ready to read traffic by purpose, move up. Edition differences and pricing are on the purchase page.

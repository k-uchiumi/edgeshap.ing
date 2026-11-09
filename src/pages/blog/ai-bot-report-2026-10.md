---
layout: ../../layouts/Article.astro
title: "AI Bot Observation Report, October 2026: OAI-SearchBot Runs on a 24-Hour Cycle, ChatGPT-User Fetches Once per 30 Minutes"
description: A monthly, bot-by-bot report on AI crawler behavior for October 2026. OAI-SearchBot revisits the same pages on 6-hour and 24-hour cycles, and ChatGPT-User fetches any given page no more than about once every 30 minutes. PerplexityBot and Claude-User, which fall into the same categories, show neither pattern.
date: 2026-11-09
lang: en
path: /blog/ai-bot-report-2026-10
altPath: /ja/blog/ai-bot-report-2026-10
---

This report breaks down AI bot behavior in October 2026, bot by bot. Two patterns stood out. OAI-SearchBot fetches the same pages on 6-hour and 24-hour cycles. ChatGPT-User fetches any given page no more than about once every 30 minutes. Neither pattern appears in PerplexityBot or Claude-User, even though they sit in the same categories.

## 1. Scope and method

- **Sites**: a large tourism site run by a Japanese local government and a site run by a Japanese certification and education body (both from server logs), plus our own site (from EdgeShaping's CDN logs).
- **Period**: October 20–30 (240 hours) for the tourism site and October 1–31 for the association site. Month-over-month comparisons use the tourism site's September 20–30 window (also 240 hours).
- **What we counted**: page fetches with status 200 from bots verified against their operators' published IP ranges. We measured the interval between successive fetches of the same page by the same bot.
- **Categories**: training/crawl, search/RAG, and user-triggered follow the EdgeShaping bot dictionary, which is based on each operator's official documentation.

## 2. Bot-by-bot observations

### OAI-SearchBot (search/RAG): 6-hour and 24-hour cycles

- Tourism site: 14% of the intervals between fetches of the same page fell around 6 hours and 21% around 24 hours. The median interval was about 23 hours.
- Association site: 44% of intervals fell around 24 hours, with a median of exactly 24 hours.
- Our own site: we have seen this two-tier 6-hour/24-hour pattern since February 2026.

OAI-SearchBot fetches pages on a fixed schedule, before anyone asks a question about them — the same way Google crawls to build its search index. We described the scheduled fetching in more detail in [an earlier article (in Japanese)](https://mare-interno.com/blog/ai-bot-search-rag-scheduled-crawl/).

### PerplexityBot and Meta-WebIndexer (search/RAG): no visible cycle

- PerplexityBot: 8% of intervals on the tourism site and 14% on the association site fell around 24 hours. Neither site had any around 6 hours.
- Meta-WebIndexer: 8% of intervals on the tourism site and 5% on the association site fell around 24 hours.

These bots share OAI-SearchBot's category, but show no fixed cycle.

### ChatGPT-User (user-triggered): about once per 30 minutes per page

- Tourism site: only 0.1% of the intervals between fetches of the same page were between 1 and 30 minutes, while 2.9% clustered between 30 and 40 minutes.
- Association site: the median interval was about 11 hours. Almost no page is requested often enough to hit the 30-minute limit, so the pattern doesn't show.

Fetch counts are not the same as the number of times a page was asked about. Once a page is requested more often than every 30 minutes, any additional demand no longer shows up in the fetch count.

### Claude-User (user-triggered): no 30-minute ceiling

- Tourism site: 0.9% of intervals were between 1 and 30 minutes and 0.5% between 30 and 40 minutes — no clustering around 30 minutes.

## 3. Changes since last month (September)

We compared the tourism site's September and October windows, using the same 240-hour span and the same counting rules.

| Bot | Change in fetches | Change in intervals |
| --- | --- | --- |
| OAI-SearchBot | Down about 60% | Shifted from mostly 24-hour intervals (63% in September) to two tiers: 6 hours (14%) and 24 hours (21%) |
| ChatGPT-User | Down about 84% | 30-minute ceiling persists (1–30-minute intervals: 0.03% in September, 0.1% in October) |
| Claude-User | Up about 2.7× | Still no 30-minute ceiling |
| PerplexityBot | Up about 1.9× | Still no visible cycle |
| Meta-WebIndexer | Up about 1.3× | Still no visible cycle |

## 4. Bot summary (October 2026)

| Bot | Category | Official description | Observed this month |
| --- | --- | --- | --- |
| OAI-SearchBot | Search/RAG | Surfaces websites in ChatGPT search | Revisits the same pages on 6-hour and 24-hour cycles |
| PerplexityBot | Search/RAG | Surfaces websites in Perplexity search results | No fixed cycle |
| Meta-WebIndexer | Search/RAG | Improves Meta AI search result quality | No fixed cycle |
| ChatGPT-User | User-triggered | Fetches pages for user actions in ChatGPT | About once per 30 minutes per page; fetches sharply down from last month |
| Claude-User | User-triggered | Fetches pages in response to user questions | No 30-minute ceiling; fetches up from last month |

## 5. Takeaway: look at individual bots, on your own site

Within search/RAG, only OAI-SearchBot fetches on a fixed cycle. Within user-triggered bots, only ChatGPT-User shows the 30-minute ceiling — and while its fetches fell, Claude-User's rose. Add them up by category and these differences cancel each other out.

These patterns also come from just three sites, and your site may look different. That's why we recommend tracking the AI bots that visit your own site, one bot at a time.

- **On WordPress**: install [EdgeShaping Lite](https://wordpress.org/plugins/edgeshaping-lite/) (free) to see which AI bots fetch which pages.
- **For ongoing monitoring from CDN or server logs, or to have us analyze it for you**: we offer EdgeShaping PRO deployment and monthly analysis. [Contact mare interno](https://mareinterno.com/).

This report is updated monthly.

## Sources

- [Overview of OpenAI Crawlers](https://developers.openai.com/docs/gptbot) (OpenAI)
- [Does Anthropic crawl data from the web, and how can site owners block the crawler?](https://support.claude.com/en/articles/8896518) (Anthropic)
- [Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) (Perplexity)
- [Meta Web Crawlers](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers) (Meta)

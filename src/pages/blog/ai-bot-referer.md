---
layout: ../../layouts/Article.astro
title: "AI Crawlers Follow Backlinks Too: What Referrers Reveal About OAI-SearchBot"
description: OAI-SearchBot sends a referrer with its requests, which means your server logs record where it found each URL. Split those referrers four ways and three distinct crawl patterns emerge — including visits that arrived by following links on other people's websites.
date: 2026-11-19
lang: en
path: /blog/ai-bot-referer
altPath: /ja/blog/ai-bot-referer
---

AI crawlers don't stay inside your site. We found OAI-SearchBot arriving through links on third-party pages — personal blogs, wiki-style sites, community forums — that mention the site it was crawling.

We can see this because OAI-SearchBot sends a referrer header: it tells the server which page the link came from. Here's what those referrers reveal about how OAI-SearchBot discovers and revisits URLs.

## 1. Scope and method

- **Site**: a large promotional website (server logs; anonymized)
- **Period**: October 20–30, 2026
- **Bot**: OAI-SearchBot, including non-page requests such as images
- **Referrer groups**: none / homepage / other internal pages / external sites

## 2. Not every AI bot sends a referrer

Two OpenAI bots, two different behaviors:

- **OAI-SearchBot** sends a referrer.
- **ChatGPT-User** almost never does.

Referrer analysis only works for bots that send one — and OAI-SearchBot does.

## 3. Four referrer groups, four behaviors

| Referrer | Share of requests | Behavior |
| --- | --- | --- |
| None | About two-thirds | Where the URL was found is unknown |
| Other internal pages | A little over 20% | Broad and shallow |
| Homepage | About 10% | A small set of URLs, fetched again and again |
| External sites | Under 1% | Arrives via mentions on other websites |

Each group has a clearly different crawl pattern.

## 4. From the homepage: the same URLs, over and over

- OAI-SearchBot fetches the pages linked from the homepage in a burst, all within a few minutes.
- Those pages fall into two tiers: one fetched about four times a day, the other about once a day.
- In the four-times-a-day tier, pages that had been removed from the homepage kept being fetched for 10+ days — still with the homepage as the referrer.
- In the once-a-day tier, pages removed from the homepage stopped being fetched within one to two days.

A homepage referrer doesn't necessarily mean the page is on your homepage right now. It can also mean the bot found it there at some point.

## 5. From internal pages: broad, shallow, one and done

- Most referrer–URL pairs appear exactly once.
- OAI-SearchBot works through listing and campaign pages, picking up each linked URL a single time.

That's the opposite of the homepage pattern, where the same URLs are fetched repeatedly.

## 6. From external sites: backlinks are an entry point for AI, too

- OAI-SearchBot arrived via links on other websites that mention the site.
- External referrers carry only the domain, so we can't tell which page the link was on.
- Some of these externally referred requests did not return a working page.

External mentions are an entry point for AI crawlers. We don't know how the AI uses the pages it reaches this way — but backlinks look like something you need to account for with AI as well as with search engines. It's worth making sure the links pointing at your site from elsewhere still resolve to working pages.

## 7. A caveat: referrers also mark embedded resources

When OAI-SearchBot fetches images or favicons embedded in a page, that page shows up as the referrer. A referrer doesn't always mean a link was followed, so separate page requests from resource requests when you read the data.

## Takeaway: referrers tell you where an AI crawler found your URLs

Request counts only tell you that AI crawlers showed up. Break them down by referrer and three separate behaviors come into view: repeated fetching from the homepage, broad one-off sweeps through internal pages, and discovery through links on other people's sites.

- **On WordPress**: install [EdgeShaping Lite](https://wordpress.org/plugins/edgeshaping-lite/) (free) to see which AI bots fetch which pages.
- **For ongoing monitoring from CDN or server logs, or to have us analyze it for you**: we offer EdgeShaping PRO deployment and monthly analysis. [Contact mare interno](https://mareinterno.com/).

## Sources

- [Overview of OpenAI Crawlers](https://developers.openai.com/docs/gptbot) (OpenAI)

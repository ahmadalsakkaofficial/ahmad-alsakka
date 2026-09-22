# Authority Engine dream-led paid-traffic landing page

## Conversion narrative
- Build the page around the prospect’s desired future: an online reputation that finally reflects their real-world expertise
- Follow this sequence: Dream → Current gap → What becomes possible → VSL → Proof → Why the old way fails → Authority Engine mechanism → 60-day transformation → Fit → Price → Application
- Sell recognition, familiarity, trust, and stronger first conversations as credible possibilities, never as guaranteed fame, clients, followers, revenue, or virality
- Keep the technical mechanism secondary: it makes the desired future believable rather than becoming the page’s main message

## Page experience
- Add an isolated Arabic RTL page at `/authority-engine` with a minimal header and no normal website navigation
- Open with the future-focused promise, then show elegant real-life scenarios under “تخيّل العميل يعرفك قبل أول مكالمة”
- Place the VSL early, immediately after the future-state section, with a lightweight configurable 16:9 placeholder that defers any future player load
- Frame the core tension as the gap between established offline expertise and what a stranger can understand online
- Introduce Strategy → System → Production → Optimize only after the visitor wants the destination; connect every phase to its human outcome
- Present the first 60 days as building a repeatable asset around the prospect’s name, followed by optional continuation without dependency
- Reuse verified AJI and WestStep proof as “من فكرة → لمحتوى → لوصول حقيقي”, Ahmad’s real portrait, and the existing visual identity
- Keep `/` and all existing homepage components unchanged

## Qualification flow
- Build the requested eight-step conversational form with preserved answers, back navigation, validation, progress, international dialing-code selection, duplicate-submit protection, and accessible mobile controls
- Capture UTMs, `fbclid`, referrer, landing URL, qualification answers, and contact details
- Store applications privately in a new backend table reachable only by trusted server code
- Redirect successful applications to `/authority-engine/thank-you`

## Pricing and qualification
- State `3,000 USD` per month, a two-month initial engagement, and `6,000 USD` total for the initial 60 days without “starting from” language
- Keep Instagram, TikTok, and short-form Authority Engine work as the core scope
- Explain that long-form YouTube, Podcast, expanded production, and additional platforms are scoped and priced separately
- Keep the fixed-price financial-fit question inside the form without shaming or aggressively blocking any answer

## Measurement and legal
- Add configurable Meta Pixel support without inventing an ID
- Implement `PageView`, `ViewContent`, `ApplicationStart`, step tracking, submit/error hooks, and `Lead` only after confirmed storage; prepare an `event_id` for future server-side deduplication
- Add the requested GA4-compatible data-layer hooks
- Add `/privacy` and `/terms` with clear owner-review notices before ads run

## Verification
- Test desktop and mobile RTL, every CTA, VSL sizing, complete form navigation, validation, submission, thank-you redirect, attribution capture, and analytics timing
- Confirm the homepage still renders unchanged and report any unavailable credentials or content
- Verify the page leads with the destination, contains no fake proof or promises, and states the price and scope exactly

## Technical details
- New route files will match TanStack’s generated route IDs exactly
- New public-schema storage will include explicit service-role grants and RLS in the same migration, with no public read policy
- Existing design tokens, Lalezar typography, Button controls, CDN assets, and verified AJI/WestStep metrics will be reused

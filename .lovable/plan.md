# Authority Engine paid-traffic landing page

## Build
- Add an isolated Arabic RTL page at `/authority-engine` with its own minimal header, mobile-first layout, verified proof, Ahmad’s portrait, clear two-month pricing, FAQ, and repeated form CTAs
- Keep `/` and its existing components unchanged
- Add a lightweight configurable 16:9 VSL placeholder that defers any future player load until a video URL is supplied

## Qualification flow
- Build the requested eight-step conversational form with preserved answers, back navigation, validation, progress, international dialing-code selection, duplicate-submit protection, and accessible mobile controls
- Capture UTMs, `fbclid`, referrer, landing URL, qualification answers, and contact details
- Store applications privately in a new backend table reachable only by trusted server code
- Redirect successful applications to `/authority-engine/thank-you`

## Measurement and legal
- Add configurable Meta Pixel support without inventing an ID
- Implement `PageView`, `ViewContent`, `ApplicationStart`, step tracking, submit/error hooks, and `Lead` only after confirmed storage; prepare an `event_id` for future server-side deduplication
- Add the requested GA4-compatible data-layer hooks
- Add `/privacy` and `/terms` with clear owner-review notices before ads run

## Verification
- Test desktop and mobile RTL, every CTA, VSL sizing, complete form navigation, validation, submission, thank-you redirect, attribution capture, and analytics timing
- Confirm the homepage still renders unchanged and report any unavailable credentials or content

## Technical details
- New route files will match TanStack’s generated route IDs exactly
- New public-schema storage will include explicit service-role grants and RLS in the same migration, with no public read policy
- Existing design tokens, Lalezar typography, Button controls, CDN assets, and verified AJI/WestStep metrics will be reused

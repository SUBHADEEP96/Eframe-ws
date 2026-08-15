# Homepage section redesign notes

- **Clientele:** server-rendered, deduplicated, responsive two-to-six-column logo cards using every available CMS logo or a broader static asset fallback. Images preserve their aspect ratio and reveal color on hover.
- **Success stories:** accessible tab navigation uses CMS categories and a preferred business-category order. Cards retain copy, client, imagery, and deep links, with responsive one/two/three-column layouts.
- **Events & moments:** a lightweight client component creates a focused center slide and depth-scaled side slides without an animation dependency. It supports buttons, dots, touch swipes, focus styles, and reduced motion.
- All below-fold media uses responsive `next/image` sizing without priority loading.

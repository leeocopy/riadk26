# Riad KA Redesign Guidelines

## Project Identity
- **Goal:** Redesign the Riad KA homepage to match the visual rhythm and premium feel of riadxo.com without copying it exactly.
- **Brand Colors:** Warm brown/gold (from logo), dark gray, linen/off-white.
- **Typography:** Lato (body), Poppins (headings).
- **Core Elements to Keep:** Existing Riad KA identity, colors, navbar, logo, hero wording, and SEO content.

## Implementation Strategy
Since the live site is built with WordPress + Astra + Elementor, we cannot edit local source code. Our workflow is:
1. **Local Preview:** Build the sections, CSS, and JS locally (`index.html`, `css/custom-riadka.css`, `js/custom-riadka.js`) to get visual approval.
2. **WordPress Deployment:** Once approved, copy the CSS into Astra Customizer, the JS into WP headers/footers, and rebuild the sections manually via the Elementor visual builder.

## Key Design Principles
- **No Heavy Libraries:** Use vanilla CSS and JS (`IntersectionObserver` for animations, custom vanilla slider).
- **Whitespace:** Use generous padding (`100px` desktop, `60px` mobile) to create an elegant breathing room between sections.
- **Card Grids:** Use clean card layouts for "NOS SERVICES" and "ACTIVITÉS".
- **Clean Footer:** Remove WooCommerce/e-commerce template leftovers.

## Current Status (Phase 1)
Local preview page (`index.html`) has been created with custom CSS and JS, and AI-generated placeholder images. Awaiting user review of the preview before proceeding to Phase 2 (WordPress Deployment).

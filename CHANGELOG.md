# Changelog

## Part 1 - Foundation
- Created a multi-page semantic HTML website structure.
- Added Home, Menu, About, Order, Gallery, Contact and References pages.
- Added a student-created SVG logo.
- Added low-fidelity wireframes and a visual sitemap.
- Added organisation background, target audience, proposed mission/vision and website goals.
- Corrected the prototype's image-source inconsistency by using Wikimedia Commons credits explicitly.

## Part 2 - Responsive visual design
- Added `css/style.css` as an external stylesheet.
- Applied the cream, orange and green visual system from the original prototype.
- Added CSS Grid and Flexbox layouts.
- Added responsive breakpoints for tablet and mobile widths.
- Added `:hover`, `:focus-visible`, `:active` and active-navigation states.
- Added responsive images, forms, gallery, cart drawer and map styling.
- Added reduced-motion support for accessibility.

## Part 3 - JavaScript, forms and SEO
- Added external `js/script.js`.
- Added mobile navigation behaviour.
- Added menu search and category filters with live result counts.
- Added an order cart with quantity controls, localStorage persistence and total calculation.
- Added WhatsApp order-message generation with a clearly identified demo number placeholder.
- Added a keyboard-accessible gallery lightbox.
- Added client-side validation with inline error messages for the order-enquiry and contact forms.
- Configured both forms for Netlify Forms and AJAX submission after deployment.
- Added a general OpenStreetMap embed without inventing a private business address.
- Added unique SEO titles/descriptions, `robots.txt`, `sitemap.xml`, `404.html`, and `netlify.toml` security headers.
- Added deployment placeholders that must be replaced only when confirmed business/live-site details are available.

## Final QA and submission preparation
- Linked `js/script.js` from every HTML page so the Part 3 functionality is actually loaded in the final site.
- Replaced the weaker Rooibos image source with a clearly licensed Wikimedia Commons source by Żółwiciel (CC BY 3.0).
- Added a student-created local SVG food-image fallback for situations where an external photograph cannot load.
- Added explanatory HTML comments to make the project structure easier to review and maintain.
- Ran automated checks for form validation, menu search/filtering, cart totals, mobile navigation, gallery lightbox behaviour and responsive overflow.
- Regenerated desktop, tablet and mobile evidence screenshots after the final functionality pass.

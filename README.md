# Ous Ma'mikis WhatsApp Café - WEDE5020 PoE

**Student:** Vuyelwa Sewela  
**Student number:** ST10502203  
**Module:** Web Development (Introduction) (WEDE5020)  
**Project type:** Small-business website prototype  
**Selected organisation:** Ous Ma'mikis WhatsApp Café

## Project overview
Ous Ma'mikis WhatsApp Café is a small food business that currently uses WhatsApp to share menu information and receive orders. The website is designed to make meals, sample prices and ordering information easier to browse, especially for nearby office workers whose workplaces do not have canteens.

The project follows the three-part WEDE5020 development sequence: Part 1 establishes the semantic HTML foundation and project planning, Part 2 applies responsive CSS styling, and Part 3 adds JavaScript functionality, forms, SEO, testing and deployment preparation.

## Goals and objectives
- Give customers a clear, mobile-friendly menu.
- Reduce the need to request the menu manually through WhatsApp.
- Support enquiry and ordering actions without removing the existing WhatsApp channel.
- Improve the business's professional online presence.
- Use semantic HTML, accessible navigation and legal/referenced image sources.
- Produce a responsive experience that works across desktop, tablet and mobile layouts.

## Target audience
- Staff at nearby companies without canteens.
- Office workers in the surrounding area.
- Regular customers from the local community.
- Customers looking for convenient prepared meals.

## Website features and functionality
### Core pages
- `index.html` - Home and project value proposition.
- `menu.html` - Static HTML menu enhanced with search, category filtering and cart controls.
- `about.html` - Business background, proposed mission/vision and target audience.
- `order.html` - Four-step ordering explanation and validated order-enquiry form.
- `gallery.html` - Responsive gallery with a JavaScript lightbox.
- `contact.html` - Contact information, validated contact form and map section.
- `references.html` - Research sources and Creative Commons image credits.
- `thank-you.html` - Form-success destination.
- `404.html` - Custom not-found page for deployment.

### Part 3 interactive features
- Responsive mobile-navigation toggle.
- Live menu search and category filtering.
- Order cart with quantity controls, calculated totals and `localStorage` persistence.
- Formatted WhatsApp order-enquiry message generation.
- Keyboard-accessible gallery lightbox with Escape-to-close behaviour.
- Client-side form validation with inline accessible error feedback.
- Netlify-ready Contact and Order Enquiry forms.
- Local SVG image fallback if a credited remote food photograph cannot load.

## Sitemap
A visual sitemap is stored at `docs/sitemap.png`.

![Ous Ma'mikis website sitemap](docs/sitemap.png)

## Timeline and milestones
The planned effort totals approximately **90 hours**, matching the minimum suggested time in the assessment brief.

| Milestone | Main work | Estimated hours | Alignment |
|---|---|---:|---|
| Planning and proposal | Research, two proposals, sitemap, wireframes, file structure | 18 | Before Part 1 due date |
| Part 1 HTML foundation | Semantic pages, content, navigation, references, README | 24 | Part 1 |
| Part 2 visual design | External CSS, Grid/Flexbox, responsive breakpoints, states, screenshots | 22 | Part 2 |
| Part 3 functionality | JavaScript, search/filter, gallery, forms, WhatsApp, SEO, sitemap.xml | 20 | Part 3 |
| Testing and deployment | Browser/device checks, debugging, README/changelog, Netlify preparation | 6 | Before final submission |

## Part 1 - Building the foundation
Part 1 establishes the multi-page semantic HTML structure, organisation content, sitemap, low-fidelity wireframes, references and project documentation. The selected café project is based on the organisation information originally documented in the student's WEDE5020 ICE Task 1.

The Part 1 planning document is available at `docs/Website_Project_Proposal.docx` and contains both required 300-500 word proposals before confirming Ous Ma'mikis as the selected implementation.

## Part 2 - Designing the visuals
Part 2 adds `css/style.css` as the external stylesheet. It applies the cream, orange and green visual system, typography hierarchy, CSS Grid/Flexbox layouts, responsive images, pseudo-class interaction states and responsive breakpoints at 56rem and 38rem. Relative units and `clamp()` help the layout scale between devices.

Responsive evidence is stored in `docs/screenshots/`:
- `desktop-home.png` - 1440 × 1000
- `tablet-menu.png` - 768 × 1024
- `mobile-contact.png` - 390 × 844

## Part 3 - JavaScript, forms, SEO and deployment
Part 3 adds `js/script.js` with mobile navigation, menu search/filtering, the order cart, WhatsApp message generation, gallery lightbox and client-side form validation. Both forms are marked up for Netlify Forms and can submit without a custom server-side application once Form detection is enabled on the deployed Netlify site.

SEO work includes unique page titles and meta descriptions, semantic headings, descriptive links, image alt text, `robots.txt`, `sitemap.xml` and a custom `404.html`. `netlify.toml` adds basic response security headers.

## Testing and debugging
`docs/TESTING.md` contains the test record and final manual checklist. Automated checks passed for:
- required-field and email validation;
- menu search/filtering;
- cart count and total calculation;
- mobile-navigation opening;
- gallery lightbox open/Escape-close behaviour;
- desktop/tablet/mobile horizontal-overflow checks;
- JavaScript syntax and tested-page runtime errors.

The reusable automated QA script is stored at `docs/run_qa.py`.

## Changelog
See `CHANGELOG.md` for the development record across Parts 1, 2, 3 and the final QA pass.

## Git milestones
The repository contains real staged commits created while the project was assembled:
- `part1-foundation` - semantic HTML, planning, proposal, sitemap and wireframes.
- `part2-responsive` - external CSS and responsive design.
- `part3-final` - JavaScript, forms, SEO and deployment configuration.
- `submission-ready` - final QA, source/reference cleanup and evidence.

See `docs/GIT_WORKFLOW.md` for suggested future commit messages if confirmed business details or lecturer feedback are added.

## Before final public deployment
The project deliberately does **not** invent private business information. Replace these placeholders only after the café confirms them:
1. `BUSINESS_WHATSAPP` in `js/script.js`.
2. Prototype trading hours on `contact.html`.
3. General map with the approved business/service location.
4. Sample menu items and prices with the confirmed current menu.
5. `YOUR-SITE-NAME` in `sitemap.xml` and `robots.txt` after Netlify assigns the live URL.
6. Enable **Form detection** in the Netlify site's Forms settings.

## Deployment
The project is prepared for Netlify static deployment. Connect the GitHub repository (preferred so the development history remains visible) or deploy the project folder, enable Form detection, run live form tests, and then update `sitemap.xml` and `robots.txt` with the final hostname.

## References
References are listed here as required by the PoE and are also presented on `references.html`. Access date for online sources: **2 November 2026**.

### Organisation/project source
- Sewela, V. (2026) *WEDE5020 ICE Task 1* [Unpublished student work]. The Independent Institute of Education.

### Web development and project research
- Afrihost (2026) *Domain search and registration*. Available at: https://www.afrihost.com/domains (Accessed: 2 November 2026).
- Afrihost (2026) *Shared Hosting*. Available at: https://www.afrihost.com/shared-hosting (Accessed: 2 November 2026).
- Google Search Central (2026) *Influencing title links in Google Search*. Available at: https://developers.google.com/search/docs/appearance/title-link (Accessed: 2 November 2026).
- MDN Web Docs (2026) *Responsive web design*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design (Accessed: 2 November 2026).
- MDN Web Docs (2026) *Semantic HTML*. Available at: https://developer.mozilla.org/en-US/curriculum/core/semantic-html/ (Accessed: 2 November 2026).
- Netlify (2026) *Pricing and plans*. Available at: https://www.netlify.com/pricing/ (Accessed: 2 November 2026).
- Netlify Docs (2026) *Forms setup*. Available at: https://docs.netlify.com/manage/forms/setup/ (Accessed: 2 November 2026).
- OpenAI (2026) *ChatGPT (GPT-5.6 Sol)* [Large language model]. Available at: https://chatgpt.com/ (Accessed: 2 November 2026). AI assistance was used for planning, code drafting/review and documentation; the student remains responsible for verification and final submission.
- Orcanically (2026) *What a Website Costs in South Africa: 2026 Price Survey*. Available at: https://orcanically.co.za/resources/website-cost-survey/ (Accessed: 2 November 2026).

### Image credits
- Berkowitz, D. (2009) *Bunny Chow* [Photograph]. Wikimedia Commons. CC BY 2.0. Available at: https://commons.wikimedia.org/wiki/File:Bunny_Chow.jpg (Accessed: 2 November 2026).
- Lemoine, O. (2020) *Bobotie South Africa* [Photograph]. Wikimedia Commons. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Bobotie_South_Africa.jpg (Accessed: 2 November 2026).
- Ossewa (2010) *Boerewors braai* [Photograph]. Wikimedia Commons. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Boerewors_braai.jpg (Accessed: 2 November 2026).
- Philipp (2007) *Chakalaka* [Photograph]. Wikimedia Commons. CC BY 2.0. Available at: https://commons.wikimedia.org/wiki/File:Chakalaka.jpg (Accessed: 2 November 2026).
- Stasia007 (2014) *Vetkoek* [Photograph]. Wikimedia Commons. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Vetkoek.jpg (Accessed: 2 November 2026).
- Żółwiciel (2010) *Rooibos tea in a glass with dry rooibos* [Photograph]. Wikimedia Commons. CC BY 3.0. Available at: https://commons.wikimedia.org/wiki/File:Rooibos_tea_in_a_glass_with_dry_rooibos.jpg (Accessed: 2 November 2026).

The local `assets/food-placeholder.svg` fallback artwork was created specifically for this student project and does not require an external image credit.

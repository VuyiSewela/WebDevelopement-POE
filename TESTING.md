# Testing and debugging record

**Project:** Ous Ma'mikis WhatsApp Café  
**Module:** WEDE5020  
**Student:** Vuyelwa Sewela (ST10502203)  
**Automated QA date:** 2 November 2026

## Part 1: structure and navigation checks
The final project was checked programmatically to confirm that:
- all nine HTML documents are present and readable;
- internal `.html` links point to existing local pages;
- each page uses one main `<h1>` heading;
- site navigation is consistent across the main pages;
- images have descriptive `alt` text or an intentionally empty `alt` value for the repeated decorative logo;
- semantic elements such as `header`, `nav`, `main`, `section`, `article`, `figure` and `footer` are used where appropriate;
- explanatory comments identify major HTML, CSS and JavaScript sections.

## Part 2: responsive checks
Automated Chromium checks were run at the evidence sizes below. No horizontal overflow was detected.

| Evidence | Viewport | Result |
|---|---:|---|
| Desktop Home | 1440 × 1000 | Pass |
| Tablet Menu | 768 × 1024 | Pass |
| Mobile Contact | 390 × 844 | Pass |

Evidence is stored in `docs/screenshots/`.

The responsive review covered:
- desktop/tablet/mobile layout changes;
- mobile navigation presentation;
- Grid/Flexbox wrapping;
- readable typography and controls;
- menu cards and forms;
- responsive image containers;
- focus, hover and active states;
- no horizontal page overflow.

### Automated evidence environment note
The automated browser used for evidence generation cannot access outbound internet resources. The screenshots therefore use the project's local food-image fallback artwork instead of downloading the credited Wikimedia photographs. This is an automated-test limitation, not a change to the website: the deployed HTML still points to the referenced Wikimedia Commons images, with a local fallback if a remote image cannot load. The OpenStreetMap iframe similarly requires internet access and should be visually confirmed after deployment.

## Part 3: JavaScript/functionality checks
The following automated checks passed in headless Chromium:

| Function | Test performed | Result |
|---|---|---|
| Menu filter | Six menu items initially visible | Pass |
| Search | Search for `bunny` returns one visible menu item | Pass |
| Cart | Add Bunny Chow to order | Pass |
| Cart count | Count updates to `1` | Pass |
| Cart total | Total updates to `R45.00` | Pass |
| Mobile menu | Toggle adds the open navigation state | Pass |
| Gallery lightbox | First gallery image opens the dialog | Pass |
| Keyboard close | Escape closes the lightbox | Pass |
| Required validation | Empty contact form marks required fields invalid | Pass |
| Email validation | Invalid email is rejected with inline feedback | Pass |
| JavaScript runtime | No page-level JavaScript errors in the tested contact/menu/gallery pages | Pass |

`node --check js/script.js` was also used to verify JavaScript syntax.

## Forms and deployment behaviour
- Both forms use HTML validation constraints plus accessible JavaScript error messages.
- On a local `file:`/localhost preview, a valid form reports that validation passed rather than pretending a server accepted the submission.
- On Netlify, the forms are configured for Netlify Forms and POST to the deployed site once **Form detection** is enabled.
- The final live form submission must be tested after deployment because the automated environment is not the user's Netlify account.

## SEO/deployment checks
The project includes:
- unique page titles and meta descriptions;
- semantic heading structure;
- descriptive image alternative text;
- `robots.txt`;
- `sitemap.xml`;
- custom `404.html`;
- `netlify.toml` security headers.

## Final manual checks before LMS submission
The following checks depend on the student's browser/accounts or confirmed café details and must be completed after deployment:
1. Open every page in Microsoft Edge and Firefox and record any differences.
2. Confirm the Wikimedia food photographs load online and that the OpenStreetMap embed displays.
3. Submit one test Contact form and one Order Enquiry form in Netlify and confirm they appear in the site's Forms dashboard.
4. Replace the demo WhatsApp number with the confirmed business number.
5. Confirm the business's publishable hours, collection point/delivery area and final menu/prices.
6. Replace `YOUR-SITE-NAME` in `robots.txt` and `sitemap.xml` with the deployed Netlify hostname.
7. Re-test all navigation, mobile menu, menu search/filter, cart, gallery and forms on the live URL.

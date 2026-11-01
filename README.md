# Pick n Pay – Local Branch Website

Module: WEDE5020 (Web Development)
Student Name: Lethukuthula Khumalo
Student Number: ST10536423
Group: Individual submission
Live site: https://lethuk-dis.github.io/picknpay-website/
Repository: https://github.com/LethuK-dis/picknpay-website

---

## Project Overview

This project is a responsive website built for a local Pick n Pay branch, designed to give the community an easy way to learn about the branch, its services, and how to find and contact it. The site follows Pick n Pay's brand identity (dark blue and cherry red) and focuses on clarity, accessibility, and ease of navigation across devices.

## Website Goals and Objectives

- Increase awareness of the branch's location, trading hours, and in-store services
- Drive foot traffic and online enquiries from the surrounding community
- Promote weekly specials and the Smart Shopper loyalty programme
- Provide a simple, accessible way for customers to submit enquiries

## Key Features and Functionality

- Fully responsive design (desktop, tablet, mobile) with an accessible mobile menu
- Home page with hero banner, welcome introduction, FAQ accordion, and an image gallery with lightbox
- About page with history and a tabbed Mission / Vision / Team section
- Services page with department cards and a searchable, filterable, sortable product catalogue loaded with JavaScript
- Enquiry page: validated form that returns an estimated cost and availability for a chosen product
- Contact page: two branch cards, an interactive Leaflet map, and a validated form that compiles an email
- Active-page highlighting (`aria-current="page"`) and visible keyboard focus styles
- SEO files: `robots.txt`, `sitemap.xml`, per-page titles, descriptions, canonical links, and structured data

## Technologies Used

- HTML5, CSS3 (Flexbox, Grid, custom properties, media queries)
- JavaScript (vanilla): DOM manipulation, `fetch` (AJAX), form validation
- Leaflet 1.9.4 with Esri World Street Map tiles
- Google Fonts (Inter)
- Formspree (optional form backend)
- Git and GitHub, GitHub Pages for deployment

## Timeline and Milestones

- Week 1–2: Research and proposal approval
- Week 3: Sitemap and wireframe development
- Week 4–5: HTML file creation and folder structure setup
- Week 6: Content integration and CSS styling
- Week 7: Responsive design, testing, debugging, and submission (Part 2)
- Part 3: Part 2 feedback fixes, JavaScript functionality, SEO, form handling, deployment

## Sitemap

index.html (Home)
├── about.html (About Us)
├── services.html (Services)
├── enquiry.html (Enquiry)
└── contact.html (Contact)

## Folder Structure

picknpay-website/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    └── screenshots/

## Part 3: Functionality

| Feature | Where | How it works |
|---|---|---|
| Accordion | index.html | FAQ buttons use `aria-expanded` and `aria-controls`; one panel opens at a time |
| Tabs | about.html | `role="tablist"` with click and arrow-key support |
| Gallery with lightbox | index.html | Thumbnails open a full-size dialog; Escape, backdrop click, or the close button dismiss it and return focus |
| Dynamic content | services.html | Products are rendered from a JavaScript array using DOM methods (`createElement`, `textContent`) |
| Search, filter, sort | services.html | Live search by name, category filter, and sort by name or price |
| Interactive map | contact.html | Leaflet map with a marker and popup per branch; "Show on map" buttons fly to a branch |
| Animations | all pages | Hero entrance, accordion and tab open transitions, card hover, lightbox fade. All are disabled by `prefers-reduced-motion` |
| Enquiry form | enquiry.html | Validates, submits with `fetch`, then shows a cost and availability response |
| Contact form | contact.html | Validates, then compiles an email (`mailto:`) the customer can send to the recipient set in `script.js` |

### Form validation
HTML5 attributes (`required`, `type`, `minlength`, `maxlength`, `min`, `max`) are combined with JavaScript checks: name (letters only, 2–60 characters), email format, South African phone numbers (`082 123 4567` or `+27 82 123 4567`), quantity (whole number 1–50), and message length (10–500 characters). Errors appear beside each field, are announced with `role="alert"`, and focus moves to the first invalid field.

## Part 3: SEO

### On-page SEO
- **Keyword research:** target phrases are "Pick n Pay Mbombela", "Pick n Pay Barberton", "Smart Shopper", "fresh produce", and "in-store bakery". They appear in titles, headings, and body text.
- **Title tags and meta descriptions:** each page has a unique title and a description under about 160 characters.
- **Header tags:** one `h1` per page, with `h2` and `h3` used in order.
- **Image optimisation:** descriptive file names and meaningful `alt` text, with `loading="lazy"`.
- **URL structure:** short, lowercase, descriptive page names (`services.html`, `contact.html`).
- **Internal linking:** the main navigation, footer links, and contextual links inside page content.
- **Mobile-friendliness:** viewport meta tag, fluid layouts, and tap-friendly controls.
- **Structured data:** `GroceryStore` JSON-LD on the contact page (address, phone, hours, coordinates).

### Off-page SEO (plan)
- **Backlinks:** request links from the local Mbombela and Barberton business directories and the community pages.
- **Social media:** share the site and weekly specials on the branch's social media pages.
- **Local SEO:** claim a Google Business Profile for each branch using the same name, address, and phone number as the website.

### Additional SEO and technical items
- **robots.txt:** allows all crawlers and points to the sitemap.
- **sitemap.xml:** lists all five pages.
- **Page speed:** deferred JavaScript, lazy-loaded images, preconnect for fonts, and no large libraries on pages that do not need them (Leaflet loads only on the contact page).
- **Security:** GitHub Pages serves the site over HTTPS; user input is displayed with `textContent`, never `innerHTML`; no secrets are stored in the code; form input is validated on the client (server-side validation is handled by the form service).

## Accessibility

- Skip-to-content link on every page
- Visible `:focus-visible` outlines on links, buttons, and form fields
- `aria-expanded` on the menu button and accordion, `aria-current="page"` on the active link
- Labelled form fields, `aria-invalid` and `aria-describedby` for errors
- Colour contrast checked: white on `#003087` and `#e4002b`, and error text `#b00020` on white all meet WCAG AA (4.5:1). The hover colour on the blue header was changed to a light pink for the same reason.

## Testing

| Area | Details |
|---|---|
| Browsers and devices | Microsoft Edge 156.0.4314.50 on a Windows 11 laptop; Safari 26.6.2 on an iPhone 11 |
| Viewport sizes | Laptop screen (Edge); 768px tablet width emulated with Edge developer tools, as no physical tablet was available; iPhone 11 screen (Safari) |
| Keyboard | Tab, Shift+Tab, Enter, Space, Escape, and arrow keys (tabs) |
| Forms | Empty fields, invalid email, invalid phone number, short message, valid submission |
| Pages checked | index, about, services, enquiry, and contact |

Tested by resizing the viewport in Edge developer tools and by opening the live site on an iPhone in Safari.

## Screenshots

![Desktop view](images/screenshots/desktop.png)
![Tablet view](images/screenshots/tablet.png)
![Mobile view](images/screenshots/mobile.png)

## How to Run the Website

1. Download or clone the project repository.
2. Open the project folder.
3. Open index.html in a web browser (internet access is needed for the map and font).
4. To receive enquiry-form submissions, create a form at formspree.io and paste its URL into `FORMSPREE_URL` in `js/script.js`. Set `RECIPIENT_EMAIL` to the branch email address for the contact form.

## Changelog

### 1 November 2026 – Part 3: Enhancing Functionality and SEO
- Added JavaScript interactivity: accordion (index), tabs (about), gallery lightbox (index), and animations and transitions
- Added dynamically rendered product catalogue with search, category filter, and sort (services)
- Added an interactive Leaflet map with a marker and popup for each branch (contact), replacing the two embedded Google Maps iframes
- Rebuilt the enquiry form with HTML5 and JavaScript validation, `fetch` submission, and a cost and availability response
- Rebuilt the contact form with validation and a compiled email the customer can send
- Added `robots.txt` and `sitemap.xml`
- Added unique titles, meta descriptions, canonical links, Open Graph tags, and `GroceryStore` JSON-LD
- Added a footer link list and contextual internal links
- Deployed the site on GitHub Pages
- Updated the README with Part 3 documentation, testing, and references

### 1 November 2026 – Part 2 Feedback Edits
- **Form functionality:** the forms previously used `action="#"` and sent nothing. They now validate input with inline error messages, and submit with `fetch` (enquiry) or compile an email (contact)
- **Mobile navigation accessibility:** added `aria-expanded` to the menu button, updated on open and close; replaced the "Menu" label with "☰ Menu" / "✕ Close"; the menu now closes after a page is selected and on Escape
- **Responsive navigation layout:** on mobile the expanded menu is positioned directly beneath the header with a border and shadow; checked at widths between 600px and 700px
- **Active-page navigation:** the current page link gets an `active` class and `aria-current="page"`, styled with a bold weight and a cherry-red underline
- **Typography:** replaced Arial with Inter; added consistent styles for h1, h2, h3, labels, and buttons; heading sizes now scale with `clamp()` and spacing is reduced on small screens
- **Flexible images:** replaced `height: 160px` on service images with `aspect-ratio: 4 / 3` so images are not over-cropped on mobile
- **Accessibility:** replaced `:focus` styles with `:focus-visible`; added a skip link, descriptive alt text, and labelled the map region; fixed low contrast on the header hover colour
- **References:** added direct URLs, access dates, and one consistent referencing format (see References)
- **README evidence:** added screenshots for desktop, tablet, and mobile, the live site URL, and a testing section
- **Commits:** future commit messages are more specific (for example, "Add responsive mobile navigation")

### 18 September 2026 – Part 2: CSS Styling & Responsive Design
- Implemented base/default styles (font family, colours, spacing) across all pages
- Added typography styling (font sizes, weights, line-height)
- Applied CSS Grid/Flexbox for layout structure (service grid, branch grid, header)
- Added decorative and colour styling using Pick n Pay brand colours
- Implemented pseudo-classes (:hover, :focus, :active) on navigation, buttons, form fields, and cards
- Added tablet breakpoint (max-width: 1024px) adjusting grid columns, layout, and spacing
- Refined mobile breakpoint (max-width: 600px/700px) for hero text, service grid, form width, and nav toggle
- Tested responsiveness across desktop, tablet, and mobile viewport sizes

### 14 August 2026 – Part 1: Initial Website Structure
- Created initial HTML file structure (index, about, services, enquiry, contact)
- Set up folder structure (css, js, images)
- Added semantic HTML elements and consistent navigation
- Sourced initial content and images for the Pick n Pay branch website
- Set up private GitHub repository and pushed initial commit

## References

Format: Author/Organisation (Year) *Title*. Available at: URL (Accessed: date).

### Sources and tools
- Pick n Pay Group Ltd. (n.d.) *Investor Relations & public information*. Available at: https://www.picknpayinvestor.co.za (Accessed: 1 November 2026).
- Wikipedia contributors (n.d.) *Pick n Pay*. Available at: https://en.wikipedia.org/wiki/Pick_n_Pay (Accessed: 1 November 2026).
- Brandfetch (n.d.) *Pick n Pay Stores – Logo & Brand Assets*. Available at: https://brandfetch.com/picknpay.co.za (Accessed: 1 November 2026).
- Leaflet (2023) *Leaflet – an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com (Accessed: 1 November 2026).
- OpenStreetMap contributors (n.d.) *OpenStreetMap*. Available at: https://www.openstreetmap.org/copyright (Accessed: 1 November 2026).
- Esri (n.d.) *World Street Map*. Available at: https://www.arcgis.com/home/item.html?id=3b93337983e9436f8db950e38a8629af (Accessed: 1 November 2026).
- Google (n.d.) *Inter – Google Fonts*. Available at: https://fonts.google.com/specimen/Inter (Accessed: 1 November 2026).
- Formspree (n.d.) *Formspree documentation*. Available at: https://formspree.io (Accessed: 1 November 2026).

### Images

All photos are used under the Unsplash licence unless stated otherwise. Accessed 1 November 2026.

| File | Photographer / Author | Source | Direct URL |
|---|---|---|---|
| fresh-produce.jpg | Thomas Le | Unsplash | https://unsplash.com/photos/vegetable-stand-photo-pRJhn4MbsMM |
| bakery.jpg | Elisha Terada | Unsplash | https://unsplash.com/photos/a-bakery-filled-with-lots-of-baked-goods-IYjXGUpJH74 |
| Fruits.jpg | Gemma C | Unsplash | https://unsplash.com/photos/fresh-fruit-on-grocery-store-shelves-stpjHJGqZyw |
| smart-shopper.jpg | Unknown author (Retail Brief Africa) | retailbriefafrica.co.za | https://www.retailbriefafrica.co.za/wp-content/uploads/2025/12/Smart-shopper.png |

Note: smart-shopper.jpg shows Pick n Pay's own Smart Shopper card and is used for educational purposes only. All Pick n Pay branding belongs to Pick n Pay.

## Author

Lethukuthula Khumalo
# FAQ Category Navigation

A responsive FAQ page with sticky category navigation, grouped accordion questions, and automatic active-section highlighting.

## Layout and behavior

- Desktop: a fixed-position sticky category menu on the left and grouped FAQ content on the right.
- Mobile: the category menu becomes a horizontally scrollable navigation row.
- Clicking a category smoothly scrolls to its matching content section.
- The active category updates automatically while scrolling, using IntersectionObserver.
- Each FAQ category has an independent accordion.
- The first question in all four categories is expanded by default.
- Category headings use **H2** and individual question headings use **H3**. The page title uses **H1**.
- Built with standalone HTML, CSS, and vanilla JavaScript. No framework or external library is required.

## Files

- `index.html` — page structure, category navigation, and FAQ content
- `css/style.css` — desktop, tablet, and mobile layouts
- `js/main.js` — independent accordion behavior and active navigation tracking

## Customize categories and questions

1. Update the four category labels in the `.faq-nav` navigation.
2. Keep each navigation link's hash (for example, `#buying-product`) matched with its section ID.
3. Edit the corresponding `h2` category heading.
4. Add, remove, or edit `.faq-item` elements inside the category's `.faq-list`.
5. Keep each question button's `aria-controls` value matched with its answer panel ID. All question and answer IDs must be unique across the page.

To make a question expanded by default, add `is-open` to its `.faq-item`, set the button's `aria-expanded` to `true`, and remove the `hidden` attribute from its answer panel. The JavaScript allows multiple answers to remain open, including across different categories.

## Responsive behavior

The desktop sidebar uses `position: sticky`. On screens up to 680px wide, it changes to a horizontally scrollable category navigation bar positioned above the FAQ content.
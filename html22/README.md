# FAQ & Image Feature Section

A responsive FAQ section paired with an overlapping two-image composition and a video popup.

## Layout

- Desktop: FAQ content on the left and overlapping image composition on the right.
- Mobile: image composition appears first, followed by the FAQ heading, description, and accordion.
- The first FAQ item is expanded by default.
- Accordion behavior keeps one answer open at a time.
- The green play button opens an accessible video modal.
- Built with standalone HTML, CSS, and lightweight vanilla JavaScript. No framework required.

## Files

- `index.html` — section markup, FAQ items, and video modal
- `css/style.css` — layout, accordion, modal, and responsive styles
- `js/main.js` — accordion and video modal behavior
- `images/energy-main.svg` — main image placeholder
- `images/energy-secondary.svg` — secondary image placeholder

## Replace the images

Replace the SVG files in `images/` with your own images, or change the image paths in `index.html`.
Keep the main and secondary image proportions close to the current layout for the best result.

## Configure the video

Find the play button in `index.html` and set its `data-video-url` attribute to a YouTube or Vimeo embed URL:

```html
data-video-url="https://www.youtube.com/embed/VIDEO_ID"
```

The modal supports closing through the close button, clicking the backdrop, or pressing Escape. Closing the modal resets the iframe source to stop playback.

## Customize the FAQ

Edit each `.faq-item` in `index.html`. Keep each trigger's `aria-controls` value matched with its answer panel `id`, and keep the question IDs unique.
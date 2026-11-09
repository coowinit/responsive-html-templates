# Solar Energy Feature Section

A responsive company introduction section for a solar and renewable energy business.

## Layout

- Desktop: balanced two-column layout with overlapping image placeholders on the left and company information on the right.
- The image composition uses one large landscape-style panel and one smaller overlapping square panel.
- Mobile: image composition appears first, followed by the title, description, service list, and call-to-action.
- Image placeholders use a dark gray background with a simple image icon, making the intended photo areas easy to identify.
- Includes a video modal opened by the green play button.
- Built with standalone HTML, CSS, and a small amount of vanilla JavaScript; no framework or external modal library.

## Files

- `index.html` — section markup, video dialog, and sample content
- `css/style.css` — component styles, modal styles, and responsive breakpoints
- `images/solar-main.svg` — large image placeholder
- `images/solar-wind.svg` — small overlapping image placeholder

## Customization

Replace the SVG files in `images/` with real photos, or update the image paths in `index.html`.

To enable video playback, add the video embed URL to the play button's `data-video-url` attribute:

```html
data-video-url="https://www.youtube.com/embed/VIDEO_ID"
```

Use an embed URL rather than a normal YouTube watch-page URL. The modal closes with the close button, the Escape key, or by clicking the dark backdrop. Closing the modal also stops the embedded video.

Edit the heading, description, service list, and CTA link directly in the HTML.
The `Learn More` link currently points to `#learn-more`; replace it with the destination URL when integrating.
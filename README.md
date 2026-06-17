# CSAT Campaign Builder

A simplified CSAT (Customer Satisfaction) popup builder. Configure a feedback campaign across a Content tab and a Styling tab, with a live mobile preview that updates instantly as you type — no save button, no refresh.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Tech stack

- React 19 + Vite
- JavaScript (JSX)
- SCSS (component-scoped stylesheets) + CSS variables for design tokens
- lucide-react for icons
- No external state library — a single React Context (`CampaignContext`) holds the campaign config and exposes update functions consumed by both editor tabs and the preview

## Project structure

```
src/
  context/
    CampaignContext.jsx     // single source of truth for content + styling state
  components/
    ContentTab.jsx           // Initial / Feedback / Thank-you content sections
    StylingTab.jsx           // color, typography, shape, rating style controls
    MobilePreview.jsx        // phone frame + page switcher (Initial/Feedback/Thank you)
    OptionsList.jsx          // dynamic add/delete option rows
    MediaUpload.jsx          // image + Lottie (.json) upload with drag & drop
    FormControls.jsx         // shared inputs: TextInput, ColorField, SliderField, Toggle, etc.
    popup/
      PopupInitial.jsx       // renders the "Initial" popup state
      PopupFeedback.jsx      // renders the "Feedback" popup state (interactive rating/tags/comment)
      PopupThankYou.jsx      // renders the "Thank you" popup state
      popupStyleUtils.js     // converts styling config into inline style objects
```

## How real-time preview works

All campaign state (`content` and `styling`) lives in `CampaignContext`. Both `ContentTab` / `StylingTab` (writers) and `MobilePreview` (reader) consume the same context via `useCampaign()`. Any field change calls `updateContent` or `updateStyling`, which updates state immutably; React re-renders the popup components in the preview on the same tick. There is no debounce, no save action, and no page reload — every keystroke, slider drag, or color pick is reflected immediately.

The preview includes a 3-way switcher (Initial / Feedback / Thank you) so you can inspect any of the three popup states at any time, independent of which editor tab is open. Editor fields also auto-focus the matching preview state, so editing, for example, the Thank You title automatically flips the preview to the Thank You page.

## Functional coverage

- **Content tab**: Initial page (title, subtitle), Feedback page (star or numeric rating, dynamic add/delete options up to 6, optional comment box with custom placeholder, custom submit button text), Thank You page (media upload supporting PNG/JPG/JPEG/GIF and Lottie `.json`, title, subtitle, button text).
- **Styling tab**: background color, title color, subtitle color, button color, button text color, font size and weight, border radius, button width and height, and rating selected/unselected colors.
- **Live mobile preview**: realistic phone frame, status bar, and an interactive popup that mirrors every content and styling change instantly.
- **Dynamic options**: add up to 6 options, edit inline, delete (minimum of 1 retained), reflected as tappable tags in the feedback preview.
- **Responsive layout**: the editor and preview panels stack vertically below 980px width.

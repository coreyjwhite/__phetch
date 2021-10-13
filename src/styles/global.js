/**
 * @module Global
 * @category Styling
 */

import { createGlobalStyle } from "styled-components";
import c from "styles/color";
import s from "styles/styles";

const global = createGlobalStyle`
// fonts
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-300.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-regular.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-600.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-700.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-800.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-300italic.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-italic.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-600italic.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-700italic.woff2) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: local('Open Sans'), url(/fonts/open-sans-v20-latin-800italic.woff2) format('woff2');
}

// general styles
html,
body {
  font-family: "Open Sans";
  background-color: ${c.gray9};
}

a {
  color: inherit;
  text-decoration: none;
}

p, h1, h2, h3, h4, h5, h6, td {
  color: ${c.gray2};
}

p.light {
  font-weight: 200;
  color: ${c.gray6};
}

p.bold {
  font-weight: 600;
}

p.italic {
  font-style: italic
}

*::selection{
  color: ${c.primary9};
  background-color: ${c.primary7};
}

* {
  box-sizing: border-box;
  image-rendering: -webkit-optimize-contrast;
}

// react-modal transition
.ReactModal__Overlay {
    opacity: 0;
    transition: opacity ${s.inputTransition} ease-in-out;
    overflow: hidden;
}

.ReactModal__Overlay--after-open{
    opacity: 1;
}

.ReactModal__Overlay--before-close{
    opacity: 0;
}

}`;
export default global;

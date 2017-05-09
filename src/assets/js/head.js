// This script will be embedded in page header.
// Add extra scripts here only in case of explicit recommendations.

const html = document.querySelector('html.no-js')
if (html) {
  const classes = html.getAttribute('class')
  html.setAttribute('class', classes.replace(/(\b)no-js(\b)/, '$1js$2'))
}

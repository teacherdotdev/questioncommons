import { FORMATS, type Shape } from '@teacherdotdev/question-commons'
import { defineConfig } from 'vite'

// The Formats section is written from the package's own catalogue at build
// time, so the site always lists exactly what the published package reads.
const SHAPES: [Shape, string][] = [['table', 'Tables'], ['text', 'Text'], ['xml', 'XML files'], ['package', 'Packages']]

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function formatsHtml(): string {
  return SHAPES.map(([shape, title]) => {
    const items = FORMATS.filter((format) => format.shape === shape)
      .map((format) => `<li>${escape(format.label)}<span class="types">${format.fileTypes.join(' ')}</span></li>`)
      .join('\n              ')
    return `<div>\n            <h3>${title}</h3>\n            <ul>\n              ${items}\n            </ul>\n          </div>`
  }).join('\n          ')
}

export default defineConfig({
  plugins: [{ name: 'formats', transformIndexHtml: (html) => html.replace('<!-- formats -->', formatsHtml()) }],
})

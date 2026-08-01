import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const templatePath = join(root, 'dist', 'index.html')
const serverEntry = pathToFileURL(join(root, 'dist', 'server', 'entry-server.js')).href

const { render } = await import(serverEntry)
const appHtml = render()

let template = readFileSync(templatePath, 'utf-8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) {
  console.error('[prerender] Expected', marker, 'in dist/index.html')
  process.exit(1)
}
template = template.replace(marker, `<div id="root">${appHtml}</div>`)
writeFileSync(templatePath, template)
console.log('[prerender] Injected app HTML into dist/index.html')

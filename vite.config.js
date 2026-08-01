import path from 'node:path'
import fs from 'node:fs'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { contact } from './src/data/content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function escapeJsonForScript(json) {
  return json.replace(/</g, '\\u003c')
}

function publicFileExists(publicDir, urlPath) {
  if (!urlPath || !urlPath.startsWith('/')) return false
  return fs.existsSync(path.join(publicDir, urlPath.slice(1)))
}

/** Defaults for bundled `public/og.png` (replace with env if you swap the asset). */
const DEFAULT_OG_WIDTH = 1376
const DEFAULT_OG_HEIGHT = 768

/**
 * Open Graph / Twitter image vs Person schema photo: prefer `og.png` for shares,
 * `pfp.png` for Person + LCP preload when present.
 */
function resolveSeoImages(env, siteOrigin, publicDir) {
  const pfpPath = '/pfp.png'
  const defaultOgPath = '/og.png'

  const envOg = env.VITE_OG_IMAGE_PATH?.trim()
  const candidates = []
  if (envOg) candidates.push(envOg.startsWith('/') ? envOg : `/${envOg}`)
  candidates.push(defaultOgPath, pfpPath)

  let sharePath = candidates.find((p) => publicFileExists(publicDir, p))
  if (!sharePath) sharePath = envOg ? (envOg.startsWith('/') ? envOg : `/${envOg}`) : defaultOgPath

  const shareW = Number.parseInt(env.VITE_OG_IMAGE_WIDTH || '', 10)
  const shareH = Number.parseInt(env.VITE_OG_IMAGE_HEIGHT || '', 10)
  let shareWidth
  let shareHeight
  if (sharePath === pfpPath) {
    shareWidth = 420
    shareHeight = 420
  } else if (Number.isFinite(shareW) && shareW > 0 && Number.isFinite(shareH) && shareH > 0) {
    shareWidth = shareW
    shareHeight = shareH
  } else {
    shareWidth = DEFAULT_OG_WIDTH
    shareHeight = DEFAULT_OG_HEIGHT
  }

  const hasPfp = publicFileExists(publicDir, pfpPath)
  const personPath = hasPfp ? pfpPath : sharePath
  const personWidth = personPath === pfpPath ? 420 : shareWidth
  const personHeight = personPath === pfpPath ? 420 : shareHeight

  const preloadPath = hasPfp ? pfpPath : sharePath
  const hasPreload = publicFileExists(publicDir, preloadPath)

  return {
    shareUrl: `${siteOrigin}${sharePath}`,
    sharePath,
    shareWidth,
    shareHeight,
    personUrl: `${siteOrigin}${personPath}`,
    personWidth,
    personHeight,
    preloadPath,
    hasPreload,
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawUrl = env.VITE_SITE_URL?.trim() || ''
  const siteUrl = rawUrl.replace(/\/$/, '')
  if (mode === 'production' && !siteUrl) {
    console.warn(
      '[SEO] VITE_SITE_URL is empty. Set it in .env.production for correct canonical, Open Graph, and sitemap URLs.',
    )
  }
  const effectiveUrl = siteUrl || 'http://localhost:4173'
  const publicDir = path.resolve(__dirname, 'public')
  const img = resolveSeoImages(env, effectiveUrl, publicDir)

  const siteId = `${effectiveUrl}/#website`
  const profileId = `${effectiveUrl}/#profile`
  const personId = `${effectiveUrl}/#person`

  const pageTitle = 'Wiktoria Lewandowska | Marketing & Media Specialist'
  const description =
    'Wiktoria Lewandowska — marketing and media specialist in Leicester, UK. MA Marketing and BA Media & Communication (De Montfort University). Portfolio, experience, education, and contact.'
  const locale = 'en_GB'
  const dateModified = new Date().toISOString().slice(0, 10)

  const personDescription =
    'Marketing and media specialist in Leicester, UK. Experience in content, campaigns, university programmes, hospitality, and international placement (Think Pacific).'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': siteId,
        name: 'Wiktoria Lewandowska',
        url: effectiveUrl,
        description,
        inLanguage: 'en-GB',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': profileId,
        url: `${effectiveUrl}/`,
        name: pageTitle,
        description,
        dateModified,
        inLanguage: 'en-GB',
        isPartOf: { '@id': siteId },
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Wiktoria Lewandowska',
        url: effectiveUrl,
        description: personDescription,
        image: {
          '@type': 'ImageObject',
          url: img.personUrl,
          width: img.personWidth,
          height: img.personHeight,
        },
        jobTitle: 'Marketing & Media Specialist',
        email: contact.email,
        sameAs: [contact.linkedin],
        knowsAbout: [
          'Marketing',
          'Media',
          'Digital marketing',
          'Content strategy',
          'Brand communications',
          'Social media marketing',
        ],
        homeLocation: {
          '@type': 'Place',
          name: 'Leicester',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Leicester',
            addressRegion: 'England',
            addressCountry: 'GB',
          },
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'De Montfort University',
          address: { '@type': 'PostalAddress', addressLocality: 'Leicester', addressCountry: 'GB' },
        },
      },
    ],
  }

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        ...(isSsrBuild
          ? { 'framer-motion': path.resolve(__dirname, 'src/lib/framer-motion-ssr.js') }
          : {}),
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'seo-head-and-static-files',
        transformIndexHtml(html) {
          const ld = escapeJsonForScript(JSON.stringify(jsonLd))
          const inject = `
    <title>${pageTitle}</title>
    <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="author" content="Wiktoria Lewandowska" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <link rel="canonical" href="${effectiveUrl}/" />
    ${img.hasPreload ? `<link rel="preload" as="image" href="${img.preloadPath}" fetchpriority="high" />` : ''}
    <meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${effectiveUrl}/" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:image" content="${img.shareUrl}" />
    <meta property="og:image:width" content="${img.shareWidth}" />
    <meta property="og:image:height" content="${img.shareHeight}" />
    <meta property="og:image:alt" content="Wiktoria Lewandowska" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${img.shareUrl}" />
    <meta name="theme-color" content="#ddf8d4" />
    <script type="application/ld+json">${ld}</script>`
          if (html.includes('<!--vite-seo-inject-->')) {
            return html.replace('<!--vite-seo-inject-->', inject)
          }
          return html.replace('</head>', `${inject}\n  </head>`)
        },
        closeBundle() {
          if (isSsrBuild) return
          const outDir = path.resolve(__dirname, 'dist')
          const lastmod = new Date().toISOString().slice(0, 10)
          const robots = `User-agent: *
Allow: /

# AI / research crawlers: adjust if you want to limit training use of your content.
# See https://developers.google.com/search/docs/crawling-indexing/google-extended

Sitemap: ${effectiveUrl}/sitemap.xml
`
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${effectiveUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
          fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf-8')
          fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
        },
      },
    ],
  }
})

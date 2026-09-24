export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-14'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

/**
 * Sanity is optional for local development: without a project ID the site still
 * renders, but any CMS-backed content (the blog) comes back empty.
 * Set NEXT_PUBLIC_SANITY_PROJECT_ID in `.env.local` to enable it — see `.env.example`.
 */
export const isSanityConfigured = projectId !== ''

if (!isSanityConfigured && typeof window === 'undefined') {
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — blog content will be empty. ' +
      'Add it to .env.local (see .env.example) and restart the dev server.'
  )
}

import { createClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

/**
 * Null when NEXT_PUBLIC_SANITY_PROJECT_ID is unset — creating a client without a
 * project ID throws, which would take down every page that imports this module.
 * Prefer `safeFetch` below over using this directly.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  : null

/**
 * Runs a GROQ query, returning `fallback` if Sanity is unconfigured or the
 * request fails, so a CMS outage degrades the blog instead of the whole page.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!client) {
    return fallback
  }

  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('[sanity] query failed, falling back to empty content:', error)
    return fallback
  }
}

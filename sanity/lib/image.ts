import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, isSanityConfigured, projectId } from '../env'

// https://www.sanity.io/docs/image-url
// Null when Sanity is unconfigured — the builder requires a project ID.
const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export const urlFor = (source: SanityImageSource) => {
  return builder?.image(source) ?? null
}

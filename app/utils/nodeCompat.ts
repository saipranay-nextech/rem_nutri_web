/**
 * Node 24 removed `buffer.SlowBuffer` (deprecated since Node 8).
 *
 * The unmaintained `buffer-equal-constant-time@1.0.1` (last published in 2016,
 * and the only release that exists) reads `SlowBuffer.prototype.equal` at module
 * scope, so on Node >= 24 it throws:
 *
 *   TypeError: Cannot read properties of undefined (reading 'prototype')
 *
 * It reaches us as a transitive dependency:
 *   google-auth-library -> jws -> jwa -> buffer-equal-constant-time
 *
 * There is no fixed version upstream (current `jwa@2.0.1` still requires it), so
 * every `googleapis` / `google-auth-library` import crashes without this shim —
 * which takes down all four API routes, not just their email steps.
 *
 * Aliasing SlowBuffer to Buffer is safe: the actual constant-time comparison never
 * touches SlowBuffer, and only the unused `install()`/`restore()` helpers read
 * `.prototype` off it.
 *
 * IMPORTANT: import this module BEFORE any `googleapis` / `google-auth-library`
 * import. ES module evaluation follows import-declaration order, so placing this
 * import first is sufficient.
 */

const nodeBuffer = require('node:buffer') as { SlowBuffer?: unknown }

if (typeof nodeBuffer.SlowBuffer === 'undefined') {
  Object.defineProperty(nodeBuffer, 'SlowBuffer', {
    value: Buffer,
    writable: true,
    configurable: true,
  })
}

export {}

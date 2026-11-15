/**
 * Client logos, keyed by work slug (see content/works.ts). Drop the file in /public/logos and add a line:
 *   "beluga-coffee": "/logos/beluga-coffee.png",
 * Works without an entry fall back to the client name set in type.
 *
 * Note: public/images/clients/client-1…6.svg are plain-text placeholders (Unilever, Gojek, ...) from the
 * original template, not real Hey Coco! clients, so they are deliberately NOT used here.
 */
export const clientLogos: Record<string, string> = {};

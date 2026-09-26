export const PUBLIC_SITE_URL = "https://www.limescreen.net";

// decodeURIComponent throws on malformed input (e.g. a lone "%"); keep the raw value then.
export const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

// Public, shareable profile URL. Decoding first makes this idempotent (an already
// encoded "AARON%20C30459" is not double-encoded to "%2520"); encodeURIComponent then
// turns every space into %20 so the link stays one clickable URL in WhatsApp etc.
export const getPublicProfileUrl = (link: string) =>
  `${PUBLIC_SITE_URL}/${encodeURIComponent(safeDecode(link.trim()).trim())}`;

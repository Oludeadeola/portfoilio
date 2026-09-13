// Contact details are assembled at runtime instead of appearing as a
// contiguous literal in the client bundle, so a scraper doing a plain
// regex pass over the built JS (not executing it) won't pattern-match
// an email or phone number. Doesn't stop a headless scraper that
// actually renders the page - nothing short of removing the info can -
// but it clears out the low-effort bots that just grep static assets.
const EMAIL_PARTS = ["oludeadeola67", String.fromCharCode(64), "gmail", ".", "com"];
const PHONE_DIGITS = ["+234", "704", "098", "9710"];

export function getEmail(): string {
  return EMAIL_PARTS.join("");
}

export function getPhoneDisplay(): string {
  return PHONE_DIGITS.join(" ");
}

export function getPhoneHref(): string {
  return PHONE_DIGITS.join("");
}

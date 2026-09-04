/** Tolerates a link pasted without "https://", which is easily done. */
export const externalUrl = (input: string): string => {
    const s = (input || "").trim();
    if (!s) return "";
    return /^https?:\/\//i.test(s) ? s : `https://${s.replace(/^\/+/, "")}`;
};

/**
 * The LinkedIn setting holds a display name ("Vulpian Consultants") rather
 * than a link, because that is what the footer and contact page print. This
 * turns whichever form it holds into a usable company URL, so an editor can
 * paste a full link there later without anything breaking.
 */
export const linkedinProfileUrl = (value: string): string => {
    const s = (value || "").trim();
    if (!s) return "";
    if (/linkedin\.com/i.test(s)) return externalUrl(s);
    return `https://www.linkedin.com/company/${s.replace(/\s+/g, "-").toLowerCase()}`;
};

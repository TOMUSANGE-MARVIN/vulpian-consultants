import { revalidatePath } from "next/cache";

/**
 * Public pages are cached (see `revalidate` in each page), so an admin save
 * must explicitly clear them — otherwise an edit would not appear until the
 * cache window expired. Clearing the layout covers every route that renders
 * the shared header and footer.
 */
export function revalidateSite() {
    try {
        revalidatePath("/", "layout");
        // The sitemap is not part of the layout tree, so it needs clearing on
        // its own — otherwise a new post could take an hour to become
        // discoverable by search engines.
        revalidatePath("/sitemap.xml");
    } catch (err) {
        // Never let a cache-clear failure break a successful save.
        console.error("Could not revalidate the site cache:", err);
    }
}

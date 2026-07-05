import { createOgImage, size, contentType } from "@/lib/og/create";
import { SearchBarPreview } from "@/lib/og/previews";

const og = createOgImage("/components/search-bar", SearchBarPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

import { createOgImage, size, contentType } from "@/lib/og/create";
import { BadgePreview } from "@/lib/og/previews";

const og = createOgImage("/components/badge", BadgePreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

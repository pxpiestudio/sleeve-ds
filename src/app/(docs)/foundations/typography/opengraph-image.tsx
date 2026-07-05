import { createOgImage, size, contentType } from "@/lib/og/create";
import { TypographyPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/typography", TypographyPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

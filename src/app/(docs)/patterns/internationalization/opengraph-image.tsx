import { createOgImage, size, contentType } from "@/lib/og/create";
import { InternationalizationPreview } from "@/lib/og/previews";

const og = createOgImage("/patterns/internationalization", InternationalizationPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

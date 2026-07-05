import { createOgImage, size, contentType } from "@/lib/og/create";
import { SpacingPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/spacing", SpacingPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

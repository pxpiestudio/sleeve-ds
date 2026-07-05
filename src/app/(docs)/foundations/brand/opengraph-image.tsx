import { createOgImage, size, contentType } from "@/lib/og/create";
import { BrandPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/brand", BrandPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

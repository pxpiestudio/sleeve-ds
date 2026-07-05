import { createOgImage, size, contentType } from "@/lib/og/create";
import { ProductCardPreview } from "@/lib/og/previews";

const og = createOgImage("/components/product-card", ProductCardPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

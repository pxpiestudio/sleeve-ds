import { createOgImage, size, contentType } from "@/lib/og/create";
import { PriceComparisonPreview } from "@/lib/og/previews";

const og = createOgImage("/components/price-comparison", PriceComparisonPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

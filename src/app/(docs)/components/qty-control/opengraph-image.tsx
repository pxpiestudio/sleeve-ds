import { createOgImage, size, contentType } from "@/lib/og/create";
import { QtyControlPreview } from "@/lib/og/previews";

const og = createOgImage("/components/qty-control", QtyControlPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

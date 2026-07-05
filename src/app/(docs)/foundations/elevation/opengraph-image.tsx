import { createOgImage, size, contentType } from "@/lib/og/create";
import { ElevationPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/elevation", ElevationPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

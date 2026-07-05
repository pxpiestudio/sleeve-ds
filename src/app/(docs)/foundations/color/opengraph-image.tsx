import { createOgImage, size, contentType } from "@/lib/og/create";
import { ColorPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/color", ColorPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

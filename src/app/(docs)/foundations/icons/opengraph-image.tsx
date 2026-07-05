import { createOgImage, size, contentType } from "@/lib/og/create";
import { IconsPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/icons", IconsPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

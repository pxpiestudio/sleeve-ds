import { createOgImage, size, contentType } from "@/lib/og/create";
import { TogglesPreview } from "@/lib/og/previews";

const og = createOgImage("/components/toggles", TogglesPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

import { createOgImage, size, contentType } from "@/lib/og/create";
import { AccessibilityPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/accessibility", AccessibilityPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

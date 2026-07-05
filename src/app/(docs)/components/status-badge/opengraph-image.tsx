import { createOgImage, size, contentType } from "@/lib/og/create";
import { StatusBadgePreview } from "@/lib/og/previews";

const og = createOgImage("/components/status-badge", StatusBadgePreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

import { createOgImage, size, contentType } from "@/lib/og/create";
import { MotionPreview } from "@/lib/og/previews";

const og = createOgImage("/foundations/motion", MotionPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

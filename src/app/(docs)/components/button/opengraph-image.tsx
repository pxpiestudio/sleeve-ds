import { createOgImage, size, contentType } from "@/lib/og/create";
import { ButtonPreview } from "@/lib/og/previews";

const og = createOgImage("/components/button", ButtonPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

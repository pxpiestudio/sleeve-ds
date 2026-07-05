import { createOgImage, size, contentType } from "@/lib/og/create";
import { CardPreview } from "@/lib/og/previews";

const og = createOgImage("/components/card", CardPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

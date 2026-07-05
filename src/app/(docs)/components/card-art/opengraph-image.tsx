import { createOgImage, size, contentType } from "@/lib/og/create";
import { CardArtPreview } from "@/lib/og/previews";

const og = createOgImage("/components/card-art", CardArtPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

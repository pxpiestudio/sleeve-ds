import { createOgImage, size, contentType } from "@/lib/og/create";
import { InputPreview } from "@/lib/og/previews";

const og = createOgImage("/components/input", InputPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

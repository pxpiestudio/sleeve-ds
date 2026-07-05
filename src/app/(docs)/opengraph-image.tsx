import { createOgImage, size, contentType } from "@/lib/og/create";
import { IntroductionPreview } from "@/lib/og/previews";

const og = createOgImage("/", IntroductionPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

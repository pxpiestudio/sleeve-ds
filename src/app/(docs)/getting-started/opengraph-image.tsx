import { createOgImage, size, contentType } from "@/lib/og/create";
import { GettingStartedPreview } from "@/lib/og/previews";

const og = createOgImage("/getting-started", GettingStartedPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

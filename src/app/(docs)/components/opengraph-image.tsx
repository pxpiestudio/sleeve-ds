import { createOgImage, size, contentType } from "@/lib/og/create";
import { ComponentsOverviewPreview } from "@/lib/og/previews";

const og = createOgImage("/components", ComponentsOverviewPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

import { createOgImage, size, contentType } from "@/lib/og/create";
import { ThemingPreview } from "@/lib/og/previews";

const og = createOgImage("/patterns/theming", ThemingPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

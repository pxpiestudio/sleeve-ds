import { createOgImage, size, contentType } from "@/lib/og/create";
import { NavbarPreview } from "@/lib/og/previews";

const og = createOgImage("/components/navbar", NavbarPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

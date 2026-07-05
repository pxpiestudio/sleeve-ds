import { createOgImage, size, contentType } from "@/lib/og/create";
import { OrderLifecyclePreview } from "@/lib/og/previews";

const og = createOgImage("/patterns/order-lifecycle", OrderLifecyclePreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

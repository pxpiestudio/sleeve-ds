import { createOgImage, size, contentType } from "@/lib/og/create";
import { InboxRowPreview } from "@/lib/og/previews";

const og = createOgImage("/components/inbox-row", InboxRowPreview);

export default og.Image;
export const alt = og.alt;
export { size, contentType };

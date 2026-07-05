import "@/components/design-system/design-system.css";

import { DocsSidebar } from "@/components/docs/shell";
import { PageNav } from "@/components/docs/page-nav";

/**
 * Documentation shell: skip link → fixed sidebar → content rail. The pager
 * at the bottom is route-driven, so pages don't have to mount it themselves.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#docs-content" className="ds-skip-link">
        Skip to content
      </a>
      <DocsSidebar />
      <div className="ds-main">
        <main id="docs-content" tabIndex={-1} className="ds-wrap">
          {children}
          <PageNav />
        </main>
      </div>
    </>
  );
}

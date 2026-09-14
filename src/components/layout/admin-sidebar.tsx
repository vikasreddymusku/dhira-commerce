import Link from "next/link";

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin" }],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products" },
      { label: "Categories", href: "/admin/categories" },
      { label: "Collections", href: "/admin/collections" },
      { label: "Inventory", href: "/admin/inventory" },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", href: "/admin/orders" },
      { label: "Discounts", href: "/admin/discounts" },
      { label: "Customers", href: "/admin/customers" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Homepage Sections", href: "/admin/content/homepage" },
      { label: "Blog", href: "/admin/content/blog" },
      { label: "Recipes", href: "/admin/content/recipes" },
      { label: "FAQs", href: "/admin/content/faqs" },
      { label: "Policies", href: "/admin/content/policies" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "B2B Enquiries", href: "/admin/b2b-enquiries" },
      { label: "Site Settings", href: "/admin/settings" },
      { label: "Integrations", href: "/admin/integrations" },
      { label: "Audit Log", href: "/admin/audit-log" },
    ],
  },
];

/**
 * Foundational admin sidebar shell. Only navigation structure is
 * established in Phase 1 - individual admin screens are built in later
 * phases.
 */
export function AdminSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-cocoa-800 bg-cocoa-900 px-4 py-6 text-cream-100 md:flex">
      <div className="px-2 pb-6">
        <p className="font-display text-lg text-cream-50">Dhira Admin</p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-2 text-xs font-semibold uppercase tracking-widest text-cream-300/60">
              {section.title}
            </p>
            <ul className="mt-2 space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-sm px-2 py-2 text-sm text-cream-100/90 transition-colors hover:bg-cocoa-800 hover:text-cream-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

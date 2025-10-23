import { footerNavigation } from "@/data/footer";

/**
 * Footer navigation columns component
 */
export function FooterNav() {
  return (
    <>
      {footerNavigation.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary-600)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

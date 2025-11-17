import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware `Link`, `usePathname` and `useRouter`: they keep the current
// locale prefix when building URLs.
export const { Link, usePathname, useRouter, redirect, getPathname } = createNavigation(routing);

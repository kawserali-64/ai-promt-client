import { requireNonAdmin } from "@/lib/core/session";

export default async function AIToolsLayout({ children }) {
  await requireNonAdmin();

  return children;
}
import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
  // No baseURL — Better Auth client defaults to the current origin,
  // which is correct for Next.js (client + API routes on same domain).
  // Hardcoding NEXT_PUBLIC_APP_URL breaks preview deployments where the
  // URL differs from production.
  plugins: [organizationClient(), polarClient()],
});

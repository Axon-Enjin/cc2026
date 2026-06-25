import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { GrantEditor } from "@/components/grants/grant-editor";
import type { Funder, GrantSection } from "@/components/grants/types";

export const metadata = { title: "Proposal — Ciel" };

export default async function GrantEditorPage({
  params,
}: {
  params: Promise<{ id: string; grantId: string }>;
}) {
  const { id: projectId, grantId } = await params;

  const user = await getCurrentUser();
  if (!user) redirect(`/auth/sign-in?redirect=/projects/${projectId}/grants/${grantId}`);

  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id, org_id")
    .eq("id", projectId)
    .single();
  if (!project) redirect("/dashboard");

  const { data: membership } = await supabase
    .from("memberships")
    .select("role")
    .eq("org_id", project.org_id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!membership) redirect("/dashboard");

  const { data: proposal } = await supabase
    .from("grant_proposals")
    .select("id, title, status, amount_php, funder_id, sections")
    .eq("id", grantId)
    .eq("project_id", projectId)
    .single();
  if (!proposal) redirect(`/projects/${projectId}/grants`);

  let funder: Funder | null = null;
  if (proposal.funder_id) {
    const { data } = await supabase
      .from("funders")
      .select("id, name, type, region, focus_areas, kpis, typical_grant_php_min, typical_grant_php_max")
      .eq("id", proposal.funder_id)
      .maybeSingle();
    funder = (data as Funder) ?? null;
  }

  return (
    <main className="min-h-[100dvh] bg-[var(--color-bg)] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-3 text-[13px]">
          <Link href="/dashboard" className="text-[var(--color-primary)] hover:underline">
            Dashboard
          </Link>
          <span className="text-[var(--color-text-muted)]">/</span>
          <Link href={`/projects/${projectId}/grants`} className="text-[var(--color-primary)] hover:underline">
            Grants
          </Link>
          <span className="text-[var(--color-text-muted)]">/</span>
          <span className="text-[var(--color-text-muted)]">Proposal</span>
        </div>

        <div className="mt-8">
          <GrantEditor
            projectId={projectId}
            proposal={{
              id: proposal.id,
              title: proposal.title,
              status: proposal.status,
              amount_php: proposal.amount_php,
              funder_id: proposal.funder_id,
              sections: (proposal.sections ?? []) as GrantSection[],
            }}
            funder={funder}
          />
        </div>
      </div>
    </main>
  );
}

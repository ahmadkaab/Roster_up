import { TeamSetupForm } from "@/components/team/TeamSetupForm";

export default function TeamSetupPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Setup Your Team</h1>
        <p className="text-muted-foreground">
          Create your team profile to manage recruitments and applications.
        </p>
      </div>
      <TeamSetupForm />
    </div>
  );
}

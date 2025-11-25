import { RecruitmentForm } from "@/components/recruitments/RecruitmentForm";

export default function NewRecruitmentPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Post New Recruitment</h1>
        <p className="text-muted-foreground">
          Create a listing to find the best talent for your team.
        </p>
      </div>
      <RecruitmentForm />
    </div>
  );
}

import { PlayerCardForm } from "@/components/profile/PlayerCardForm";

export default function CreateProfilePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Create Player Card</h1>
        <p className="text-muted-foreground">
          Set up your profile to start your journey.
        </p>
      </div>
      <PlayerCardForm />
    </div>
  );
}

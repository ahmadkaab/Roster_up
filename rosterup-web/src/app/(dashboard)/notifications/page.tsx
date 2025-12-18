import { NotificationsListContent } from "@/components/notifications/NotificationsListContent";
import { Separator } from "@/components/ui/separator";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          View and manage your notifications.
        </p>
      </div>
      <Separator />
      <NotificationsListContent />
    </div>
  );
}


export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms & Conditions</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to RosterUp. By accessing our website and using our services, you agree to be bound by the following terms and conditions.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          You agree to use our platform only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          If you create an account on RosterUp, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.
        </p>

        <h2>4. Payments and Refunds</h2>
        <p>
          Specific terms regarding payments, subscriptions, and our refund policy are detailed in our Refund Policy page.
        </p>

        <h2>5. Content</h2>
        <p>
          Users are responsible for the content they post. RosterUp reserves the right to remove any content that violates these terms or is deemed inappropriate.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will do our best to ensure that you are notified of any major changes.
        </p>
        
        <p className="mt-8 text-sm text-muted-foreground">
          For any questions regarding these terms, please contact us.
        </p>
      </div>
    </div>
  );
}

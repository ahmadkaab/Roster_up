export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, gaming stats, and payment information.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-5">
          <li>Provide, maintain, and improve our services.</li>
          <li>Process transactions and send related information.</li>
          <li>Send you technical notices, updates, and support messages.</li>
          <li>Facilitate the matching of players with teams.</li>
        </ul>

        <h2>3. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share information with other users as part of the platform's functionality (e.g., displaying your public profile to recruiters).
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can manage most of your data directly through your account settings.
        </p>
      </div>
    </div>
  );
}

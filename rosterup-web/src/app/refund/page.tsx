export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Refund Policy</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. General Refund Policy</h2>
        <p>
          At RosterUp, we strive to provide the best possible service. If you are not satisfied with your purchase, we are here to help.
        </p>

        <h2>2. Subscription Services</h2>
        <p>
          For subscription-based services, you may cancel your subscription at any time. Refunds for the current billing cycle are generally not provided, but access will continue until the end of the billing period.
        </p>

        <h2>3. Digital Items and Boosts</h2>
        <p>
          Purchases of one-time digital items (such as profile boosts) are non-refundable once the item has been applied or used.
        </p>

        <h2>4. Requesting a Refund</h2>
        <p>
          If you believe you are entitled to a refund due to a technical error or exceptional circumstance, please contact our support team at [support@rosterup.com] within 7 days of the purchase.
        </p>

        <h2>5. Processing Time</h2>
        <p>
          Approved refunds will be processed within 5-10 business days and credited back to the original method of payment.
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">About Us</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>
          RosterUp is dedicated to revolutionizing the esports recruitment landscape. We build tools that bridge the gap between talented players and professional organizations.
        </p>

        <h2>Our Mission</h2>
        <p>
          To empower gamers to build their careers and help teams find the perfect roster fit through data-driven insights and a seamless platform experience.
        </p>

        <h2>What We Do</h2>
        <ul className="list-disc pl-5">
          <li><strong>Talent Scouting:</strong> Advanced filters to find players by role, stats, and achievements.</li>
          <li><strong>Team Management:</strong> Tools to manage rosters, scrims, and player contracts.</li>
          <li><strong>Community:</strong> A verified ecosystem specifically for BGMI and other competitive titles.</li>
        </ul>

        <h2 className="mt-8">Contact Us</h2>
        <p>
          Have questions or want to partner with us? Reach out via our Contact page.
        </p>
      </div>
    </div>
  );
}

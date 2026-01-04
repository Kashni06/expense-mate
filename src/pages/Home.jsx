import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            No more <span className="text-purple-500">awkward</span>
            <br />
            money talks.
          </h1>

          <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
            ExpenseMate helps you track, split, and settle expenses with friends
            — beautiful analytics, smart suggestions, and export-ready reports.
          </p>

          <div className="mt-10 flex gap-4">
            {/* GET STARTED */}
            <button
              onClick={() => navigate("/auth")}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:opacity-90 transition"
            >
              Get Started →
            </button>

            {/* SIGN IN */}
            <button
              onClick={() => navigate("/auth")}
              className="px-7 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md ml-auto">
          <h3 className="text-xl font-semibold mb-6">Create an account</h3>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Full name"
              disabled
            />

            <input
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Email"
              disabled
            />

            <input
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
              disabled
            />

            <button
              onClick={() => navigate("/auth")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:opacity-90 transition"
            >
              Create account
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">
        <Feature
          title="Split Expenses"
          desc="Split bills with friends quickly and clearly."
        />
        <Feature title="Track Balances" desc="See who owes what at a glance." />
        <Feature
          title="Export Reports"
          desc="Download CSV/PDF for records or sharing."
        />
      </section>
    </div>
  );
}

/* FEATURE CARD */
function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

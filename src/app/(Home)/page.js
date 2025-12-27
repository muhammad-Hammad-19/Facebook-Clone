import Link from "next/link";
export default function homePage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Connect With Friends,
            <span className="text-blue-600 block">Share Moments,</span>
            <span className="text-blue-600 block">Live Social</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Your social world, redesigned. Share posts, connect with friends,
            explore content — fast, simple, and modern.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link
              href={"/auth/signup"}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg"
            >
              Get Started
            </Link>
            <button className="px-8 py-3 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg text-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="absolute right-0 top-0 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1556155092-8707de31f9c4"
            className="w-[550px] object-cover rounded-l-3xl shadow-xl"
          />
        </div>
      </section>
      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Create & Share Posts",
                desc: "Express yourself with photos, text, and stories.",
                icon: "📝",
              },
              {
                title: "Connect With Friends",
                desc: "Build your network & stay updated.",
                icon: "👥",
              },
              {
                title: "Modern UI",
                desc: "Smooth, clean, mobile-first experience.",
                icon: "✨",
              },
            ].map((f, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border rounded-xl p-8 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APP PREVIEW ================= */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">See Your Social World</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            A fast and modern dashboard that helps you explore your friends,
            content, and messages — all in one place.
          </p>

          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296"
            className="rounded-xl shadow-2xl border"
          />
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Loved by Users
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jessica",
                text: "Best new social app! Clean UI and super fast.",
                img: "https://i.pravatar.cc/150?img=47",
              },
              {
                name: "Michael",
                text: "Feels like Facebook but way more modern.",
                img: "https://i.pravatar.cc/150?img=32",
              },
              {
                name: "Sara",
                text: "Finally a simple place to connect with my friends.",
                img: "https://i.pravatar.cc/150?img=12",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={t.img}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-700 italic mb-3">"{t.text}"</p>
                <h4 className="font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">SocialApp</h3>
            <p className="text-gray-400">
              Your modern Facebook-style social platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Links</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <p className="text-gray-400">Facebook | Twitter | Instagram</p>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-10">
          © 2025 SocialApp — All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

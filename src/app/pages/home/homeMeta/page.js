import Link from "next/link";
export default function MetaAI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <header className="flex items-center justify-between py-6 px-10 bg-white/60 backdrop-blur-lg shadow-sm border-b border-blue-100">
        <div className="flex items-center space-x-3">
          {/* Meta AI Logo */}
          <svg
            width="55"
            height="35"
            viewBox="0 0 120 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 10C14 10 5 26 5 40C5 54 14 60 23 60C35 60 45 40 60 22C75 40 85 60 97 60C108 60 115 50 115 40C115 25 105 10 92 10C80 10 70 25 60 38C50 25 40 10 27 10Z"
              stroke="#0064E0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
            Meta AI
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Models
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Docs
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="px-10 mt-24 flex flex-col items-center text-center relative">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 leading-tight">
          Meet the Power of
          <span className="text-blue-600"> Intelligence</span>
        </h1>

        <p className="mt-5 text-gray-600 text-lg max-w-3xl">
          Meta AI is built to help you think, create, and explore with real-time
          reasoning, rich world knowledge, and next-gen multimodal intelligence.
        </p>

        <Link
          href={"homeMeta/meta"}
          className="mt-10 px-12 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-lg font-medium"
        >
          Try Meta AI
        </Link>
      </section>

      {/* AI FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 mt-24 pb-24">
        {/* Card 1 */}
        <div className="p-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            Smart Conversations
          </h3>
          <p className="text-gray-600">
            Talk naturally with an AI that understands context, emotion, and
            intent.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            Vision & Understanding
          </h3>
          <p className="text-gray-600">
            Image reasoning, object detection, and real-world awareness at
            scale.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            Creative Intelligence
          </h3>
          <p className="text-gray-600">
            Generate ideas, stories, images, videos, and creative content
            effortlessly.
          </p>
        </div>
      </section>
    </div>
  );
}

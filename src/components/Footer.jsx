export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top row */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center font-bold">
              EM
            </div>
            <span className="text-lg font-semibold">ExpenseMate</span>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="cursor-pointer hover:text-white">About</span>
            <span className="cursor-pointer hover:text-white">Contact</span>
            <span className="cursor-pointer hover:text-white">Terms</span>
            <span className="cursor-pointer hover:text-white">Privacy</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 my-6"></div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ExpenseMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

function Navbar() {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/" className="text-2xl font-bold text-gradient">
        ResumeTrack
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
        {auth.isAuthenticated && (
          <button
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold p-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            onClick={() => auth.signOut()}
            title="Sign Out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

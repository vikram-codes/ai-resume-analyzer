import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

function Navbar({ upload = true }) {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <Link to="/" className="navbar-brand">
          ResuMind
        </Link>

        <div className="flex items-center gap-4">
          {upload && (
            <Link to="/upload" className="btn-primary">
              Analyze Resume
            </Link>
          )}

          {auth.isAuthenticated && (
            <button
              className="btn-secondary"
              onClick={() => auth.signOut()}
              title="Sign Out"
              style={{
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
      </div>
    </nav>
  );
}

export default Navbar;

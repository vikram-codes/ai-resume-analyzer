import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = [
  { title: "Authentication" },
  { name: "description", content: "Authentication page for ResumeTrack" },
];

function auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="bg-zinc-900 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-gradient text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                ResumeTrack
              </h1>
            </div>
            {!auth.isAuthenticated && (
              <>
                <h2 className="text-slate-300 text-lg">Welcome back</h2>
                <p className="text-slate-400 text-sm mt-2">
                  Sign in to continue your career journey
                </p>
              </>
            )}
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled
              >
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing you in...</span>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-green-400 text-sm">
                        ✓ You're already signed in
                      </p>
                    </div>
                    <button
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                      onClick={() => auth.signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
                    onClick={() => auth.signIn()}
                  >
                    Sign In with Puter
                  </button>
                )}
              </>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-center text-slate-400 text-xs">
              Secure authentication powered by Puter
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default auth;

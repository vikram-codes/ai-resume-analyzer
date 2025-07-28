import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = [
  { title: "Sign In - ResuMind AI Resume Analysis" },
  {
    name: "description",
    content: "Sign in to ResuMind to access comprehensive AI-powered resume analysis, ATS scoring, and professional feedback.",
  },
  { name: "robots", content: "noindex, nofollow" },
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
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.08) 100%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 1rem" }}>
        <div
          className="card-elevated"
          style={{ padding: "2.5rem", textAlign: "center" }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                Welcome to ResuMind
              </h1>
            </div>
            {!auth.isAuthenticated && (
              <>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    color: "var(--color-text-secondary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Sign in to continue
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  Get AI-powered insights to boost your career
                </p>
              </>
            )}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            {isLoading ? (
              <button
                className="btn-primary w-full"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                disabled
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                <span>Signing you in...</span>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                        borderRadius: "0.75rem",
                        padding: "1rem",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: "var(--color-success)",
                          fontSize: "0.875rem",
                        }}
                      >
                        ✓ You're already signed in
                      </p>
                    </div>
                    <button
                      className="btn-secondary"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-error), #dc2626)",
                        color: "white",
                        borderColor: "transparent",
                      }}
                      onClick={() => auth.signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-primary w-full"
                    onClick={() => auth.signIn()}
                    style={{ fontSize: "1rem", padding: "0.875rem 1.5rem" }}
                  >
                    Sign In with Puter
                  </button>
                )}
              </>
            )}
          </div>

          <div
            style={{
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--color-border-light)",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-tertiary)",
                textAlign: "center",
              }}
            >
              Secure authentication powered by Puter
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

export default auth;

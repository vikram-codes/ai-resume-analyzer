import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="text-2xl font-bold text-gradient">
        ResumeTrack
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex flex-col align-center justify-center bg-gray-900 text-white text-sm font-serif">
      <div className="container mx-auto py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-[var(--Logo-color)]">GlamBook</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="hover:text-[var(--Logo-color)]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--Logo-color)]">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--Logo-color)]">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[var(--Logo-color)]">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold">Social Media</h5>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Instagram
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold">Policy Links</h5>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold">Additional</h5>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Reviews & Ratings
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[var(--Logo-color)]">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-center py-3 text-gray-400">
        &copy; 2025 - All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;

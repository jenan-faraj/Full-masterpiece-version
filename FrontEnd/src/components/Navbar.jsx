import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in cookies
    const checkAuthStatus = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      
      if (tokenCookie) {
        setIsLoggedIn(true);
        // You might want to decode the token to get the username
        // For now, I'll assume we have a username cookie as well
        const usernameCookie = cookies.find(cookie => cookie.trim().startsWith('username='));
        if (usernameCookie) {
          setUsername(usernameCookie.split('=')[1]);
        } else {
          setUsername("User"); // Default username if not found
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Categories", path: "/categories" },
    { title: "About us", path: "/aboutUs" },
    { title: "Contact us", path: "/contactUs" },
    { title: "Join us today", path: "/salonRegistrationForm" },
  ];

  return (
    <header className="w-full bg-[#F9F3F1] shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-[#B58152] text-2xl md:text-3xl font-bold">
            GlamBook
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <ul className="flex items-center text-[20px] space-x-2 text-[#B58152] font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="px-3 py-2 rounded hover:bg-[#f5e6e1] transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/userProfile"
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#f5e6e1] transition-colors"
                    >
                      <FaUser /> {username}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#f5e6e1] transition-colors text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded hover:bg-[#f5e6e1] transition-colors"
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#B58152] text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-[#F9F3F1] border-t border-[#e6d8d3]">
            <ul className="py-2 text-[#B58152]">
              {navLinks.map((link) => (
                <li key={link.path} className="border-b border-[#e6d8d3]">
                  <Link
                    to={link.path}
                    className="block py-3 px-4 hover:bg-[#f5e6e1] transition-colors"
                    onClick={toggleMenu}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              
              {isLoggedIn ? (
                <>
                  <li className="border-b border-[#e6d8d3]">
                    <Link
                      to="/userProfile"
                      className="flex items-center gap-2 py-3 px-4 hover:bg-[#f5e6e1] transition-colors"
                      onClick={toggleMenu}
                    >
                      <FaUser /> {username}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="flex items-center gap-2 w-full text-left py-3 px-4 hover:bg-[#f5e6e1] transition-colors text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="border-b border-[#e6d8d3]">
                  <Link
                    to="/partnerSignIn"
                    className="block py-3 px-4 hover:bg-[#f5e6e1] transition-colors"
                    onClick={toggleMenu}
                  >
                    Join us today
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
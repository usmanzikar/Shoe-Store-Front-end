import { useState, useRef } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // import your auth context

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const dropdownTimeout = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [query, setQuery] = useState("");

  const { user } = useAuth(); // get user from context

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim() !== "") {
      navigate(`/${query.trim()}`); // Navigate to search results
    }
  };

  const handleMouseEnter = (menu) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // Delay prevents flicker
  };

  return (
    <header className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/">
          <img
            src={logo}
            alt="Shoe Logo"
            className="h-14 w-auto cursor-pointer"
          />
        </a>

        <nav className="hidden md:flex gap-6 items-center">
          <a href="/" className="hover:text-orange-400 font-medium transition">
            Home
          </a>

          {/* SHOP */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("shop")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-orange-400 font-medium transition">
              Shop
            </button>
            {openDropdown === "shop" && (
              <div className="fixed top-[64px] left-0 w-screen bg-white text-gray-800 p-6 shadow-lg z-40 flex justify-center">
                <div className="max-w-7xl w-full flex justify-between px-8">
                  {[
                    {
                      title: "Men's Wear",
                      path: "menswear",
                      links: ["Sneakers", "Loafers", "Boots", "Sandals"],
                    },
                    {
                      title: "Women's Wear",
                      path: "womenwear",
                      links: ["Heels", "Flats", "Boots", "Sneakers"],
                    },
                    {
                      title: "Performance Shoes",
                      path: "performance",
                      links: ["Running", "Training", "Basketball", "Football"],
                    },
                    {
                      title: "Casual Shoes",
                      path: "casual",
                      links: ["Daily Wear", "Slip-ons"],
                    },
                  ].map((col) => (
                    <div key={col.title} className="min-w-[180px]">
                      <h4 className="font-semibold mb-2">{col.title}</h4>
                      {col.links.map((link) => (
                        <button
                          key={link}
                          onClick={() => {
                            navigate(`/${col.path}`, {
                              state: { category: link },
                            });
                            setOpenDropdown(null); // Close dropdown after click
                          }}
                          className="block hover:bg-orange-500 hover:text-white px-2 py-1 rounded transition text-left w-full text-gray-800"
                        >
                          {link}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate("/", { state: { scrollTo: "blog" } })}
            className="hover:text-orange-400 font-medium transition"
          >
            Blog
          </button>

          {/* PAGES */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("pages")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-orange-400 font-medium transition">
              Pages
            </button>
            {openDropdown === "pages" && (
              <div className="fixed top-[64px] left-0 w-screen bg-white text-gray-800 p-6 shadow-lg z-40 flex justify-center">
                <div className="max-w-md w-full flex justify-center gap-12">
                  {[
                    { label: "FAQ", target: "faq" },
                    { label: "Contact Us", target: "contact" },
                    { label: "About", target: "about" },
                  ].map(({ label, target }) => (
                    <button
                      key={label}
                      onClick={() => {
                        navigate("/", { state: { scrollTo: target } });
                        setOpenDropdown(null); // close the dropdown
                      }}
                      className="block hover:bg-orange-500 hover:text-white px-4 py-2 rounded transition font-medium cursor-pointer w-full text-left"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate("/", { state: { scrollTo: "offer" } })}
            className="hover:text-orange-400 font-medium transition"
          >
            Offers
          </button>

          {/* Search + Cart + Profile / Login */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={query}
                  placeholder="Search shoes..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="px-3 py-1 rounded-md text-black"
                />

                <Search
                  type="submit"
                  className="absolute right-2 top-1.5 w-4 h-4 text-orange-500"
                />
              </form>
            </div>

            {/* Show cart icon ONLY if user is logged in */}
            {user && (
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 hover:text-orange-400 cursor-pointer transition" />
              </Link>
            )}

            {/* Show Profile if logged in, else Login */}
            {user ? (
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-orange-400 font-medium transition"
              >
                My Profile
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hover:text-orange-400 font-medium transition"
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Icon */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4">
          {/* Home */}
          <a
            href="/"
            className="block py-2 border-b border-white/20 hover:text-orange-500"
          >
            Home
          </a>

          {/* SHOP DROPDOWN */}
          <div className="border-b border-white/20">
            <button
              onClick={() =>
                setActiveMobileMenu(activeMobileMenu === "shop" ? "" : "shop")
              }
              className={`w-full text-left py-2 hover:text-orange-500 ${
                activeMobileMenu === "shop"
                  ? "text-orange-500 font-semibold"
                  : ""
              }`}
            >
              Shop
            </button>

            {activeMobileMenu === "shop" && (
              <div className="pl-4">
                {/* Men's Wear Submenu */}
                <button
                  onClick={() =>
                    setActiveSubMenu(activeSubMenu === "men" ? "" : "men")
                  }
                  className={`w-full text-left py-1 ${
                    activeSubMenu === "men"
                      ? "text-orange-400 font-semibold"
                      : ""
                  }`}
                >
                  Men's Wear
                </button>
                {activeSubMenu === "men" && (
                  <div className="pl-4">
                    {["Sneakers", "Boots", "Loafers", "Sandals"].map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() => {
                            navigate("/menswear", { state: { category } });
                            setIsOpen(false); // Close mobile menu
                          }}
                          className="block w-full text-left py-1 hover:text-orange-500"
                        >
                          {category}
                        </button>
                      )
                    )}
                  </div>
                )}

                {/* women's Wear menu */}
                <button
                  onClick={() =>
                    setActiveSubMenu(activeSubMenu === "women" ? "" : "women")
                  }
                  className={`w-full text-left py-1 ${
                    activeSubMenu === "women"
                      ? "text-orange-400 font-semibold"
                      : ""
                  }`}
                >
                  Women's Wear
                </button>
                {activeSubMenu === "women" && (
                  <div className="pl-4">
                    {["Heels", "Flats", "Boots", "Sneakers"].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          navigate("/womenwear", { state: { category } });
                          setIsOpen(false);
                        }}
                        className="block w-full text-left py-1 hover:text-orange-500"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* performance shoes menu */}
                <button
                  onClick={() =>
                    setActiveSubMenu(
                      activeSubMenu === "performance" ? "" : "performance"
                    )
                  }
                  className={`w-full text-left py-1 ${
                    activeSubMenu === "performance"
                      ? "text-orange-400 font-semibold"
                      : ""
                  }`}
                >
                  Performance Shoes
                </button>

                {activeSubMenu === "performance" && (
                  <div className="pl-4">
                    {[
                      "Running Shoes",
                      "Basketball Shoes",
                      "Football Shoes",
                      "Training",
                    ].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          navigate("/performance", { state: { category } });
                          setIsOpen(false);
                        }}
                        className="block w-full text-left py-1 hover:text-orange-500"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* casual shoes menu */}
                <button
                  onClick={() =>
                    setActiveSubMenu(activeSubMenu === "casual" ? "" : "casual")
                  }
                  className={`w-full text-left py-1 ${
                    activeSubMenu === "casual"
                      ? "text-orange-400 font-semibold"
                      : ""
                  }`}
                >
                  Casual Shoes
                </button>
                {activeSubMenu === "casual" && (
                  <div className="pl-4">
                    {["Slip-ons", "Daily Wear"].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          navigate("/casual", { state: { category } });
                          setIsOpen(false);
                        }}
                        className="block w-full text-left py-1 hover:text-orange-500"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Other Links */}

          <button
            onClick={() => {
              navigate("/", { state: { scrollTo: "blog" } });
              setIsOpen(false); // Close mobile menu
            }}
            className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
          >
            Blog
          </button>

          <button
            onClick={() => {
              navigate("/", { state: { scrollTo: "about" } });
              setIsOpen(false); // Close mobile menu
            }}
            className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
          >
            About
          </button>

          <button
            onClick={() => {
              navigate("/", { state: { scrollTo: "offer" } });
              setIsOpen(false); // Close mobile menu
            }}
            className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
          >
            Offers
          </button>

          <details className="py-2 border-b border-white/20 cursor-pointer">
            <summary className="hover:text-orange-500">Pages</summary>
            <div className="pl-4">
              <button
                onClick={() => {
                  navigate("/", { state: { scrollTo: "faq" } });
                  setIsOpen(false); // Close mobile menu
                }}
                className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  navigate("/", { state: { scrollTo: "contact" } });
                  setIsOpen(false); // Close mobile menu
                }}
                className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
              >
                Contact Us
              </button>
            </div>
          </details>
            {/* Show Profile if logged in, else Login */}
            {user ? (
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
              >
                My Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 border-b border-white/20 hover:text-orange-400"
              >
                Login
              </button>
            )}

          <div className="mt-3 flex items-center gap-8">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                placeholder="Search shoes..."
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 rounded-md text-black"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Search
              </button>
            </form>

            {/* Show cart icon ONLY if user is logged in */}
            {user && (
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 hover:text-orange-400 cursor-pointer transition" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

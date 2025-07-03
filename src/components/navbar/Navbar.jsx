import { useState, useRef } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";


export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const dropdownTimeout = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

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
                      links: ["Daily Wear", "Slip-ons",],
                    },
                  ].map((col) => (
                    <div key={col.title} className="min-w-[180px]">
                      <h4 className="font-semibold mb-2">{col.title}</h4>
                      {col.links.map((link) => (
                        <button
                          key={link}
                          onClick={() =>
                            navigate(`/${col.path}`, {
                              state: { category: link },
                            })
                          }
                          className="block hover:bg-orange-50 px-2 py-1 rounded transition text-left w-full text-gray-800"
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
          <Link
            to="catagoryhome"
            smooth={true}
            duration={1000}
            className="hover:text-orange-400 cursor-pointer font-medium transition"
          >
            Catagory
          </Link>
          <Link
            to="blog"
            smooth={true}
            duration={1000}
            className="hover:text-orange-400 cursor-pointer font-medium transition"
          >
            Blog
          </Link>

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
                  {["FAQ", "Contact Us"].map((link) => (
                    <Link
                      key={link}
                      to={link === "FAQ" ? "faq" : "contact"}
                      smooth={true}
                      duration={1000}
                      className="block hover:bg-orange-50 px-4 py-2 rounded transition font-medium cursor-pointer"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="about"
            smooth={true}
            duration={1000}
            className="hover:text-orange-400 cursor-pointer font-medium transition"
          >
            About
          </Link>
          <Link
            to="offer"
            smooth={true}
            duration={1000}
            className="hover:text-orange-400 cursor-pointer font-medium transition"
          >
            Offers
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 rounded-md text-black"
              />
              <Search className="absolute right-2 top-1.5 w-4 h-4 text-orange-500" />
            </div>
            <ShoppingCart className="w-6 h-6 hover:text-orange-400 cursor-pointer transition" />
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
          <a href="/" className="block py-2 border-b border-white/20 hover:text-orange-500">
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
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Sneakers
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Boots
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Loafers
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Sandals
                    </a>
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
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Heels
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Flat Shoes
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Boots
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Sneakers
                    </a>
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
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Running Shoes
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Basketball Shoes
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Football Shoes
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Training
                    </a>
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
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Slip-ons
                    </a>
                    <a
                      href="/menswear"
                      className="block py-1 hover:text-orange-500"
                    >
                      Daily Wear
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Other Links */}
          <a href="#" className="block py-2 border-b border-white/20 hover:text-orange-500">
            Blog
          </a>
          <a href="#" className="block py-2 border-b border-white/20 hover:text-orange-500">
            About
          </a>
          <a href="#" className="block py-2 border-b border-white/20 hover:text-orange-500">
            Offers
          </a>
          <details className="py-2 border-b border-white/20 cursor-pointer ">
            <summary>Pages</summary>
            <div className="pl-4">
              <a href="#" className="block py-1 hover:text-orange-500">
                FAQ
              </a>
              <a href="#" className="block py-1 hover:text-orange-500">
                Contact Us
              </a>
            </div>
          </details>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 rounded-md text-black"
            />
          </div>
        </div>
      )}
    </header>
  );
}

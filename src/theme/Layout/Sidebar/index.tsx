import React from "react";
import { Link, useHistory } from "react-router-dom";

// Define prop types
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Reusable NavLink component for internal links
const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <li className="py-5 md:py-6 lg:py-6 border-b border-white nav-text list-none" style={{ transform: "translateY(50px) translateZ(0px)" }}>
    <Link to={href} onClick={onClick} className="text-white text-2xl sm:text-3xl font-bold transition-colors duration-700 md:text-5xl hover:no-underline hover:text-primary-brand uppercase">
      <span>{children}</span>
    </Link>
  </li>
);

// Reusable CloseButton component
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="navbar-toggle flex justify-end mt-8 mr-6">
    <button className=" text-white bg-transparent border-0 text-2xl md:text-3xl lg:text-4xl" onClick={onClick} style={{ cursor: "pointer" }}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        fillRule="evenodd"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "white" }}
      >
        <path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"></path>
      </svg>
    </button>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const history = useHistory();

  const handleNavClick = (href: string, hash?: string) => {
    if (hash) {
      // Navigate to the home page and then scroll to the specific section
      history.push(href);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Just navigate to the target URL
      history.push(href);
    }
    toggleSidebar();
  };

  const closedMenuClasses = "nav-menu hidden transition-all duration-300 delay-500";
  const openMenuClasses = "nav-menu bg-primary-dark w-[100%] h-screen fixed overflow-y-auto top-0 right-0 z-50 px-8 md:px-16 pb-16 transition-all duration-300 delay-500";

  return (
    <nav className={isOpen ? openMenuClasses : closedMenuClasses}>
      <CloseButton onClick={toggleSidebar} />
      <ul className="mt-2 h-full">
        {/* Home and Blog Links */}
        <NavLink href="/" onClick={() => handleNavClick('/')}>Home</NavLink>
        <NavLink href="/blog" onClick={() => handleNavClick('/blog')}>Events & News</NavLink>
        {/* Join the Community: Scroll to Section on Home Page */}
        <NavLink href="/" onClick={() => handleNavClick('/', 'jointhecommunity')}>Join the Community</NavLink>
        {/* Get in Touch: Scroll to Section on Current Page */}
        <NavLink href="#getintouch" onClick={toggleSidebar}>Get in touch</NavLink>
      </ul>
    </nav>
  );
};

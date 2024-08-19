import React from "react";
import { Link, useHistory } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, children, onClick }) => (
  <li className="py-5 md:py-6 lg:py-6 border-b border-white nav-text list-none">
    <Link
      to={href}
      onClick={onClick}
      className="text-white text-2xl sm:text-3xl font-bold transition-colors duration-700 md:text-5xl hover:no-underline hover:text-primary-brand uppercase"
    >
      <span>{children}</span>
    </Link>
  </li>
);

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="navbar-toggle flex justify-end mt-8 mr-6">
    <button
      className="text-white bg-transparent border-0 text-2xl md:text-3xl lg:text-4xl"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={require(`@site/static/assets/close-button.webp`).default}
        alt="Close Button"
        className="h-7 w-7"
      />
    </button>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const history = useHistory();

  const handleNavClick = (href: string, hash?: string) => {
    if (hash) {
      history.push(href);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      history.push(href);
    }
    toggleSidebar();
  };

  const sidebarClasses = `
    nav-menu fixed top-0 left-0 w-full h-screen bg-primary-dark z-50 px-8 md:px-16 pb-16 overflow-y-auto transition-opacity duration-500 ease-in-out
    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
  `;

  return (
    <nav className={sidebarClasses}>
      <CloseButton onClick={toggleSidebar} />
      <ul className="mt-2 h-full">
        <NavLink href="/" onClick={() => handleNavClick("/")}>
          Home
        </NavLink>
        <NavLink href="/blog" onClick={() => handleNavClick("/blog")}>
          Blogs & News
        </NavLink>
        <NavLink
          href="/"
          onClick={() => handleNavClick("/", "jointhecommunity")}
        >
          Join the Community
        </NavLink>
        <NavLink href="#getintouch" onClick={toggleSidebar}>
          Get in touch
        </NavLink>
      </ul>
    </nav>
  );
};

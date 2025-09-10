import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="modern-navbar">
      <ul className="nav-grid">
        {navItems.map(({ to, label }) => (
          <li key={to} className="nav-tile">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

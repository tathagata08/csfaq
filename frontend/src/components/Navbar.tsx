import { NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-1.5 text-sm font-medium tracking-wide transition-colors rounded-full";
const active = "bg-moss text-parchment";
const inactive = "text-ink/70 hover:text-ink hover:bg-mossLight";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-moss font-display text-sm font-semibold text-parchment">
            S
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Samagama
          </span>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/faq"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/forum"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Discussion Forum
          </NavLink>
          <NavLink
            to="/escalation"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Escalation
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

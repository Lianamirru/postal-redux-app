import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <section>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          App
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts">
              New
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

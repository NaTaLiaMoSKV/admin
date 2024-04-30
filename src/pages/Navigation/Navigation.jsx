import { useAuth } from "hooks/useAuth";
import { Navbar, Container, Nav, Dropdown, NavItem } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { CiUser } from "react-icons/ci";
import "./Navigation.css";
import { NavigationNavItem, NavigationNavbar } from "./Navigation.styled";

const Navigation = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <NavigationNavbar>
        <Container fluid>
          <Navbar.Collapse>
            <Navbar.Brand as={Link} to="/">
              <img
                src="/logo.png"
                alt="LMS"
                width={64}
                height={64}
                style={{ borderRadius: "50%" }}
              />{" "}
            </Navbar.Brand>
            <Nav>
              <NavigationNavItem>
                <NavLink as={Link} to="/" className="navigation-link">
                  Home
                </NavLink>
              </NavigationNavItem>
              {user ? (
                <>
                  <NavigationNavItem>
                    <NavLink
                      as={Link}
                      to="/courses"
                      className="navigation-link"
                    >
                      Courses
                    </NavLink>
                  </NavigationNavItem>
                  <NavigationNavItem>
                    <NavLink as={Link} to="/groups" className="navigation-link">
                      Groups
                    </NavLink>
                  </NavigationNavItem>
                  <NavigationNavItem>
                    <NavLink
                      as={Link}
                      to="/teachers"
                      className="navigation-link"
                    >
                      Teachers
                    </NavLink>
                  </NavigationNavItem>
                  <NavigationNavItem>
                    <NavLink
                      as={Link}
                      to="/students"
                      className="navigation-link"
                    >
                      Students
                    </NavLink>
                  </NavigationNavItem>
                </>
              ) : (
                <NavigationNavItem>
                  <NavLink as={Link} to="/login" className="navigation-link">
                    Login
                  </NavLink>
                </NavigationNavItem>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {user && (
              <Dropdown as={NavItem}>
                <Dropdown.Toggle
                  as={NavLink}
                  className="d-flex align-items-center"
                >
                  <CiUser className="me-1" />
                  <span className="fw-bolder ms-1">{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="nav-dropdown-menu">
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="nav-dropdown-item"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </NavigationNavbar>
    </>
  );
};

export default Navigation;

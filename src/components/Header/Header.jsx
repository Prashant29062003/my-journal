import { useSelector } from 'react-redux';
import {Container, Logo, LogoutBtn} from '../index.js';
import { Link, useNavigate } from 'react-router-dom';;


const Header = () => {
  const authStatus = useSelector((state)=> state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    }
  ]
  return (
    <header className="py-3 shadow bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 sticky top-0 z-50">
      <Container className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo>
            <span className="text-xl font-bold text-white hidden sm:inline">MyJournal</span>
          </Logo>
        </Link>
        <nav className="flex-1">
          <ul className="flex justify-end items-center gap-2 sm:gap-4">
            {navItems.map(item =>
              item.active ? (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded hover:bg-gray-600 text-white font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

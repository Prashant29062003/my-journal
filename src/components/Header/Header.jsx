import { useSelector } from 'react-redux';
import {Container, Logo, LogoutBtn} from '../index.js';
import { Link, useNavigate } from 'react-router-dom';;


const Header = () => {
  const authStatus = useSelector((state)=> state.auth.status);

  const navigate = useNavigate();

  cosnt navItems = [
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
      slug: "/sighup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "add-post",
      active: authStatus
    }
  ]
  return (
    <div>
     <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='70px'></Logo>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map(item => 
                item.active ? (
                  <li key={item.slug}>
                    <button onClick={() => navigate(item.slug)}>
                       {item.name}
                    </button>
                  </li>
                ) : null
              )
            }
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
     </header>
    </div>
  )
}

export default Header

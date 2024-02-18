import {NavLink} from "react-router-dom";

const Navbar = () => {
  const isActiveNavItem = ({ isActive }) => {
    return isActive ? 'text-blue-500' : 'text-black'
  }

  return (
    <header className='header'>
      <NavLink to='/' className='w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold shadow-md'>
        <p className='blue-gradient_text'>YF</p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={isActiveNavItem}>About</NavLink>
        <NavLink to='/projects' className={isActiveNavItem}>Projects</NavLink>
        <NavLink to='/contact' className={isActiveNavItem}>Contact</NavLink>
      </nav>
    </header>
  )
}

export default Navbar

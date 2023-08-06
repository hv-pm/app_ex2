import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/signin">Signin</Link>
        <Link to="/admin">Admin</Link>
    </div>
  )
}

export default Header;
import { Link } from 'react-router-dom';

export default function Navigations({ token }) {
  return (
    <nav>
      <ul className='navbar'>
        <li>
          <Link to="/login" target='_blank'>Login</Link>
        </li>
        <li>
          <Link to="/account" target='_blank'>Account</Link>
        </li>
        <li>
          <Link to="/register" target='_blank'>Register</Link>
        </li>
        <li>
          <Link to="/cart" target='_blank'>Cart</Link>
        </li>
        <li>
          <Link to="/orders" target='_blank'>Orders</Link>
        </li>
      </ul>
    </nav>
  );
};
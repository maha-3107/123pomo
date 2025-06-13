import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">Pomodoro</h2>
        <ul className="nav-links">
          <li className={router.pathname === '/' ? 'active' : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={router.pathname === '/tasks' ? 'active' : ''}>
            <Link href="/tasks">Tasks</Link>
          </li>
          <li className={router.pathname === '/about' ? 'active' : ''}>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          background-color: #0070f3;
          padding: 1rem 2rem;
          color: white;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          margin: 0;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
        .nav-links li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
        }
        .nav-links li.active a {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}

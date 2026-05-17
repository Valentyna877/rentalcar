'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import css from './Header.module.css';

const Header = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  if (menuOpen) {
    document.body.classList.add('body-lock');
  } else {
    document.body.classList.remove('body-lock');
  }
}, [menuOpen]);

    const isActive = (path: string) => {
    if (path === "/") {
    return pathname === "/";
      }
      if (path === "/catalog") {
        return pathname === "/catalog";
      }
  return pathname.startsWith(path);
};

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapper}>
          <Link className={css.logo} href="/">
            <svg
              className={css.logoIcon}
              width="104"
              height="16"
            >
              <use href="/sprite.svg#icon-rental-car" />
            </svg>
          </Link>
          
          <button
              className={`${css.burgerBtn} ${menuOpen ? css.open : ''}`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
          
          {menuOpen && (
            <div
             className={`${css.backdrop} ${menuOpen ? css.show : ''}`}
              onClick={() => setMenuOpen(false)}
            />
          )}
                  
          <nav className={`${css.nav} ${menuOpen ? css.navOpen : ''}`}
            aria-label="Main navigation">
            <ul className={css.listHeader}>
              <li>
                <Link
                  href="/"
                  aria-current={pathname === '/' ? 'page' : undefined}
                  className={`${css.listNavItem} ${isActive('/') ? css.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  aria-current={pathname === '/catalog' ? 'page' : undefined}
                  className={`${css.listNavItem} ${isActive('/catalog') ? css.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

function Navbar() {
  const [click, setCLick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => setCLick(!click);
  const closeMobileMenu = () => setCLick(false);

  useEffect(() => {
    if (sessionStorage.userData === undefined){
      setIsLoggedIn(false) 
    }
    else if (sessionStorage.userData !== undefined) {
      setIsLoggedIn(true)
    }
  });

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles['navbar-container']}>
          <div className={styles['navbar-logo']} onClick={closeMobileMenu}>
            TOP GAMES
            <i className='fa-sharp fa-solid fa-dice-d6'></i>
          </div>
          <div className={styles['menu-icon']} onClick={handleClick}>
            <i className='fas fa-bars' />
          </div>

          <ul className={styles['nav-menu']}>
            <li className={styles['nav-item']}>
              <Link href='/' className={styles['nav-links']}>
                <a className={styles['game-link']}>Home</a>
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href='/games/list' className={styles['nav-links']}>
                <a className={styles['game-link']}>Game List</a>
              </Link>
            </li>
            {isLoggedIn ? 
                <div className={styles.navbarUser + " d-flex align-items-center"}>
                  <li>
                    <Link href='/profile' className={styles['nav-links-mobile']}>
                      <a className={styles['game-link']}>Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/' className={styles['nav-links-mobile']}>
                      <a className={styles['game-link']} onClick={()=>sessionStorage.clear()}>Log Out</a>
                    </Link>
                  </li>
                </div>
              :
              <div className={styles.navbarUser + " d-flex align-items-center"}>
                <li className={styles['nav-item']}>
                  <Link href='/login' className={styles['nav-links']}>
                    <a className={styles['game-link']}>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href='/register' className={styles['nav-links-mobile']}>
                    <a className={styles['game-link']}>Register</a>
                  </Link>
                </li>
              </div>
            }
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

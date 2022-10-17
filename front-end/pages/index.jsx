import React from 'react';
import { Button } from 'reactstrap';
import styles from '../styles/landingpage.module.css';
import Navbar from '../components/Navbar';
import Link from 'next/link';

function HeroSection() {
  return (
    <>
      <Navbar />
      <div className={styles['hero-container']}>
        {/* <video src="/videos/speed-2.mp4" autoPlay loop muted /> */}
        <h1>PLAY THE GAME</h1>
        <p>What are you waiting for?</p>
        <div className={styles['hero-btns']}>
          <Button size="lg" className={styles.btn}>
            <Link href="/games/list">
              <a className={styles['font-color']}>PLAY NOW</a>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;

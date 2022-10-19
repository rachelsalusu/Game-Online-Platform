import React from "react";
import { Button } from "reactstrap";
import styles from "../styles/landingpage.module.css";
import Navbar from "../components/Navbar";
// import { Player } from "video-react";
import Link from "next/link";
import ReactPlayer from "react-player/youtube";

function HeroSection() {
  return (
    <>
      <Navbar />
      <div className={styles["hero-container"]}>
        {/* <video src="/videos/speed-2.mp4" autoPlay loop muted /> */}
        <h1>PLAY THE GAME</h1>
        <p>What are you waiting for?</p>
        <div className={styles["hero-btns"]}>
          <Button size="lg" className={styles.btn + " cobaajayakan"}>
            <Link href="/games/list">
              <a className={styles["font-color"]}>PLAY NOW</a>
            </Link>
          </Button>
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            muted={true}
            url="https://www.youtube.com/watch?v=ifZA6IMeLs8"
            className="react-player"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;

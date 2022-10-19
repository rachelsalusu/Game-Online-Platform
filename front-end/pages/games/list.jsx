import Link from "next/link";
import { Card, CardBody, CardSubtitle, CardTitle, CardImg, Container, Button } from "reactstrap";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/gamelist.module.css";
import { fetchGameList } from '../../middlewares/game-list'
import { fetchLeaderboards } from '../../middlewares/leaderboards'
import Navbar from "../../components/Navbar";

export default function GameList() {
  const gameListState = useSelector((state) => state.gameList);
  const leaderboardsState = useSelector((state) => state.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameList())
  },[]);

  useEffect(() => {
    if (sessionStorage.userData !== undefined) {
      dispatch(fetchLeaderboards())
    }
  },[]);

  // To check if user already played the game
  const alreadyPlayed = (id) => {
    let played = false;
    if (sessionStorage.userData === undefined) {
      return played
    }
    for (let i=1; i < leaderboardsState.leaderboards.length; i++){
      if (leaderboardsState.leaderboards[i].game_id == id) {
        played = true;
        break
      } 
      else {
        played = false
      }
    }
    return played
  }

  // Create Element Game List
  const createElementGameList = () => {
    let elements = [];
    for (const i in gameListState.gameList) {
      elements.push(
        <Card style={{ width: "18rem" }} className="m-3" key={i}>
          <CardImg top width="100%" src={gameListState.gameList[i].thumbnail_url} />
          <CardBody>
            <CardTitle tag="h5">
              <Link
                href={sessionStorage.userData ? "/games/" + gameListState.gameList[i].id : "/login"}
                className={styles.removeHighlight}>
                {gameListState.gameList[i].name}
              </Link>
            </CardTitle>
            <CardSubtitle>{alreadyPlayed(gameListState.gameList[i].id) ? 'You already played this game' : '' }</CardSubtitle>
          </CardBody>
        </Card>
      );
    }
    return elements;
  }

  return (
    <>
        <Navbar />
      <Container className={styles.container}>
        <p className="d-flex justify-content-center h1 text-light">
          List of Available Games
        </p>
        <div className="d-flex justify-content-center">
        <Button color="primary" size="lg" >
          <Link href='/games/add' >
              <a className={styles.fontColor}>Add Game</a>
          </Link>
        </Button>

        </div>
       
        <Container className="d-flex justify-content-center align-items-center mt-2">
          {createElementGameList()}
        </Container>
      </Container>
    </>
    )
}


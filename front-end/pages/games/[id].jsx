import { useRouter } from 'next/router'
// import Image from 'next/image'
import Link from "next/link"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Table, Container, Button } from "reactstrap"

import styles from "../../styles/gamedetail.module.css"
import { fetchGameDetails } from '../../middlewares/game-details'
import Navbar from "../../components/Navbar"
import ImageWithFallback from '../../components/imageWithFallback'

export default function GameDetails() {
  const router = useRouter()
  const id = router.query
  
  const gameDetailsState = useSelector((state) => state.gameDetails)
  const leaderboardsState = useSelector((state) => state.leaderboards)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage.userData === undefined){
      router.push('/login')
    }
    else if (sessionStorage.userData !== undefined){
      dispatch(fetchGameDetails(id.id))
    }
  });

  const createElementGameDetail= () => {
    let elements = [];
    for (let i = 0; i < leaderboardsState.leaderboards.length; i++) {
      if (leaderboardsState.leaderboards[i].game_id == id.id) {
        elements.push(
          <tr key={i}>
            <td className={styles.fontFamily + " text-center"}>
              {leaderboardsState.leaderboards[i].User.username}
            </td>
            <td className={styles.fontFamily + " text-center"}>
              {leaderboardsState.leaderboards[i].score}
            </td>
          </tr>
        );
      }
    }
    return elements.reverse()
  }

  return (
    <>
    <Navbar />
        <Container className={styles.container}>
          <Container className={styles.contentGameDetail + " d-flex align-items-center mb-4"}>
            {/* <Image
              src={gameDetailsState.gameDetails.thumbnail_url}
              alt={gameDetailsState.gameDetails.name}
              width={500}
              height={500}
              >
            </Image> */}
            <ImageWithFallback
              src={gameDetailsState.gameDetails.thumbnail_url}
              className={styles.imageGameSize}
              alt={gameDetailsState.gameDetails.name}
              fallbackSrc='/../public/images/no-img-placeholder.png'
              imgWidth={500}
              imgHeight={500}

            />
            <Container className="m-3">
              <p className={styles.fontGameName}>{gameDetailsState.gameDetails.name}</p>
              <p className={styles.fontGameDesc}>{gameDetailsState.gameDetails.desc}</p>
              <Link
                href={"/games/play/" + id.id}
                className={styles.removeHighlight}>
                <Button color="primary" size="lg">
                  Play
                </Button>
              </Link>
            </Container>
          </Container>

          <p className="h3 d-flex justify-content-center text-light">
            Leaderboard Chart
          </p>
          <Table size="sm" className={styles.leaderboardTable}>
            <thead>
              <tr>
                <th className={styles.fontTable + " text-center"}>Username</th>
                <th className={styles.fontTable + " text-center"}>Score</th>
              </tr>
            </thead>
            <tbody>{createElementGameDetail()}</tbody>
          </Table>
        </Container>
      </>
  )

}

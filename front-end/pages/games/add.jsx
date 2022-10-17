import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, FormText } from 'reactstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../../styles/addgame.module.css';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const router = useRouter();
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [result, setResult] = useState(null);

  const onFileChange = (e) => {
    //Get file and file name
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setSrcImg(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

      const base64Image = canvas.toDataURL('image/jpeg', 1);
      setResult(base64Image);
      console.log(result);
    } catch (e) {
      console.log('crop the image');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Get email and description
    const formAddGame = {
      name: e.target.name.value,
      desc: e.target.desc.value,
    };

    // Uploud image to Firebase
    const storage = getStorage();
    const storageRef = ref(storage, fileName);

    try {
      await uploadBytes(storageRef, file);
    } catch (err) {
      console.log(err);
    }

    //Get URL from firebase
    try {
      const urlFirebase = await getDownloadURL(storageRef);
      formAddGame.thumbnail_url = urlFirebase;
    } catch (err) {
      console.log(err);
    }

    // POST data form to backend
    try {
      const response = await fetch('http://localhost:4000/api/v1/games', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formAddGame),
      });
      const json = await response.json();
      console.log(json.result);
      if (json.result === 'Success') {
        router.push('/games/list');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <Container className={styles.containerAddGame}>
        <div className={styles.boxAddGame}>
          <h2 className={styles.titleAddGame}>Create New Game</h2>
        </div>
        <Form onSubmit={onSubmit} className={styles.addGameForm}>
          <FormGroup>
            <Label htmlFor="game_name">Game Name</Label>
            <Input type="text" name="name" placeholder="Your game name"></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="desc">Descriptions</Label>
            <Input type="textarea" name="desc" placeholder="Game Descriptions"></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="file">Choose Picture</Label>
            <Input type="file" id="file" placeholder="file" name="file" accept="image/*" onChange={onFileChange} />
            <FormText>This will be used for video game thumbnail</FormText>
            <div>
              {srcImg && (
                <div>
                  <ReactCrop onImageLoaded={setImage} crop={crop} onChange={setCrop}>
                    <img src={srcImg} alt="" onLoad={setImage} />
                  </ReactCrop>
                  <Button className="cropButton" onClick={getCroppedImg}>
                    crop
                  </Button>
                </div>
              )}
              {result && (
                <div>
                  <img src={result} alt="cropped image" />
                </div>
              )}
            </div>
          </FormGroup>
          <FormGroup className={styles.buttonRegister}>
            <Button type="submit" color="primary" block>
              Upload
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}

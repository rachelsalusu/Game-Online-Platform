import styles from '../styles/profile.module.css';
import { Container, Form, FormGroup, Button, Label, Input, Col } from 'reactstrap';
import { FETCH_USER } from '../store/actions/user';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setformData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    address: '',
    desc: '',
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      ...{ [e.target.name]: e.target.value },
    });
    console.log(formData);
  };

  const fetchProfile = () => {
    fetch(`http://localhost:4000/api/v1/users/${JSON.parse(sessionStorage.userData).id}`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : JSON.parse(sessionStorage.userData).accessToken

      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.result, json.message);
        if (json.result === 'Success') {
          dispatch({
            type: FETCH_USER,
            payload: json.data,
          });
          setformData(json.data);
          console.log(json.data);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.username.value,
      address: e.target.address.value,
      desc: e.target.desc.value,
    };

    fetch(`http://localhost:4000/api/v1/users/${JSON.parse(sessionStorage.userData).id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : JSON.parse(sessionStorage.userData).accessToken

      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('ini json ',json);
        // console.log(json.result, json.message);
        if (json.result === 'Success') {
          dispatch({
            type: FETCH_USER,
            payload: json.data,
          });
          alert('Profile updated successfully');
        }
        else {
          router.push('/login');
        }
      });
  };

  useEffect(() => {
    if (sessionStorage.userData === undefined){
      router.push('/login')
    }
    else if (sessionStorage.userData !== undefined){
      fetchProfile();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container className={styles.containerProfile + " Container"}>
        <div className={styles.boxProfile}>
          <h2 className={styles.titleProfile}>PROFILE</h2>
        </div>
        <Form className={styles.profileForm} onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="Name" sm={3}>
              Name
            </Label>
            <Col sm={9}>
              <Input id="Name" name="name" placeholder="Your name" type="text" value={formData.name ? formData.name : ''} onChange={handleChange} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="Email" sm={3}>
              Email
            </Label>
            <Col sm={9}>
              <Input id="Email" name="email" placeholder="Your Email" type="email" value={formData.email} onChange={handleChange} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="Username" sm={3}>
              Username
            </Label>
            <Col sm={9}>
              <Input id="Username" name="username" placeholder="Your username" type="text" value={formData.username} onChange={handleChange} />
            </Col>
          </FormGroup>

          {/* <FormGroup row>
            <Label for='Password' sm={3}>
              Password
            </Label>
            <Col sm={9}>
              <Input
                id='Password'
                name='password'
                placeholder='Create your password'
                type='password'
                value={formData.password}
              />
            </Col>
          </FormGroup> */}

          <FormGroup row>
            <Label for="Address" sm={3}>
              Address
            </Label>
            <Col sm={9}>
              <Input id="Address" name="address" placeholder="Write your address" type="text" value={formData.address ? formData.address : ''} onChange={handleChange} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="Desc" sm={3}>
              Description
            </Label>
            <Col sm={9}>
              <Input id="Desc" name="desc" placeholder="Describe yourself here" type="textarea" value={formData.desc ? formData.desc : ''} onChange={handleChange} />
            </Col>
          </FormGroup>

          {/* <FormGroup>
            <Label for='FileUpload'>Upload Foto Profile</Label>
            <Input id='FileUpload' name='file' type='file' />
            <FormText className={styles.fontSize} color='black'>
              File maksimal berukuran 3mb
            </FormText>
          </FormGroup> */}

          <FormGroup>
            <Button block className={styles.buttonProfile} type="submit" color="primary" onSubmit={handleSubmit}>
              Update
            </Button>
          </FormGroup>
          {/* <div className={text-center pt-2'>
                        Let's connect with your social account!
                    </div>
                    <FacebookLoginButton className={mt-2 mb-4'/> */}
        </Form>
      </Container>
    </>
  );
}

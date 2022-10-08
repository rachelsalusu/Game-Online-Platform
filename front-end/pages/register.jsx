import { Component } from 'react';
import styles from '../styles/register.module.css';
// import Navbar from '../components/NavbarElement';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from "../components/Navbar";
import { Container, Form, FormGroup, Button, Label, Input } from 'reactstrap';

export default function Register() {
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const register = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confPassword: e.target.confPassword.value,
    };

    fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register),
    })
      .then((res) => {
        if (res.status == 201){
          router.push('/')
        }
        else{
          console.log(res.statusText)
        }
      });
  };

  return (
    <>
      <Navbar />{' '}
      <Container className={styles.containerRegister}>
        <div className={styles.boxRegister}>
          <h2 className={styles.titleRegister}>REGISTER</h2>
        </div>
        <Form className={styles.registerForm} onSubmit={handleSubmit}>
          <FormGroup className={styles.formGroup}>
            <Label for='email'>Email</Label>
            <Input
              id='Email'
              name='email'
              placeholder='Example@gmail.com'
              type='email'
            />
          </FormGroup>

          <FormGroup className={styles.formGroup}>
            <Label for='username'>Username</Label>
            <Input
              id='Username'
              name='username'
              placeholder='Your username'
              type='text'
            />
          </FormGroup>

          <FormGroup className={styles.formGroup}>
            <Label for='password'>Password</Label>
            <Input
              id='Password'
              name='password'
              placeholder='Enter password'
              type='password'
            />
          </FormGroup>

          <FormGroup className={styles.formGroup}>
            <Label for='confPassword'>Confirm Password</Label>
            <Input
              id='confPassword'
              name='confPassword'
              placeholder='Confirm your Password'
              type='password'
            />
          </FormGroup>

          <FormGroup className={styles.buttonRegister}>
            <Button
              type=''
              block
              color='primary'
              // onClick={() => fetchUserRegister(userState)}
            >
              Submit
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}

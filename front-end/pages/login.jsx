import { Component } from 'react';
// import Navbar from '../components/NavbarElement';
import styles from '../styles/login.module.css';
import { Container, Form, FormGroup, Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../store/actions/user';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    // console.log(login);

    fetch('http://localhost:4000/api/v1/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.result, json.message);
        console.log(json);
        if (json.result === 'Success') {
          dispatch({
            type: LOGIN,
            payload: json.data,
          });
          router.push('/');
        }
        const storedToken = sessionStorage.getItem("jwt")
        console.log(storedToken)
      });
  };

  return (
    <>
      <Navbar />
      <Container className={styles.containerLogin}>
        <div className={styles.boxLogin}>
          <h2 className={styles.titleLogin}>LOGIN</h2>
        </div>
        <Form className={styles.loginForm} onSubmit={handleSubmit}>
          <FormGroup className={styles.formGroup}>
            <Input id="username" name="username" placeholder="Username" type="text" />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Input id="Password" name="password" placeholder="Password" type="password" />
          </FormGroup>

          <Nav className={styles.forgotPass}>
            <NavItem>
              <NavLink>Forgot Password?</NavLink>
            </NavItem>
          </Nav>

          <FormGroup>
            <Button color="primary" block>
              {' '}
              Login{' '}
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}

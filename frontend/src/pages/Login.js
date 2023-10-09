import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import { Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../utils/localStorageHandler';
import { AUTH_TOKEN_KEY } from '../Config/constant';

function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const initialValues = {
    username: '',
    password: ''
  }
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formData = new FormData()
    formData.append('username', values.username)
    formData.append('password', values.password)
    axios.post(`${baseUrl}/auth/login`, values,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      ,).then(response => {
        setLocalStorage(AUTH_TOKEN_KEY.accessTokenKey, response?.data?.data?.accessToken)
        setLocalStorage(AUTH_TOKEN_KEY.refreshTokenKey, response?.data?.data?.refreshToken)
        navigate('/')
      }, error => {
        console.log("error", error)
        if (error?.message === "Network Error") {
          toast.error(`${error?.message} !! Please contact DB Administrators`)
        }
      })
  }


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Header>
          <h2 className="text-center">Login</h2>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {
              ({ handleSubmit, handleChange, handleBlur, values }) => (

                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Col} controlId="formBasicUsername">
                    <Form.Label style={{ textAlign: 'left', width: '100%' }}>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{ textAlign: 'left', width: '100%' }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100" style={{ marginTop: 20 }}>
                    Login
                  </Button>

                  <hr></hr>
                  <p>
                    Not a User! Click here to <Link to='/register'>Register</Link>
                  </p>
                </Form>
              )
            }
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
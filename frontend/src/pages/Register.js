import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Register() {
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();

	const initialState = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	}

	const [formData, setFormData] = useState(initialState)

	const validationSchema = Yup.object().shape({
		name: Yup.string().required().min(3).max(30),
		email: Yup.string().email().required(),
		password: Yup.string().required().min(5),
		confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Confirm Password field should match the Password field")
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (values) => {
		const formData = new FormData()
		formData.append('username', values.username)
		formData.append('password', values.password)
		axios.post(`${baseUrl}/auth/register`, values,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}
			,).then(response => {
				toast.success("User Registered Successfully.")
				navigate('/login')
			}, error => {
				console.log("error", error)
			})
	}

	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			<Card style={{ width: '400px' }}>
				<Card.Header>
					<h2 className="text-center">New User Registration</h2>
				</Card.Header>
				<Card.Body>
					<Formik
						initialValues={formData}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{
							({ errors, values, touched, handleSubmit }) => (

								<Form onSubmit={handleSubmit}>
									<Form.Group>
										<Form.Label style={{ textAlign: 'left', width: '100%' }}>Name</Form.Label>
										<Form.Control type='text' placeholder='Name' name='name' onChange={handleChange} value={values.name} />
										{
											errors.name && touched.name && (
												<Form.Text style={{ color: 'tomato' }}>{errors.name}</Form.Text>
											)
										}
									</Form.Group>

									<Form.Group>
										<Form.Label style={{ textAlign: 'left', width: '100%' }}>Email</Form.Label>
										<Form.Control type='email' placeholder='Email' name='email' onChange={handleChange} value={values.email} />
										{
											errors.email && touched.email && (
												<Form.Text style={{ color: 'tomato' }}>{errors.email}</Form.Text>
											)
										}
									</Form.Group>

									<Form.Group>
										<Form.Label style={{ textAlign: 'left', width: '100%' }}>Password</Form.Label>
										<Form.Control type='password' placeholder='Password' name='password' onChange={handleChange} value={values.password} />
										{
											errors.password && touched.password && (
												<Form.Text style={{ color: 'tomato' }}>{errors.password}</Form.Text>
											)
										}
									</Form.Group>

									<Form.Group>
										<Form.Label style={{ textAlign: 'left', width: '100%' }}>Confirm Password</Form.Label>
										<Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} value={values.confirmPassword} />
										{
											errors.confirmPassword && touched.confirmPassword && (
												<Form.Text style={{ color: 'tomato' }}>{errors.confirmPassword}</Form.Text>
											)
										}
									</Form.Group>

									<Button variant="primary" type="submit" className="w-100" style={{ marginTop: 20 }}>
										Register
									</Button>
									<hr></hr>
									<p>
										Already Registered! Click here to <Link to='/Login'>Login</Link>
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

export default Register
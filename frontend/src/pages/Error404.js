import React from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Error404() {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/');
    }

    return (
        <>
            <Container className="justify-content-center">
                <br></br><br></br><br></br>
                <Alert variant="danger">
                    <Alert.Heading>Oh snap ERROR 404! Page Not Found.</Alert.Heading>
                    <p>
                        The page you are trying to access does not exist.
                        If you want to go back to Home Page, please click on Button below.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button variant="success" onClick={handleClick}>
                            Home Page
                        </Button>
                    </div>
                </Alert>
            </Container>
        </>
    )
}

export default Error404
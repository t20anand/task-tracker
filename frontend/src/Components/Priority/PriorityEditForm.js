import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import "react-datepicker/dist/react-datepicker.css";
import { Formik ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loadpriority, editpriority } from '../../store/PrioritySetup';

export default function PriorityEditForm({handleCloseEditModal, priority}) {
    const dispatch = useDispatch()

    const priorityId = priority._id;

    const initialValues = {
        title: priority.title,
        rank: priority.rank,
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required().min(3).max(30),
        rank: Yup.number()
        .moreThan(0, 'Number must be greater than 0')
        .required('Number is required'),
    })
    const handleSubmit = async (values)=>{
        await dispatch(editpriority(priorityId, values));
        await dispatch(loadpriority());
        handleCloseEditModal();
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleBlur, handleChange, values, errors, touched, handleSubmit }) => (

                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label style={{ textAlign: 'left', width: '100%' }}>Title</Form.Label>
                                    <Form.Control type='text' placeholder='title' name='title' onChange={handleChange} onBlur={handleBlur} value={values.title} />
                                    {
                                        errors.title && touched.title && (
                                            <Form.Text style={{ color: 'tomato' }}>{errors.title}</Form.Text>
                                        )
                                    }
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label style={{ textAlign: 'left', width: '100%' }}>Rank</Form.Label>
                                    <Form.Control type='number' placeholder='rank' name='rank' onChange={handleChange} onBlur={handleBlur} value={values.rank} />
                                    {
                                        errors.rank && touched.rank && (
                                            <Form.Text style={{ color: 'tomato' }}>{errors.rank}</Form.Text>
                                        )
                                    }
                                </Form.Group>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleCloseEditModal}>
                                    Cancel
                                </Button>
                                <Button variant="success" type='submit' >Edit</Button>
                            </Modal.Footer>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

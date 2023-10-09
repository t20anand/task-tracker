import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { loadtask, addtask } from '../../store/TaskSetup';

function TaskAddForm({ handleCloseModal, priorityList }) {
    const dispatch = useDispatch()

    const initialState = {
        title: '',
        description: '',
        priority: '',
        deadline: new Date(),
    }
    const [formData, setFormData] = useState(initialState)

    const validationSchema = Yup.object().shape({
        title: Yup.string().required().min(3).max(30),
        description: Yup.string().required().min(3).max(100),
        priority: Yup.string().required(),
        deadline: Yup.date()
            .min(new Date(), 'Date must be greater than or equal to the current date')
            .required('Deadline is required'),
    })

    const handleSubmit = async (values) => {
        await dispatch(addtask(values));
        await dispatch(loadtask());
        handleCloseModal();
    }

    const handleChangeDatePicker = (val) => {
        setFormData({ ...formData, deadline: val })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {
                    ({ errors, values, touched, handleSubmit }) => (
                        <>
                            <Form onSubmit={handleSubmit}>
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Label style={{ textAlign: 'left', width: '100%' }}>Title</Form.Label>
                                        <Form.Control type='text' placeholder='title' name='title' onChange={handleChange} value={values.title} />
                                        {
                                            errors.title && touched.title && (
                                                <Form.Text style={{ color: 'tomato' }}>{errors.title}</Form.Text>
                                            )
                                        }
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label style={{ textAlign: 'left', width: '100%' }}>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder='descriptions' name='description' onChange={handleChange} value={values.description} />
                                        {
                                            errors.description && touched.description && (
                                                <Form.Text style={{ color: 'tomato' }}>{errors.description}</Form.Text>
                                            )
                                        }
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label style={{ textAlign: 'left', width: '100%' }}>Priority</Form.Label>
                                        <Form.Select size="md" name='priority' value={values.priority} onChange={handleChange} >
                                            <option value=''>Select Priority</option>
                                            {priorityList.map((priority, idx) =>
                                                <option value={priority._id} key={idx}>{priority.title}</option>
                                            )}
                                        </Form.Select>
                                        {
                                            errors.priority && touched.priority && (
                                                <Form.Text style={{ color: 'tomato' }}>{errors.priority}</Form.Text>
                                            )
                                        }
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label style={{ textAlign: 'left', width: '100%' }}>Deadline</Form.Label>
                                        <DatePicker selected={values.deadline} onChange={handleChangeDatePicker} name='deadline' dateFormat="yyyy-MM-dd"/>
                                        {
                                            errors.deadline && touched.deadline && (
                                                <Form.Text style={{ color: 'tomato' }}>{errors.deadline}</Form.Text>
                                            )
                                        }
                                    </Form.Group>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="success" type='submit'>Create</Button>
                                </Modal.Footer>
                            </Form>
                        </>
                    )
                }
            </Formik>
        </>
    )
}

export default TaskAddForm
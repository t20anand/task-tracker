import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { loadpriority, deletepriority } from '../store/PrioritySetup';
import PriorityAddForm from '../Components/Priority/PriorityAddForm';
import PriorityEditForm from '../Components/Priority/PriorityEditForm';
import MainLayout from '../Layout/MainLayout';

function Priority() {
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const dispatch = useDispatch()
    const priorityList = useSelector(state => state?.entities?.priority?.result)
    const [priority, setPriority] = useState({});

    useEffect(() => {
        dispatch(loadpriority())
    }, [])

    const handleModal = () => {
        setCreateModal(true)
    }
    const handleCloseModal = () => {
        setCreateModal(false)
    }

    const handleEdit = (priority) => {
        setPriority({ ...priority });
        setEditModal(true)
    }
    const handleCloseEditModal = () => {
        setEditModal(false)
    }

    const handleDelete = async (priority) => {
        await dispatch(deletepriority(priority._id));
        await dispatch(loadpriority());
    }

    return (
        <MainLayout>
            {/* Add Priority Button */}
            <Button type='button' onClick={() => handleModal()} variant='success'>Create Priority</Button>

            {/* Priority List Table  */}
            <Card style={{ marginTop: 20, marginBottom: 20 }}>
                <Card.Body>
                    <Table responsive="xl">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Rank</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {priorityList.map((priority, idx) =>
                                <tr key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>{priority.title}</td>
                                    <td>{priority.rank}</td>
                                    <td>
                                        <Button variant='success' size="sm" type='button' onClick={() => handleEdit(priority)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button variant='danger' size="sm" onClick={() => handleDelete(priority)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>


            {/* Priority Add Form */}
            <Modal
                show={createModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Priority</Modal.Title>
                </Modal.Header>
                <PriorityAddForm handleCloseModal={handleCloseModal} />
            </Modal>


            {/* Priority Edit Form */}
            <Modal
                show={editModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Priority</Modal.Title>
                </Modal.Header>
                <PriorityEditForm handleCloseEditModal={handleCloseEditModal} priority={priority} />
            </Modal>
        </MainLayout>
    )
}

export default Priority
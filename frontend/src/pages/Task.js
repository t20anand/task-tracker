import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { deletetask, loadtask, completetask } from '../store/TaskSetup';
import { loadpriority } from '../store/PrioritySetup';
import TaskEditForm from '../Components/Task/TaskEditForm';
import TaskAddForm from '../Components/Task/TaskAddForm';
import MainLayout from '../Layout/MainLayout';
import { TASK_STATUS, DEADLINE_FILTER } from '../Config/constant';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import queryString from 'query-string';

function Task() {
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const dispatch = useDispatch()
    const taskList = useSelector(state => state.entities?.task?.result)
    const priorityList = useSelector(state => state.entities?.priority?.result)
    const [task, setTask] = useState({});
    const [queryParamObj, setQueryParamObj] = useState({});
    const [deadlineQueryParamObj, setDeadlineQueryParamObj] = useState({});

    useEffect(() => {
        dispatch(loadtask())
        dispatch(loadpriority())

    }, [])

    useEffect(() => {
    }, [])

    const handleModal = () => {
        setCreateModal(true)
    }
    const handleCloseModal = () => {
        setCreateModal(false)
    }
    const handleEdit = async (task) => {
        setTask({ ...task })
        setEditModal(true)
    }
    const handleCloseEditModal = () => {
        setEditModal(false)
    }

    const handleDelete = async (task) => {
        await dispatch(deletetask(task._id));
        await dispatch(loadtask());
    }

    const handleComplete = async (task) => {
        await dispatch(completetask(task._id));
        await dispatch(loadtask());
    }

    const handleChangeFilter = async (e) => {
        const fieldName = e.target.name;
        let fieldValue = e.target.value;

        if('title'===fieldName && ''!==fieldValue){
            fieldValue = `/^${fieldValue}/`;
        }

        setQueryParamObj(oldQueryParamObj => {
            if ('' === fieldValue) {
                const { [fieldName]: value, ...newQueryParamObj } = oldQueryParamObj
                return newQueryParamObj;
            } else {
                return { ...oldQueryParamObj, [fieldName]: fieldValue }
            }
        });
    }

    const handleDeadlineChangeFilter = async (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;

        if('deadline'===fieldName){
            if(DEADLINE_FILTER.past===fieldValue){
                fieldName = `${fieldName}[lt]`;
            }else if(DEADLINE_FILTER.today===fieldValue){
                fieldName = `${fieldName}`;
            }else if(DEADLINE_FILTER.future===fieldValue){
                fieldName = `${fieldName}[gt]`;
            }

            fieldValue = dateFormat(new Date(), 'yyyy-mm-dd');
        }

        setDeadlineQueryParamObj(oldDeadlineQueryParamObj => {
            if ('' === e.target.value) {
                return {};
            } else {
                return {[fieldName]: fieldValue }
            }
        });
    }

    const handleApplyFilterClick = () => {
        const queryParamString = queryString.stringify({...queryParamObj, ...deadlineQueryParamObj})
        dispatch(loadtask(queryParamString))
    }


    return (
        <MainLayout>

            {/* Add Task Button */}
            <Button type='button' onClick={() => handleModal()} variant='success'>Create Task</Button>&nbsp;&nbsp;
            

            {/* Task List Table  */}
            <Card style={{ marginTop: 20, marginBottom: 20 }}>
                <Card.Header>
                    <Row>
                        <Col>
                            <Form.Control type='text' placeholder='Task Title' name='title' onChange={handleChangeFilter} />
                        </Col>
                        <Col>
                            <Form.Select size="md" name='deadline' onChange={handleDeadlineChangeFilter}>
                                <option value=''>Select Deadline</option>
                                {Object.keys(DEADLINE_FILTER).map((key, idx) =>
                                    <option value={DEADLINE_FILTER[key]} key={idx}>{DEADLINE_FILTER[key]}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select size="md" name='status' onChange={handleChangeFilter}>
                                <option value=''>Select Status</option>
                                {Object.keys(TASK_STATUS).map((key, idx) =>
                                    <option value={TASK_STATUS[key]} key={idx}>{TASK_STATUS[key]}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select size="md" name='priority' onChange={handleChangeFilter}>
                                <option value=''>Select Priority</option>
                                {priorityList.map((priority, idx) =>
                                    <option value={priority._id} key={idx}>{priority.title}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button type='button' onClick={handleApplyFilterClick} variant='success'>Apply Filter</Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Table responsive="xl">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList.map((task, idx) =>
                                <tr key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.priority.title}</td>
                                    <td>{dateFormat(task.deadline, 'yyyy-mm-dd')}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        {
                                            TASK_STATUS.pending === task.status ?
                                                <><Button variant='success' size="sm" onClick={() => handleComplete(task)} title='Complete Task'>
                                                    <FontAwesomeIcon icon={faCheckSquare} />
                                                </Button>&nbsp;&nbsp;</> : ''
                                        }
                                        <Button variant='primary' size="sm" type='button' onClick={() => handleEdit(task)} title='Edit Task'>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button variant='danger' size="sm" onClick={() => handleDelete(task)} title='Delete Task'>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Add Form */}
            <Modal
                show={createModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <TaskAddForm priorityList={priorityList} handleCloseModal={handleCloseModal} />
            </Modal>

            {/* Edit Form */}
            <Modal
                show={editModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <TaskEditForm task={task} priorityList={priorityList} handleCloseEditModal={handleCloseEditModal} />
            </Modal>
        </MainLayout>

    )
}

export default Task
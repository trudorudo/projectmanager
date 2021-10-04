import React from 'react';
import { Field, Form, Formik } from 'formik'
import Modal from '../Modal';

const NewTaskModal = (props) => {
    const { open, setOpen, taskModalAction, title, taskItem = {}, typesList = [], statusesList = [] } = props;

    const handleSubmit = (values) => {
        taskModalAction(values);
    }
    const typeOptions = [];
    typesList?.map(type => {
        typeOptions.push(
            <option value={type.id}>
                {type.name}
            </option>
        )
    })
    const statusOptions = [];
    statusesList?.map(status => {
        statusOptions.push(
            <option value={status.id}>
                {status.name}
            </option>
        )
    })
    return (
        <div className='newTaskModal'>
            {open &&
                <Modal
                    title={title}
                    onClose={() => setOpen(false)}
                >
                    <Formik
                        initialValues={taskItem}
                        validate={values => {
                            const errors = {}
                            if (!values.name) {
                                errors.name = "Task name is required"
                            }
                            return errors;
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <p>Name</p>
                            <Field
                                className='inputForm'
                                name='name'
                            />
                            <p>Type</p>
                            <Field
                                className='inputForm'
                                name='type_id'
                                as="select"
                            >
                                {typeOptions}
                            </Field>
                            <p>Status</p>
                            <Field
                                className='inputForm'
                                name='status_id'
                                component="select"
                            >
                                {statusOptions}
                            </Field>
                            <p>Description</p>
                            <Field
                                className='inputForm'
                                name='description'
                            />
                            <button
                                type='submit'
                                className='submitBtn'
                            >Add</button>
                        </Form>
                    </Formik>
                </Modal>}
        </div>
    )
}
export default NewTaskModal;
import React  from 'react';
import Modal from '../Modal';
import './newProjectModal.css';
import {Field, Form, Formik} from 'formik'

const NewProjectModal = (props) => {
    const { open, setOpen, projectModalAction, title, projectItem = {} } = props;

    const handleSubmit = (values) => {
        projectModalAction(values);
    }

    return (
        <div className='newProjectModal'>
            {open &&
                <Modal
                    title={title}
                    onClose={() => setOpen(false)}
                >
                    <Formik
                      initialValues={projectItem}
                      validate={(name, code) => {
                          const errors = {}
                          if(!name) {
                              errors.name = "Name is required"
                          }
                          if(!code) {
                              errors.code = "Code is required"
                          }
                          return errors
                      }}
                      onSubmit={handleSubmit}
                    >
                        <Form>
                            <p>Name</p>
                            <Field
                              className='inputForm'
                              name='name'
                            />
                            <p>Code</p>
                            <Field
                              className='inputForm'
                              name='code'
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


export default NewProjectModal;

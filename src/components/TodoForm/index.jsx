import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
  onSubmitForm: PropTypes.func
};

TodoForm.defaultProps = {
  onSubmitForm: null
}

function TodoForm(props) {
  const { onSubmitForm } = props
  const [value, setValue] = useState('')

  function handleOnChaneInput(e) {
    setValue(e.target.value)
  }

  function handleOnSubmitForm(e) {
    // prevent event browser
    e.preventDefault()

    if (!onSubmitForm) return;

    const formValues = {
      title: value
    }

    // check empty value
    if (!formValues.title) return;

    onSubmitForm(formValues)

    // reset form value
    setValue('')
  }

  return (
    <form onSubmit={handleOnSubmitForm}>
      <input type="text" value={value} onChange={handleOnChaneInput} />
    </form>
  );
}

export default TodoForm;
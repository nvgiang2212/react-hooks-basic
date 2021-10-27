import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

PostFiltersForm.propTypes = {
  onSubmitFiltersForm: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmitFiltersForm: null
}

function PostFiltersForm(props) {
  const { onSubmitFiltersForm } = props
  const [searchTerm, setSearchTerm] = useState('')
  const typingTimeoutRef = useRef(null)

  function handleSearchTermChange(e) {
    const value = e.target.value
    setSearchTerm(value)
    if (!onSubmitFiltersForm) return

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value
      }
      onSubmitFiltersForm(formValues)
    }, 200);
  }

  return (
    <form>
      <input type="text" placeholder='Search...' value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  );
}

export default PostFiltersForm;
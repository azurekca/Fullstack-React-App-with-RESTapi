import React, { useRef, useEffect } from 'react';
import ErrorsDisplay from './helpers/ErrorsDisplay';
import ToolTip from './helpers/ToolTip'

export default (props) => {
  const {
    change,
    cancel,
    errors,
    submit,
    submitButtonText,
    title,
    description,
    estimatedTime,
    materialsNeeded,
  } = props;

  // refs to mark locations on page to scroll to
  const validationRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // scroll to validation errors
    if (validationRef.current) {
      validationRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  })

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <>
      <ErrorsDisplay
        errors={errors}
        validationRef={validationRef}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
      />
      <form className="container-grid-course" onSubmit={handleSubmit}>
        <div className="course-title container-form-course">
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            name="title" 
            ref={titleRef}
            type="text"
            value={title}
            aria-required="true"
            aria-describedby="title_error"
            onChange={event => change(event)} 
            placeholder="Course title"
            autoFocus />
        </div>
        <div className="course-description container-form-course">
          <label htmlFor="description">Description</label>
          <ToolTip message="Text area accepts simple markdown" />
          <textarea 
            id="description" 
            name="description" 
            ref={descriptionRef}
            value={description}
            aria-required="true"
            aria-describedby="description_error"
            onChange={event => change(event)} 
            placeholder="Course description..." />
        </div>
        <div className="course-time container-form-course">
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input 
            id="estimatedTime" 
            name="estimatedTime" 
            type="text"
            value={estimatedTime} 
            onChange={event => change(event)} 
            placeholder="Estimated time" />
        </div>
        <div className="course-materials container-form-course">
          <label htmlFor="materialsNeeded">Materials Needed</label>
          <ToolTip message="Text area accepts simple markdown" />
          <textarea 
            id="materialsNeeded" 
            name="materialsNeeded"
            value={materialsNeeded} 
            onChange={event => change(event)} 
            placeholder="Materials needed..." />
        </div>
        <div className="container-buttons">
          <button type="submit">{submitButtonText}</button>
          <button className="button-nav" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}



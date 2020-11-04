import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactTimePicker from 'react-time-picker';
// import ReactTimePicker from 'react-time-picker/dist/entry.nostyle';

export default function TimePicker({ name, ...rest }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const timepickerRef = useRef(null);
  const [time, setTime] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: timepickerRef.current,
      path: 'props.selected',
      clearValue: ref => {
        ref.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactTimePicker
        ref={timepickerRef}
        selected={time}
        onChange={setTime}
        disableClock
        clearIcon={null}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
}
TimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func
};

TimePicker.defaultProps = {
  setChange: PropTypes.null
};

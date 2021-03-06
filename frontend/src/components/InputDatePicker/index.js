import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt-BR';

export default function DatePicker({ name, ...rest }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const datepickerRef = useRef(null);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: ref => {
        ref.clear();
      }
    });
  }, [fieldName, registerField]);
  return (
    <>
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        locale={pt}
        dateFormat="P"
        placeholderText="Selecione a data"
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
}
DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func
};

DatePicker.defaultProps = {
  setChange: PropTypes.null
};

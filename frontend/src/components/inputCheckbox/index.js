import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

const CheckboxInput = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = ['dv'] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: refs => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: refs => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      }
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue.find(dv => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            className="inputCheckbox"
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </Container>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]).isRequired
};

export default CheckboxInput;

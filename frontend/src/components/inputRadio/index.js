import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

const Radio = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: refs => {
        const data = refs.find(ref => ref.checked);
        return data ? data.value : null;
      },
      setValue: (refs, id) => {
        const inputRef = refs.find(ref => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: refs => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      }
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            // eslint-disable-next-line no-return-assign
            ref={ref => ref && (inputRefs.current[index] = ref)}
            id={option.id}
            type="radio"
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            className="inputRadio"
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </Container>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]).isRequired
};

export default Radio;

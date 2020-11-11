import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Select from 'react-select';
import { Container } from './styles';

export default function ReactSelect({ name, ...rest }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const selectRef = useRef(null);

  // useEffect(() => setValue(defaultValue), [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      }
    });
  }, [fieldName, registerField, rest.isMulti]); // eslint-disable-line

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',

    color: state.isSelected && 'red',
      padding: 20,
    }),
  }

  return (
    <Container>
      <Select
        styles={customStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
        className="selectInput"
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]).isRequired
};

ReactSelect.defaultProps = {
  setChange: PropTypes.null
};

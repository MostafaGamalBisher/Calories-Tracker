import React from 'react';
import styles from './FormInput.module.css';

const FormInput = React.forwardRef((props, ref) => {
  const { label, id, type, value, onChange, isValid, children } = props;

  const inputElement =
    type === 'select' ? (
      <select
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        className={`${styles['form-input']} ${!isValid ? styles.error : ''}`}
        required
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        className={`${styles['form-input']} ${!isValid ? styles.error : ''}`}
        required
      />
    );

  return (
    <>
      <label htmlFor={id}>{label}:</label>
      {inputElement}
    </>
  );
});
export default FormInput;

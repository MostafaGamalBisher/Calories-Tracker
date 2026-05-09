import React, { memo } from 'react';
import styles from './FormInput.module.css';

const FormInput = React.forwardRef((props, ref) => {
  const { label, id, type, value, onChange, isValid, options } = props;

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
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
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
export default memo(FormInput);

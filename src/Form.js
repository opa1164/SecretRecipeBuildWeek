import './App.css';
import React, {useEffect} from 'react'
import * as yup from 'yup'

let disabled = true;
function Form(props) {

  const {
    values,
    submit,
    change,
    formSchema,
    errors
  } = props

  const onChange = evt => {
    const { name, value } = evt.target;
    change(name, value);
  }
  
  const onSubmit = evt => {
    evt.preventDefault();
    submit();
  }
  
  useEffect(() => {
    formSchema.isValid(values).then(valid => disabled = !valid)
  }, [values])


  return (
    <form className='form container' onSubmit={onSubmit}>

      <div className='form-group inputs'>
        <label>Username
          <input
            value={values.username}
            onChange={onChange}
            name='username'
            type='text'
          />
        </label>

        <label>Password
          <input
            value={values.pass}
            onChange={onChange}
            name='pass'
            type='text'
          />
        </label>

        <button id = 'submit' disabled={disabled}>submit</button>

        <div className='errors'>
          <div>{errors.username}</div>
          <div>{errors.pass}</div>
        </div>

      </div>
    </form>
  );
}

export default Form;

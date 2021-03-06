import './App.css';
import React, {useEffect} from 'react'
import * as yup from 'yup'



let disabled = true;
function App(props) {

  const {
    values,
    submit,
    change,
    formSchema,
    errors
  } = props



  useEffect(() => {
    formSchema.isValid(values).then(valid => disabled = !valid)
  }, [values])


  const onChange = evt => {
    const { name, value } = evt.target;
    change(name, value);
  }
  
  if(window.location.href)
  {}
  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }
  
  return (
    <form className='form container' onSubmit={onSubmit}>

      <div className='form-group inputs'>
        <label>Title
          <input
            value={values.title}
            onChange={onChange}
            name='title'
            type='text'
          />
        </label>

        <label>Source
          <input
            value={values.source}
            onChange={onChange}
            name='source'
            type='text'
          />
        </label>

        <label>Ingredients
          <input
            value={values.ingredients}
            onChange={onChange}
            name='ingredients'
            type='text'
          />
        </label>

        <label>Instructions
          <input
            value={values.instructions}
            onChange={onChange}
            name='instructions'
            type='text'
          />
        </label>

        <label>Category
          <input
            value={values.category}
            onChange={onChange}
            name='category'
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

export default App;

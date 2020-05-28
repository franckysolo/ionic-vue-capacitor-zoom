// definition form

const definition = {
  fieldsets: [
    {
      legend: '',
      key: 0
    }
  ],
  fields: [
    {
      fieldset: 0,
      tag: 'div',          // parent tag
      model: 'input',    // field model
      type: 'email',    // field model
      name: 'email',    // field name tag
      rules: 'required|email',  // vee-valdate rules
      slot: '',  // ionic slot position
      placeholder: 'your email',  // placeholder
      errorLabel: 'email',  // errorLabel
      label: {}   // label
    },
    {
      fieldset: 0,
      tag: 'div',          // parent tag
      model: 'input',    // field model
      type: 'password',    // field model
      name: 'password',    // field name tag
      rules: 'required|min:3|max:128',        // vee-valdate rules
      slot: '',         // ionic slot position
      placeholder: 'your password',  // placeholder
      label: {},  // label
      errorLabel: 'password'   // label
    }
  ],
  button: {
    submit: {
      type: 'submit',
      label: 'login'
    }
  }
}

export default definition

const FormInput = ({ label, type = 'text', value, onChange }) => (
  <div>{label}: <input type={type} name={label} value={value} onChange={onChange}/></div>
)

export default FormInput
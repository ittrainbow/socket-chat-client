type InputPropsType = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: 'text'
  label?: string
  inputRef?: React.MutableRefObject<HTMLInputElement | undefined>
}

export const Input = ({ value, type, onChange, label, inputRef }: InputPropsType) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      <input
        ref={inputRef as React.MutableRefObject<HTMLInputElement>}
        type={type}
        value={value}
        onChange={onChange}
        name="text"
        className="input"
        autoComplete="off"
      />
      <label className={labelClass}>{label}</label>
    </div>
  )
}

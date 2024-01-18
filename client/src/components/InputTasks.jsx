const InputTasks = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  required,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  );
};

export default InputTasks;

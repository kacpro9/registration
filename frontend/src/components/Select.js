import "./Select.css";

const Select = ({ values, onValueChange, selectedValue, ...rest }) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
      {...rest}
    >
      {values.map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};
export default Select;

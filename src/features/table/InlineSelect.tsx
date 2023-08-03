import React from "react"

export default function InlineSelect({
  value,
  setValue,
  options,
}: {
  value: string
  setValue: Function
  options: string[]
}) {
  const onChange = (event: React.FocusEvent<HTMLSelectElement>) =>
    setValue(event.target.value)

  return (
    <select defaultValue={value} onBlur={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  )
}

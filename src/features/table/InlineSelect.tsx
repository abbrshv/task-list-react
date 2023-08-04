import React from "react"

interface InlineSelectProps {
  value: string
  setValue: Function
  options: string[]
}

export default function InlineSelect({
  value,
  setValue,
  options,
}: InlineSelectProps) {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setValue(event.target.value)

  return (
    <select defaultValue={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  )
}

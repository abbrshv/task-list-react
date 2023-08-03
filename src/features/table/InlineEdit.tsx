import React, { useCallback, useEffect, useRef, useState } from "react"

export default function InlineEdit({
  value,
  setValue,
}: {
  value: any
  setValue: Function
}) {
  const [editingValue, setEditingValue] = useState(value)

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setEditingValue(event.target.value)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.target instanceof HTMLInputElement &&
      (event.key === "Enter" || event.key === "Escape")
    ) {
      event.target.blur()
    }
  }

  const onBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value)
    } else {
      setValue(event.target.value)
    }

    setValue(event.target.value)
  }

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target && event.target.scrollHeight > 33) {
        event.target.style.height = "5px"
        event.target.style.height = `${event.target.scrollHeight - 10}px`
      }
    },
    [],
  )

  const textareaRef = useRef(null)
  useEffect(() => {
    if (textareaRef.current) {
      onInput(textareaRef.current)
    }
  }, [onInput, textareaRef])

  return (
    <textarea
      rows={1}
      aria-label="Field name"
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={onInput}
      ref={textareaRef}
    />
  )
}
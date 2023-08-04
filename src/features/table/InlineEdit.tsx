import React, { useCallback, useEffect, useRef, useState } from "react"

interface InlineEditProps {
  value: string
  setValue: Function
}

export default function InlineEdit({ value, setValue }: InlineEditProps) {
  const [editingValue, setEditingValue] = useState(value)

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setEditingValue(event.target.value)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.target instanceof HTMLTextAreaElement &&
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
        event.target.style.height = `${event.target.scrollHeight}px`
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
      style={{ height: `${value.length}px` }}
      rows={1}
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={onInput}
      ref={textareaRef}
    />
  )
}

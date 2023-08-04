import React from "react"
import { Task } from "../task/taskSlice"
import TableCell from "./TableCell"
import { ConnectedComponent } from "react-redux"

export interface EditableFields {
  [fieldName: string]: boolean
}

export default function Table({
  fields,
  data,
  buttons,
}: {
  fields: EditableFields
  data: Task[]
  buttons: ConnectedComponent<any, any>
}) {
  const transformCamelCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  const Buttons = buttons

  return (
    <table>
      <thead>
        <tr>
          {Object.entries(fields).map(([fieldName, _]) => (
            <th key={`header-${fieldName}`}>{transformCamelCase(fieldName)}</th>
          ))}
          {<Buttons></Buttons> && <th key={"header-buttons"}></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              {Object.entries(fields).map(([fieldName, isEditable]) => {
                const key = fieldName as keyof typeof item
                return Object.keys(item).includes(key) ? (
                  <td key={`${key}-${item.id}`}>
                    <TableCell
                      fieldName={key}
                      item={item}
                      isEditable={isEditable}
                    />
                  </td>
                ) : null
              })}
              <td key={`buttons-${item.id}`}>
                <Buttons item={item} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

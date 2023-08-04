import React from "react"
import { Task } from "../task/taskSlice"
import { StatObject } from "../stats/Stats"
import TableCell from "./TableCell"
import TaskButtons from "../task/TaskButtons"

export interface EditableFields {
  [fieldName: string]: boolean
}

export default function Table({
  fields,
  data,
  taskButtons,
}: {
  fields: EditableFields
  data: Task[] | StatObject[]
  taskButtons: boolean
}) {
  const transformCamelCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.entries(fields).map(([fieldName, _]) => (
            <th key={`header-${fieldName}`}>{transformCamelCase(fieldName)}</th>
          ))}
          {taskButtons && <th key={"header-buttons"}></th>}
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
              {taskButtons && (
                <td key={`buttons-${item.id}`}>
                  <TaskButtons item={item} />
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

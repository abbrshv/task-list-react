import { connect } from "react-redux"
import { updateTask, categories, Task } from "../task/taskSlice"
import { StatObject } from "../stats/Stats"
import InlineEdit from "./InlineEdit"
import InlineSelect from "./InlineSelect"

interface TableCellProps {
  isEditable: boolean
  fieldName: keyof (Task | StatObject)
  item: Task | StatObject
  updateTask: Function
}

function TableCell({
  isEditable,
  fieldName,
  item,
  updateTask,
}: TableCellProps) {
  const inlineTaskUpdate = (value: any) => {
    const updatedData = {
      [fieldName]: value,
    }
    updateTask({ ...item, ...updatedData })
  }

  const childProps = {
    value: item[fieldName] || "",
    setValue: inlineTaskUpdate,
    options: categories.map((category) => category),
  }

  if (!isEditable) {
    return <>{item[fieldName]}</>
  }

  if (fieldName === ("category" as keyof Task)) {
    return <InlineSelect {...childProps} />
  }

  return <InlineEdit {...childProps} />
}

export default connect(null, { updateTask })(TableCell)

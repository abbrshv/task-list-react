import { connect } from "react-redux"
import { updateTask } from "../task/taskSlice"
import InlineEdit from "./InlineEdit"
import InlineSelect from "./InlineSelect"
import TaskCategories from "../task/TaskCategories"

function TableCell({ canEdit, updateTask, fieldName, item }: any) {
  const inlineTaskUpdate = (value: any) => {
    const updatedData = {
      [fieldName]: value,
    }
    updateTask({ ...item, ...updatedData })
  }

  const childProps = {
    value: item[fieldName],
    setValue: inlineTaskUpdate,
    options: Object.keys(TaskCategories),
  }

  if (!canEdit) {
    return <>{item[fieldName]}</>
  }

  if (fieldName === "category") {
    return <InlineSelect {...childProps} />
  }

  return <InlineEdit {...childProps} />
}

export default connect(null, { updateTask })(TableCell)

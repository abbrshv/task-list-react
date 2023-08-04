import { connect } from "react-redux"
import { updateTask, categories } from "../task/taskSlice"
import InlineEdit from "./InlineEdit"
import InlineSelect from "./InlineSelect"

function TableCell({ isEditable, fieldName, item, updateTask }: any) {
  const inlineTaskUpdate = (value: any) => {
    const updatedData = {
      [fieldName]: value,
    }
    updateTask({ ...item, ...updatedData })
  }

  const childProps = {
    value: item[fieldName],
    setValue: inlineTaskUpdate,
    options: categories.map((category) => category),
  }

  if (!isEditable) {
    return <>{item[fieldName]}</>
  }

  if (fieldName === "category") {
    return <InlineSelect {...childProps} />
  }

  return <InlineEdit {...childProps} />
}

export default connect(null, { updateTask })(TableCell)

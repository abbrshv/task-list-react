import { connect } from "react-redux"
import { updateTask } from "./taskSlice"

function TaskButtons({ item, setIsModalShown, updateTask }: any) {
  const onArchive = () => {
    const updatedTask = { ...item, isArchived: !item.isArchived }
    updateTask(updatedTask)
  }

  const onDelete = () => {
    setIsModalShown(true)
  }

  return (
    <span>
      <button className={"btn btn-archive"} onClick={onArchive}>
        ⇅
      </button>
      <button className={"btn btn-delete"} onClick={onDelete}>
        ⌫
      </button>
    </span>
  )
}

export default connect(null, { updateTask })(TaskButtons)

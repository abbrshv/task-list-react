import { connect } from "react-redux"
import Modal from "../modal/Modal"
import { deleteTask, Task } from "./taskSlice"

function DeleteTaskModal({
  item,
  isModalShown,
  setIsModalShown,
  deleteTask,
}: {
  item: Task
  isModalShown: boolean
  setIsModalShown: Function
  deleteTask: Function
}) {
  const onConfirm = () => {
    if (item) {
      deleteTask(item.id)
    }
    setIsModalShown(false)
  }

  const onDeny = () => {
    setIsModalShown(false)
  }

  return (
    <Modal isModalShown={isModalShown} setIsModalShown={setIsModalShown}>
      <div className={"modal-confirm"}>
        <p className={"modal-confirm--msg"}>
          Are you sure you want to delete this task?
        </p>
        <button className={"btn btn-confirm"} onClick={onConfirm}>
          Delete
        </button>
        <button className={"btn btn-deny"} onClick={onDeny}>
          No
        </button>
      </div>
    </Modal>
  )
}

export default connect(null, { deleteTask })(DeleteTaskModal)

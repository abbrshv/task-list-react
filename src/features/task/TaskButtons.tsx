import { connect } from "react-redux"
import { updateTask } from "./taskSlice"
import DeleteTaskModal from "./DeleteTaskModal"
import React, { useState } from "react"

interface TaskButtonsProps {
  item: any
  updateTask: Function
}

function TaskButtons({ item, updateTask }: TaskButtonsProps) {
  const onArchive = () => {
    const updatedTask = { ...item, isArchived: !item.isArchived }
    updateTask(updatedTask)
  }

  const [isModalShown, setIsModalShown] = useState(false)

  const onDelete = () => {
    setIsModalShown(true)
  }

  return (
    <>
      {isModalShown && (
        <DeleteTaskModal
          item={item}
          isModalShown={isModalShown}
          setIsModalShown={setIsModalShown}
        />
      )}
      <span>
        <button className={"btn btn-archive"} onClick={onArchive}>
          ⇅
        </button>
        <button className={"btn btn-delete"} onClick={onDelete}>
          ⌫
        </button>
      </span>
    </>
  )
}

export default connect(null, { updateTask })(TaskButtons)

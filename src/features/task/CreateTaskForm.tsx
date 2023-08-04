import { useState } from "react"
import { connect } from "react-redux"
import { createTask, Task, categories } from "./taskSlice"
import InlineEdit from "../table/InlineEdit"
import InlineSelect from "../table/InlineSelect"

interface CreateTaskFormProps {
  createTask: Function
}

function CreateTaskForm({ createTask }: CreateTaskFormProps) {
  const formatDate = (date: Date) =>
    `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`

  const initialTask: Task = {
    name: "",
    category: "task" as (typeof categories)[number],
    content: "",
    createdDate: formatDate(new Date()),
  }

  const [isFormShown, setIsFormShown] = useState(false)
  const [newTask, setNewTask] = useState<Task>(initialTask)

  const onSubmit = () => {
    if (Object.values(newTask).every((val) => val)) createTask(newTask)
    setNewTask(initialTask)
    setIsFormShown(false)
  }

  return (
    <div className={"create-task-form"}>
      <button
        style={{
          backgroundColor: isFormShown ? "indianred" : "",
        }}
        className={"btn-create"}
        onClick={() => setIsFormShown(!isFormShown)}
      >
        {isFormShown ? "-" : "+"}
      </button>
      {isFormShown && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created Date</th>
                <th>Category</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <InlineEdit
                    value={newTask.name}
                    setValue={(name: string) =>
                      setNewTask({ ...newTask, name: name })
                    }
                  />
                </td>
                <td>{newTask.createdDate}</td>
                <td>
                  <InlineSelect
                    value={newTask.category}
                    setValue={(category: (typeof categories)[number]) =>
                      setNewTask({
                        ...newTask,
                        category: category,
                      })
                    }
                    options={[...categories]}
                  />
                </td>
                <td>
                  <InlineEdit
                    value={newTask.content}
                    setValue={(content: string) =>
                      setNewTask({
                        ...newTask,
                        content: content,
                      })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className={"ntm btn-confirm-create"} onClick={onSubmit}>
            ✓
          </button>
        </>
      )}
    </div>
  )
}

export default connect(null, { createTask })(CreateTaskForm)

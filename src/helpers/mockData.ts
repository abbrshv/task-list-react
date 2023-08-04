import { Task } from "../features/task/taskSlice"
import { v4 as uuidv4 } from "uuid"

const dateRegex =
  /(0?[1-9]|[12][0-9]|3[01])(\/|-)(0?[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g

const formatDate = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`

const prepareTask = (task: Task) => {
  const id = uuidv4()
  const isArchived = false
  const createdDate = formatDate(new Date())
  const datesArray = task.content.match(dateRegex)
  const dates = datesArray ? datesArray.join(", ") : null

  return { ...task, createdDate, id, isArchived, dates }
}

const tasks: Task[] = [
  {
    name: "Task 1",
    category: "task",
    content: "Content 1. Do something on 2-5-2023. Follow-up on 01-06-2023.",
  },
  {
    name: "Task 2",
    category: "task",
    content: "Content 2. No dates here.",
  },
  {
    name: "Task 3",
    category: "task",
    content: "Content 4. Remember 12/01/1998",
  },
  {
    name: "Random thought 1",
    category: "random thought",
    content: "Content 5. Just some random message without any dates.",
  },
  {
    name: "Random thought 2",
    category: "random thought",
    content: "Content 6",
  },
  {
    name: "Idea 1",
    category: "idea",
    content: "Content 7",
  },
  {
    name: "Idea 2",
    category: "idea",
    content: "Content 8",
  },
]

const tasksPrepared = tasks.map((task) => prepareTask(task))

export default tasksPrepared

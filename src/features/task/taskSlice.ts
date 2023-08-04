import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { v4 as uuidv4 } from "uuid"

export const categories = ["task", "random thought", "idea"] as const

export interface Task {
  name: string
  category: (typeof categories)[number]
  content: string
  createdDate?: string
  isArchived?: boolean
  dates?: string | null
  id?: string
}

const dateRegex =
  /(0?[1-9]|[12][0-9]|3[01])(\/|-)(0?[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    createTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload)
      },
      prepare: (task: Task) => {
        const id = uuidv4()
        const isArchived = false
        const datesArray = task.content.match(dateRegex)
        const dates = datesArray ? datesArray.join(", ") : null

        return { payload: { ...task, id, isArchived, dates } }
      },
    },
    updateTask: {
      reducer: (state, action: PayloadAction<Task>) =>
        state.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
      prepare: (task: Task) => {
        const datesArray = task.content.match(dateRegex)
        const dates = datesArray ? datesArray.join(", ") : null

        return { payload: { ...task, dates } }
      },
    },
    deleteTask: (state, action: PayloadAction<String>) =>
      state.filter((task) => task.id !== action.payload),
  },
})

export const { createTask, updateTask, deleteTask } = taskSlice.actions

export const selectTasks = (state: RootState) => state.tasks
export const selectTaskById = (id: string) => (state: RootState) =>
  state.tasks.filter((task: Task) => task.id === id)[0]

export default taskSlice.reducer

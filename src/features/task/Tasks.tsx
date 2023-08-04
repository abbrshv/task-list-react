import React from "react"
import { connect } from "react-redux"
import { RootState } from "../../app/store"
import { Task } from "./taskSlice"
import Table, { EditableFields } from "../table/Table"
import CreateTaskForm from "./CreateTaskForm"
import Collapsible from "../collapsible/Collapsible"

interface TasksProps {
  activeTasks: Task[]
  archivedTasks: Task[]
}

const mapStateToProps = (state: RootState) => {
  const { tasks } = state
  return {
    activeTasks: tasks.filter((task) => !task.isArchived),
    archivedTasks: tasks.filter((task) => task.isArchived),
  }
}

const taskFieldsArr = [
  ["name", true],
  ["createdDate"],
  ["category", true],
  ["content", true],
  ["dates"],
]

function Tasks({ activeTasks, archivedTasks }: TasksProps) {
  const taskFields: EditableFields = Object.fromEntries(taskFieldsArr)

  return (
    <>
      <div className={"task-active--container"}>
        <Table fields={taskFields} data={activeTasks} taskButtons={true} />
        <CreateTaskForm />
      </div>
      <Collapsible name={"Archive"}>
        <div className={"task-archive--container"}>
          <Table fields={taskFields} data={archivedTasks} taskButtons={true} />
        </div>
      </Collapsible>
    </>
  )
}

export default connect(mapStateToProps, null)(Tasks)

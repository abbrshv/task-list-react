import { connect } from "react-redux"
import { RootState } from "../../app/store"
import { categories } from "../task/taskSlice"
import Table from "../table/Table"
import Collapsible from "../collapsible/Collapsible"
import { v4 as uuidv4 } from "uuid"

export interface StatObject {
  categoryName: string
  archived: number
  active: number
  id?: string
}

interface StatsProps {
  statObjects: StatObject[]
}

const mapStateToProps = (state: RootState) => {
  const { tasks } = state
  const activeTasks = tasks.filter((task) => !task.isArchived)
  const archivedTasks = tasks.filter((task) => task.isArchived)

  return {
    statObjects: categories.map((category) => ({
      categoryName: category[0].toUpperCase() + category.slice(1),
      archived: archivedTasks.filter((task) => task.category === category)
        .length,
      active: activeTasks.filter((task) => task.category === category).length,
    })),
  }
}

function Stats({ statObjects }: StatsProps) {
  const statObjectsWithID = statObjects.map((statObject) => ({
    ...statObject,
    id: uuidv4(),
  }))
  const fields = Object.fromEntries(
    Object.keys(statObjects[0]).map((key) => [key]),
  )

  return (
    <Collapsible name={"Statistics"}>
      <Table fields={fields} data={statObjectsWithID} taskButtons={false} />
    </Collapsible>
  )
}

export default connect(mapStateToProps, null)(Stats)

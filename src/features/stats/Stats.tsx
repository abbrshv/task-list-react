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

const mapStateToProps = (state: RootState) => {
  const { tasks } = state
  const activeTasks = tasks.filter((task) => !task.isArchived)
  const archivedTasks = tasks.filter((task) => task.isArchived)

  return {
    statObjects: categories.map((category) => ({
      categoryName: category[0].toUpperCase() + category.slice(1),
      archived: archivedTasks.reduce(
        (acc, cur) => acc + (cur.category === category ? 1 : 0),
        0,
      ),
      active: activeTasks.reduce(
        (acc, cur) => acc + (cur.category === category ? 1 : 0),
        0,
      ),
    })),
  }
}

function Stats({ statObjects }: { statObjects: StatObject[] }) {
  const statObjectsWithID = statObjects.map((statObject) => ({
    ...statObject,
    id: uuidv4(),
  }))
  const fields = Object.fromEntries(
    Object.keys(statObjects[0]).map((key) => [key]),
  )

  return (
    <div className={"stats--container"}>
      <Collapsible name={"Statistics"}>
        <Table fields={fields} data={statObjectsWithID} taskButtons={false} />
      </Collapsible>
    </div>
  )
}

export default connect(mapStateToProps, null)(Stats)

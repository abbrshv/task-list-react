import { connect } from "react-redux"
import { RootState } from "../../app/store"
import { categories } from "../task/taskSlice"
import Table from "../table/Table"
import Collapsible from "../collapsible/Collapsible"

export interface StatObject {
  categoryName: string
  archived: number
  active: number
  id: string
}

const mapStateToProps = (state: RootState) => {
  const { tasks } = state
  const activeTasks = tasks.filter((task) => !task.isArchived)
  const archivedTasks = tasks.filter((task) => task.isArchived)

  return {
    statObjects: categories.map((category) => ({
      categoryName: category,
      archived: archivedTasks.reduce(
        (acc, cur) => acc + (cur.category === category ? 1 : 0),
        0,
      ),
      active: activeTasks.reduce(
        (acc, cur) => acc + (cur.category === category ? 1 : 0),
        0,
      ),
      id: "null",
    })),
  }
}

function Stats({ statObjects }: { statObjects: StatObject[] }) {
  const fields = Object.fromEntries(
    Object.keys(statObjects[0]).map((key) => [key]),
  )

  return (
    <div className={"stats--container"}>
      <Collapsible>
        <Table fields={fields} data={statObjects} taskButtons={false} />
      </Collapsible>
    </div>
  )
}

export default connect(mapStateToProps, null)(Stats)

import { Task } from "../task/taskSlice"

export function Table({ headers, data }: { headers: string[]; data: Task[] }) {
  const transformCamelCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  return (
    <table>
      <tr>
        {headers.map((headerName) => (
          <th>{transformCamelCase(headerName)}</th>
        ))}
      </tr>
      {data.map((item) => {
        return (
          <tr key={item.id}>
            {Object.entries(item).map((entry) =>
              headers.includes(entry[0]) ? <td>{entry[1]}</td> : null,
            )}
          </tr>
        )
      })}
    </table>
  )
}

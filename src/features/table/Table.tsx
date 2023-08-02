import { Task } from "../task/taskSlice"

export default function Table({
  headers,
  data,
}: {
  headers: string[]
  data: Task[]
}) {
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
            {headers.map((headerName) => {
              const key = headerName as keyof typeof item
              return Object.keys(item).includes(key) ? (
                <td>{item[key]}</td>
              ) : null
            })}
          </tr>
        )
      })}
    </table>
  )
}

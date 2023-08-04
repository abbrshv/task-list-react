import React, { useState, PropsWithChildren } from "react"

interface CollapsibleProps {
  name: string
}

function Collapsible({ name, children }: PropsWithChildren<CollapsibleProps>) {
  const [hideContent, setHideContent] = useState(true)

  return (
    <div
      className={`collapsible${!hideContent ? " active" : ""}`}
      onClick={() => setHideContent(!hideContent)}
    >
      <h2>{name}</h2>
      <div
        className={`content ${name.toLowerCase()}-content`}
        style={{
          maxHeight: hideContent ? "0" : "100%",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Collapsible

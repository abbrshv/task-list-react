import { PropsWithChildren } from "react"

function Modal({
  isModalShown,
  setIsModalShown,
  children,
}: PropsWithChildren<any>) {
  return (
    isModalShown && (
      <div className={"modal-layer"}>
        <div className={"modal-root"}>
          <div className={"modal-header"}>
            <div className={"close-btn"} onClick={() => setIsModalShown(false)}>
              ×
            </div>
          </div>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal

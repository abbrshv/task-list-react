import React, { PropsWithChildren } from "react"

interface ModalProps {
  isModalShown: boolean
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>
}

function Modal({
  isModalShown,
  setIsModalShown,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!isModalShown) {
    return null
  }

  return (
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
}

export default Modal

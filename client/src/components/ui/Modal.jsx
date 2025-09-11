import React from 'react'
import { createContext } from 'react'
import { createPortal } from 'react-dom'




const ModalContext = createContext()

const Context = ({ children, value }) => {
      return (
            <ModalContext.Provider value={value}>
                  {
                        createPortal(<div className='fixed z-[99999]  backdrop-blur-xs bg-black/40 cursor-pointer inset-0 flex items-center justify-center'>
                              {children}
                        </div>, document.body)
                  }

            </ModalContext.Provider>
      )
}


const Modal = ({ children }) => {
      return (
            <Context value={{}}>{children}</Context>
      )
}

export default Modal


Modal.Header = () => {

}

Modal.Content = () => {

}

Modal.Footer = () => {

}
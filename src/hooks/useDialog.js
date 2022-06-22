const { useState } = require("react")

const useDialog = (initial) => {
  const [title, setTitle] = useState(initial?.title);
  const [isOpen, setIsOpen] = useState(!!initial?.isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return {
    title,
    setTitle,
    isOpen,
    open,
    close,
  }
}

export default useDialog;
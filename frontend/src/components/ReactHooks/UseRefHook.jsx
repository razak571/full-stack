import { useRef } from "react";

const UseRefHook = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="mt-5">
      <input ref={inputRef} className="text-black" type="text" /> <br />
      <button className="mt-2" onClick={focusInput}>
        Click
      </button>
    </div>
  );
};
export default UseRefHook;

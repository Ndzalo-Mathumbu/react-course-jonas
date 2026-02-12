import { useEffect } from "react";
const useKey = function (key = "Escape", duty) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === key) duty();
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.code.toLocaleLowerCase() === key.toLocaleLowerCase()) duty();
      });
    };
  }, [duty, key]);
};
export default useKey;

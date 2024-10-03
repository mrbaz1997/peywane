import { useEffect, useRef, useState } from "react";

const useToast = () => {
  const [isShow, setIsShow] = useState(false);
  const [type, setType] = useState(""); /* info | alert | error | success */
  const [content, setContent] = useState(<></>); /* jsx */

  const timeoutDelayRef = useRef();
  const timeoutDurationRef = useRef();

  const showToast = ({
    delay = 0,
    duration = 3000,
    type = "info",
    content,
    onClose,
  }) => {
    setIsShow(true);
    setContent(content);
    setType(type);

    timeoutDelayRef.current = setTimeout(() => {
      timeoutDurationRef.current = setTimeout(() => {
        setIsShow(false);
        setContent();
        setType("");
        onClose && onClose();
      }, duration);
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutDelayRef.current);
      clearTimeout(timeoutDurationRef.current);
    };
  }, []);

  return { isShow, type, content, showToast };
};

export default useToast;

import { useEffect, useState } from 'react';

const useCountDown = (initialValue: number) => {

  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { count, setCount };
}

export default useCountDown;
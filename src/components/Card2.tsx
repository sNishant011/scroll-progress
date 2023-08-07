import { useEffect } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { Item } from "../data";

const Card2 = ({item, setProgressCount, progressCount, index}: {item:Item, progressCount: number, setProgressCount: (a: number) => void, index: number}) => {
  const [divRef, observerable] = useIntersectionObserver({threshold: 1})
  useEffect(() => {
    if (observerable?.isIntersecting){
      setProgressCount(index + 1)
    }
  }, [observerable?.isIntersecting, setProgressCount, index])
  return (
  <div className={ `card ${(index + 1) <= progressCount ? 'active' : ''}` } ref={divRef}>
      <h1>
        {item.h1}
      </h1>
      <p>{item.p}</p>
    </div>
  )
}

export default Card2;

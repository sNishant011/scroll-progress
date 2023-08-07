import { useEffect, useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { Item } from "../data";

const Card = ({item}: {item:Item}) => {
  const [intersectedOnce, setIsIntersectedOnce] = useState(false);
  const [divRef, observerable] = useIntersectionObserver({threshold: 1})
  useEffect(() => {
    if (observerable?.isIntersecting){
      setIsIntersectedOnce(true)
    }
  }, [observerable?.isIntersecting])
  return (
  <div className={ `card ${intersectedOnce ? 'active' : ''}` } ref={divRef}>
      <h1>
        {item.h1}
      </h1>
      <p>{item.p}</p>
    </div>
  )
}

export default Card;

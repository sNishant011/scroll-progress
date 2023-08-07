import { useCallback, useEffect, useRef, useState } from 'react'
import { items } from '../data';
import Card2 from './Card2';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Demo2 = () => {
  const [progressCount, setProgressCount] = useState(1);
  const [divRef, isInView] = useIntersectionObserver({threshold: 0})
  const lineRef = useRef<HTMLDivElement>(null);
  const handleWindowScroll = useCallback(() => {
    if (lineRef.current){
      const heightPercentage = progressCount / items.length * 100;
      lineRef.current.style.height = `${heightPercentage - 10}%`;
    }
  }, [progressCount])
  useEffect(() => {
    if (isInView?.isIntersecting){
      window.addEventListener('scroll', handleWindowScroll )
    }else{
      window.removeEventListener('scroll', handleWindowScroll)
    }
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [divRef, isInView?.isIntersecting, handleWindowScroll])
  return (
  <div ref={divRef} className='cardsContainer'>
      {items.map((item, index) => (
        <Card2 key={index} progressCount={progressCount} setProgressCount={(a) => setProgressCount(a)} item={item} index={index}/>
      ))}
        <div ref={lineRef} className='line'></div>
        <div className='line gray'></div>
    </div>
  )
}

export default Demo2;

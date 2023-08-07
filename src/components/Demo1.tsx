import { useCallback, useEffect } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Card from './Card';
import { items } from '../data';

const Demo1 = () => {
  const [divRef, isInView] = useIntersectionObserver({threshold: 0})
  const handleWindowScroll = useCallback(() => {
    if (divRef.current){
      const windowHeight = window.innerHeight;
      const bounds = divRef.current?.getBoundingClientRect();
      const per = 100 - Math.abs(Math.min(Math.max((windowHeight - bounds.height - bounds.top) / bounds.height * 100), 0, 100))
      console.log("per", per)
      const line = divRef.current.querySelector('.line');
      if (line instanceof HTMLDivElement){
        line.style.height = `${per - 10}%`;
      }
    }
    
  }, [divRef])
  useEffect(() => {
    if (isInView?.isIntersecting){
      window.addEventListener('scroll', handleWindowScroll )
    }else{
      window.removeEventListener('scroll', handleWindowScroll)
    }
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [divRef, isInView?.isIntersecting, handleWindowScroll])
  return (
  <div className='cardsContainer' ref={divRef}>
      {items.map(( item, index ) => <Card key={index} item={item}/>)}
        <div className='line'></div>
        <div className='line gray'></div>
    </div>
  )
}

export default Demo1

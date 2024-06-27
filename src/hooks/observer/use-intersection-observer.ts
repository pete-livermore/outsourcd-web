import { RefObject, useEffect, useState } from 'react'

export function useIntersectionObserver(targetRef: RefObject<HTMLElement>) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const currentRef = targetRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      {
        root: null, // viewport
        rootMargin: '0px', // no margin
        threshold: 0.5, // 50% of target visible
      }
    )

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [targetRef])

  return { entry }
}

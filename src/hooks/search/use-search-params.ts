import {
  usePathname,
  useRouter,
  useSearchParams as baseUseSearchParams,
} from 'next/navigation'
import { useCallback } from 'react'

export function useSearchParams() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = baseUseSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, String(value))

      return params.toString()
    },
    [searchParams],
  )

  const get = useCallback(() => searchParams, [searchParams])

  const set = useCallback(
    (name: string, value: string | number) => {
      router.push(pathname + '?' + createQueryString(name, String(value)))
    },
    [router, pathname, createQueryString],
  )

  const clear = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  return { get, set, clear }
}

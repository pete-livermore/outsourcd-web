import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useQueryParams() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, String(value))

      return params.toString()
    },
    [searchParams],
  )

  const set = useCallback(
    (name: string, value: string | number) => {
      router.push(pathname + '?' + createQueryString(name, String(value)))
    },
    [router, pathname, createQueryString],
  )

  const clear = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  return { set, clear }
}

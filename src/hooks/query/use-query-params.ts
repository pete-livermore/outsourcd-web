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

  function set(name: string, value: string | number) {
    router.push(pathname + '?' + createQueryString(name, String(value)))
  }

  function clear() {
    router.push(pathname, { scroll: false })
  }

  return { set, clear }
}

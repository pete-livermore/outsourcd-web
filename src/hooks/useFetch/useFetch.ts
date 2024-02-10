import useSWR from 'swr'

async function fetcher(url: string) {
  const res = await fetch(url)
  return await res.json()
}

export function useFetch<T>(url: string) {
  const { data, error } = useSWR<T, unknown>(url, fetcher)

  return {
    data,
    error,
    loading: !error && !data,
  }
}

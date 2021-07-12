import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useShiftsTimeline() {
  const { data, error } = useSWR(
    'http://localhost:3001/shiftsTimeline',
    fetcher
  )

  return {
    shiftsTimeline: data,
    isLoading: !error && !data,
    isError: error,
  }
}
export function useEngineers() {
  const { data, error } = useSWR(
    'http://localhost:3001/engineers',
    fetcher
  )

  return {
    engineers: data,
    isLoading: !error && !data,
    isError: error,
  }
}

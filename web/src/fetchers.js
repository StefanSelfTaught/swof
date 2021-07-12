import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useShiftsTimeline() {
  const { data, error } = useSWR(
    'https://radiant-hamlet-27832.herokuapp.com/shiftsTimeline',
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
    'https://radiant-hamlet-27832.herokuapp.com/engineers',
    fetcher
  )

  return {
    engineers: data,
    isLoading: !error && !data,
    isError: error,
  }
}

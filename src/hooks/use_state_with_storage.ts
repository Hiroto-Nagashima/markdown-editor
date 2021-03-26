import { useState } from 'react'
// init: string は初期値　key: string は localStorage に保存する際のキー　[string, (s: string) => void] はカスタムフックの戻り値
export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  // localStorage の値を取得しつつ、取得できない場合は引数の初期値を使っています。
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }
  // useState から取得した値と localStorage への保存を組み合わせた更新関数を返却
  return [value, setValueWithStorage]
}
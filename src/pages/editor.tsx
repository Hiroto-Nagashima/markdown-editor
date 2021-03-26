import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
// マークダウンをレンダリングできる
import * as ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
const { useState } = React
// localStorage でデータの参照・保存に使うキー名を決めておきます。
const StorageKey = 'pages/editor:text'
const Header = styled.header`
　align-content: center;
  display: flex;
  font-size: 1.5rem;
  height: 2rem;
  justify-content: space-between;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`
const HeaderControl = styled.div`
    height: 2rem;
    display: flex;
    align-content: center;
  `
const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

export const Editor: React.FC = () => {
  // localStorage から取得した値を useState の初期値に設定
  // localstrageがnullでも文字列を返す
  // const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '')
  // useStateWithStorage(init, Key)
  // return [value, setValueWithStorage] value→text  setValueWithStorage→setText
  const [text, setText] = useStateWithStorage('', StorageKey)

  const [showModal, setShowModal] = useState(false)

  const saveMemo = (): void => {
    putMemo('TITLE', text)
  }

  return (
    <>
      <Header>
        Markdown Editor
        <HeaderControl>
            <Button onclick={() => setShowModal(true)}>
              保存する
            </Button>
        </HeaderControl>
      </Header>
      <Wrapper>
        <TextArea
          // event イベント発生時の情報を持つオブジェクト
          onChange={(event) => {
            // event.target イベントを発生させたオブジェクト
            // const changedText = event.target.value
            // localStorage.setItem(StorageKey, changedText)
            // setText(changedText)
            setText(event.target.value)
          }}
        value={text}
        />
        <Preview>
          <ReactMarkdown source={text} />
        </Preview>
      </Wrapper>
      {showModal && (
          <SaveModal
            onSave={(title: string): void => {
              putMemo(title, text)
              setShowModal(false)
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
    </>
  )
}
import * as React from 'react'
import { render } from 'react-dom'
// app という ID を持つ HTML 内の要素に対して Main という変数の内容を紐付ける処理をしています。
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Editor } from './pages/editor'
import { History } from './pages/history'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `
  const Main = (
    <>
      <GlobalStyle />
      <Router>
        <Route exact path="/editor">
          <Editor />
        </Route>
        <Route exact path="/history">
          <History />
        </Route>
        {/* 定義されていないパスの場合は /editor にリダイレクト */}
        <Redirect to="/editor" path="*" />
      </Router>
    </>
  )
render(Main, document.getElementById('app'))


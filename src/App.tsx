import './App.css'
import { Header } from './components/rheader.tsx'
import { Component } from 'react'

interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    )
  }
}

export default App

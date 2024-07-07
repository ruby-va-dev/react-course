import { Component } from 'react'

export class ErrorBoundaryFallbackPage extends Component {
  render() {
    return (
      <div className="container">
        <h1>Какая-то ошибка случилась, вернись на гланвую если хочешь!</h1>
        <p>
          Здесь будет редирект на главную, но я пока не подрубил роутер, можешь
          сделать это сам
        </p>
      </div>
    )
  }
}

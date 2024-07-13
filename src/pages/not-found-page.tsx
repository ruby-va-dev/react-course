import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <h1>Не нашёл страницу, нету такой наверное!</h1>
        <button onClick={() => navigate(-1)}>Вернуться назад!</button>
        <button onClick={() => navigate('/')}>На главную!</button>
      </div>
    </>
  )
}

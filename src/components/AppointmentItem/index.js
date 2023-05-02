// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {details, toggleTheStar} = props
  const {title, date, id, isLike} = details

  const likeImage = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  function makeStarList() {
    toggleTheStar(id)
  }

  return (
    <li className="item">
      <div className="title-start-container">
        <p className="title">{title}</p>
        <button
          className="star-button"
          type="button"
          onClick={makeStarList}
          data-testid="star"
        >
          <img src={likeImage} alt="star" className="start-icon" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem

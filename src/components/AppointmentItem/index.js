// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {title, date, isStarred} = appointmentDetails

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  console.log(year)

  const finalDate = format(new Date(year, month, day), 'dd MMMM yyyy, EEEE')

  return (
    <li className="list-container">
      <div>
        <p>{title}</p>
        <p> {finalDate} </p>
      </div>
      {isStarred ? (
        <button className="str-btn" type="button" data-testid="star">
          <img
            className="str-img"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            alt="star"
          />
        </button>
      ) : (
        <button className="str-btn" type="button" data-testid="star">
          <img
            className="str-img"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
            alt="star"
          />
        </button>
      )}
    </li>
  )
}

export default AppointmentItem

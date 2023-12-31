// Write your code here
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

console.log(format(new Date(), 'dd MMMM yyyy, EEEE')) // 19 July 2021, Monday

const initialAppointmentList = [
  {
    id: uuidv4(),
    title: 'dentist',
    isStarred: true,
    date: new Date(),
  },
]

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: initialAppointmentList}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      title: '',
      date: 'dd-mm-yyyy',
      appointmentList: [...prevState.appointmentList, newAppointment],
    }))
  }

  render() {
    const {title, date, appointmentList} = this.state

    return (
      <div className="bg-container">
        <div className="card">
          <div className="appointment">
            <form className="form-container">
              <h1 className="title">Add Appointment</h1>
              <label className="label" htmlFor="input">
                TITLE
              </label>
              <input
                className="input-element"
                type="text"
                id="input"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label
                className="label"
                htmlFor="date"
                value={date}
                placeholder="dd-mm-yyyy"
              >
                DATE
              </label>
              <input
                className="input-element"
                type="date"
                id="date"
                onChange={this.onChangeDate}
              />
              <button
                className="btn"
                type="button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </form>

            <img
              className="appointment-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr-line" />
          <div className="bottom">
            <h1 className="heading">Appointments</h1>
            <button className="str-btn" type="button">
              Starred
            </button>
          </div>
          <ul>
            {appointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments

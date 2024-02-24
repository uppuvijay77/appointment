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
  {
    id: uuidv4(),
    title: 'ear',
    isStarred: true,
    date: new Date(),
  },
  {
    id: uuidv4(),
    title: 'nose',
    isStarred: false,
    date: new Date(),
  },
]

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: initialAppointmentList,
    filterBtn: false,
  }

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
      date: '',
      appointmentList: [...prevState.appointmentList, newAppointment],
    }))
  }

  onToggleStrBtn = id => {
    const {appointmentList} = this.state
    const updatedAppointmentList = appointmentList.map(appointment => {
      if (appointment.id === id) {
        return {...appointment, isStarred: !appointment.isStarred}
      }
      return appointment
    })
    this.setState({appointmentList: updatedAppointmentList})
  }

  onToggleFilterBtn = () => {
    const {filterBtn} = this.state
    this.setState({filterBtn: !filterBtn})
  }

  filterStrList = () => {
    const {appointmentList, filterBtn} = this.state
    if (filterBtn) {
      const filter = appointmentList.filter(each => each.isStarred === true)
      return filter
    }
    return appointmentList
  }

  render() {
    const {title, date, filterBtn} = this.state

    const filteredList = this.filterStrList()
    const filterBtnClassName = filterBtn ? 'active-btn' : ''

    return (
      <div className="bg-container">
        <div className="card">
          <div className="appointment">
            <form className="form-container">
              <h1 className="title">Add Appointment</h1>
              <label className="label" htmlFor="input" placeholder="Title">
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
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                className="input-element"
                type="date"
                id="date"
                value={date}
                onChange={this.onChangeDate}
              />
              <button
                className="btn"
                type="submit"
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
            <button
              className={`str-btn ${filterBtnClassName}`}
              type="button"
              onClick={this.onToggleFilterBtn}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                onToggleStrBtn={this.onToggleStrBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments

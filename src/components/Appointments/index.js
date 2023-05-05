import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], titleInput: '', dateInput: '', isActive: false}

  getTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  getDate = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {appointmentsList, titleInput, dateInput} = this.state

    const formatedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatedDate,
      isLike: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))

    console.log(appointmentsList)
  }

  toggleTheStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLike: !eachItem.isLike}
        }
        return eachItem
      }),
    }))
  }

  getStaredItems = () => {
    const {isActive} = this.state

    this.setState({
      isActive: !isActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isActive} = this.state

    if (isActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isLike === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {isActive,titleInput, dateInput} = this.state

    const addClassName = isActive ? 'filled' : 'stared-button'

    const filterList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="card-container">
          <div className="appointment-form-image-container">
            <form className="form" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label-element" htmlFor="title">
                TITLE
              </label>
              <input
                className="input-element"
                placeholder="title"
                id="title"
                onChange={this.getTitle}
                value={titleInput}
              />

              <label className="label-element" htmlFor="date">
                DATE
              </label>
              <input
                className="input-element"
                id="date"
                type="date"
                onChange={this.getDate}
                value={dateInput}
              />

              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <div className="appointment-lists-container">
            <div className="heading-star-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className={addClassName}
                type="button"
                onClick={this.getStaredItems}
              >
                Starred
              </button>
            </div>
            <ul className="comments-lits">
              {filterList.map(eachComment => (
                <AppointmentItem
                  key={eachComment.id}
                  details={eachComment}
                  toggleTheStar={this.toggleTheStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

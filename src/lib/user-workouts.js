import React, { Component } from 'react'
import axios from 'axios'

class UserWorkouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allWorkouts: []
    }
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  componentDidMount() {
    const { id, token } = JSON.parse(localStorage.getItem('userInfo'))
    axios.get(`http://localhost:3000/api/v1/users/${id}/workouts`, {
      params: {
        token: token
      }
    })
    .then( workouts => {
      workouts.data.forEach( workout => this.state.allWorkouts.push(workout) )
      this.forceUpdate()
    })
    .catch(err => console.error(err))
  }

  dateFormatter(val) {
    const vals = val.split('-')
    const year = vals[0]
    const month = vals[1]
    const day = vals[2].split('T')[0]
    return `${month}/${day}/${year}`
  }

  render() {
    return (
      <div>
        <h2>Workouts</h2>
        {this.state.allWorkouts.map(workout => {
          return (
            <div key={workout.id} className="workout">
              Date: { this.dateFormatter(workout.date) }<br/>
              Focus: { workout.focus }<br/>
              Lifts: { workout.lifts.map( (lift, index) => {
                return (
                  <div key={index} className="lift">
                    { lift.name }: { lift.reps } reps at { lift.weight }<br/>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default UserWorkouts

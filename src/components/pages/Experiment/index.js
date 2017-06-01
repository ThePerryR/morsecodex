import React, { Component } from 'react'

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const problem = {
  operation: 'addition',
  variables: [
    {min: 1, max: 5},
    {min: 1, max: 5}
  ]
}

class Experiment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: 2500,
      speeds: [],
      variables: []
    }
  }

  componentDidMount () {
    this.reset()
  }

  check = () => {
    let answer
    const guess = Number(this.state.guess)
    if (problem.operation === 'addition') {
      answer = this.state.variables.reduce((a, b) => a + b)
    }
    if (answer === guess) {
      const speed = Date.now() - this.state.startTime
      this.setState({speeds: [...this.state.speeds, speed]})
      this.reset()
    }
  }

  reset = () => {
    this.setState({variables: []}, () => {
      this.setState({
        variables: problem.variables.map(({min, max}) => randomNumber(min, max)),
        guess: '',
        startTime: Date.now()
      })
    }, 2000)
  }

  render () {
    const {variables, guess, rating} = this.state
    return (
      <div style={{padding: 16}}>
        <div>Rating: {rating}</div>
        <div>
          Average Speed:&nbsp;
          {!!this.state.speeds.length &&
          Math.floor(this.state.speeds.reduce((a, b) => a + b) / this.state.speeds.length)
          }
        </div>
        <div>{variables[0]} + {variables[1]}</div>
        <input
          value={guess}
          onChange={e => this.setState({guess: e.target.value}, this.check)}
          onKeyPress={e => e.key === 'Enter' && this.submit()}
        />
      </div>
    )
  }
}

export default Experiment

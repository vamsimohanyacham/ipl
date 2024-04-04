// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    lis: [],
    load: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updateData = data.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))
    this.setState({lis: updateData, load: false})
  }

  render() {
    const {lis, load} = this.state
    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {load ? (
            <div data-testid="loader" className="loader-container">
              <Loader type="Oval" color="black" height={50} />
            </div>
          ) : (
            <ul className="teams-list">
              {lis.map(team => (
                <TeamCard teamDetails={team} key={team.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home

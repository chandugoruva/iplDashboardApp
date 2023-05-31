import Loader from 'react-loader-spinner'
import './index.css'
import {Component} from 'react'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {isLoading: true, iplData: []}

  componentDidMount() {
    this.matchesData()
  }

  matchesData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({isLoading: false, iplData: updatedData})
  }

  matchesList = () => {
    const {iplData} = this.state
    return (
      <div>
        <div className="logo-items">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        <ul className="ul">
          {iplData.map(each => (
            <TeamCard each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {iplData, isLoading} = this.state
    return (
      <div className="bg-image">
        {isLoading ? (
          <div id="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.matchesList()
        )}
      </div>
    )
  }
}
export default Home

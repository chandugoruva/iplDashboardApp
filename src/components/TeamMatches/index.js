import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamData: [],
    teamName: '',
  }

  componentDidMount() {
    this.specificTeam()
  }

  specificTeam = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const snakeToCamel = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const updatedLatestMatches = {
      competingTeam: snakeToCamel.latestMatchDetails.competing_team,
      competingTeamLogo: snakeToCamel.latestMatchDetails.competing_team_logo,
      date: snakeToCamel.latestMatchDetails.date,
      firstInnings: snakeToCamel.latestMatchDetails.first_innings,
      id: snakeToCamel.latestMatchDetails.id,
      manOfTheMatch: snakeToCamel.latestMatchDetails.man_of_the_match,
      matchStatus: snakeToCamel.latestMatchDetails.match_status,
      result: snakeToCamel.latestMatchDetails.result,
      secondInnings: snakeToCamel.latestMatchDetails.second_innings,
      umpires: snakeToCamel.latestMatchDetails.umpires,
      venue: snakeToCamel.latestMatchDetails.venue,
    }
    const updatedRecentMatches = snakeToCamel.recentMatches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      date: each.date,
      firstInnings: each.first_innings,
      id: each.id,
      manOfTheMatch: each.man_of_the_match,
      matchStatus: each.match_status,
      result: each.result,
      secondInnings: each.second_innings,
      umpires: each.umpires,
      venue: each.venue,
    }))
    snakeToCamel.latestMatchDetails = updatedLatestMatches
    snakeToCamel.recentMatches = updatedRecentMatches
    this.setState({isLoading: false, teamData: snakeToCamel, teamName: id})
  }

  matchesList = () => {
    const {teamsData} = this.state
  }

  gettingRequest = () => {
    const {teamData, isLoading, teamName} = this.state
    return (
      <div className={`bg-color ${teamName} `} data-testid="loader">
        <img
          src={teamData.teamBannerUrl}
          alt="team banner"
          className="banner-image"
        />
        <p className="latest-paragraph">Latest Matches</p>
        <div className="latest-item compete-items">
          <div>
            <p className="paragraph-team">
              {teamData.latestMatchDetails?.competingTeam}
            </p>
            <p className="team-date"> {teamData.latestMatchDetails?.date}</p>
            <p className="paragraph"> {teamData.latestMatchDetails?.venue}</p>
            <p className="paragraph"> {teamData.latestMatchDetails?.result}</p>
          </div>
          <img
            src={teamData.latestMatchDetails?.competingTeamLogo}
            alt={`latest match ${teamData.latestMatchDetails.competingTeam}`}
            className="compete-logo"
          />
          <div className="items">
            <p className="latest-paragraph">First Innings</p>
            <p className="paragraph">
              {teamData.latestMatchDetails?.firstInnings}
            </p>
            <p className="latest-paragraph">second Innings</p>
            <p className="paragraph">
              {teamData.latestMatchDetails?.secondInnings}
            </p>
            <h1 className="latest-paragraph">Man Of The Match</h1>
            <p className="paragraph">
              {teamData.latestMatchDetails?.manOfTheMatch}
            </p>
            <p className="latest-paragraph">Umpires</p>
            <p className="paragraph">{teamData.latestMatchDetails?.umpires}</p>
          </div>
        </div>
        <ul className="ul">
          {teamData.recentMatches?.map(each => (
            <MatchCard each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {teamData, isLoading, teamName} = this.state
    console.log(teamData)

    console.log(teamData.recentMatches)

    return (
      <div>
        {isLoading ? (
          <div id="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.gettingRequest()
        )}
      </div>
    )
  }
}
export default TeamMatches

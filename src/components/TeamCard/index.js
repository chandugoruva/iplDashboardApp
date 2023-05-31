import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {each} = props
  const {name, id, teamImageUrl} = each
  return (
    <Link to={`/team-matches/${id}`} className="match-card">
      <li className="team-flex">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="team-heading">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard

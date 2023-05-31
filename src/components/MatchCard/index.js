import './index.css'

const MatchCard = props => {
  const {each} = props
  const matchColor = each.matchStatus === 'Won' ? 'win' : 'loose'
  return (
    <li className="matchCard">
      <img
        src={each.competingTeamLogo}
        alt={`competing team ${each.competingTeam}`}
        className="logo-image"
      />
      <p className="latest-paragraph">{each.competingTeam}</p>
      <p className="paragraph">{each.result}</p>
      <p className={matchColor}>{each.matchStatus}</p>
    </li>
  )
}
export default MatchCard

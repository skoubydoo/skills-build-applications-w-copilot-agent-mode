import { useEffect, useState } from 'react'
import { fetchResource } from '../api/client'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('teams')
      .then((data) => {
        if (isMounted) {
          setTeams(data)
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setError(loadError.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <p className="status-text">Loading teams...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="resource-view">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>
      <div className="resource-grid two-column">
        {teams.map((team) => (
          <article className="resource-card" key={team._id || team.name}>
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <dl>
              <div>
                <dt>Coach</dt>
                <dd>{team.coach}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{team.members?.map((member) => member.name).join(', ') || 'None yet'}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams

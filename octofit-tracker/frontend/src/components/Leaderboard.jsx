import { useEffect, useState } from 'react'
import { fetchResource } from '../api/client'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data)
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
    return <p className="status-text">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="resource-view">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry) => (
          <article className="leaderboard-row" key={entry._id}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h3>{entry.user?.name || 'Unknown athlete'}</h3>
              <p>{entry.team?.name || 'No team'} · {entry.period}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard

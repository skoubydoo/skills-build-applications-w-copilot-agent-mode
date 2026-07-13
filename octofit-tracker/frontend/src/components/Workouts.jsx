import { useEffect, useState } from 'react'
import { fetchResource } from '../api/client'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('workouts')
      .then((data) => {
        if (isMounted) {
          setWorkouts(data)
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
    return <p className="status-text">Loading workouts...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="resource-view">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      <div className="resource-grid two-column">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id || workout.title}>
            <span className="pill">{workout.difficulty}</span>
            <h3>{workout.title}</h3>
            <p>{workout.description}</p>
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{workout.focusAreas?.join(', ')}</dd>
              </div>
              <div>
                <dt>Recommended for</dt>
                <dd>{workout.recommendedFor}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts

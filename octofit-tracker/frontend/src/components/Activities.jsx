import { useEffect, useState } from 'react'
import { fetchResource } from '../api/client'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data)
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
    return <p className="status-text">Loading activities...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="resource-view">
      <div className="section-heading">
        <p className="eyebrow">Activity log</p>
        <h2>Activities</h2>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user?.name || 'Unknown'}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.distanceMiles ?? 0} mi</td>
                <td>{activity.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities

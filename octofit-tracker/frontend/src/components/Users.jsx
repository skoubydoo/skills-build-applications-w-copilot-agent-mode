import { useEffect, useState } from 'react'
import { fetchResource } from '../api/client'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('users')
      .then((data) => {
        if (isMounted) {
          setUsers(data)
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
    return <p className="status-text">Loading users...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="resource-view">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      <div className="resource-grid">
        {users.map((user) => (
          <article className="resource-card" key={user._id || user.email}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{user.team?.name || 'Unassigned'}</dd>
              </div>
              <div>
                <dt>Goal</dt>
                <dd>{user.fitnessGoal}</dd>
              </div>
              <div>
                <dt>Weekly target</dt>
                <dd>{user.weeklyTargetMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users

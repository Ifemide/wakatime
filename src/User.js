import axios from 'axios'
import React, { useEffect } from 'react'
import avatar from './default-avatar.png'
import './User.css'

const User = ({
  history,
  location: {
    state: { rank, running_total, user },
  },
  match,
}) => {
    console.log(user)
    console.log(running_total)

    useEffect(() => {
        const fetchUserDetails = async () => {
            const res = await axios.get(`https://wakatime.com/api/v1/users/@${user.username}`)
            console.log(res)
        }
        fetchUserDetails()
    }, [])

  const returnToIndex = () => history.push('/')

  return (
    <div className="container">
      <header className="app-header" style={styles.header}>
        <p onClick={returnToIndex} style={styles.mRight}>
          WakaTime Leaderboard
        </p>
        <p>{user.display_name}</p>
      </header>
      <div className="user-details">
          <div className="user">
              <div className="user-image">
                  <img src={user.photo_public ? user.photo : avatar} alt="" />
              </div>
              <div>
                  <p>{user.display_name}</p>
                  <p>@{user.username}</p>
                  <p>Rank: {rank}</p>
              </div>
              <div>
                  <p>{user.is_email_public && user.email}</p>
                  <p>{user.location}</p>
                  <p>{user.website}</p>
              </div>
          </div>
          <div className="details"></div>
      </div>
    </div>
  )
}

let styles = {
  header: {
    flexDirection: 'row',
  },
  mRight: {
    marginRight: '1rem',
    color: '#002d80',
    cursor: 'pointer',
  },
}

export default User

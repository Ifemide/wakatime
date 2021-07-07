import React, { useEffect } from 'react'
import avatar from '../assets/default-avatar.png'

// Stylesheet
import './User.css'

// External Imports
import axios from 'axios'

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
      const res = await axios.get(
        `https://wakatime.com/api/v1/users/${user.username}`,
        {
          params: {
            api_key: 'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
          },
        },
        // {
        //   headers: {
        //     Authorization:
        //       'Basic ' + btoa('ae45a3c0-0b0c-46bb-8a01-53144d6a282a'),
        //   },
        // },
      )
      console.log(res)
    }
    fetchUserDetails()
  }, [])

  const returnToIndex = () => history.push('/')

  console.log(btoa('ae45a3c0-0b0c-46bb-8a01-53144d6a282a'))

  const positionize = (rank) => {
    let str = rank.toString()
    let lastLetter = str[str.length - 1]
    let position = ''
    switch (lastLetter) {
      case '1':
        position = str + 'st'
        break
      case '2':
        position = str + 'nd'
        break
      case '3':
        position = str + 'rd'
        break
      default:
        position = str + 'th'
    }
    return position
    // console.log(lastLetter)
  }

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
          <div className="bio">
            <h3>{user.display_name}</h3>
            <p className="username">
              {user.username && `@${user.username} | `} {positionize(rank)}
            </p>
          </div>
          <div className="extras">
            {user.is_email_public && (
              <p>
                <i className="fas fa-envelope"></i> {user.email}
              </p>
            )}
            {user.location && (
              <p>
                <i className="fas fa-map-marker-alt"></i> {user.location}
              </p>
            )}
            {user.website && (
              <p>
                <i className="fas fa-link"></i> {user.website}
              </p>
            )}
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

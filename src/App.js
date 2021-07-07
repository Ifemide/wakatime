import { useEffect, useState } from 'react'
import rhombus from './rhombus.gif'

// Stylesheet
import './App.css'

// External Imports
import axios from 'axios'
import { Link } from 'react-router-dom'

// Constants
const URL = 'https://wakatime.com/api/v1/leaders'

const App = () => {
  // Local State
  const [loading, setLoading] = useState(true)
  const [leaderboardData, setLeaderboardData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState(false)
  const [searchData, setSearchData] = useState([])

  // Calling Leaders Endpoint
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${URL}`, {
        // params: { page: pageNumber },
        // headers: {
        //   Authorization: `Basic ${btoa(
        //     'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
        //   )}`,
        // },
        params: {
          api_key: 'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
          page: pageNumber,
        },
        // auth: {
        //   username: 'api_key',
        //   password: 'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
        // },
      })
      if (response.data.data.length > 0) setLoading(false)
      setLeaderboardData(response.data.data)
    }
    fetchData()
  }, [pageNumber])

  const handleInput = (e) => {
    setSearchQuery(e.target.value)
    setSearchStatus(true)
    const temp = leaderboardData.map((data) =>
      data.user.display_name.toLowerCase().includes(searchQuery.toLowerCase())
        ? data.user.display_name
        : null,
    )
    setSearchData([temp])
  }

  return (
    <div className="container">
      <header className="app-header">
        <p>WakaTime Leaderboard</p>
        {!loading && (
          <form className="search" autoComplete="off">
            <input
              className="search-input"
              placeholder="Search for a programmer.."
              autoComplete="off"
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleInput}
              onBlur={() => setSearchStatus(false)}
            />
            {searchStatus && (
              <div className="search-box">
                {searchData.map((item, key) => (
                  <p key={key}>{item}</p>
                  // <SearchItem item={item} key={key} />
                ))}
              </div>
            )}
          </form>
        )}
      </header>
      {loading && (
        <div className="loading-section">
          <img src={rhombus} alt="Loading Icon" className="loading-icon" />
        </div>
      )}
      {!loading && (
        <>
          <div className="table">
            <ul className="table-header">
              <li>Rank</li>
              <li>Programmer</li>
              <li>Total Hours Coded</li>
              <li>Daily Average</li>
              <li>Languages Used</li>
            </ul>
            <div className="table-data">
              {leaderboardData &&
                leaderboardData.map((prog) => <RowData prog={prog} />)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const RowData = ({ prog }) => {
  return (
    <ul className="table-row" key={prog.rank}>
      <li>{prog.rank}</li>
      <Link
        to={{
          pathname: `/user/${prog.user.display_name
            .split(' ')[0]
            .toLowerCase()}`,
          state: prog,
        }}
      >
        <li>{prog.user.display_name}</li>
      </Link>
      <li>{prog.running_total.human_readable_total}</li>
      <li>{prog.running_total.human_readable_daily_average}</li>
      <li>{prog.running_total.languages.map((lang) => `${lang.name}, `)}</li>
    </ul>
  )
}

const SearchItem = ({ item, key }) => (
  <>
    <p key={key}>{item}</p>
    <br />
  </>
)

export default App

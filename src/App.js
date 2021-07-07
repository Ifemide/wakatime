import { useEffect, useState } from 'react'
import './App.css'
import rhombus from './rhombus.gif'
import { Link } from "react-router-dom"

// External Imports
import axios from 'axios'

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
      const response = await axios.get(`${URL}`, { params: {'page': pageNumber} })
      if (response.data.data.length > 0) setLoading(false)
      setLeaderboardData(response.data.data)
    }
    fetchData()
  }, [pageNumber])

  const handleInput = (e) => {
    setSearchQuery(e.target.value)
    setSearchStatus(true)
    const temp = leaderboardData.map(data =>
      data.user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ? data.user.display_name : null
    )
    setSearchData([temp])
  }

  return (
    <div className="container">
      <header className="app-header">
        <p>WakaTime Leaderboard</p>
        {
          !loading &&
          <form className="search">
            <input type="text" name="search" value={searchQuery} onChange={handleInput} />
            {
              searchStatus &&
              <div className="search-box">
                {
                  searchData.map((item, key) => <SearchItem item={item} key={key} />)
                }
              </div>
            }
          </form>
        }
      </header>
      {
        loading && 
        <div className="loading-section">
          <img src={rhombus} alt="Loading Icon" className="loading-icon" />
        </div>
      }
      {
        !loading &&
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
              {
                leaderboardData && leaderboardData.map(prog => <RowData prog={prog} />)
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}

const RowData = ({ prog }) => {
  return <ul className="table-row" key={prog.rank}>
    <li>{prog.rank}</li>
    <Link to={{
      pathname: `/user/${prog.user.display_name.split(' ')[0].toLowerCase()}`,
      state: prog
    }}>
      <li>{prog.user.display_name}</li>
    </Link>
    <li>{prog.running_total.human_readable_total}</li>
    <li>{prog.running_total.human_readable_daily_average}</li>
    <li>
      {prog.running_total.languages.map(lang => `${lang.name}, `)}
    </li>
  </ul>
}

const SearchItem = ({ item, key }) => <li key={key}>{item}</li>

export default App

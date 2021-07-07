import { useEffect, useState } from 'react'
import RowData from '../components/RowData'
import SearchBar from '../components/SearchBar'
import TableHeader from '../components/TableHeader'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'

// Stylesheet
import './App.css'

// External Imports
import axios from 'axios'

// Constants
import { URL } from '../constants'

const App = () => {
  // Local State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState(false)
  const [searchData, setSearchData] = useState([])

  // Calling Leaders Endpoint
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get(`${URL}?page=${pageNumber}`, {
          // params: { page: pageNumber },
          // headers: {
          //   Authorization: `Basic ${btoa(
          //     'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
          //   )}`,
          // },
          // params: {
          //   api_key: 'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
          //   page: pageNumber,
          // },
          // auth: {
          //   username: 'api_key',
          //   password: 'ae45a3c0-0b0c-46bb-8a01-53144d6a282a',
          // },
        })
        .catch((err) => {
          setError(true)
          setLoading(false)
          setErrorMsg(err.message)
        })
      if (response && response.data.data.length > 0) {
        setLoading(false)
        setLeaderboardData(response.data.data)
      }
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
        {!loading && !error && (
          <SearchBar
            searchQuery={searchQuery}
            handleInput={handleInput}
            searchStatus={searchStatus}
            searchData={searchData}
            setSearchStatus={setSearchStatus}
          />
        )}
      </header>
      {loading && <Loader />}
      {error && <ErrorBox message={errorMsg} />}
      {!loading && !error && (
        <>
          <div className="table">
            <TableHeader />
            <div className="table-data">
              {leaderboardData &&
                leaderboardData.map((prog) => <RowData prog={prog} />)}
            </div>
          </div>
        </>
      )}
      {!loading && !error && (
        <div className="pagination">
          <div
            className={pageNumber <= 1 ? 'box-fade box' : 'box'}
            onClick={
              pageNumber > 1 ? () => setPageNumber(pageNumber - 1) : null
            }
          >
            <i className="fas fa-angle-left"></i>
          </div>
          {pageNumber > 1 && (
            <div className="nobox" onClick={() => setPageNumber(1)}>
              <p>1</p>
            </div>
          )}
          {pageNumber > 2 && (
            <div className="nobox">
              <p>...</p>
            </div>
          )}
          <div className="nobox">
            <p>{pageNumber}</p>
          </div>
          <div className="nobox" onClick={() => setPageNumber(pageNumber + 1)}>
            <p>{pageNumber + 1}</p>
          </div>
          <div className="nobox" onClick={() => setPageNumber(pageNumber + 2)}>
            <p>{pageNumber + 2}</p>
          </div>
          <div className="nobox" onClick={() => setPageNumber(pageNumber + 3)}>
            <p>{pageNumber + 3}</p>
          </div>
          <div className="nobox" onClick={() => setPageNumber(pageNumber + 4)}>
            <p>{pageNumber + 4}</p>
          </div>
          <div
            className={pageNumber >= 50 ? 'box-fade box' : 'box'}
            onClick={
              pageNumber < 50 ? () => setPageNumber(pageNumber + 1) : null
            }
          >
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

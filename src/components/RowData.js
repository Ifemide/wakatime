import React from 'react'
import { Link } from 'react-router-dom'

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
      <li className="languages">
        {prog.running_total.languages.map((lang) => `${lang.name}, `)}
      </li>
    </ul>
  )
}

export default RowData

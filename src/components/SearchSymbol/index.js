import React, { useState, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TextField, InputAdornment } from '@material-ui/core'
import SearchRounded from '@material-ui/icons/SearchRounded'
import { loadSearch } from '../../redux/actions'

const SearchSymbol = ({ loadSearch }) => {
  const [value, setValue] = useState(null)
  const handleChange = (e) => {
    setValue(e.target.value)
    loadSearch(value)
  }
  return (
    <TextField
      id="filled-search"
      label="Search field"
      type="search"
      variant="outlined"
      onChange={handleChange}
      style={{
        backgroundColor: '#463f3f',
        color: 'white',
        label: {
          color: 'white',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
    />
  )
}

SearchSymbol.propTypes = {
  // loadSearch: PropTypes.func,
}

function mapStateToProps(state) {
  const { stocks } = state
  return {
    stocks,
  }
}

export default connect(mapStateToProps, {
  loadSearch,
})(SearchSymbol)

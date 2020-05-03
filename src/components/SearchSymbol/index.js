import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { loadSearch } from '../../redux/actions'

const useStyles = makeStyles({
  option: {
    zIndex: 5,
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  label: {
    color: 'white',
  },
  formLabelRoot: {
    // must provide all of formLabelRoot && '&$formLabelFocused' && formLabelFocused
    '&$formLabelFocused': { color: 'white' },
  },
})

const StyledAutocomplete = styled(TextField)`
  &.Mui-focused fieldset {
    border-color: white;
  }
  background-color: #463f3f;
  color: white;
  label {
    color: white;
  }
  & label.Mui-focused {
    color: white;
  }
  input {
    color: white;
  }
`

const SearchSymbol = ({ loadSearch, symbols }) => {
  const classes = useStyles()
  const [value, setValue] = useState(null)
  const [options, setOptions] = useState([])
  const handleChange = (e) => {
    const upperCaseSymbol = e.target.value.toUpperCase()
    setValue(upperCaseSymbol)
    const optionsAutoComplete = _.filter(
      symbols,
      (data) =>
        data.symbol === upperCaseSymbol ||
        data.displaySymbol.includes(upperCaseSymbol) ||
        data.description.includes(upperCaseSymbol)
    )
    setOptions(optionsAutoComplete.slice(0, 10))
  }

  useEffect(() => loadSearch(), [])

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      filterOptions={(options, state) =>
        options.filter(
          (option) =>
            option.symbol === state.inputValue.toUpperCase() ||
            option.symbol.includes(state.inputValue.toUpperCase()) ||
            option.description.includes(state.inputValue.toUpperCase())
        )
      }
      getOptionSelected={(value) => console.log('lovely', value)}
      getOptionLabel={(option) => option.symbol}
      renderOption={(option) => `${option.symbol} - ${option.description}`}
      style={{ width: '90%', marginBottom: 12 }}
      classes={classes}
      renderInput={(params) => (
        <StyledAutocomplete
          {...params}
          label="Search stock symbol"
          variant="outlined"
          onChange={handleChange}
          style={{}}
        />
      )}
    />
  )
}

SearchSymbol.propTypes = {
  loadSearch: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    symbols: state.searchSymbol && state.searchSymbol.symbols,
  }
}

export default connect(mapStateToProps, {
  loadSearch,
})(SearchSymbol)

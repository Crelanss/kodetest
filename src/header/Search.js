import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import filtericon from '../pictures/filterIcon.svg'
import searchicon from '../pictures/searchIcon.svg'
import State from "../store/DataStore";
import {observer} from 'mobx-react-lite'
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import {toJS} from "mobx";
import {Slider} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import closeButton from '../pictures/closeButton.svg'
import Button from '@material-ui/core/Button';


const SearchComponent = styled.div`
  width:100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const SearchFieldWrapper = styled.form`
  width:270px;
  height: 100%;
  position: relative;
  input {
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border:1px solid #DDDDDD;
    border-radius: 30px;
    height: 100%;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    padding-left: 55px;
    background:url(${searchicon}) no-repeat center left 15px;
    &:focus{
      border: 1px solid gray;
    }
  }
  button[type="reset"] {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    border: 0;
    display: none;
    border-radius: 50%;
    background-color: gray;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
  input:valid ~ button[type="reset"] {
    display: block;
  }  
`

const Filter = styled.div`
  width:440px;
  background: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 81px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 32px 32px 32px 32px;
  h3{
    font-family: GilroyExtra,;
    font-weight: 800;
    font-size: 24px;
    line-height: 28px;
  }
`

const FilterCountries = styled.div`
  width:376px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  color:black;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const Country = styled.div`
  width:376px;
  height:48px;
  display: flex;
  border-bottom:1px solid rgba(33, 33, 33, 0.08);
  justify-content: space-between;
  align-items: flex-end;
`

const SliderContainer = styled.div`
  width:376px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 70px;
`

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'rgba(255,255,255,0.8)',
    },
}))

const ButtonsContainer = styled.div`
  width:376px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`

const ClearButton = styled.button`
  width:70px;
  height: 36px;
  background: white;
  border: 1px solid #DDDDDD;
  font-family: Roboto, ;
  font-weight: bolder;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  color:rgba(130, 120, 106, 1);
  border-radius: 4px;
  outline: none;
  display:${props => props.show ? 'block' : 'none'};
  &:hover{
    cursor: pointer;
  }
`

const ShowButton = styled.button`
  width:143px;
  height: 36px;
  background: rgba(130, 120, 106, 1);
  outline: none;
  font-family: Roboto, sans-serif;
  font-weight: bolder;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  color:white;
  border: none;
  border-radius: 4px;
  &:hover{
    cursor: pointer;
  }
`

const CrossContainer = styled.div`
  width:376px;
  display: flex;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
`

const CustomSlider = withStyles({
    active: {},
    valueLabel: {
        top: -40,
        left: -15,
        '& span': {
            width: '40px',
            height: '40px',
            '& span': {
                color: 'white',
                marginTop: 5,
                marginLeft: -9,
                textAlign: 'center'
            },
        },
    }
})(Slider);

const CustomButton = withStyles({
    root: {
        width: '56px',
        height: '56px',
        border: '1px solid #DDDDDD',
        borderRadius: '28px',
        padding: '0',
        minWidth: '0'
    }
})(Button);


const Search = observer(() => {

        const [showClear, setShowClear] = useState(false)

        const [checkedState, setCheckedState] = useState([])

        const [value, setValue] = useState([])

        const [minMax, setMinMax] = useState([])

        useEffect(() => {
            let countries = checkedState.map(el => {
                if (el.isChecked === true) {
                    return (el.country)
                } else {
                    return ('')
                }
            })
            if ((value[0] !== State.startFilter.minkCal)
                || (value[1] !== State.startFilter.maxkCal)
                || (JSON.stringify(countries) !== JSON.stringify(State.startFilter.countries))) {
                setShowClear(true)
            } else {
                setShowClear(false)
            }
        }, [value, checkedState])

        useEffect(() => {
            let calories = toJS(State.data).map(item => item['caloricity'])
            const maxCal = Math.max(...calories)
            const minCal = Math.min(...calories)
            setValue([Number(State.filter.minkCal), Number(State.filter.maxkCal)])
            setCheckedState(State.filter.countries.map((el) => {
                return ({
                    country: el,
                    isChecked: true
                })
            }))
            setMinMax([minCal, maxCal])
        }, [])

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const classes = useStyles();

        const [open, setOpen] = React.useState(false);

        const handleClose = () => {
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen(!open);
        };

        const showRecipesHandle = () => {
            const countries = checkedState.map((el) => {
                if (el.isChecked === true) {
                    return (el.country)
                }
            })
            const newCountries = countries.filter((el) => el !== undefined)
            State.setFilter(newCountries, value[1], value[0])
        }


        return (
            <SearchComponent>
                <SearchFieldWrapper onSubmit={
                    event => {
                        event.preventDefault()
                        State.changeFilter(document.getElementById('inp').value)
                    }
                }>
                    <input type="text"
                           id='inp'
                           required="required"
                           placeholder="Search"
                           name={'input'}
                    />
                    <button type="reset"
                            title="Click me to clear the input field"
                            onClick={() => State.changeFilter('')}
                    >&times;</button>
                </SearchFieldWrapper>
                <CustomButton
                    variant="outlined"
                    onClick={() => handleToggle()}
                >
                    <img src={filtericon}/>
                </CustomButton>
                <Backdrop
                    className={classes.backdrop}
                    open={open}
                    onClick={() => handleClose()}
                >
                    <Filter onClick={(event) => {
                        event.stopPropagation()
                    }}>
                        <CrossContainer>
                            <h3>Filter</h3>
                            <img src={closeButton} onClick={() => handleClose()}/>
                        </CrossContainer>
                        <FilterCountries>
                            {checkedState.map((el) => {
                                return (
                                    <Country>
                                        {el.country}
                                        <Checkbox
                                            checked={el.isChecked}
                                            onChange={(event) => {
                                                let checked = event.target.checked
                                                setCheckedState(checkedState.map(element => {
                                                    if (element.country === el.country) {
                                                        element.isChecked = checked
                                                    }
                                                    return element
                                                }))
                                            }}
                                        />
                                    </Country>
                                )
                            })
                            }
                        </FilterCountries>
                        <SliderContainer>
                            <CustomSlider
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="on"
                                min={minMax[0]}
                                max={minMax[1]}
                            />
                        </SliderContainer>
                        Calories, kCal
                        <ButtonsContainer>
                            <ClearButton show={showClear}
                                         onClick={() => {
                                             setValue([toJS(State.startFilter.minkCal), toJS(State.startFilter.maxkCal)])
                                             setCheckedState(State.startFilter.countries.map((el) => {
                                                 return ({
                                                     country: el,
                                                     isChecked: true
                                                 })
                                             }))
                                         }}
                            >
                                CLEAR
                            </ClearButton>
                            <ShowButton
                                onClick={() => {
                                    showRecipesHandle()
                                    console.log(toJS(State.filter))
                                    handleClose()
                                }}
                            >
                                SHOW RECIPES
                            </ShowButton>
                        </ButtonsContainer>
                    </Filter>
                </Backdrop>
            </SearchComponent>
        )
    }
)

export default Search
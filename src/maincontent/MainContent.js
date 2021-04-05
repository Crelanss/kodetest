import React from 'react'
import styled from "styled-components";
import State from "../store/DataStore";
import {observer} from 'mobx-react-lite'
import {toJS} from "mobx";
import Card from "./Card";


const MainContentComponent = styled.div`
  width:1280px;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  padding-left: 98px;
  padding-right: 98px;
  margin-bottom: 50px;
  position: relative;
  z-index: 0;
`

const CardsWrapper = styled.div`
  width:1084px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: 348px 348px 348px;
  grid-column-gap: 20px;
`

const filter = (data, filter) => {
    return (
        data.filter((element) => {
            return (element.title.startsWith(filter.title)&&(
                (element.caloricity>=filter.minkCal)&&(element.caloricity<=filter.maxkCal)
            )&&(filter.countries.includes(element.cuisine.title)))
        })
    )
}

const MainContent = observer(() => {

    return (
        <MainContentComponent>
            <CardsWrapper>
                {filter(toJS(State.data), toJS(State.filter)).map((el) => (
                    <Card
                        item={el}
                    />
                ))}
            </CardsWrapper>
        </MainContentComponent>
    )
})

export default MainContent
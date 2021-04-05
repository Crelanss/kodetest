import React from 'react'
import styled from "styled-components";
import State from "../store/DataStore";
import {useHistory} from "react-router-dom";

const CardComponent = styled.div`
  width:348px;
  height: 384px;
  margin-top: 24px;
  background: #FFFFFF;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  &:hover{
    cursor: pointer;
    transition: all 0.2s ease-out;
    transform: scale(1.1);
  }
`

const PictureContainer = styled.div`
  width:100%;
  height: 196px;
  background: url(${props => props.thumbnail}) no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
`

const Note = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 12px;
  background: white;
  border: none;
  border-radius: 16px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-left: 8px;
`

const NoteContainer = styled.div` 
  display: flex;
  margin-top: 148px;
  height: 32px;
  align-self: flex-end;
  margin-right: 16px;
`

const DescriptionContainer = styled.div`
  width:100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  h3{
    font-family: GilroyExtra, ;
    font-weight: 800;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 8px;
  }
  span{
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width:90%;
    height: 120px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
  }
`


const Card = (props) => {

    const item = props.item

    let history = useHistory()

    const pushToRecipe = (id) => {
        history.push(`/${id}`)
    }

    const timeCount=(time)=>{
        if(time>60){

        }
    }

    return (
        <CardComponent onClick={() => State.getRecipe(item.id, ()=>{pushToRecipe(item.id)})}>
            <PictureContainer thumbnail={item.thumbnail}>
                <NoteContainer>
                    <Note>{item.cookTime}</Note>
                    <Note>{item.caloricity} kCal</Note>
                    <Note>{item.cuisine.title}</Note>
                </NoteContainer>
            </PictureContainer>
            <DescriptionContainer>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
            </DescriptionContainer>
        </CardComponent>
    )
}

export default Card
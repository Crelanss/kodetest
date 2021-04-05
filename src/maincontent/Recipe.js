import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import RecipePhotos from "./RecipePhotos";
import State from "../store/DataStore";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import cuisineIcon from '../pictures/cuisineIcon.svg'
import caloriesIcon from '../pictures/caloriesIcon.svg'
import timeIcon from '../pictures/timeIcon.svg'
import easyPic from '../pictures/easy.svg'
import mediumPic from '../pictures/medium.svg'
import hardPic from '../pictures/hard.svg'
import {useParams} from "react-router-dom";

const RecipeComponent = styled.div`
  width: 1280px; 
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 96px;
`

const RecipeContainer = styled.div`
  width:1084px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
`

const RecipeDescription = styled.div`
  width:532px;
  display: flex;
  flex-direction: column;
  h2{
    font-family: GilroyExtra, ;
    margin-top: 0;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 16px;
  }
  span{
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  h3{
    font-family: GilroyExtra, ;
    font-weight: 800;
    font-size: 24px;
    line-height: 28px;
  }
`

const RecipeNotes = styled.div`
  width:80%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Note = styled.div`
  height: 24px;
  display: flex;
  img{
    margin-right:9px;
  }
`

const Difficulty = styled.div`
  height: 24px;
  display: flex;
  
  img{
    margin-right:9px;
  }
  span{
    color:${props => props.color};
  }
`

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  ul{
    padding-left: 20px;
    li{
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
`

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  ol{
    padding-left: 0;
    list-style-type: none;
    counter-reset: item;
    li{
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
      &:before{
        font-family: Roboto, sans-serif;
        font-weight: 700;
        font-size: 9px;
        line-height: 10.55px;
        content: counter(item);
        counter-increment:item;
        padding:2px 4px 2px 4px;
        margin-right: 8px;
        border: 1px solid #DDDDDD;
        border-radius: 50%;
      }
    }
  }
`


const Recipe = observer(() => {

        const {id} = useParams()

        const [init, setInit] = useState(false)

        useEffect(() => {
            State.getRecipe(id, () => {
                    setInit(true)
                }
            )
        }, [])

        const recipe = toJS(State.recipe)

        let cookPic = {color: '', pic: ''}


        switch (recipe['difficulty']) {
            case 'easy':
                cookPic.color = '#2FB65D'
                cookPic.pic = easyPic
                break;
            case 'medium':
                cookPic.color = '#EB8A31'
                cookPic.pic = mediumPic
                break;
            case 'easy':
                cookPic.color = '#EB3C31'
                cookPic.pic = hardPic
                break;
        }
        if (init) {
            return (
                <RecipeComponent>
                    <RecipeContainer>
                        <RecipeDescription>
                            <h2>{recipe['title']}</h2>
                            <span>{recipe['description']}</span>
                            <RecipeNotes>
                                <Difficulty color={cookPic.color}>
                                    <img src={cookPic.pic}/>
                                    <span>{recipe['difficulty']}</span>
                                </Difficulty>
                                <Note>
                                    <img src={timeIcon}/>
                                    <span>{recipe['cookTime']}</span>
                                </Note>
                                <Note>
                                    <img src={caloriesIcon}/>
                                    <span>{recipe['caloricity']}</span>
                                </Note>
                                <Note>
                                    <img src={cuisineIcon}/>
                                    <span>{recipe['cuisine']['title']}</span>
                                </Note>
                            </RecipeNotes>
                            <IngredientsContainer>
                                <h3>Ingredients</h3>
                                <ul>
                                    {recipe['ingredients'].map((el => {
                                        return (
                                            <li>{el}</li>
                                        )
                                    }))}
                                </ul>
                            </IngredientsContainer>
                            <StepsContainer>
                                <h3>Instructions</h3>
                                <ol>
                                    {recipe['instructions'].map((el => {
                                        return (
                                            <li>{el}</li>
                                        )
                                    }))}
                                </ol>
                            </StepsContainer>
                        </RecipeDescription>
                        <RecipePhotos/>
                    </RecipeContainer>
                </RecipeComponent>
            )
        } else {
            return (<div/>)
        }
    }
)

export default Recipe
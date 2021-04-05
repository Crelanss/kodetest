import React from 'react'
import styled from "styled-components";
import Carousel from 'react-material-ui-carousel'
import State from "../store/DataStore";
import {toJS} from "mobx";


const RecipePhotosComponent = styled.div`
  width:532px;
  display: flex;
  flex-direction: column;
`

const ThumbNail = styled.div`
  width:532px;
  height: 355px;
  margin-bottom: 55px;
  img{
    width: 100%;
  }
`

const ImagesContainer = styled.div`
  width:532px;
  display: flex;
  flex-wrap: wrap;
`

const Image = styled.div`
  width:56px;
  height: 56px;
  margin-right: 8px;
  img{
    width: 100%;
  }
`

const RecipePhotos = () => {
    const recipe = toJS(State.recipe)
    const thumbnail = recipe['thumbnail']
    const images = recipe['images']

    if (images.length === 1) {
        return (
            <RecipePhotosComponent>
                <ThumbNail>
                    <img src={thumbnail}/>
                </ThumbNail>
            </RecipePhotosComponent>
        )
    } else {
        return (
            <RecipePhotosComponent>
                <ThumbNail>
                    <Carousel
                        indicatorIconButtonProps={{
                            style: {
                                display: 'none'
                            }
                        }}
                    >
                        {
                            images.map(element => <img src={element}/>)
                        }
                    </Carousel>
                </ThumbNail>
                <ImagesContainer>
                    {
                        images.map(element => <Image><img src={element}/></Image>)
                    }
                </ImagesContainer>
            </RecipePhotosComponent>
        )
    }
}

export default RecipePhotos
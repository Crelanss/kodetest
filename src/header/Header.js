import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import headerPic from '../pictures/headerPic.png'
import Search from "./Search";
import {useHistory} from 'react-router-dom'


const Wrapper = styled.div`
  height: 320px;
  position: sticky;
  background: white;
  top:0;
  z-index: 130;
  margin-bottom: 308px;
`

const HeaderComponent = styled.div`
  max-width: 1280px;
  width: 100%;
  max-height:600px;
  min-height:292px;
  height: ${props => `${props.height}px`};
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background: white;
  position: relative;
  
`

const ImageContainer = styled.div`
  width:814px;
  overflow: hidden;
  margin-left: auto;
  background: url(${headerPic}) no-repeat center;
  background-size: cover;
  img{
    width:100%;
  }
`

const TextSearchContainer = styled.div`
  position: absolute;
  width:348px;
  height: 192px;
  top:128px;
  left:98px;
  display: flex;
  flex-direction: column;
  h1{
      white-space: nowrap;
      font-family: GilroyExtra, ;
      font-weight: 800;
      font-size: 64px;
      line-height: 80px;
      margin-bottom: 0;
      margin-top: 0;
      &:hover{
        cursor: pointer;
      }
  }
  span{
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 16px;
      color:rgba(130, 120, 106, 1);
      line-height: 24px;
  }
`


const Header = () => {

    const [height, setHeight] = useState(600)

    const listenScrollEvent = e => {
        if (height - window.scrollY > 0) {
            setHeight(height - window.scrollY)
        } else {
            setHeight(292)
        }

    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    }, [])

    let {push} = useHistory()

    return (
        <Wrapper>
            <HeaderComponent height={height}>
                <TextSearchContainer>
                    <h1 onClick={() => push('/')}>Air Recipes</h1>
                    <span>Best Recipes for Best People</span>
                    <Search/>
                </TextSearchContainer>
                <ImageContainer/>
            </HeaderComponent>

        </Wrapper>
    )
}

export default Header
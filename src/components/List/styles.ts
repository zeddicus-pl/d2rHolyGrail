import styled from 'styled-components'

export const Container = styled.div`
  padding: 15px;
`

export const Logo = styled.div`
  display: flex;
  padding-bottom: 10px;
  min-width: 500px;

  a {
    img {
      height: 12px;
      padding-left: 4px;
    }
  }

  h1 {
    font-size: 60px;
    font-family: 'Gwendolyn', cursive;
  }

  h6 {
    align-self: flex-end;
    margin-bottom: 6px;
    font-family: 'Gwendolyn', cursive;
    font-size: 16px;
  }
`

export const Image = styled.img`
  height: 70px;
`

export const ButtonPanel = styled.div`
  float: right;
`

export const CountLabelContainer = styled.div`
  position: relative;
`

export const CountLabel = styled.div`
  position: absolute;
  left: 18px;
  bottom: -1px;
  color: rgb(97, 97, 97);
  font-size: 8.5pt;
`

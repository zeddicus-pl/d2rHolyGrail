import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
`
export const ImageContainer = styled.div`
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const Image = styled.img`
  width: 50vw;
`

export const Text = styled.div`
  font-family: 'Gwendolyn', cursive;
  font-size: 13vw;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  text-shadow: 0 0 15px rgba(0,0,0,0.5);
`

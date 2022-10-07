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

export const Rune = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  cursor: pointer;
`

export const RuneBg = styled.img`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`

export const RuneIcon = styled.div`
  z-index: 2;
  position: relative;
  background: none;
  color: #333;
  display: inline-block;
  font-family: "D2Runes";
`

export const RuneListBig = styled.div`
  padding-top: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  > div {
    font-size: 28px;
    margin-bottom: 23px;
  }
  > div div:last-child {
    bottom: -38px;
  }
`

export const TooltipTitlePill = styled.div`
  font-size: 18px;
  margin-top: 18px;
  float: left;
  margin-right: 20px;
  border: 1px solid #666;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
`

export const RuneList = styled.div`
  padding-top: 5px;
  > div {
    width: 24px;
    height: 24px;
    font-size: 17px;
    margin-bottom: 23px;
  }
`

export const RuneName = styled.div`
  font-variant: all-small-caps;
  position: absolute;
  left: 50%;
  display: inline-block;
  bottom: -21px;
  transform: translateX(-50%);
`

export const MissingOnlySwitch = styled.div`
  text-align: right;
`

export const CheckboxCounter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 12px;
`

export const CheckboxCounterButtons = styled.div`
  position: absolute;
  left: -6px;
  top: -9px;
  width: 31px;
  height: 59px;

  > button {
    padding: 0;
    min-width: 30px;
    line-height: 19px;
    z-index: 100;
  }

  > button:nth-child(2) {
    top: 21px;
  }
`

export const PopupTitle = styled.div`
  font-size: 32px;
  padding-bottom: 10px;
`

export const AvailableRunesLine = styled.div`
  display: inline-block;
  font-size: 12px;
  color: #777777;
  white-space: nowrap;
`
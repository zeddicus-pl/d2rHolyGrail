import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }

  a {
    color: #6E55AE;
    text-decoration: none;
  }
  

  #summary {background: #111 }
  #summary .MuiTableCell-body {
      padding: 5px;
  }
  div#summary .MuiGrid-container {
      margin-top: 0 !important;
  }

  div#summary #simple-tabpanel-1 *,
  div#summary #simple-tabpanel-2 *,
  div#summary #simple-tabpanel-3 *,
  div#summary #simple-tabpanel-4 * {
      padding: 0;
      margin: 0 !important;
      min-width: 0 !important;
  }

  div#summary #simple-tabpanel-1,
  div#summary #simple-tabpanel-2,
  div#summary #simple-tabpanel-3,
  div#summary #simple-tabpanel-4 {
      padding-top: 20px;
  }

  div#summary #simple-tabpanel-1 .MuiTypography-h6 ,
  div#summary #simple-tabpanel-2 .MuiTypography-h6 ,
  div#summary #simple-tabpanel-3 .MuiTypography-h6 ,
  div#summary #simple-tabpanel-4 .MuiTypography-h6  {
      padding-top: 10px;
      padding-bottom: 3px;
  }

  div#summary #simple-tabpanel-1 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-2 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-3 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-4 .MuiTypography-subtitle1 {
      padding-top: 5px;
      padding-bottom: 3px;
  }

  div#summary #simple-tabpanel-1 .MuiListItemText-primary,
  div#summary #simple-tabpanel-2 .MuiListItemText-primary,
  div#summary #simple-tabpanel-3 .MuiListItemText-primary,
  div#summary #simple-tabpanel-4 .MuiListItemText-primary {
      padding-left: 28px;
      padding-bottom: 3px;
  }

  div#summary #simple-tabpanel-1 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-2 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-3 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-4 .MuiSvgIcon-root {
      position: absolute;
      top: -1px;
  }
`

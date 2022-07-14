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
  
  th {
    white-space: nowrap;
  }

  #summary { background: #111 }

  #summary .MuiTableCell-body {
      padding: 5px;
  }
  div#summary .MuiGrid-container {
      margin-top: 0 !important;
  }

  div#summary .MuiGrid-container>.MuiGrid-grid-md-6 {
    flex-grow: 1;
    padding-left: 15px;
    padding-right: 15px;
    max-width: 100%;
  }

  div#summary #simple-tabpanel-1 *,
  div#summary #simple-tabpanel-2 *,
  div#summary #simple-tabpanel-3 *,
  div#summary #simple-tabpanel-4 *,
  div#summary #simple-tabpanel-5 *,
  div#summary #simple-tabpanel-6 * {
      padding: 0;
      margin: 0 !important;
      min-width: 0 !important;
  }

  div#summary #simple-tabpanel-1,
  div#summary #simple-tabpanel-2,
  div#summary #simple-tabpanel-3,
  div#summary #simple-tabpanel-4,
  div#summary #simple-tabpanel-5,
  div#summary #simple-tabpanel-6 {
      padding-top: 20px;
  }

  div#summary #simple-tabpanel-1 .MuiTypography-h6,
  div#summary #simple-tabpanel-2 .MuiTypography-h6,
  div#summary #simple-tabpanel-3 .MuiTypography-h6,
  div#summary #simple-tabpanel-4 .MuiTypography-h6,
  div#summary #simple-tabpanel-5 *,
  div#summary #simple-tabpanel-6 * {
      padding-top: 10px;
      padding-bottom: 3px;
  }

  div#summary #simple-tabpanel-1 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-2 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-3 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-4 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-5 .MuiTypography-subtitle1,
  div#summary #simple-tabpanel-6 .MuiTypography-subtitle1 {
      padding-top: 5px;
      padding-bottom: 3px;
  }

  div#summary #simple-tabpanel-1 .MuiListItemText-primary,
  div#summary #simple-tabpanel-2 .MuiListItemText-primary,
  div#summary #simple-tabpanel-3 .MuiListItemText-primary,
  div#summary #simple-tabpanel-4 .MuiListItemText-primary,
  div#summary #simple-tabpanel-5 .MuiListItemText-primary,
  div#summary #simple-tabpanel-6 .MuiListItemText-primary {
      padding-left: 15px;
      padding-right: 20px;
      padding-bottom: 3px;
  }

  div#summary #simple-tabpanel-1 .MuiListItemButton-root > div:not(.MuiListItemText-root),
  div#summary #simple-tabpanel-2 .MuiListItemButton-root > div:not(.MuiListItemText-root),
  div#summary #simple-tabpanel-3 .MuiListItemButton-root > div:not(.MuiListItemText-root),
  div#summary #simple-tabpanel-4 .MuiListItemButton-root > div:not(.MuiListItemText-root),
  div#summary #simple-tabpanel-5 .MuiListItemButton-root > div:not(.MuiListItemText-root),
  div#summary #simple-tabpanel-6 .MuiListItemButton-root > div:not(.MuiListItemText-root) {
      width: 24px !important;
  }

  div#summary #simple-tabpanel-5 .MuiListItemButton-root .MuiListItemText-root span > div,
  div#summary #simple-tabpanel-6 .MuiListItemButton-root .MuiListItemText-root span > div {
      display: none;
  }

  div#summary #simple-tabpanel-1 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-2 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-3 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-4 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-5 .MuiSvgIcon-root,
  div#summary #simple-tabpanel-6 .MuiSvgIcon-root {
      position: absolute;
      top: -1px;
  }

  div#summary #simple-tabpanel-1 .MuiCheckbox-root .MuiSvgIcon-root,
  div#summary #simple-tabpanel-2 .MuiCheckbox-root .MuiSvgIcon-root,
  div#summary #simple-tabpanel-3 .MuiCheckbox-root .MuiSvgIcon-root,
  div#summary #simple-tabpanel-4 .MuiCheckbox-root .MuiSvgIcon-root,
  div#summary #simple-tabpanel-5 .MuiCheckbox-root .MuiSvgIcon-root,
  div#summary #simple-tabpanel-6 .MuiCheckbox-root .MuiSvgIcon-root {
    position: absolute !important;
    top: 0px !important;
    left: 0px !important;
  }

  div#summary #simple-tabpanel-1 .MuiCheckbox-root,
  div#summary #simple-tabpanel-2 .MuiCheckbox-root,
  div#summary #simple-tabpanel-3 .MuiCheckbox-root,
  div#summary #simple-tabpanel-4 .MuiCheckbox-root,
  div#summary #simple-tabpanel-5 .MuiCheckbox-root,
  div#summary #simple-tabpanel-6 .MuiCheckbox-root {
    position: absolute !important;
    top: 0px !important;
    left: 0px !important;
  }

  div#summary #simple-tabpanel-5 .MuiListItemButton-root > div:first-child {
    padding: 0;
  }

  div#summary #simple-tabpanel-5 .MuiListItemButton-root .MuiListItemText-root span > div {
    display: none;
  }

  div#summary #simple-tabpanel-5 .MuiListItemButton-root .MuiListItemText-root span {
    padding-left: 20px;
  }

  div#summary #simple-tabpanel-6 .MuiListItemButton-root .MuiListItemText-root .MuiTypography-root * {
    padding: 0;
    margin: 0;    
  }

  div#summary #simple-tabpanel-6 .MuiListItemButton-root .MuiListItemText-root .MuiTypography-root:last-child {
    display: none;
  }

  .ethCheckbox svg {
    stroke: currentColor;
    stroke-opacity: 0.5;
    fill: none;
    stroke-width: 1;
  }

  .checkboxWithButtons button { display: none }
  .checkboxWithButtons:hover button { display: block }
`

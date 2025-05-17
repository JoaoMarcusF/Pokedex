import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #2e353b;
  }

  .App {
    text-align: center;
    padding: 1rem;
  }

  .pokedex {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(6, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  img {
    width: 96px;
    height: 96px;
  }
`;

export default GlobalStyle;

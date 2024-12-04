import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: {
        fontWeight: 600,
        fontSize: "2rem",
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.8rem",
      },
      h3: {
        fontWeight: 500,
        fontSize: "1.6rem",
      },
      h4: {
        fontWeight: 500,
        fontSize: "1.4rem",
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.2rem",
      },
      h6: {
        fontWeight: 500,
        fontSize: "1rem",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.875rem",
      },
    },
    // Add any other custom theme settings you need here
  });
  return (
    <EthProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </EthProvider>
    //
    //   <div id="App">
    //     <div className="container">
    //       <Intro />
    //       <hr />
    //       <Setup />
    //       <hr />
    //       <Demo />
    //       <hr />
    //       <Footer />
    //     </div>
    //   </div>
    //
  );
}

export default App;

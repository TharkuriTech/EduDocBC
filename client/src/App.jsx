import { EthProvider } from "./contexts/EthContext";
import Home from "./components/Home";
import SignIn from "./components/signin";
import Registration from "./components/Registration";
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
  });
  return (
    <EthProvider>
      <ThemeProvider theme={theme}>
        {/* <Home /> */}
        {/* <SignIn /> */}
        <Registration />
      </ThemeProvider>
    </EthProvider>
    
  );
}

export default App;

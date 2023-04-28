import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllData from "./pages/AllData";
import CreateSensor from "./pages/CreateSensor";
import CreateLocation from "./pages/CreateLocation"
import { Layout } from "./Components/Layout";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    secondary: purple
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <AllData />
            </Route>
            <Route path="/createSensor">
              <CreateSensor />
            </Route>
            <Route path="/createLocation">
              <CreateLocation />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

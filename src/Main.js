import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ProjectManagerNav from "./components/ProjectManagerNav/ProjectManagerNav";
import NotFound from './components/NotFound/NotFound';
import ProjectManagerContainer from './containers/ProjectManagerContainer';
import TaskManagerContainer from './containers/TaskManagerContainer';
import { lightTheme, darkTheme, GlobalStyles } from './themes';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
function Main() {
  const [theme, setTheme] = useState("dark")

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Router>
          <ProjectManagerNav
            themeToggler={themeToggler}
            theme={theme}
          />
          <Switch>
            <Route exact path='/' component={ProjectManagerContainer} />
            <Route path='/tasks' component={TaskManagerContainer} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
}

export default Main;
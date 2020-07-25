import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

import Home from '../components/Home';
import About from '../components/About';
import MyobAuth from '../components/MyobAuth';
import ServerTest from '../components/ServerTest';
import MyobTest from '../components/MyobTest';
import Header from '../components/Header';
//import Footer from '../components/Footer';

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};

const reload = () => window.location.reload();

class App extends React.Component {
  
  render(){
    return(
      <main>
          <ThemeProvider theme={newTheme}>
            <CSSReset />
              <Header/>
              <Switch>
                  
                    <Route path="/" component={Home} exact />
                    <Route path="/about" component={About} />
                    <Route path="/auth" component={MyobAuth} onEnter={reload}/>
                    <Route path="/server-test" component={ServerTest}/>
                    <Route path="/myob-test" component={MyobTest}/>
                    
              </Switch>
          </ThemeProvider>
       </main>
    )
  }
}

export default App;

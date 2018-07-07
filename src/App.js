import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Typography gutterBottom>none</Typography>
        <Typography variant="body1" gutterBottom>
          body1
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2
        </Typography>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default App;

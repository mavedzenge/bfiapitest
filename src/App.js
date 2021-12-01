import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://content-store.explore.bfi.digital/api/articles')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    var { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: { error.message }</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
              <div className="grid">
              {items.map(item => (
                <div className="grid-item" key={item.uuid}>
                  <div className="card">
                    <div className="card-content">
                      <h1 className="card-header">{ item.title }</h1>
                      <p className="card-text">{ item.summary }</p>
                      <button className="card-btn"><a href={item.url}>Read more...</a></button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
        </div>
        );
    }
  }
}

export default App;

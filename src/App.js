import React, { Component } from 'react';
import './App.css';



class App extends Component {

  state = {
    beerList: [],
    isLiked: [],
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const arr = [];
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => {
        data.map(() => {
          arr.push(0)
        })
        this.setState({
          beerList: data,
          isLiked: arr,
        })
      })
      .catch(error => console.log("oops, looks like we got an error: ", error));
  }

  handleClick = (index) => {
    const newArr = this.state.isLiked.map((item, newIndex) => {
      if (newIndex === index) {
        if (item === 1) {
          return 0;
        } else {
          return 1;
        }
      } else {
        return item;
      }
    })

    this.setState({
      isLiked: newArr,
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {
              this.state.beerList.map((obj, index) => {
                const label = this.state.isLiked[index] === 1 ? 'Unlike' : 'Like'
                return <li key={index}>
                  <img src={obj.image_url} alt={obj.name} />
                  <button onClick={() => this.handleClick(index)} value={this.state.isLiked}>
                    {label}</button>
                </li>
              })
            }
          </ul>

          }
        </header>
      </div>
    );
  }
}

export default App;

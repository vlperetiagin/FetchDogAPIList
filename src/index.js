import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    images: [],
    imagesLoading: false
  };
  componentDidMount() {
    console.log("DidMount");
  }
  componentDidUpdate() {
    console.log("DidUpdate", this.state);
  }
  render() {
    console.log("render");
    return (
      <div className="app">
        <button
          className="app-fetch-button"
          onClick={this.fetchDoc}
          disabled={this.state.imagesLoading}
        >
          {this.state.imagesLoading ? "wait pls" : "TAP to FETCH"}
        </button>
        <div className="app-doggies">
          {this.state.images.map((image, index) => {
            return (
              <div key={image} className="app-doggies-item">
                <img className="app-doggies-item-img" src={image} alt={image} />
                <div className="app-doggies-item-index">
                  Index is {index + 1}
                </div>
                <a href={image} target="blank" className="app-doggies-item-url">
                  {image}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  fetchDoc = () => {
    this.setState({ imagesLoading: true });
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://dog.ceo/api/breeds/image/random");
      xhr.send();
      xhr.onload = () => {
        if (xhr.status !== 200) reject(xhr.statusText);
        else resolve(xhr.responseText);
      };
    })
      .then(result => this.modifyState(result))
      .catch(this.handleError);
  };
  modifyState = data => {
    const objData = JSON.parse(data);
    this.setState({
      images: [...this.state.images, objData.message],
      imagesLoading: false
    });
  };
  handleError = err => {
    this.setState({
      imagesLoading: false
    });
    alert(err);
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

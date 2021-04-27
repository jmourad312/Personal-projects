import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
    address: {
      street: "st1",
    },
    imageURL: "https://picsum.photos/200",
    tags:["t1","t2","t3"]
  };

  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  // styles={
  //   color:"red",
  //   fontSize: 50,
  // }
  renderTags(){
    if(this.state.tags.length ===0) return <p>No Tags</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>  
    ); 
  }

  handleIncrement = (id) => {
    console.log(id);
    this.setState({
      count: this.state.count+1
    })
  }
  render() {
    return (
      <React.Fragment>
        {/* <img src={this.state.imageURL} alt="" /> */}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.handleIncrement({ID:1})}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {/* {this.state.tags.length===0 && "Please create a new tag"} */}
        {/* {this.renderTags()} */}
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += (this.state.count === 0) ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}
 
export default Counter;
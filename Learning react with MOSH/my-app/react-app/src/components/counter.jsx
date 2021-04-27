// import React, { Component } from "react";

// export default class Counter extends Component {
//   state = {
//     count: 0,
//     tags: [],
//     //   imgURL:'https://picsum.photos/200'
//   };
//   // styles = {
//   //     fontSize:50,
//   //     fontWeight:'bold'
//   // }
//   renderTages(){
//       if (this.state.tags.length === 0) {
//           return <p>There are no tags!</p>
//       }
//       return (
//         <ul>
//           {this.state.tags.map((tag) => (
//             <li key={tag}>{tag}</li>
//           ))}
//         </ul>
//       );
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {/* <img src={this.state.imgURL} alt=""/> */}
//         {/* <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
//         <button className="btn btn-secondary btn-sm">Increment</button> */}
//         <div>
//             {this.state.tags.length === 0 && 'please create a new tag'}
//             {this.renderTages()}
//         </div>
//       </React.Fragment>
//     );
//   }

// //   getBadgeClasses() {
// //     let classes = "badge m-2 badge-";
// //     classes += this.state.count === 0 ? "warning" : "primary";
// //     return classes;
// //   }

// //   formatCount() {
// //     const { count } = this.state;
// //     return count === 0 ? "Zero" : count;
// //   }
// }

import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
    address: {
      street: "st1",
    },
    imageURL: "https://picsum.photos/200",
  };

  // styles={
  //   color:"red",
  //   fontSize: 50,
  // }
  render() {
    return (
      <React.Fragment>
        {/* <img src={this.state.imageURL} alt="" /> */}
        <span className="badge badge-primary m-2">{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">Increment</button>
      </React.Fragment>
    );
  }
  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}
 
export default Counter;
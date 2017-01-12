import React from 'react';

export default class ContactInfo extends React.Component { // App.js파일에 맨마지막 문장 export 부분이랑 이거랑 똑같은거임 걍
  render() {
    return(
          <div onClick={this.props.onClick}> {this.props.contact.name} </div>
    );
  }
}

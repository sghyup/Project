import React from 'react';

export default class ContactDetails extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          isEdit: false,
          name: '',
          phone: ''
      };

      this.handleToggle = this.handleToggle.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleToggle() {
      if(!this.state.isEdit) {
          this.setState({
              name: this.props.contact.name,
              phone: this.props.contact.phone
          });
      } else {
          this.handleEdit();  // 토글이 true이면 (true에서 false로 전환될떄를 말함 ok를 눌럿다는 것임)
      }

      this.setState({
          isEdit: !this.state.isEdit
      });

      console.log(this.state.isEdit);
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  handleEdit() {
      this.props.onEdit(this.state.name, this.state.phone);
  }

  handleKeyPress(e) {
      if(e.charCode===13) {
          this.handleToggle();
      }
  }

  render() {
    const details = (
        <div>
            <h2>Selected</h2>
            <p>{this.props.contact.name}: {this.props.contact.phone}</p>
        </div>
    );
    const edit = (
        <div>
            <p>
                <input
                  type = "text"
                  name = "name"
                  placeholder = "name"
                  value = {this.state.name}
                  onChange = {this.handleChange}
                />
            </p>
            <p>
                <input
                  type = "text"
                  name = "phone"
                  placeholder = "phone"
                  value = {this.state.phone}
                  onChange = {this.handleChange}
                  onKeyPress = {this.handleKeyPress}
                />
            </p>
        </div>
    );
    const view = this.state.isEdit ? edit : details;
    const blank = (<h2>Not Selected</h2>);

    return (
        <div>
            <br/>
            {this.props.isSelected ? view : blank}
            <p>
                <button onClick={this.handleToggle}>
                    {this.state.isEdit ? 'OK' : 'Edit'}
                 </button>
                <button onClick={this.props.onRemove}> Remove </button>
            </p>
        </div>
    );
  }
}

// 항목 선택을 안했을땐 기본값이 없으니 오류가 나는데 그걸 방지하기위해 디폴트props를 설정해두면 된다.
ContactDetails.defaultProps = {
  contact: {
      name: '',
      phone: ''
  },
  onRemove: () => { console.error('onRemove not defined'); },
  onEdit: () => { console.error('onEdit not defined'); }
};

ContactDetails.propTypes = {
    contact: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    onEdit: React.PropTypes.func
};

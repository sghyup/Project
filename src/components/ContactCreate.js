import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlekeyPress = this.handlekeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };

        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        });

        this.nameInput.focus();
    }

    handlekeyPress(e) {
        if(e.charCode===13) { // 13은 엔터
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        type = "text"
                        name = "name"
                        placeholder = "name"
                        value = {this.state.name}
                        onChange = {this.handleChange}
                        ref = {(ref) => { this.nameInput = ref }}
                    />
                    <input
                        type = "text"
                        name = "phone"
                        placeholder = "phone"
                        value = {this.state.phone}
                        onChange = {this.handleChange}
                        onKeyPress = {this.handlekeyPress}
                    />
                </p>
                <button onClick = {this.handleClick}> Create </button>
            </div>
        ) /*리엑트는 id대신에 ref를 name input에 ref를 선언한거처럼 저렇게 사용해야한다. 이걸 참조해서 저위에 처럼 돔에 접근해서 focus()를 줄 수 있다.*/
    }
}

ContactCreate.propTypes = {
    onCreate: React.PropTypes.func // 함수타입이다
};

ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate not defined'); }
};

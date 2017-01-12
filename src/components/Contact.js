import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
  // 깃테스트
  constructor(props) {
    super(props);
    this.state= {
      selectedKey: -1,
      keyword:'',
      contactData: [
        {name:'Hyup', phone: '010-0000-0001'},
        {name:'Byeung', phone: '010-0000-0002'},
        {name:'Mingyu', phone: '010-0000-0003'},
        {name:'Hyeonju', phone: '010-0000-0004'}
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() { // component가 Dom위에 생기기 전에 실행되는 함수
      const contactData = localStorage.contactData; // 페이지가 첫 실행되었을 때 현재 페이지의 localStorage 상태값에 데이터가 있다면 그걸 불러와서 setState를 통해서 기본 this.state값을 (적용)바꿔줘야한다
      if(contactData) {
          this.setState({
              contactData: JSON.parse(contactData)
          });
      }
  }

  componentDidUpdate(prevProps, prevState) { // state가 업데이트가 될 때 마다 실행되는 메서드
      // contactData가 이전값이랑 지금값이랑 다르다면(한마디로 업데이트가 됬으면!) localStorage에 지금 값을 저장하도록. 아래소스
      if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
          localStorage.contactData = JSON.stringify(this.state.contactData);
      }
  }

  handleChange(e) {
      this.setState({
          keyword: e.target.value
      });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key, 'is selected');
  }

  handleCreate(contact) {
      this.setState({
          contactData: update(this.state.contactData, { $push: [contact] })
      });
  }

  handleRemove() { // 파라메터 필요없다 selectedKey: -1, 이값을 삭제할때 사용 할 것이라서 일단..
      if(this.state.selectedKey < 0) {
          return;
      }
      this.setState({
          contactData: update(this.state.contactData,
              { $splice: [[this.state.selectedKey, 1]] } // selectedKey번째 부터 1개의 데이터를 삭제 하겠다는 의미
          ),
          selectedKey: -1
      });
  }

  handleEdit(name, phone) { // 이름과 전화번호를 수정할수 있게 할것이므로.
      this.setState({
          contactData: update(this.state.contactData,
              {
                  [this.state.selectedKey]: {
                      name: { $set: name },
                      phone: { $set: phone }
                  }
              }
          )
      });
  }


  render() {
    const mapToComponent = (data) => { // const: 프로그램이 실행되면서 변하지않는 값을 지정하는 상수 es6문법
      data.sort();
      data = data.filter(
        (contact) => {
            return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
        }
      );

      return data.map((contact,i) => { // contact: data배열의 각 데이터임, i: data의 인덱스로 보면됨
        return (<ContactInfo
                  contact={contact}
                  key={i}
                  onClick={() => this.handleClick(i)} />
              ); // 결론적으로 contact는 위에 jsonArray안의 json하나하나{} 뭉탱이라 보면되고, i는 그 순서 (key사용이유: 각줄마다 identity 주기위함)
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
            name="keyword"
            placeholder="Serch"
            value={this.state.keyword}
            onChange={this.handleChange}
        />
        <div>{mapToComponent(this.state.contactData)}</div>
        <ContactDetails
            isSelected = {this.state.selectedKey != -1}
            contact = {this.state.contactData[this.state.selectedKey]}
            onRemove = {this.handleRemove}
            onEdit = {this.handleEdit}
        />
        <ContactCreate
            onCreate = {this.handleCreate}
        />
      </div>
    );
  }
}

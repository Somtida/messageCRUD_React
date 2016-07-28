var Welcome = React.createClass({
  render: function(){
    let {greeting, info} = this.props;
    console.log('this.props: ', this.props);
    return (
      <div>
        <h1>{greeting}</h1>
        <p>{info}</p>
      </div>
    )
  }
})

var MessageForm = React.createClass({
  getInitialState: function(){
    return {
      message: ''
    }
  },
  onAddMessage: function(){
    // this.props.addMessage(this.state.message);
    let {addMessage} = this.props;
    let message = this.state.message;
    addMessage(message);
    this.setState({message: ''});
  },
  render: function(){
    return (
      <div>
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value})}
        />
      <button className="btn btn-primary" onClick={this.onAddMessage}>Add Message</button>
      </div>
    )
  }
})


var Message = React.createClass({
  getInitialState: function(){
    return{
      text: this.props.message,
      editing: false

    }
  },
  render: function(){
    let {id, deleteMessage} = this.props
    let message = this.state.editing ?
      <input value={this.state.text} onChange={e => this.setState({ text: e.target.value})}/> :
      this.state.text;
    return (
      <li>
        {message}
        <button className="btn btn-danger" onClick={() => deleteMessage(id)}><i className="fa fa-trash"></i></button>
        <button className="btn btn-warning" onClick={() => this.setState({ editing: !this.state.editing})}>{this.state.editing ? 'Confirm' : 'Edit'}</button>
      </li>
    )
  }
})


var Root = React.createClass({

  getInitialState: function(){
    return{
      count: 0,
      message: [],
      text: ''
    }
  },
  addMessage: function(message){
    console.log('message: ', message);
    let newMessage = {
      message: message,
      id: uuid()
    }
    // let newArray = this.state.message.slice();
    // newArray.push(message);
    // this.setState({ message: newArray })
    this.setState({ message: this.state.message.concat(newMessage)})
  },
  deleteMessage: function(id){
    console.log('delete id: ',id);
    this.setState({message: this.state.message.filter(message => message.id != id)})
  },

  render: function(){
    // console.log(this.state)
    let message = {
      greeting: "hello world",
      info: "Let's count stuff"
    }


    // console.log(this.state);
    let messages = this.state.message.map((message, idx) => {

      return <Message key={message.id} {...message}  deleteMessage={this.deleteMessage}/>

    })
    // let editText = thi
    return(
      <div>
        <Welcome {...message}/>
        <MessageForm addMessage={this.addMessage} />


      <ul>
        {messages}
      </ul>

      </div>
    )
  }
})

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

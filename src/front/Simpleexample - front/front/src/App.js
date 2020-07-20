import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import logo from './logo.svg';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {

  state = {
    test: null,
    isLoggedIn: false
  }

  componentDidMount() {
    console.log('Component did mount');
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs'
    this.client = new Client();

    this.client.configure({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
      onConnect: () => {
        console.log('Connected');

        this.client.subscribe('/topic/greetings', message => {
          this.setState({test: JSON.parse(message.body).content}); //JSON.parse(message.body).content
          console.log(message);
         
        });
      },
    });
  }

  clickHandler = () => {

    if (this.state.isLoggedIn) {
   this.client.publish({destination: '/app/hello', body: JSON.stringify({'name': this.state.value}) }); //this.state.value //JSON.stringify({'name': this.state.value})
  }
  console.log('onConnect');
  console.log(this.state.body);
    
  }

  clickDisconnect = () => {
    this.setState({isLoggedIn: false});
    this.client.deactivate();
  }

  clickConnect = () => {
    this.setState({isLoggedIn: true})
    this.client.activate();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            <InputText id="in" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
            <Button className="p-button-secondary" onClick={this.clickHandler} label="Send" iconPos="right" />
            <Button className="p-button-secondary" onClick={this.clickConnect} label="Connect" iconPos="right" />
            <Button className="p-button-secondary" onClick={this.clickDisconnect} label="Disconnect" iconPos="right" />
          </p>
          <p>{this.state.test}</p>
          
        </header>
      </div>
    );
  }
}

export default App;
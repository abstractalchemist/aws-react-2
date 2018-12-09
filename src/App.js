import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from '@aws-amplify/auth'
import { Credentials } from '@aws-amplify/core'
import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify'
import awsconfig from './aws-exports'
import { from } from 'rxjs'
import { flatMap } from 'rxjs/operators'
// import configuration
Auth.configure(awsconfig)
API.configure({
   endpoints: [
      {
         name:'api5ff476c6',
         endpoint:'https://nnqquz0b0g.execute-api.us-west-2.amazonaws.com/Prod',
         region:'us-west-2'
      }
   ]
})
class App extends Component {
   
   constructor(props) {
      super(props)
      this.state = {}
   }
 
   getapps() {
      console.log("getting current apps")
      from(Credentials.get())
         .subscribe(
            data => console.log(data),
            error => alert(error))
      from(Auth.currentUserCredentials())
         .subscribe(
            data => console.log(data),
            error => alert(error))
      from(Auth.currentSession())
         .pipe(
            flatMap(session => {
               return from(API.get('api5ff476c6', '/applications', {
               }))
            })
         )
         .subscribe(
            data => {
               console.log(data)
               this.setState({ apps: data })
            },
            error => {
               alert("Error in app call")
               alert(error)
            },
            _ => {
               console.log('apps complete')
            })
      
   }
 
   render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <button onClick={this.getapps.bind(this)}>
            Trigger Application Get
            </button>
          </header>
        </div>
      );
   }
}

export default withAuthenticator(App)

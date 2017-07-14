import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {createMessageConnector,setMessageConnectorURL} from "global-input-message";
import QRCode from "qrcode.react";

import {config} from "../config";





export default class SimpleInput extends Component {

    getMetadata(){
      return  [
        {
          name:"Content",
          value:this.state.content
        },
         {
           name:"Submit",
           type:"action"
         }
      ];
    }
    getProcessors(){
      return [
          this.setContent.bind(this),
          this.submit.bind(this)
        ];
    }
    getQRData(){
      return JSON.stringify(this.connector.getConnectionData(this.getMetadata()));
    }


    connectToMessenger(){
            this.connector=createMessageConnector();

            const dataprocessors=this.getProcessors();
            var options={
              url:config.baseURL,
              onMessageReceived:function(message){
                console.log("setting:"+JSON.stringify(message));
                dataprocessors[message.data.index](message.data.value);
              }
            }
            this.connector.connect(options);
  }
  disconnectFromMessenger(){
    this.connector.disconnect();
  }


 constructor(props){
    super(props);
    this.state={content:""};
 }
 submit(){
   this.props.history.push("/simpleinput-submit");
 }
 setContent(content){
   console.log("content to be set:"+content);

   this.setState(Object.assign({}, this.state,{content}));
 }
 componentWillMount(){
     this.connectToMessenger();
 }

 componentWillUnmount(){
     this.disconnectFromMessenger();
 }


  render() {
    const linenumber=4;
    const content=this.state.content;
    console.log(" so the content in the state:"+content);
    const qrcontent=this.getQRData();
    return (
      <div>
      <div style={{display:"flex"}}>

          <h1>Simple Input Example</h1>
            <div style={{margin:5}}>
              <QRCode value={qrcontent}/>
            </div>


      </div>

        Content:
        <textarea rows={linenumber} cols="50" onChange={(evt) => {
              this.setContent(evt.target.value);
          }} value={content}/>
          <button onClick={(evt) => {
               this.submit();
           }}>Submit</button>

      </div>
    );
  }
}

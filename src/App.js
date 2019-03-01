import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/general.css";
import "./css/loader.css";
import "./css/print.css";
import "./css/input.css";
import "./css/simpleAnimate.css";
import {pagelinks} from "./configs";

import HomeScreen from "./home";
import {DevelopersScreen} from "./developers";




import ContentTransferScreen from "./content-transfer-screen";
import GameControlScreen from "./game-game-control-screen";
import SecondScreenHowItWorks from "./second-screen-how-it-works";
import TransferFormDataScreen from "./transfer-form-data-screen";




import {QRCodePrinting} from "./qr-printing";


import {applicationPathConfig} from "./page-templates";

import {PrivacyScreen} from "./privacy";
import {ContactFormHome} from "./contact-form";
import MediaPlayerScreen from "./media-player-screen";

import {MessageSender} from "./send-message";


export default class App extends Component{


  render(){

    return (

      <Router>

        <div className="topContainer">
            <Route  path={pagelinks.home.link} exact component={HomeScreen}/>
            <Route  path={pagelinks.home.link2} exact component={HomeScreen}/>
            <Route  path={pagelinks.app.link}  component={HomeScreen}/>
            <Route  path={pagelinks.app.link2}  component={HomeScreen}/>

            <Route  path={ContentTransferScreen.pagePath}  component={ContentTransferScreen}/>
            <Route  path={applicationPathConfig.qrPrinting.menu.link}  component={QRCodePrinting}/>
            
            <Route  path={pagelinks.platform.link}  component={DevelopersScreen}/>
            <Route  path={pagelinks.platform.link2}  component={DevelopersScreen}/>
            <Route  path={pagelinks.platform.link3}  component={DevelopersScreen}/>


           <Route  path={applicationPathConfig.about.contact.menu.link}  component={ContactFormHome}/>



            <Route  path={applicationPathConfig.about.privacy.menu.link}  component={PrivacyScreen}/>

          <Route  path={applicationPathConfig.videoPlayer.menu.link}  component={MediaPlayerScreen}/>

            <Route  path={applicationPathConfig.gameExample.menu.link}  component={GameControlScreen}/>
            <Route  path={applicationPathConfig.sendMessage.menu.link}  component={MessageSender}/>

            <Route path={SecondScreenHowItWorks.pagePath} component={SecondScreenHowItWorks}/>
            <Route path={TransferFormDataScreen.pagePath} component={TransferFormDataScreen}/>
        </div>


      </Router>
      )
    }
}

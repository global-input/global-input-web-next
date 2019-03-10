import React, {Component} from 'react'

import {genericUtil} from "../../utils";


import {TopMenu,BookMark} from "../../components";


import {styles} from "./styles";

import {applicationPathConfig} from "../../page-templates";

import HeaderSection from "./header-section";
import TopHeaderSection from "../../top-header-section";


import HowItWorks from "./how-it-works";
import FooterSection from '../../footer-section';
import CardSection from "./cards-section";
import FeaturesSection from './features-section';
import OldContent from './OldContent';

export  default class HomeScreen extends Component {
    static pagePath="/"
    static pagePaths=["/index.html","/global-input-app/app","/global-input-app/about"]
    constructor(props){
      super(props);
      this.onWindowResize=this.onWindowResize.bind(this);
    }
     componentDidMount() {
         window.addEventListener("resize", this.onWindowResize);

         genericUtil.processQueryParameters(this.props);

     }


     componentWillUnmount() {
         window.removeEventListener("resize", this.onWindowResize);
     }
     onWindowResize(){
        this.forceUpdate();
     }

render() {

    return (
          <div style={styles.content}>

            <TopHeaderSection menus={applicationPathConfig.menus} selected={this.props.selected}/>

            <div style={styles.firstHalf.get()}>

                <HeaderSection history={this.props.history}/>

                <CardSection/>
                <HowItWorks/>
            </div>
            <FeaturesSection/>







          <BookMark bookmark={applicationPathConfig.videoPlayer.menu.bookmark}/>




<FooterSection/>


          </div>





            );
  }

}

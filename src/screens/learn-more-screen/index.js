import React from 'react';
import {Link} from 'react-router-dom'

import {styles,images} from './styles';
import TopHeaderSection from "../../top-header-section";


import SideMenu from  "../../components/side-menu";

import ClientSideOnlySolution from './ClientSideOnlySolution';
import DeviceToDeviceCommunication from './DeviceToDeviceCommunication';
import PortableEncryptedStorage from './PortableEncryptedStorage';

import WatchIntroduction from "./watch-introduction";
const sideMenus=[ClientSideOnlySolution.menu, DeviceToDeviceCommunication.menu,
  PortableEncryptedStorage.menu];

export default class LearnMoreScreen extends React.Component{
  

  constructor(props){
    super(props);
    this.onWindowResize=this.onWindowResize.bind(this);
  }
   componentDidMount() {
       window.addEventListener("resize", this.onWindowResize);

   }


   componentWillUnmount() {
       window.removeEventListener("resize", this.onWindowResize);
   }
   onWindowResize(){
      this.forceUpdate();
   }

  render(){
      return(
        <div style={styles.container}>
            <TopHeaderSection/>
            <SideMenu menus={sideMenus}>
              <div style={styles.scrollContent}>
                  <WatchIntroduction/>
                  <ClientSideOnlySolution/>
                  <DeviceToDeviceCommunication/>
                  <PortableEncryptedStorage/>
              </div>
            </SideMenu>
        </div>
      )

  }


}

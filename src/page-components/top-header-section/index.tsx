
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { screenMedia, styleMatchingScreenSize } from "../../app-layout/screen-media";
import useWindowSize from '../../app-layout/use-window-size';


import { config } from "../../configs";
import appIcon from './images/app-icon.png';
import companyIcon from './images/company-icon.png';
import menuSymbol from './images/menu-symbol.svg';

const appTitle = config.id === 'iterative' ? 'Iterative Solution Limited' : 'Global Input App';
const appLogo = config.id === 'iterative' ? companyIcon : appIcon;

var menus = [{
  link: config.paths.home.path,
  linkText: "HOME"
}, {
  link: config.paths.privacy.path,
  linkText: "PRIVACY POLICY"
}, {
  link: config.paths.contactUs.path,
  linkText: "CONTACT US"
}, {
  link: config.paths.getAppScreen.path,
  linkText: "GET IT FREE"
}];

interface Props {
  selected?: string | null;
}

interface Menu {
  link: string;
  linkText: string;
}

const getMenuItemStyle = (hover, isSelected) => {
  if (hover) return styles.menuItem.get('hover');
  if (isSelected) return styles.menuItem.get('selected');
  return styles.menuItem.get();
};


export const TopHeaderSection: React.FC<Props> = ({ selected }) => {
  const [menuPressed, setMenuPressed] = useState(false);
  const [hover, setHover] = useState<Menu | null>(null);
  const bgs = screenMedia.biggerThan(600);
  const containerStyle = bgs ? styles.topNavContainer.desktop : styles.topNavContainer.mobile
  const navStyle = bgs ? styles.topNav.desktop : styles.topNav.mobile
  const titleStyle = bgs ? styles.appDesktopTitle : styles.appMobileTitle;
  const [width] = useWindowSize();


  console.log("render menu:" + width);
  useEffect(() => {
    setMenuPressed(false);
  }, [width]);

  const hideMenu = () => setMenuPressed(false);
  const renderedMenu = menus.map((menu, index) => (
    <Link to={menu.link} style={getMenuItemStyle(hover === menu, selected && menu.link === selected)} key={`${index}_${menu.link}_${menu.linkText}`}
      onMouseEnter={() => setHover(menu)} onMouseLeave={() => setHover(null)} data-testid="top-menu-item">{menu.linkText}</Link>));



  return (
    <div style={containerStyle} className="noprint">
      <div style={navStyle}>
        {(!bgs) && (
          <div style={styles.mobileMenu}>
            <a style={styles.mobileMenuIcon} href="#b" data-testid="mobile-to-close-menu" onClick={() => {
              setMenuPressed(!menuPressed);
            }}>
              {menuPressed ? '☓' : (<img src={menuSymbol} alt="Menu" />)}
            </a>

          </div>
        )}
        <img src={appLogo} style={styles.logo} alt="App Logo" />
        <div style={styles.appTitleContainer}>
          <div style={titleStyle}>{appTitle}</div>
        </div>
        {bgs && (
          <div style={styles.menuItemsDesktop}>
            {renderedMenu}
          </div>
        )}
      </div>

      {(!bgs) && menuPressed && (
        <div style={styles.menuItemsMobile}>
          {renderedMenu}
          <a onClick={hideMenu} href="#b" >
            <div style={styles.mobileMenuOverlay}>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};
const fontFamily = "Tisa-Sans-Pro, Elysio-Light, Helvetica, Arial, sans-serif";
export const styles = {
  topNavContainer: {
    desktop: {
      display: "flex",
      flexDirection: "column" as 'column',
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      position: "fixed" as 'fixed',
      zIndex: 100,
      top: 0,
      left: 0,
      paddingTop: 5,
      paddingRight: 50,
      borderBottomColor: '#EEEEEE',
      borderBottomStyle: "solid" as 'solid',
      borderBottomWidth: 1,
      boxShadow: "0 -5px 5px -5px #333",
      backgroundColor: "white",
    },
    mobile: {
      display: "flex",
      flexDirection: "column" as 'column',
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      position: "fixed" as 'fixed',
      zIndex: 100,
      top: 0,
      left: 0
    }

  },

  topNav: {
    desktop: {
      paddingRight: 30,
      position: "static" as 'static',
      paddingTop: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row" as 'row',
      justifyContent: "space-between",
      alignItems: "center",
    },
    mobile: {
      paddingRight: 30,
      paddingTop: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row" as 'row',
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      borderBottomColor: '#EEEEEE',
      borderBottomStyle: "solid" as 'solid',
      borderBottomWidth: 2,


    }

  },
  appTitleContainer: {
    marginLeft: 0
  },

  appDesktopTitle: {
    fontSize: 20,
    color: "#5291CD",
    whiteSpace: "nowrap" as 'nowrap',
    fontWeight: 300,
    paddingLeft: 10,
    fontFamily: fontFamily
  },
  appMobileTitle: {
    fontSize: 20,
    color: "#5291CD",
    whiteSpace: "nowrap" as 'nowrap',
    fontWeight: 300,
    fontFamily: fontFamily,

  },
  appVersion: {
    fontFamily: fontFamily,
    fontSize: 12,
    color: "#5291CD",
    marginLeft: 10
  },

  mobileMenu: {

    marginLeft: 20
  },
  mobileMenuIcon: {
    fontWeight: 'normal' as 'normal',
    fontSize: 40,
    color: "#5291CD",
    fontStyle: 'normal',
  },
  mobileMenuOverlay: {
    width: "100%",
    height: 1000
  },
  menuItemsDesktop: {
    display: "flex",
    flexDirection: "row" as 'row',
    right: 0,
    top: 24,
    width: "100%",
    justifyContent: "flex-end",
    paddingRight: "10vw"
  },
  menuItemsMobile: {
    display: "flex",
    flexDirection: "column" as 'column',
    backgroundColor: "rgba(0,0,0,0)",
    width: "100%",


  },


  menuItem: {
    get: styleMatchingScreenSize,
    default: {
      float: "left",
      display: "block",
      textAlign: "center",
      padding: "8px 16px",
      textDecoration: "none",
      fontSize: 15,
      marginBottom: 0,
      color: "#5291CD",
      whiteSpace: "nowrap",
      fontWeight: 300
    },
    desktop: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      marginBottom: 10,
      fontSize: 12,
      color: "#5291CD"
    },
    smallScreen: {
      fontSize: 15,
    },

    mobile: {
      textAlign: "left",
      backgroundColor: "#FFFFFF",
      borderBottomColor: '#BBBBBB',
      borderBottomStyle: "solid",
      borderBottomWidth: 1
    },
    selected: {
      color: "#5291CD",
      fontWeight: 500
    },
    hover: {
      color: "#66ccff",
      fontWeight: 300,
      textDecoration: "underline"
    }
  },
  content: {
    position: "absolute",
    marginTop: 90,
    width: "100%",
    padding: 20
  },

  logo: {
    maxWidth: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
    marginTop: 4
  }

};
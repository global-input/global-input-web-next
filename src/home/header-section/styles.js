import {styleMatchingScreenSize} from "../../styles";

export var styles={

  rightImage:{
     default:{
            position:"absolute",
            right:0,
            maxWidth: "60%",
            height: "auto",
            marginRight:10,
          },
      mobile:{
        position:"static",
        maxWidth: "100%",
        height: "auto",
        marginTop:30
      },
      get:styleMatchingScreenSize
  },


  headerSection:{
      get:styleMatchingScreenSize,
      default:{
              height:530,
              marginTop:"5vw",
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              alignItems:"flex-start",
              color:"white",
              width:"100%",
              zIndex:50,
              marginBottom:30              
      },
      mobile:{
        justifyContent:"flex-start",
      }

  },


  title:{
    default:{
      fontSize:"3vw",
      marginLeft:10,
    },
    mobile:{
      fontSize:"6vw",
      marginLeft:30,
    },
    get:styleMatchingScreenSize

  },
  listContent:{
    default:{
      marginLeft:30,
      fontSize:"2vw",
    },
    smallScreen:{
      fontSize:"4vw",
    },
    mobile:{
      fontSize:"5vw",
      marginLeft:10,
    },
    bigScreen:{
      fontSize:26,
    },
    get:styleMatchingScreenSize

  },

  appSelection:{
    default:{
          maxWidth: "50%",
        },
    mobile:{
      maxWidth: "100%",
    },
    get:styleMatchingScreenSize

  },
  appDescription:{
      default:{
        paddingBottom:10,
        fontSize:"2vw",
      },
      smallScreen:{
        fontSize:"4vw",
      },
      mobile:{
        fontSize:"4.5vw",
        marginLeft:10,
        marginRight:10
      },
      bigScreen:{
        fontSize:26,
      },
      get:styleMatchingScreenSize
  },
  watchVideoText:{
      default:{
          color:"white",

          fontSize:20,
          marginLeft:80,
          whiteSpace:"nowrap"

      },
      hover:{
        color:"white",
        boxShadow:"0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
        fontSize:20,
        marginLeft:80,
        whiteSpace:"nowrap"
      }
  },
  appDownload:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      width:"100%",


  },
  appStoreImage:{
    marginLeft:10
  }

};

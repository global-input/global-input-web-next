
let screeMedia={
  narrawScreen:null,
  narrow:function(){
      if(!this.narrawScreen){
        this.narrawScreen=window.matchMedia(`(min-width: 800px)`)
      }
      return this.narrawScreen.matches;
  },
};
var styleWithNarrow=function(){
  if(screeMedia.narrow()){
       return this.desktop;
  }
  else{
    return this.mobile;
  }
}


export var styles={

  rightImage:{
     desktop:{
            position:"absolute",
            right:0,
            maxWidth: "60%",
            height: "auto",
            marginRight:10,
          },
      mobile:{
        maxWidth: "100%",
        height: "auto",
      },
      get:styleWithNarrow
  },


  headerSection:{
      desktop:{
              height:530,
              paddingTop:80,
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              alignItems:"flex-start",
              color:"white",
              width:"100%",
              zIndex:50
      },
      mobile:{

        paddingBottom:50,
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        color:"white",
        width:"100%",
        zIndex:100,

      },
      get:styleWithNarrow
  },


  title:{
    desktop:{
      color:"white",
      fontSize:"3vw",
      marginLeft:10,
    },
    mobile:{
      color:"white",
      fontSize:30,
      marginLeft:30,
    },
    get:styleWithNarrow


  },
  listContent:{
      marginLeft:30,
      color:"white",
      fontSize:"20",

  },

  appSelection:{
    desktop:{
          maxWidth: "50%",
        },
    mobile:{
      maxWidth: "100%",
    },
    get:styleWithNarrow

  },
  appDescription:{
      paddingBottom:10
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
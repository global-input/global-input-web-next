const START_PAUSE_BUTTON_STATUS={
    CAN_START:0,
    CAN_PAUSE:1
}

const gameExampleConfig={
    START_PAUSE_BUTTON_STATUS,
    title:"Mobile Input for Device Applications",
    appSubtitle:"Device Applications",
    menu:{
        link:"/global-input-app/game-example",
        linkText:"Game Example",
        backLink:"/?scrollTo=gameExample",
        bookmark:"gameExample"
    },
    content:["The personal mobile device is becoming increasingly important in our daily lives and the ability to use these devices for business applications is becoming more widespread. However, the cost of developing a separate mobile application and the associated server-side integration for each business application is quite significant.",
    "The Global Input App offers a single mobile app solution for multiple device and web applications. Existing IoT, Smart TV, and web applications can be extended in an add-on manner by defining the mobile UI elements and callback functions for receiving mobile events within the application itself. This is done declaratively in an add-on manner without affecting the business logic and system architecture. The communication between the Global Input App and the application is secured with end-to-end encryption.",
    "Press the following “start” to see an example of mobile control on an JavaScript application."],

    advert:{
            duration:8000,
            items:[{
              title:"Universal Device Input App",
              content:["Mobile Control without Mobile Development",
                      "Single Mobule Application for Multiple Device Applications"],
              className: "animateLeftRight"
            },{
              title:"Single Mobile App Solution",
              content:["Mobile Input & Control for Device and Web Applications",
                      "Second Screen Experience for Media Applications"],
            },{
              title:"Mobile Input & Mobile Control without Mobile Development",
              content:["Enabling IoT, Smart TV and Web Applications",
                       "Single Mobile App Solution for Multiple Devices"],
            }]

    },

    form:{
        title:"Device Control Example",
        upButton:{
          type:"button",
          viewId:"row1",
          id:"upButton",
          icon:"up"
        },
        leftButton:{

          type:"button",
          viewId:"row2",
          id:"leftButton",
          icon:"left"
        },
        rightButton:{

          type:"button",
          viewId:"row2",
          id:"rightButton",
          icon:"right"
        },
        downButton:{
          type:"button",
          viewId:"row3",
          id:"downButton",
          icon:"down"
        },
        backButton:{
          label:"Disconnect",
          icon:"disconnect",
          type:"button",
          viewId:"footer",
        },
        startPauseButton:{
          label:"Start",
          type:"button",
          viewId:"footer",
          value:0,
          id:"startPauseButton",
          options:[{value:START_PAUSE_BUTTON_STATUS.CAN_START,label:"Start",icon:"play"},{value:START_PAUSE_BUTTON_STATUS.CAN_PAUSE,label:"Pause",icon:"pause"}]
        },
        newGameButton:{
            label:"New Game",
            type:"button",
            viewId:"footer",
            icon:"reset",
            id:"newGameButton",
            buttonText:"New Game"
        },
        speedUp:{
          iconText:"+",
          type:"button",
          viewId:"row4",
          id:"speedUp",
          label:"Speed Up",

        },
        speedDown:{
          iconText:"-",
          type:"button",
          viewId:"row4",
          id:"speedDown",
          label:"Speed Down",
        },
        speedText:{
          id:"speedText",
          type:"info",
          value:{
              type:"text",
              content:"1"
          },
          viewId:"row4"
        }
    },

    connecting:{
        title:"Video Game Controller Example",
        content:"Loading..."
    },
    connected:{
      title:"Video Game Controller Example",
      content:"Scan the QR Code below with your Global Input App"
    },
    senderConnected:{
        title:"Video Game Controller Example",
        content:"Please use the controller displayed in your Global Input App to control the game."
    },
    startButton:"Start",
    cancelButton:"Back",
    finishButton:"Back"
}
export default gameExampleConfig;

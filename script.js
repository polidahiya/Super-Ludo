function select1(item){
    return document.querySelector(`${item}`)
}
function selectall(item){
    return document.querySelectorAll(`${item}`)
}

for(let i=0;i<100;i++){
    let tile=document.createElement("div")
    tile.classList.add("tile")
   
    
    tile.innerText=i+1
    select1(".board").appendChild(tile)

    if(i==7 || i==19 ||i==43 ||i==68 ||i==84){
        let teleport=document.createElement("div")
        teleport.classList.add("tileteleport")
        tile.appendChild(teleport)

    }
    if(i==10 || i==27 ||i==32 ||i==71 ||i==98){
        let danger=document.createElement("div")
        danger.classList.add("dangertile")
        tile.appendChild(danger)

    }
}

// 
let player1bg=new Image().src='./images/bgplayer1.jpg'
let player2bg=new Image().src='./images/bgplayer2.jpg'
let player3bg=new Image().src='./images/bgplayer3.jpg'
let player4bg=new Image().src='./images/bgplayer4.jpg'
let dicegif=new Image().src="./images/diceroll.gif"
// 
let sdiceroll=new Audio("./sounds/diceroll.wav")
let hulkspawn=new Audio("./sounds/hulkspawn.mp3")


  
// 
let flags={
    player_turn:1,
    fullscreen:false,
    sidemenu:false,
    dice_value:1,
    sound:true,
}
let players_position={
    player1:0,
    player2:0,
    player3:0,
    player4:0,
}
let players_unlock=[
    {status:false,ready:false},
    {status:false,ready:false},
    {status:false,ready:false},
    {status:false,ready:false},
]
let teleport={
    player1:true,
    player2:true,
    player3:true,
    player4:true,
}
let danger={
    player1:true,
    player2:true,
    player3:true,
    player4:true,
}


function roll_dice(dice,dice_number){
    if(flags.player_turn==dice_number){
        let dice_outcome=Math.floor(Math.random()*6+1)
        flags.dice_value=dice_outcome
        if(flags.player_turn==dice_number){
        handledice(dice,dice_number)
        }
        selectall(".player").forEach(item=>{
            item.style.setProperty("--steps",`${dice_outcome}` );
        })


        if(dice_outcome==6){
            players_unlock[dice_number-1].status=true
        }
        if(players_unlock[dice_number-1].status){
            handledisplay(dice_number,true)
            move(dice_outcome,dice_number)
            players_unlock[dice_number-1].ready=true

        }
        
        // 
        if(dice_outcome!=6){
            if(flags.player_turn!=4){
                flags.player_turn+=1
                changebg()

            }else{
                flags.player_turn=1 
                changebg()
            }
        }
    }
}
//
function handledice(dice,dice_number){
    dice.style.backgroundImage='url('+dicegif+')';
    sounds(sdiceroll)
    setTimeout(()=>{
        dice.style.backgroundImage=`url("./images/dice${flags.dice_value}.jpg")`;
        // 
        if(flags.dice_value!=6){
           if(dice_number!=4){
            selectall(".dice").forEach((item,index)=>{
                (index==dice_number)?item.style.border="3px solid rgb(0, 255, 0)":item.style.border="3px solid transparent"
            })
             }else{
               selectall(".dice").forEach((item,index)=>{
                   (index==0)?item.style.border="3px solid rgb(0, 255, 0)":item.style.border="3px solid transparent"
               })
           }
        }
        else{
            selectall(".dice").forEach((item,index)=>{
                ((index+1)==(dice_number))?item.style.border="3px solid rgb(0, 255, 0)":item.style.border="3px solid transparent"
            })
        }
    },1000)
    
}
// 
function sounds(item){
    if(flags.sound){
        item.play()
    }
}


// changebg
function changebg(){
    if(flags.player_turn==1){
        select1("body").style=`background-image: url("${player1bg}");`
    }
    if(flags.player_turn==2){
        select1("body").style=`background-image: url("${player2bg}");`
    }
    if(flags.player_turn==3){
        select1("body").style=`background-image: url("${player3bg}");`
    }
    if(flags.player_turn==4){
        select1("body").style=`background-image: url("${player4bg}");`
    }
}

// 
function handledisplay(value,hideorshow){
    setTimeout(()=>{
        if(hideorshow){
            select1(`.assembleplayer${value}`).style.display="none"
            select1(`.player${value}`).style.display="block"
            if(flags.dice_value==6){
                if(value==1 && players_position.player1==0){
                    sounds(hulkspawn)
                }
                if(value==2 && players_position.player2==0){
                    sounds(hulkspawn)
                }
                if(value==3 && players_position.player3==0){
                    sounds(hulkspawn)
                }
                if(value==4 && players_position.player4==0){
                    sounds(hulkspawn)
                }
            }
        }else{
           setTimeout(()=>{
            select1(`.assembleplayer${value}`).style.display="block"
            select1(`.player${value}`).style.display="none"
           },1000)
        }
    },1000)
}

// move
function move(value,flagmove){
    if(players_unlock[flagmove-1].ready==true){
        if(flags.player_turn==1 ){
            if( players_position.player1<99){
                players_position.player1+=value
                if( players_position.player1>0){
                    check_cut(1)
                }
                if( players_position.player1>99){
                    players_position.player1-=value
                }
                player_position_style("player1",players_position.player1)
                teleport.player1=true
                checkspecialtile("player1")
            }
            check_win(1)
        }
        
        if(flags.player_turn==2 ){
            if( players_position.player2<99){
                players_position.player2+=value
                if( players_position.player2>0){
                    check_cut(2)
                }
                if( players_position.player2>99){
                    players_position.player2-=value
                }
                player_position_style("player2",players_position.player2)
                teleport.player2=true
                checkspecialtile("player2")
            }
            check_win(2)
        }
        if(flags.player_turn==3 ){
            if( players_position.player3<99){
                players_position.player3+=value
                if( players_position.player3>0){
                    check_cut(3)
                }
                if( players_position.player3>99){
                    players_position.player3-=value
                }
                player_position_style("player3",players_position.player3)
                teleport.player3=true
                checkspecialtile("player3")
            }
            check_win(3)
        }
        if(flags.player_turn==4 ){
            if( players_position.player4<99){
                players_position.player4+=value
                if( players_position.player4>0){
                    check_cut(4)
                }
                if( players_position.player4>99){
                    players_position.player4-=value
                }
                player_position_style("player4",players_position.player4)
                teleport.player4=true
                checkspecialtile("player4")
        }
        check_win(4)
        }
    }
}
// 
function player_position_style(value1,value2){
    select1("."+value1).style.setProperty("--x",`${(value2%10)*10}%` );
    select1("."+value1).style.setProperty("--y",`${(Math.floor(value2/10))*10}%` );
}

// cutcheck
function check_cut(value){
    let savepositions=players_position
    if(value==1){
        for (const key in players_position) {
            if(players_position.player1==players_position[key] && key!="player1" ){
                if(key=="player2"){ players_unlock[1].status=false;players_unlock[1].ready=false;player_position_style("player2",players_position.player2);handledisplay(2,false);}
                if(key=="player3"){ players_unlock[2].status=false;players_unlock[2].ready=false;player_position_style("player3",players_position.player3);handledisplay(3,false);}
                if(key=="player4"){ players_unlock[3].status=false;players_unlock[3].ready=false;player_position_style("player4",players_position.player4);handledisplay(4,false);}
                players_position[key]=0
                // console.log(players_position);
                players_position.player1=savepositions.player1
            }
        }
    }
    if(value==2){
        for (const key in players_position) {
            if(players_position.player2==players_position[key] && key!="player2"){
                if(key=="player1"){ players_unlock[0].status=false;players_unlock[0].ready=false;player_position_style("player1",players_position.player1);handledisplay(1,false);}
                if(key=="player3"){ players_unlock[2].status=false;players_unlock[2].ready=false;player_position_style("player3",players_position.player3);handledisplay(3,false);}
                if(key=="player4"){ players_unlock[3].status=false;players_unlock[3].ready=false;player_position_style("player4",players_position.player4);handledisplay(4,false);}
                players_position[key]=0
                // console.log(players_position);
                players_position.player2=savepositions.player2
            }
        }
    }
    if(value==3){
        for (const key in players_position) {
            if(players_position.player3==players_position[key] && key!="player3"){
                if(key=="player2"){ players_unlock[1].status=false;players_unlock[1].ready=false;player_position_style("player2",players_position.player2);handledisplay(2,false);}
                if(key=="player1"){ players_unlock[0].status=false;players_unlock[0].ready=false;player_position_style("player1",players_position.player1);handledisplay(1,false);}
                if(key=="player4"){ players_unlock[3].status=false;players_unlock[3].ready=false;player_position_style("player4",players_position.player4);handledisplay(4,false);}
                players_position[key]=0
                // console.log(players_position);
                players_position.player3=savepositions.player3
            }
        }
    }
    if(value==4){
        for (const key in players_position) {
            if(players_position.player4==players_position[key] && key!="player4"){
                if(key=="player2"){ players_unlock[1].status=false;players_unlock[1].ready=false;player_position_style("player2",players_position.player2);handledisplay(2,false);}
                if(key=="player3"){ players_unlock[2].status=false;players_unlock[2].ready=false;player_position_style("player3",players_position.player3);handledisplay(3,false);}
                if(key=="player1"){ players_unlock[0].status=false;players_unlock[0].ready=false;player_position_style("player1",players_position.player1);handledisplay(1,false);}
                players_position[key]=0
                // console.log(players_position);
                players_position.player4=savepositions.player4
            }
        }
    }
}
//check special tile
function checkspecialtile(value){
           setTimeout(()=>{
            if(players_position[value]== 7 && teleport[value]){ players_position[value]=19;player_position_style((value),players_position[value]);teleport[value]=false }
            if(players_position[value]==19 && teleport[value]){ players_position[value]=43;player_position_style((value),players_position[value]);teleport[value]=false }
            if(players_position[value]==43 && teleport[value]){ players_position[value]=68;player_position_style((value),players_position[value]);teleport[value]=false }
            if(players_position[value]==68 && teleport[value]){ players_position[value]=84;player_position_style((value),players_position[value]);teleport[value]=false }

            if(players_position[value]==27 && danger[value]){ players_position[value]=10;player_position_style(value,players_position[value]);danger[value]=false }
            if(players_position[value]==32 && danger[value]){ players_position[value]=27;player_position_style(value,players_position[value]);danger[value]=false }
            if(players_position[value]==71 && danger[value]){ players_position[value]=32;player_position_style(value,players_position[value]);danger[value]=false }
            if(players_position[value]==98 && danger[value]){ players_position[value]=71;player_position_style(value,players_position[value]);danger[value]=false }
           },2000)
}

// wincheck
function check_win(player){
   setTimeout(()=>{
    if(player==1){
        if(players_position.player1==99){
            win("Hulk Win",player1bg)
        }
    }
    if(player==2){
        if(players_position.player2==99){
            win("SpiderMan Win",player2bg)
        }
    }
    if(player==3){
        if(players_position.player3==99){
            win("IronMan Win",player3bg)
        }
    }
    if(player==4){
        if(players_position.player4==99){
            win("Flash Win",player4bg)
        }
    }
   },1000)
}




// 
function hide(element){
    select1(".startmenu").style.display="none"
}

// 
function win(winnername,value){
    select1(".winmenu").style.display="block"
    select1(".winname").innerText=winnername
    select1(".winmenu").style.backgroundImage=`url("${value}")`
}
// 
function mute(item){
    if(flags.sound){
        item.innerText="Unmute"
        flags.sound=false
    }else{
        item.innerText="mute"
      flags.sound=true
   }
}

// 
function fullscreen(item){
   if(flags.fullscreen){
        window.document.exitFullscreen()
        item.innerText="Fullscreen"
        flags.fullscreen=false
    }else{
        window.document.documentElement.requestFullscreen()
        item.innerText="Exit Fullscreen"
      flags.fullscreen=true
   }
}

// 
function restart(){
    flags.player_turn=1;
    players_position.player1=0;
    players_position.player2=0;
    players_position.player3=0;
    players_position.player4=0;
    players_unlock[0].status=false;
    players_unlock[1].status=false;
    players_unlock[2].status=false;
    players_unlock[3].status=false;
    players_unlock[0].ready=false;
    players_unlock[1].ready=false;
    players_unlock[2].ready=false;
    players_unlock[3].ready=false;
    select1(".winmenu").style.display="none"
    changebg()

    player_position_style("player1",players_position.player1)
    player_position_style("player2",players_position.player2)
    player_position_style("player3",players_position.player3)
    player_position_style("player4",players_position.player4)

    handledisplay(1,false)
    handledisplay(2,false)
    handledisplay(3,false)
    handledisplay(4,false)

    let dummydice=select1(".dice1")
    handledice(dummydice,0)
}

// 
function sidemenu(){
    if(flags.sidemenu){
        select1(".sidemenu").style="transform:translateX(200px)"
       select1(".menubuttonspan").style.display="none"
      flags.sidemenu=false
   }else{
       select1(".sidemenu").style="transform:translateX(0px)"
       select1(".menubuttonspan").style.display="block"
      flags.sidemenu=true
   }
}

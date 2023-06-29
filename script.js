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
}

// 
let player1bg=new Image().src='./images/bgplayer1.jpg'
let player2bg=new Image().src='./images/bgplayer2.jpg'
let player3bg=new Image().src='./images/bgplayer3.jpg'
let player4bg=new Image().src='./images/bgplayer4.jpg'

// 

// document.addEventListener('click', () => {
//   window.document.documentElement.requestFullscreen()
// });

 
  
// 
let flags={
    player_turn:1,
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
let dice_value={
    dice1:0,
    dice2:0,
    dice3:0,
    dice4:0,
}
function roll_dice(dice,dice_number){
console.log(players_position);
    if(flags.player_turn==dice_number){
        let dice_outcome=Math.floor(Math.random()*6+1)


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
        selectall(".dice").forEach((dice1,index)=>{
            dice1.innerText=""
        })
        dice.innerText=dice_outcome
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
    selectall(".dice").forEach((dice2,index)=>{
        index==(flags.player_turn-1)?dice2.style="border:3px solid rgb(0, 255, 0)":dice2.style="border:3px solid transparent"
        // index==(flags.player_turn-1)?  ( (dice_outcome==6)?dice2.innerText="6,roll":dice2.innerText="roll" )    :dice2.innerText=""
       
    })
   
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
    if(hideorshow){
        select1(`.assembleplayer${value}`).style.display="none"
        select1(`.player${value}`).style.display="block"
    }else{
        select1(`.assembleplayer${value}`).style.display="block"
        select1(`.player${value}`).style.display="none"
    }
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
                 select1(".player1").style.setProperty("--x",`${(players_position.player1%10)*10}%` );
                 select1(".player1").style.setProperty("--y",`${(Math.floor(players_position.player1/10))*10}%` );
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
                 select1(".player2").style.setProperty("--x",`${(players_position.player2%10)*10}%` );
                 select1(".player2").style.setProperty("--y",`${(Math.floor(players_position.player2/10))*10}%` );
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
                 select1(".player3").style.setProperty("--x",`${(players_position.player3%10)*10}%` );
                 select1(".player3").style.setProperty("--y",`${(Math.floor(players_position.player3/10))*10}%` );
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
                 select1(".player4").style.setProperty("--x",`${(players_position.player4%10)*10}%` );
                 select1(".player4").style.setProperty("--y",`${(Math.floor(players_position.player4/10))*10}%` );
        }
        check_win(4)
        }
    }
}


// cutcheck
function check_cut(value){
    let savepositions=players_position
    if(value==1){
        for (const key in players_position) {
            if(players_position.player1==players_position[key] && key!="player1" ){
                if(key=="player2"){handledisplay(2,false); players_unlock[1].status=false;players_unlock[1].ready=false}
                if(key=="player3"){handledisplay(3,false); players_unlock[2].status=false;players_unlock[2].ready=false}
                if(key=="player4"){handledisplay(4,false); players_unlock[3].status=false;players_unlock[3].ready=false}
                players_position[key]=0
                players_position.player1=savepositions.player1
            }
        }
    }
    if(value==2){
        for (const key in players_position) {
            if(players_position.player2==players_position[key] && key!="player2"){
                if(key=="player1"){handledisplay(1,false); players_unlock[0].status=false;players_unlock[0].ready=false}
                if(key=="player3"){handledisplay(3,false); players_unlock[2].status=false;players_unlock[2].ready=false}
                if(key=="player4"){handledisplay(4,false); players_unlock[3].status=false;players_unlock[3].ready=false}
                players_position[key]=0
                players_position.player2=savepositions.player2
            }
        }
    }
    if(value==3){
        for (const key in players_position) {
            if(players_position.player3==players_position[key] && key!="player3"){
                if(key=="player2"){handledisplay(2,false); players_unlock[1].status=false;players_unlock[1].ready=false}
                if(key=="player1"){handledisplay(1,false); players_unlock[0].status=false;players_unlock[0].ready=false}
                if(key=="player4"){handledisplay(4,false); players_unlock[3].status=false;players_unlock[3].ready=false}
                players_position[key]=0
                players_position.player3=savepositions.player3
            }
        }
    }
    if(value==4){
        for (const key in players_position) {
            if(players_position.player4==players_position[key] && key!="player4"){
                if(key=="player2"){handledisplay(2,false); players_unlock[1].status=false;players_unlock[1].ready=false}
                if(key=="player3"){handledisplay(3,false); players_unlock[2].status=false;players_unlock[2].ready=false}
                if(key=="player1"){handledisplay(1,false); players_unlock[0].status=false;players_unlock[0].ready=false}
                players_position[key]=0
                players_position.player4=savepositions.player4
            }
        }
    }
}

// wincheck
function check_win(player){
   setTimeout(()=>{
    if(player==1){
        if(players_position.player1==99){
            alert("player 1 win")
            // return
        }
    }
    if(player==2){
        if(players_position.player2==99){
            alert("player 2 win")
            // return
        }
    }
    if(player==3){
        if(players_position.player3==99){
            alert("player 3 win")
            // return
        }
    }
    if(player==4){
        if(players_position.player4==99){
            alert("player 4 win")
            // return
        }
    }
   },1000)
}
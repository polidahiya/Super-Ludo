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

document.addEventListener('click', () => {
  window.document.documentElement.requestFullscreen()
});

 
  
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
let dice_value={
    dice1:0,
    dice2:0,
    dice3:0,
    dice4:0,
}
function rotate_dice(dice,dice_number){
    if(flags.player_turn==dice_number){
        let dice_outcome=Math.floor(Math.random()*6+1)
        selectall(".player").forEach(item=>{
            item.style.setProperty("--steps",`${dice_outcome}` );
        })
        move(dice_outcome)
        
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
        select1("body").style="background-image: url('./images/bgplayer1.jpg');"
    }
    if(flags.player_turn==2){
        select1("body").style="background-image: url('./images/bgplayer2.jpg');"
    }
    if(flags.player_turn==3){
        select1("body").style="background-image: url('./images/bgplayer3.jpg');"
    }
    if(flags.player_turn==4){
        select1("body").style="background-image: url('./images/bgplayer4.jpg');"
    }
}

// move
function move(value){
    if(flags.player_turn==1 ){
        if( players_position.player1<99){
            players_position.player1+=value
            check_cut(1)
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
            check_cut(2)
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
            check_cut(3)
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
            check_cut(4)
            if( players_position.player4>99){
                players_position.player4-=value
            }
             select1(".player4").style.setProperty("--x",`${(players_position.player4%10)*10}%` );
             select1(".player4").style.setProperty("--y",`${(Math.floor(players_position.player4/10))*10}%` );
    }
    check_win(4)
    }
}


// cutcheck
function check_cut(value){
    // console.log(players_position);
    setTimeout(()=>{
       let players=Object.keys(players_position)
       players.forEach((player,index)=>{
        // console.log(index);
        if((index+1)==value)
           console.log(players_position[player]);
        //    if(players_position[player]==){
        //    }
       })
    //    console.log(players_position);
    },1000)
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
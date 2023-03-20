var high_score=0;
var box_values;
var row;
var column;

window.onload= function(){
    createBoard();
}

function createBoard(){
	
    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
			row = responseObject.rows;
			column = responseObject.columns;
			box_values = JSON.parse(responseObject.initialValues);
    		for(let i=0; i<row; i++){
    		    for(let j=0; j<column; j++){
     		       let box=document.createElement("div");
      		       box.setAttribute("id", i.toString()+"-"+j.toString());
            	   let value = box_values[i][j];
                   classSetAndRemove(box, value);
                   document.getElementById("root").appendChild(box);
               }
          }     
          
          setTwo();
          setTwo();
    }
  }
   xhr.open("POST","./Playing_Servlent");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send();
}

function classSetAndRemove(element, value){
    element.innerText="";
    element.classList.value="";
    element.classList.add("boxes");
    if(value==0){
        element.classList.add("value"+value);
    }
    if(value > 0){
        element.innerText = value;
        if(value<=2048){
            element.classList.add("value"+value);
        }
    }
        
}

function setTwo(){

    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
			if(responseObject.ShuffledValues == "Nothing")
			{
				console.log("Nothing Shuffled");
			}
			else{
			box_values = JSON.parse(responseObject.ShuffledValues);
			console.log("insert "+responseObject.ShuffledValues);
    		for(let i=0; i<row; i++){
    		    for(let j=0; j<column; j++){
				   if(box_values[i][j]== 2 )
				   {
                      let element = document.getElementById(i.toString()+"-"+j.toString());
                      element.innerText="2";
                      element.classList.add("value2");
                   }
             }
           }
		}
	  }
	}
    
   xhr.open("POST","./insertingNew");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send();
}

document.addEventListener("keyup" ,(event)=>{
    if(event.code == "ArrowLeft"){
        goLeft();
    }
    if(event.code == "ArrowRight"){
        goRight();
        
    }
    if(event.code == "ArrowUp"){
        goUp();
        
    }
    if(event.code == "ArrowDown"){
        goDown();
        
    }
     gameOver();
});

function goLeft(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
			document.getElementById("score_value").innerText = responseObject.Score;
			box_values = JSON.parse(responseObject.TowardsLeftValues);
			console.log("left "+responseObject.TowardsLeftValues);
   			for(let i=0; i<row; i++){			   
        		for(let j=0; j<column; j++){
            		let box = document.getElementById(i.toString()+"-"+j.toString());
            		let value = box_values[i][j];
            		classSetAndRemove(box, value);
              }
           }
           setTwo();
	    }
	}
    
   xhr.open("POST","./leftServlent");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send();
}

function goRight(){
	
    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
			document.getElementById("score_value").innerText = responseObject.Score;
			box_values = JSON.parse(responseObject.TowardsRightValues);
			console.log("right "+responseObject.TowardsRightValues);
   			for(let i=0; i<row; i++){			   
        		for(let j=0; j<column; j++){
            		let box = document.getElementById(i.toString()+"-"+j.toString());
            		let value = box_values[i][j];
            		classSetAndRemove(box, value);
              }
           }
             setTwo();
	    }
	}
    
   xhr.open("POST","./RightServlent");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send();
}

function goUp(){

    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
			document.getElementById("score_value").innerText = responseObject.Score;
			box_values = JSON.parse(responseObject.TowardsTopValues);
			console.log("Up "+responseObject.TowardsTopValues);
    		for(let i=0; i<column; i++){
    		    for(let j=0; j<column; j++){
     		       let box = document.getElementById(j.toString()+"-"+i.toString());
     		       let value = box_values[j][i];
            	   classSetAndRemove(box, value);
              }
           }
           setTwo();
	    }
	}
    
   xhr.open("POST","./TopServlent");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send();
}

function goDown(){

    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
			document.getElementById("score_value").innerText = responseObject.Score;
			box_values = JSON.parse(responseObject.TowardsDownValues);
			console.log("down "+responseObject.TowardsDownValues);
    		for(let i=0; i<column; i++){
    		    for(let j=0; j<column; j++){
     		       let box = document.getElementById(j.toString()+"-"+i.toString());
     		       let value = box_values[j][i];
            	   classSetAndRemove(box, value);
              }
           }
           setTwo();
	    }
	}
    
   xhr.open("POST","./DownServlent");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send();
    
}

function start_new_game(){
    if(confirm("New game..?")){
		document.getElementById("score_value").innerText=0;
        for(let i=0; i<row; i++){
            for(let j=0; j<column; j++){
                let element=document.getElementById(i.toString()+"-"+j.toString());
                element.remove();
            }
        }
        createBoard();
    }
}

function gameOver()
{
    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 &&  this.status == 200)
		{
			var responseObject = JSON.parse(this.responseText);
                 if(responseObject.boolean == true)
                 {
					 alert("Game Over");
				 }
              }
     }
    
   xhr.open("POST","./GameOver");
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.send(); 
}

let Cards = document.getElementsByClassName("Card");
let isMouseDown = false;
for(let item of Cards) {
item.isMouseDown = false;
  item.addEventListener("mousedown", (e) => { onMouseDown(e, item); });
  item.empty = item.cloneNode(true);
  document.body.addEventListener("mousemove", (e) => {
      onMouseMove(e, item);
  });

  item.addEventListener("mouseup", (e) => {
    onMouseUp(e, item);
  });
}
function onMouseDown(e, item) {
 let left = item.offsetLeft;
 let top = item.offsetTop;
 let offsetWidth = item.offsetWidth;
 item.style.position = "absolute";
 item.style.width = offsetWidth - 26 + "px";
 document.body.append(item);
 item.style.zIndex = 1000;
 item.isMouseDown = true;
 moveAt(item,e.pageX, e.pageY);
 let cur = findNearest(item);
	insrtEmpty(item,cur);
}
 function moveAt(item,pageX, pageY) {
   item.style.left = pageX - item.offsetWidth / 2 + 'px';
    item.style.top = pageY - item.offsetHeight / 2 + 'px';
  }
function onMouseUp(e, item) {
  item.isMouseDown = false;
  item.style.position = "static";
   item.style.zIndex = 0;
  item.empty.after(item);
  item.empty.parentNode.removeChild(item.empty);
}
function onMouseMove(e, item) {
  e.preventDefault(); 
  if(item.isMouseDown) {
     moveAt(item,e.pageX, e.pageY);
     let cur = findNearest(item);
     insrtEmpty(item,cur);
  }
}
function insrtEmpty(item,toInsert){
item.empty.style.position = "static";
item.empty.style.borderColor = "green";
item.empty.classList.remove("Children");
for(let child of item.empty.children) child.style.visibility = "hidden";
toInsert.after(item.empty);
}

function findNearest(item){
let itemCoord;
let Childs = document.querySelectorAll(".Children");
let min = Childs[0];
let minCoord = min.getBoundingClientRect();
	for(let current of Childs){
  let currentCoord = current.getBoundingClientRect();
  itemCoord = item.getBoundingClientRect();
  	if( Math.sqrt(( Math.pow(itemCoord.x - currentCoord.x,2)) + Math.pow(itemCoord.y - currentCoord.y,2)) < Math.sqrt( Math.pow(itemCoord.x - minCoord.x,2) + Math.pow(itemCoord.y - minCoord.y,2)) && (current !== item)  ) 
    {min = current; minCoord = currentCoord; }
  }
  return min;
}
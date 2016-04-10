class View {
  static levelNumView(mapNum){
    document.getElementById("current_level").value = mapNum;
    document.getElementById("modal-level--current").innerHTML = mapNum;
    document.getElementById("modal-level--next").innerHTML = +mapNum + 1;
  }
  static renewCell(x,y,cssClass){
    document.getElementById(`c${x}x${y}`).className = cssClass;
  }
  static buildLevelList(){
    let levelList;
    let currentLevel = game.currentLevel;
    for (var i = 1; i <= 60; i++){
      (i == currentLevel)
      ? levelList += `<option value="${i}" selected>${i}</option>`
    	: levelList += `<option value="${i}">${i}</option>`;
    }
    document.getElementById('level-list').innerHTML = levelList;
  }
}
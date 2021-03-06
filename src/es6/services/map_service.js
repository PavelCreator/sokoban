class MapSvc {

  static generateCString(mapArr) {
    var cString = '';
    for (var i = 0; i < mapArr[1].length; i++) {
      cString += 'c';
    }
    mapArr.unshift(cString);
    mapArr.push(cString);
    return mapArr;
  }

  static generateMap(mapNum) {
    flag.set('last step block', true);
    flag.set('hash update block', true);
    AppSvc.changeURL(mapNum);
    setTimeout(function () {
      flag.set('hash update block',false);
    }, 200);
    view.restart.block();

    if (localStorage.getItem("memoryStep")){
      view.loadStep.unblock();
    }

    AppSvc.resetLevel();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `src/maps/${mapNum}.txt`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert('error: ' + (this.status ? this.statusText : 'the request fails'));
        return;
      }

      /*Map already getted from file*/
      let map = this.responseText;
      let mapArr = map.split('\r\n');

      mapArr = MapSvc.generateCString(mapArr);
      document.getElementById('map').style.width = (30*mapArr[0].length + 60) + 'px';
/*      document.getElementById('map').style.width = (+document.getElementById('map').offsetWidth + 20) + 'px';*/

      let html = '';

      game.dimensions.y = mapArr.length - 1;
      game.dimensions.x = mapArr[0].length + 1;

      for (var y = 0; y < mapArr.length; y++) {
        html += '<div class="_row">';
        mapArr[y] = 'c' + mapArr[y] + 'c';
        for (var x = 0; x < mapArr[y].length; x++) {
          EntitySvc.createEntity(mapArr[y][x], x, y);
          html += emap[`c${x}x${y}`].getHTML();
        }
        html += '</div>';
      }
      document.getElementById('map').innerHTML = html;
      AppSvc.runApp();
    }
  }

  static restoreMap(){
    let html = '';

    document.getElementById('map').style.width = (30 * (game.dimensions.x - 1) + 60) + 'px';

    for (var y = 0; y <= game.dimensions.y; y++) {
      html += '<div class="_row">';
      for (var x = 0; x <= game.dimensions.x; x++) {
        EntitySvc.createEntity(emap[`c${x}x${y}`].letter, x, y, 'restore');
        html += emap[`c${x}x${y}`].getHTML();
      }
      html += '</div>';
    }
    document.getElementById('map').innerHTML = html;
  }
}
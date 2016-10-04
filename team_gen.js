function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function clear_all(){
    for (var i = 1; i <= 20; i++){
        t = document.getElementById('name_input'.concat(i));
        t.value = "";
    }
    t = document.getElementById('team_list_two');
    t.innerText = '';
    t = document.getElementById('team_list_one');
    t.innerText = '';
    first_team_list = [];
    odd_man_out = "";
}

var first_team_list = [];
var odd_man_out = "";
function second_gen(){
  console.log('a', odd_man_out);
  var t_list = generate_teams(odd_man_out);
  // check that t_list has no same teams as the first list generated
  if (check_teams_not_same(t_list, first_team_list)){
    second_gen();
  } else {
    fill_out_list(t_list, 'team_list_one');
  }
}

function generate_first(){
  mylist = generate_teams(false, true);
  fill_out_list(mylist, 'team_list_two');
}

function generate_teams(oddmanout, first){
  //console.log('t', oddmanout);
  var players = [];
  for (var i=1;i <= 20; i++){
    var name = document.getElementById('name_input'.concat(i)).value;
    if (name !== ""){
      players.push(name);
    }
  }
  shuffle(players);
  team_pairs = [];
  if(players.length%2 == 0){ // even
    for(var i=0; i < players.length; i+=2){
      team_pairs.push(players[i] + ' & ' + players[i+1]);
    }
  } else { // odd number players
    if (oddmanout == false){ // first gen
      odd_man_out = players.pop();
      team_pairs.push(odd_man_out + ' & ' + players.pop());
      team_pairs.push(odd_man_out + ' & ' + players.pop());
      for(var i=0; i < players.length; i+=2){
        team_pairs.push(players[i] + ' & ' + players[i+1]);
      }
      
    } else{ // second gen
      if (oddmanout != players[players.length-1]){
        var odd_man = players.pop();
        team_pairs.push(odd_man + ' & ' + players.pop());
        team_pairs.push(odd_man + ' & ' + players.pop());
        for(var i=0; i < players.length; i+=2){
          team_pairs.push(players[i] + ' & ' + players[i+1]);
        }
      } else {
        shuffle(players);
        var odd_man = players.pop();
        team_pairs.push(odd_man + ' & ' + players.pop());
        team_pairs.push(odd_man + ' & ' + players.pop());
        for(var i=0; i < players.length; i+=2){
          team_pairs.push(players[i] + ' & ' + players[i+1]);
        }
      }
    }
  }
  shuffle(team_pairs);
  if(first){
    first_team_list = team_pairs;
  }
  return team_pairs;
}

function check_teams_not_same(lista, listb){
  matches = false;
  for (var i = 0; i < lista.length; i++){
    for (var j = 0; j < listb.length; j++){
      a = lista[i];
      b = listb[j];
      anames = a.split(' & ');
      bnames = b.split(' & ');
      if((anames[0] == bnames[0] && anames[1] == bnames[1]) || (anames[1] == bnames[0] && anames[0] == bnames[1])){
        matches = true;
      }
    }
  }
  return matches;
}

function fill_out_list(teams, container){
  con = document.getElementById(container);
  var children_length = con.children.length;
  for (var i = 0; i < children_length; i++){
    con.removeChild(con.children[0]);
  }
  for (var i = 0; i < teams.length; i++){
    var node = document.createElement('LI');
    var textnode = document.createTextNode(teams[i]);
    node.appendChild(textnode);
    con.appendChild(node);
  }
}

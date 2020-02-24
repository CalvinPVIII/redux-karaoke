const songList = {

  1: "Don't stop, Don't stop, we're in luck now, Don't stop, there's so much to be found, We can find paradise, All we have to do is go, go! Free your soul!, Mysteries abound, made up a deep energy (Energy), Foes all around, but I will go fearless and free, I'll give you strength, you give me love, thats how we'll live (That's how we'll live), My courage won't fade, if you're with me my enemies can never win, We will fight for love and glory, We will live to tell the story, There is nothing we cant live through, Nothing ever dies, we will rise again!, Don't stop, Don't stop, we're in luck now, Don't stop, keep your spirit proud , And ride upon the wind, All we have to do is go!, Don't stop, Don't stop, we're in luck now, Don't stop, there's so much to be found, We can find paradise, All we have to do is go, go! Free your soul, Dragon Soul!".split(', '),

  2: "Piercing the shining clouds, I fly away (fly away), While a panorama spreads through my body., Kicked in the face, the Earth gets angry (gets angry), And makes a volcano explode!, Within the melted polar ice, If there’s a dinosaur, I want to train it to balance on a ball!, CHA-LA HEAD-CHA-LA, No matter what happens, I feel like it’s no big deal!, CHA-LA HEAD CHA-LA, Just as loudly as my heart pounds, The Genki-Dama roars...Sparking!, Diving through the sky on a roller coaster (coaster), I fall into a paradise of panic!, END!".split(', ')

}



const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Dragon Ball Kai Opening",
      artist: "Kai Guy",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Dragon Ball Z Opening",
      artist: "Z Guy",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
};


const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}


const songChangeReducer = (state = initialState.currentSongId, action)=> {
  switch (action.type){
    case 'CHANGE_SONG':
    return action.newSelectedSongId
    default:
      return state;
  } 
}

const rootReducer = this.Redux.combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer,
});

const { createStore } = Redux
const store = createStore(rootReducer)




function userClick() {
  if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG',
                     currentSongId: store.getState().currentSongId });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC',
                     currentSongId: store.getState().currentSongId });
  }
}

const selectSong = (newSongId) =>{
  let action = {
    type: 'CHANGE_SONG',
    newSelectedSongId: newSongId
  }
  store.dispatch(action)
}

const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  if (store.getState().currentSongId){
   const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
   document.getElementById('lyrics').appendChild(currentLine);


  }else{
    const selectedSongMessage = document.createTextNode("Select a song from the menu");
    document.getElementById('lyrics').appendChild(selectedSongMessage)
  }
}


const renderSongs = () => {
  const songsById = store.getState().songsById;
  for (const songKey in songsById) {
    const song = songsById[songKey]
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const em = document.createElement('em');
    const songTitle = document.createTextNode(song.title);
    const songArtist = document.createTextNode(' by ' + song.artist);
    em.appendChild(songTitle);
    h3.appendChild(em);
    h3.appendChild(songArtist);
    h3.addEventListener('click', function() {
      selectSong(song.songId);
    });
    li.appendChild(h3);
    document.getElementById('songs').appendChild(li);
  }
}

window.onload = function () {
  renderLyrics()
  renderSongs()
}


store.subscribe(renderLyrics)


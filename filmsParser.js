module.exports = (file) => {

  let text = file.data.toString();
  let lines = text.split(/\r?\n/);
  let initFilm = () => {
    return {
      title: '',
      year: '',
      format: '',
      stars: []
    }
  };

  let films = []
  let film = initFilm();  

  for (let line of lines) {
    if (line.startsWith('Title: ')) {
      film.title = line.substring(7);
    } 
    else if (line.startsWith('Release Year: ')) {
      film.year = line.substring(14);
    } 
    else if (line.startsWith('Format: ')) {
      film.format = line.substring(8);
    } 
    else if (line.startsWith('Stars: ')) {
      let stars = line.substring(7);
      film.stars = stars.split(", ");
    }
    else if (line == '') {
      if (film.title) {
        films.push(film);
        film = initFilm(); 
      }
    }
  }

  if (film.title) {
    films.push(film);
  }

  return films;
};
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

    let film = initFilm();

    for (let line of lines) {
        if ((line == '') && ((film.title === '') || (film.year === '') && (film.format === '') && (film.stars.length === 0))) {
            continue;
        } 
        else if (line.startsWith('Title: ')) {
            if (film.title === '') {
                film.title = line.substring(7);
            } else {
                return false;
            }
        }
        else if (line.startsWith('Release Year: ')) {
            if (film.year === '') {
                film.year = line.substring(14);
            } else {
                return false;
            }
        }
        else if (line.startsWith('Format: ')) {
            if (film.format === '') {
                film.format = line.substring(8);
            } else {
                return false;
            }
        }
        else if ((line.startsWith('Stars: '))) {
            if (film.stars.length === 0) {
                stars = line.substring(7);
                film.stars = stars.split(", ");
            } else {
                return false;
            }
        }

        else if ((line == '') && ((film.title != '') && (film.year = !'') && (film.format = !'') && (film.stars.length != 0))) {
            if (film.title) {
                film = initFilm();
            }
        }

        else {
            return false;
        }
    }
    console.log('true file');
    return true;
}



export const movieMap = (data) => {
    return data.map(({
      director,
      duration,
      year,
      description,
      trailerLink: trailer,
      nameRU,
      nameEN,
      id: movieId,
      country,
      image: {
        url,
        formats: {
          thumbnail: { url: thumbnailUrl }
        },
      },
    }) => ({
      country: country || 'unknown',
      director: director || 'unknown',
      duration: duration || 'unknown',
      year: year || 'unknown',
      description: description || 'unknown',
      image: 'https://api.nomoreparties.co' + url,
      trailer: trailer || 'unknown',
      nameRU: nameRU || nameEN || 'unknown',
      nameEN: nameEN || 'unknown' ,
      thumbnail: 'https://api.nomoreparties.co' + thumbnailUrl,
      movieId,
    }));
  };
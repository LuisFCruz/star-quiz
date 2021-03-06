import axios from 'axios';

const BASE_URL = 'https://swapi.co/api/';

export const getCharacters = async (pages) => {
  const characters = await Promise.all(
    pages.map(page => {
      const url = `${BASE_URL}people?page=${page}`;
      return request(url);
    })
  );

  return characters.reduce((aggr, data) => [...aggr, ...data.results], []);
};

export const getFilms = async urls => {
  return getComplements(urls, 'title');
};

export const getVehicles = async urls => {
  return getComplements(urls, 'name');
};

export const getSpecies = async urls => {
  return getComplements(urls, 'name');
};

export const getPlanets = async urls => {
  return getComplements(urls, 'name');
};

export const savePlayer = player => {
  const players = getPlayers();
  const json = JSON.stringify([...players, player]);
  localStorage.setItem('players', json);
};

export const getPlayers = () => {
  const player = localStorage.getItem('players');
  return JSON.parse(player) || [];
};

export const getAllComplements = async complements => {
  const promises = [
    getSpecies(complements.species),
    getVehicles(complements.vehicles),
    getPlanets(complements.homeworld),
    getFilms(complements.films)
  ];

  const [species, vehicles, homeworld, films] = await Promise.all(promises);
  return { species, vehicles, homeworld, films };
};

const getComplements = async (urls, attr) => {
  const complement = await Promise.all(urls.map(url => request(url)));
  return complement.reduce((aggr, data) => {
    const id = data.url.replace(/[^\d]+/g, '');
    aggr[id] = data[attr];
    return aggr;
  }, {});
};

const request = async url => {
  const localData = getReponse(url);
  if (localData) {
    return localData;
  }

  const { data } = await axios.get(url);
  saveResponse(url, data);
  return data;
};

const getReponse = url => {
  const json = localStorage.getItem(url);
  return JSON.parse(json) || null;
};

const saveResponse = (url, data) => {
  const json = JSON.stringify(data);
  localStorage.setItem(url, json);
};

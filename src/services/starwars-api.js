import axios from 'axios';

const BASE_URL = 'https://swapi.co/api/';

export const getCharacters = async (page = 1) => {
  const url = `${BASE_URL}people?page=${page}`;
  const { data } = await axios.get(url);
  return parseCharacters(data.results);
}

const parseCharacters = (characters) => {
  return characters.map(character => {
    const id = character.url.replace(/[^\d]+/g, "")
    return {...character, id };
  });
}

export const getFilms = async (urls) => {
  return getComplements(urls, 'title');
}

export const getVehicles = async (urls) => {
  return getComplements(urls, 'name');
}

export const getSpecies = async (urls) => {
  return getComplements(urls, 'name');
}

export const getPlanetName = async (url) => {
  const { data } = await axios.get(url);
  return data.name;
}

const getComplements = async (urls, attr) => {
  const complement = await Promise.all(urls.map(url => axios.get(url)));
  return complement.map(({data}) => data[attr]).join(", ");
}
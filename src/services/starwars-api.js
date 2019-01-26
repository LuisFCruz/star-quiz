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
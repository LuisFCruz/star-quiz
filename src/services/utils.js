export const reduceComplementsCharacter = items => {
  return items.reduce(
    (aggr, item) => {
      aggr.films = [...new Set([...aggr.films, ...item.films])];
      aggr.species = [...new Set([...aggr.species, ...item.species])];
      aggr.homeworld = [...new Set([...aggr.homeworld, item.homeworld])];
      aggr.vehicles = [...new Set([...aggr.vehicles, ...item.vehicles])];
      return aggr;
    },
    {
      films: [],
      species: [],
      homeworld: [],
      vehicles: []
    }
  );
};

export const mergeCharacterWidthComplements = (characters, complements) => {
  return characters.reduce((aggr, character) => {
    const {
      url,
      name,
      height,
      hair_color: hairColor,
      homeworld: homeworldUrl
    } = character;

    const id = extractId(url);
    const films = extractNamesComplement(character, complements, 'films');
    const species = extractNamesComplement(character, complements, 'species');
    const homeworld = extractName(homeworldUrl, complements, 'homeworld');
    const vehicles = extractNamesComplement(character, complements, 'vehicles') || 'n/a';

    character = {
      id,
      name,
      height,
      hairColor,
      films,
      species,
      homeworld,
      vehicles,
      answered: false,
      helped: false
    };

    return [...aggr, character];
  }, []);
};

const extractId = url => {
  return url.replace(/[^\d]+/g, '');
};

const extractNamesComplement = (characters, complements, attr) => {
  return characters[attr]
    .map(url => extractName(url, complements, attr))
    .join(', ');
};

const extractName = (url, complements, attr) => {
  const id = extractId(url);
  return complements[attr][id];
};

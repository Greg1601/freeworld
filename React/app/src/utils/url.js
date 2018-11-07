import slugify from 'slugify';

export const placeSlug = (placeName) => {
  if (typeof placeName !== 'string') {
    return 'inconnu';
  }
  return slugify(placeName, {
    lower: true,
    separator: '_',
  });
};

// Implémentation impérative de l'utilitaire.
export const placeUrl = (placeId, placeName) => {
  return `/Lieu/${placeId}/${placeSlug(placeName)}`;
};

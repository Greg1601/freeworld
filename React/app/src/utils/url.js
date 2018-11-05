import slugify from 'slugify';

export const recipeSlug = (placeName) => {
  return slugify(placeName, { lower: true });
};

// Implémentation impérative de l'utilitaire.
export const recipeUrl = (placeName) => {
  return `/recipe/${recipeSlug(placeName)}`;
};

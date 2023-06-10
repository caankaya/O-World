const response =
  '[{ "favorite_countries": "{\\"username\\" : \\"Loic\\", \\"country_origin\\" : 1, \\"favorite\\" : \\"name: France, iso3: FRA, created_at: 2023-06-09 17:04:33.066905+02, name: Belgique, iso3: BEL, created_at: 2023-06-09 17:11:14.006621+02, name: Belgique, iso3: BEL, created_at: 2023-06-09 17:16:07.421465+02\\", \\"pourcentage\\" : 0.81632653061224489796}" }]';

export const formatUserFavoritesCountries = (response) => {
  data = JSON.parse(response);

  data.forEach((item) => {
    item.favorite_countries = JSON.parse(item.favorite_countries);
    // Maintenant, nous devons diviser la chaîne "favorite" en plusieurs pays
    const favorites = item.favorite_countries.favorite.split(', ');
    const favoriteCountries = [];
    for (let i = 0; i < favorites.length; i += 3) {
      favoriteCountries.push({
        name: favorites[i].substring(6),
        iso3: favorites[i + 1].substring(6),
        created_at: favorites[i + 2].substring(12),
      });
    }
    item.favorite_countries.favorite = favoriteCountries;
  });

  return data;
};

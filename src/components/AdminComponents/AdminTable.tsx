import React, { useEffect, useState } from 'react';
import { fetchData } from '@/GlobalRedux/store/reducers/stats';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import ErrorPage from '../Error';


export const AdminTable = () => {
  const dispatch = useAppDispatch();
  const errorState = useAppSelector((state) => state.error);
  const statsState = useAppSelector((state) => state.stats);

  // Introduire de nouvelles variables d'état pour la pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchData({ url: '/admin/stat', params: { useView: true } }));
    dispatch(fetchData({ url: '/oworld/flags', params: {} }));
  }, [dispatch]);

  if (errorState) {
    return <ErrorPage />;
  }

  const total_users = statsState.data.reduce(
    (sum, row) => sum + parseInt(row.user_count, 10),
    0
  );

  const findFlagUrl = (flags: any[], countryIso3: string) => {
    const flagData = flags.find(flag => flag.cca3 === countryIso3);
    return flagData ? flagData.flags.png : '';
  };

  // Calculer quelles données afficher sur la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = statsState.data.slice(indexOfFirstItem, indexOfLastItem);

  // Gérer le changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(statsState.data.length / itemsPerPage);

  return (
    <>
      <table className="table-auto w-full">
        <thead className="bg-neutral-focus">
          <tr className="text-md text-info-content text-left">
            <th className="flex items-center pl-6 py-4 font-bold text-info-content">
              Country origin
            </th>
            <th className="py-4 font-bold text-info-content">Total user</th>
            <th className="py-4 font-bold text-info-content">
              Percentage of total
            </th>
            <th className="py-4 font-bold text-info-content">Average age</th>
            <th className="py-4 font-bold text-info-content">Favorite</th>
          </tr>
        </thead>
        <tbody>
          {/* Boucle sur les datas pour la page active et affichage de la liste des pays */}
          {currentData.map((row, index) => {
            const flagUrl = findFlagUrl(statsState.flags, row.iso3);
            return (
              <tr key={index} className="border-b border-neutral">
                <td className="flex items-center px-6 font-medium">
                  <div className="flex px-4 py-3 items-center">
                    <div className="object-contain">
                      <img
                        className="w-8 h-8 mr-4 object-cover rounded-md"
                        src={flagUrl}
                        alt=""
                      />
                    </div>
                    <p className="text-md font-bold text-base-200">
                      {row.country_origin}
                    </p>
                  </div>
                </td>
                <td className="font-bold items-center">
                  <p className="text-sm text-base-200">{row.user_count}</p>
                </td>
                <td className="font-bold items-center">
                  <p className="text-sm text-base-200">
                    {(
                      (parseInt(row.user_count, 10) / total_users) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                </td>
                <td className="font-bold items-center">
                  <p className="text-sm text-base-200">
                    {parseFloat(row.average_age).toFixed(2)}
                  </p>
                </td>
                <td className="font-bold items-center">
                  <p className="text-sm text-base-200">{row.favorite_count}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="py-4 flex justify-center items-center">
        <nav>
          <ul className="flex list-none">
            <li>
              <button
                className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                {'<<'}
              </button>
            </li>
            <li>
              {/* permet à l'utilisateur de revenir à la page précédente dans la pagination */}
              {/* si currentPage est supérieur à 1, il décrémente sa valeur de 1, sinon il la maintient à 1. Cela empêche de revenir avant la première page. */}
              {/* désactive le bouton si currentPage est égal à 1, car dans ce cas, l'utilisateur est déjà sur la première page et ne doit pas pouvoir revenir en arrière. */}
              <button
                className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
              >
                {'<'}
              </button>
            </li>
            {/* crée un tableau de la taille de totalPages */}
            {/* change la page actuelle en utilisant la fonction handlePageChange avec l'index en cours (i + 1) en tant que paramètre */}
            {[...Array(totalPages)].map((e, i) => (
              <li key={i}>
                <button
                  className={`px-3 py-1 mx-1 rounded border ${
                    currentPage === i + 1
                      ? 'bg-primary-focus'
                      : 'bg-neutral-focus'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              {/* permet à l'utilisateur d'avancer à la page suivante dans la pagination. */}
              {/* si currentPage est inférieur à totalPages, il incrémente sa valeur de 1, sinon il la maintient à totalPages. Cela empêche d'avancer après la dernière page. */}
              {/* ésactive le bouton si currentPage est égal à totalPages, car dans ce cas, l'utilisateur est déjà sur la dernière page et ne doit pas pouvoir avancer davantage. */}
              <button
                className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                onClick={() =>
                  setCurrentPage(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
              >
                {'>'}
              </button>
            </li>
            <li>
              <button
                className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                {'>>'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

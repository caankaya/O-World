'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';
import { DataRow } from '@/@types/statsAdmin';
import axios from 'axios';

const fetchData = async (url, params) => {
  try {
    const response = await axios.get(url, {
      params,
      headers: { accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    return null;
  }
};

function Admin() {
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  // Définir l'état pour stocker les données récupérées
  const [data, setData] = useState<DataRow[]>([]);
  const [flag, setFlags] = useState<DataRow[]>([]);

  // Introduire de nouvelles variables d'état pour la pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Effectuer la requête API lors de la première montée du composant
  useEffect(() => {
    const fetchAllData = async () => {
      const [data, flags] = await Promise.all([
        fetchData('http://localhost:3000/api/admin/stat', { useView: true }),
        fetchData('http://localhost:3000/api/oworld/flags', {}),
      ]);
      setData(data || []);
      setFlags(flags || []);
    };

    fetchAllData();
  }, []);

  const total_users = data.reduce((sum, row) => sum + parseInt(row.user_count, 10), 0);

  // Calculer quelles données afficher sur la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Gérer le changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const findFlagUrl = (flags, countryIso3) => {
    const flagData = flags.find(flag => flag.cca3 === countryIso3);
    return flagData ? flagData.flags.png : '';
  };


  return (
    <div
      className={`p-4 flex flex-col items-center justify-start min-h-screen ${isSideBarOpen ? 'float-right' : ''}`}
      style={isSideBarOpen ? { width: AdminWidth } : {}}
    >
    <div className="container px-4 mx-auto w-full">
      <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="pt-4 bg-neutral-content shadow rounded">
            <div className="px-6 border-b border-neutral">
                <div className="flex flex-wrap items-center mb-4">
                <div>
                    <h3 className="text-xl text-base-100 font-bold">Statistics Admin Users</h3>
                    <p className="text-sm text-base-100 font-medium">Users per country</p>
                </div>
                </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
              <thead className="bg-neutral-focus">
                  <tr className="text-md text-info-content text-left">
                  <th className="flex items-center pl-6 py-4 font-bold text-info-content">Country origin</th>
                  <th className="py-4 font-bold text-info-content">Total user</th>
                  <th className="py-4 font-bold text-info-content">Percentage of total</th>
                  <th className="py-4 font-bold text-info-content">Average age</th>
                  <th className="py-4 font-bold text-info-content">Favorite</th>
                  </tr>
              </thead>
              <tbody>
                {/* Boucle sur les datas pour la page active et affichage de la liste des pays */}
                  {currentData.map((row, index) => {
                    const flagUrl = findFlagUrl(flag, row.iso3);
                    return (
                      <tr key={index} className="border-b border-neutral">
                      <td className="flex items-center px-6 font-medium">
                          <div className="flex px-4 py-3 items-center">
                            <div className="object-contain">
                              <img className="w-8 h-8 mr-4 object-cover rounded-md" src={flagUrl} alt="" />
                            </div>
                          <p className="text-md font-bold text-base-200">{row.country_origin}</p>
                          </div>
                      </td>
                      <td className="font-bold items-center">
                          <p className="text-sm text-base-200">{row.user_count}</p>
                      </td>
                      <td className="font-bold items-center">
                          <p className="text-sm text-base-200">{((parseInt(row.user_count, 10) / total_users) * 100).toFixed(2)}%</p>
                      </td>
                      <td className="font-bold items-center">
                          <p className="text-sm text-base-200">{parseFloat(row.average_age).toFixed(2)}</p>
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
                        {"<<"}
                      </button>
                    </li>
                    <li>
                      {/* permet à l'utilisateur de revenir à la page précédente dans la pagination */}
                      {/* si currentPage est supérieur à 1, il décrémente sa valeur de 1, sinon il la maintient à 1. Cela empêche de revenir avant la première page. */} 
                      {/* désactive le bouton si currentPage est égal à 1, car dans ce cas, l'utilisateur est déjà sur la première page et ne doit pas pouvoir revenir en arrière. */} 
                      <button
                        className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} 
                        disabled={currentPage === 1}
                      >
                        {"<"}
                      </button>
                    </li>
                      {/* crée un tableau de la taille de totalPages */}
                      {/* change la page actuelle en utilisant la fonction handlePageChange avec l'index en cours (i + 1) en tant que paramètre */} 
                    {[...Array(totalPages)].map((e, i) => (
                      <li key={i}>
                        <button
                          className={`px-3 py-1 mx-1 rounded border ${currentPage === i + 1 ? 'bg-primary-focus' : 'bg-neutral-focus'}`}
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
                        onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        {">"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        {">>"}
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Admin;
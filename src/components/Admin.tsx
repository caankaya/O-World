'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';
import axios from 'axios';

function Admin() {
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  // Définir l'état pour stocker les données récupérées
  const [data, setData] = useState([]);

  // Introduire de nouvelles variables d'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Effectuer la requête API lors de la première montée du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/stat', {
          params: {
            useView: true,
          },
          headers: {
            accept: 'application/json',
          },
        });
        // Mettre à jour l'état avec les données récupérées
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);

  const total_users = data.reduce((sum, row) => sum + parseInt(row.user_count, 10), 0);

  // Calculer quelles données afficher sur la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Gérer le changement de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);


  return (
    <div
      className={`p-4 flex ${isSideBarOpen ? 'float-right' : ''}`}
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
                  {currentData.map((row, index) => (
                      <tr key={index} className="border-b border-neutral">
                      <td className="flex items-center px-6 font-medium">
                          <div className="flex px-4 py-3 items-center">
                          <img className="w-8 h-8 mr-4 object-cover rounded-md" src="" alt="" />
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
                  ))}
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
                      <button
                        className="px-3 py-1 mx-1 rounded border bg-neutral-focus"
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                      >
                        {"<"}
                      </button>
                    </li>
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
'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

function Admin() {
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

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
                    <th className="flex items-center pl-6 py-4 font-bold text-info-content">Country</th>
                    <th className="py-4 font-bold text-info-content">User total</th>
                    <th className="py-4 font-bold text-info-content">percentage of total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-neutral">
                    <td className="flex items-center py-4 px-6 font-medium">
                        <div className="flex px-4 py-3 items-center">
                          <img className="w-8 h-8 mr-4 object-cover rounded-md" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/langfr-225px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" alt="" />
                          <p className="text-md font-bold text-base-200">France</p>
                        </div>
                    </td>
                    <td className="font-bold items-center">
                        <p className="text-sm text-base-200">32000</p>
                    </td>
                    <td className="font-bold items-center">
                        <p className="text-sm text-base-200">65%</p>
                    </td>
                    </tr>

                    <tr className="border-b border-neutral">
                    <td className="flex items-center py-4 px-6 font-medium">
                        <div className="flex px-4 py-3 items-center">
                          <img className="w-8 h-8 mr-4 object-cover rounded-md" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/langfr-225px-Flag_of_Japan.svg.png" alt="" />
                          <p className="text-md font-bold text-base-200">Japan</p>
                        </div>
                    </td>
                    <td className="font-bold items-center">
                        <p className="text-sm text-base-200">32000</p>
                    </td>
                    <td className="font-bold items-center">
                        <p className="text-sm text-base-200">65%</p>
                    </td>
                    </tr>

                </tbody>
                </table>
                <div className="py-4 text-center">
                  <p className="text-black">pagination</p>
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
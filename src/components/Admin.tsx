'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

function Profile() {
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
            <div className="pt-4 bg-white shadow rounded">
            <div className="px-6 border-b border-blue-50">
                <div className="flex flex-wrap items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold">Project Progress Data</h3>
                    <p className="text-sm text-gray-500 font-medium">List of recent contracts and freelancers</p>
                </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                <thead className="bg-gray-50">
                    <tr className="text-xs text-gray-500 text-left">
                    <th className="flex items-center pl-6 py-4 font-medium">Country</th>
                    <th className="py-4 font-medium">Nombre utilisateur</th>
                    <th className="py-4 font-medium">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-blue-50">
                    <td className="flex items-center py-4 px-6 font-medium">
                        <input className="mr-3" type="checkbox" name="" id="" />
                        <div className="flex px-4 py-3">
                        <img className="w-8 h-8 mr-4 object-cover rounded-md" src="https://images.unsplash.com/photo-1559893088-c0787ebfc084?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt="" />
                        <div>
                            <p className="text-sm font-medium">John Smith</p>
                            <p className="text-xs text-gray-500">Freelancer</p>
                        </div>
                        </div>
                    </td>
                    <td className="font-medium">
                        <p className="text-sm">Example of Project</p>
                        <p className="text-xs text-gray-500">New development</p>
                    </td>
                    <td className="pr-6">
                        <p className="mb-1 text-xs text-indigo-500 font-medium">65%</p>
                        <div className="flex">
                        <div className="relative h-1 w-48 bg-indigo-50 rounded-full">
                            <div className="absolute top-0 left-0 h-full w-2/6 bg-indigo-500 rounded-full"></div>
                        </div>
                        </div>
                    </td>
                    </tr>
                    <tr className="border-b border-blue-50">
                    <td className="flex items-center py-4 px-6 font-medium">
                        <input className="mr-3" type="checkbox" name="" id="" />
                        <div className="flex px-4 py-3">
                        <img className="w-8 h-8 mr-4 object-cover rounded-md" src="https://images.unsplash.com/photo-1559893088-c0787ebfc084?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt="" />
                        <div>
                            <p className="text-sm font-medium">John Smith</p>
                            <p className="text-xs text-gray-500">Freelancer</p>
                        </div>
                        </div>
                    </td>
                    <td className="font-medium">
                        <p className="text-sm">Example of Project</p>
                        <p className="text-xs text-gray-500">New development</p>
                    </td>
                    <td className="pr-6">
                        <p className="mb-1 text-xs text-indigo-500 font-medium">65%</p>
                        <div className="flex">
                        <div className="relative h-1 w-48 bg-indigo-50 rounded-full">
                            <div className="absolute top-0 left-0 h-full w-2/6 bg-indigo-500 rounded-full"></div>
                        </div>
                        </div>
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

export default Profile;
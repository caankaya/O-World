import React from 'react';

function DashboardStats() {
  return (
    <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure dark:text-slate-300 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title dark:text-slate-300">New Users</div>
          <div className="stat-value dark:text-slate-300 text-primary">
            34.7k
          </div>
          <div className="stat-desc  font-bold text-green-700 dark:text-green-300">
            ↗︎ 2300 (22%)
          </div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure dark:text-slate-300 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              ></path>
            </svg>
          </div>
          <div className="stat-title dark:text-slate-300">Total Sales</div>
          <div className="stat-value dark:text-slate-300 text-primary">
            $34,545
          </div>
          <div className="stat-desc  ">Current month</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure dark:text-slate-300 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              ></path>
            </svg>
          </div>
          <div className="stat-title dark:text-slate-300">Pending Leads</div>
          <div className="stat-value dark:text-slate-300 text-primary">450</div>
          <div className="stat-desc  ">50 in hot leads</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure dark:text-slate-300 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title dark:text-slate-300">Active Users</div>
          <div className="stat-value dark:text-slate-300 text-primary">
            5.6k
          </div>
          <div className="stat-desc  font-bold text-rose-500 dark:text-red-400">
            ↙ 300 (18%)
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;

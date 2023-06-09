function Bilboards() {
  return (
    <div className="Bilboards">
      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Amount to be Collected</div>
            <div className="stat-value">$25,600</div>
            <div className="stat-actions">
              <button className="btn btn-xs">View Users</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Cash in hand</div>
            <div className="stat-value">$5,600</div>
            <div className="stat-actions">
              <button className="btn btn-xs">View Members</button>
            </div>
          </div>
        </div>
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure invisible md:visible">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-figure invisible md:visible">
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
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value">2.6M</div>
            <div className="stat-desc">14% more than last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bilboards;

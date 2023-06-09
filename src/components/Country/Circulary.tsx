function Circulary() {
  return (
    <div className="Circulary">
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="text-xl font-semibold">User Signup Source</div>
          <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="normal-case">Source</th>
                    <th className="normal-case">No of Users</th>
                    <th className="normal-case">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Facebook Ads</td>
                    <td>26,345</td>
                    <td>10.2%</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Google Ads</td>
                    <td>21,341</td>
                    <td>11.7%</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Instagram Ads</td>
                    <td>34,379</td>
                    <td>12.4%</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>Affiliates</td>
                    <td>12,359</td>
                    <td>20.9%</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>Organic</td>
                    <td>10,345</td>
                    <td>10.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="text-xl font-semibold">Orders by Category</div>
          <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100">
            <canvas
              role="img"
              height="705"
              width="705"
              style={{
                display: 'block',
                boxSizing: 'border-box',
                height: '705px',
                width: '705px',
              }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Circulary;

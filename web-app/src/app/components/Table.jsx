import { useState } from 'react';
import { MoonLoader } from 'react-spinners';

export default function Table({ data, refetch, isLoading, isFetching }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  }

  const filteredData = data?.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div style={{marginTop: '60px'}} className="container p-3 bg-light">
        <div className="d-flex gap-2 mb-3">
            <input 
                className="form-control" 
                type="search" 
                placeholder="Search by name or symbol" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
                className="btn btn-primary"
                onClick={refetch}
                disabled={isFetching}
            >
                {isFetching ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        Refreshing...
                    </>
                ) : 'Refresh'}
            </button>
        </div>

        <div className="table-responsive">
            <table className="table mt-3 table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">24h%</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Last Updated</th>
                    </tr>
                </thead>
                
                <tbody>
                    {(isLoading && !isFetching) ? (
                        <tr>
                            <td colSpan="7" className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                    ) : filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">No matching coins found</td>
                        </tr>
                    ) : (
                        filteredData.map((coin, index) => (
                            <tr key={coin.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img 
                                            height="35px" 
                                            src={coin.image} 
                                            alt={coin.name} 
                                        />
                                        &nbsp;{coin.name} ({coin.symbol.toUpperCase()})
                                    </div>
                                </td>  
                                <td>{formatCurrency(coin.current_price)}</td>
                                <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td>{formatCurrency(coin.market_cap)}</td>
                                <td>{formatCurrency(coin.total_volume)}</td>
                                <td>{new Date(coin.last_updated).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}
import useAxios from "../hooks/useAxios"
import axios from '../apis/quotesMovies'
import Refresh from '../assets/icon-refresh.svg'


const MoviesQuotes = () => {

    const [quote, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-US',
                'Accept': 'application/json'
            }
        }
    })

    return(

        <article>
            <h2>Random Movie Quote</h2>

            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && quote && <p>{quote?.en}</p>}

            {!loading && !error && !quote && <p>No quote to display.</p>}
            <button 
                className="btn"
                onClick={() => {
                    refetch()
                }}    
                >
                <img 
                    className="refresh"
                    src={Refresh}
                    alt="refresh icon"
                />
            </button>
        </article>
    )

}

export default MoviesQuotes
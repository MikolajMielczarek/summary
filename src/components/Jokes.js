import useAxios from "../hooks/useAxios"
import axios from '../apis/dadJokes'
import Refresh from '../assets/icon-refresh.svg'

const Jokes = () => {

    const [joke, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-US'
            }
        }
    })

    return (
        <article>
            <h2>Random Dad Joke</h2>

            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && joke && <p>{joke?.joke}</p>}

            {!loading && !error && !joke && <p>No dad joke to display.</p>}
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

export default Jokes
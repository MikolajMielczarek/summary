import { useState, useEffect } from "react";

export const useAxiosTime = (configObj) => {

    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData = async () => {
            try{
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal
                })
                setResponse(res.data)
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        setInterval(() => {
            fetchData()
        }, 1000)

        //useEffect cleanup function
        return () => controller.abort()

        //eslint-disable-next-line
    },[])

    return [ response, error, loading ];
}

export default useAxiosTime
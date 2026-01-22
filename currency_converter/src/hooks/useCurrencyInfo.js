import { useEffect, useState } from "react";

// function useCurrencyInfo(currency) {
//     const [data, setData] = useState({})
//     useEffect(()=> {
//         const apiData = fetch( `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        
//         const result = apiData.json();
//         setData(result[currency]);
//         console.log(data)
//     },[currency])
//     console.log(data)
//     return data;

// }

// export default useCurrencyInfo;



function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((res) => setData(res[currency]))
        .catch((error) => console.error('Error fetching currency data:', error))
    }, [currency])
    return data
}

export default useCurrencyInfo;
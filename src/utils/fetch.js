import { useState, useEffect } from 'react'


export function useFetch(url, defaultData) {
    const [data, updateData] = useState(defaultData)

    useEffect(async() =>{
        const response = await fetch(url)
        const text = await response.text()
        updateData(text)
    }, [url])

    return data
}
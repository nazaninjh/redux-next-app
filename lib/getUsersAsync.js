export const getUsers = async () => {
    const res = await fetch('http://localhost:1234/users')
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
     
    return res.json()
    
}
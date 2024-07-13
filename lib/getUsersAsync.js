export const getUsers = async () => {
    const res = await fetch('http://localhost:1200/users')
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data', { next: { revalidate: 60 } });
    }
     
    return res.json()
    
}
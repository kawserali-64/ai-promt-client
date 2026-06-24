export const subscription = async (v) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(v)
    })
    const data = await res.json()
    return data
}
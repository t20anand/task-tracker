export const NormalHeader = {
    'Content-Type':'application/json'
}
export const AuthHeader = {
    'Content-Type':'application/x-www-form-urlencoded',   
    'Authorization': `Bearer ${localStorage.getItem('Usrac')}`,
    'Accept': 'application/json'
}

export const MultiPartHeader = {
    'Content-Type':'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${localStorage.getItem('Usrac')}`,
    'Accept': 'application/x-www-form-urlencoded'
}
export const CHECKHeader = {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Usrac')}`,
    'Accept': 'application/json'
}
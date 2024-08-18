export const ValidatorMaxorMin = (type, limtNum, value) => {
    if (!value) return
    if (type == 'max') {
        if (value.length > limtNum) {
            return `length cannot exceed ${limtNum} characters`;
        }
    } else {
        if (value.length < limtNum) {
            return `length cannot be less than ${limtNum} characters`
        }
    }
}


export const validateConfirmPassword = (value, password) => {
    if (value !== password) {
        return 'The two inputs must be consistent'
    }
    return true
}

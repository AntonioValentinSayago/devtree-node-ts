import bcrypt, { hash } from 'bcrypt'

export const hashPassword = async(password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const checkPassword = async (enteredPassowrd: string, hash: string) =>{
    return await bcrypt.compare(enteredPassowrd, hash);
}
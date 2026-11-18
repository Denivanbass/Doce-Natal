import bcrypt from "bcryptjs";


export async function passwordHash(password: string) {

    const password_hash = bcrypt.hash(password, 10)

    return password_hash;

}
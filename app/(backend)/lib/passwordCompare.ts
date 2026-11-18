import bcrypt from "bcryptjs";

export async function passwordCompare(password: string, password_hash: string) {

    const passwordTrue = bcrypt.compare(password, password_hash)

    return passwordTrue;
}
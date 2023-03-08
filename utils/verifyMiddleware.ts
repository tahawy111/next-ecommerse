import {jwtVerify} from "jose"

interface UserJwtPayload {
    jti: string;
    lat: number;
}

export const verifyAuth = async (token : string) => {

    try {
        const vefified = await jwtVerify(token, new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET))

        return vefified.payload as unknown as UserJwtPayload
    } catch (error) {
        throw new Error('Your token has expired.')
    }

}

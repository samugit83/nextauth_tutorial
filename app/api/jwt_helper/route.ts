import {NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req) {

    const token = await getToken({req, secret})
    console.log(token)

    return NextResponse.json({token: token})

}

import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);
    console.log(session)

    if(session) 

    {
        return NextResponse.json({
            protectedcontent: 'this is my secret content'
        })
    } else {

        return NextResponse.json({
            response: 'access denied'
        })

    }
}
'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { getSession, getCsrfToken, getProviders } from 'next-auth/react';


export default function ProtectedPage() {

    useEffect(() =>
        {
            const fetchData = async () => {

                const Session = await getSession();
                const CsrfToken = await getCsrfToken();
                const Providers = await getProviders();

            }

           fetchData();

        }, 
        []);

    const router = useRouter()
    const { data: session, status, update } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/api/auth/signin')
        }
    })



    if (status === "loading") {
        return "Loading..."
    }

    async function updateSession() {

        await update(
            {
             ...session,
             accountlevel: 'basic'
            }
        )


    }

    return (

        <>
            <p>Signed in as {session.user.name}</p>
            <button onClick={updateSession}>
                Edit user account level
            </button>
        </>

    )



}
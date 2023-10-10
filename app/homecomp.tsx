'use client'

import { useSession, signIn, signOut } from 'next-auth/react';

export default function HomeComp(){

    const {data: session, status} = useSession()

    if(session) {

     console.log(session)

     return (
        <>
            <div className={'textcont'}>Signed in as {session.user.email}</div>
            <button className={'signout'} onClick={() => signOut()}>Sign out</button>
        </>
     )
    }

    return ( 
        <>
            <div className={'textcont'}>Not signed in</div>
            <button className={'signin'} onClick={() => signIn()}>Sign in</button>
        </>
    )

}
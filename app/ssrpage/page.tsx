import { getServerSession, } from "next-auth";
import {  getCsrfToken, getProviders } from 'next-auth/react';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export default async function ServerPage() {

    const providers = await getProviders(authOptions)

    return (JSON.stringify(providers))

}
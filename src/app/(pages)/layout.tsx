// this has to be server component
import { cookies } from "next/headers";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import MainLayout from "src/components/layouts/MainLayout";
import { decrypt, SessionPayload } from "../../lib/encrypt";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session')

    const decoded = await decrypt(sessionToken?.value);

    console.log('decoded:', decoded);

  return <MainLayout session={decoded} >
    <Breadcrumb/>
    { children } 
    </MainLayout>;
}

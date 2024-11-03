"use client";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import MainLayout from "@/app/components/layouts/MainLayout";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{ children } </MainLayout>;
}

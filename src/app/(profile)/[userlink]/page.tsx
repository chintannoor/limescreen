"use client";
import React from 'react'
import SharedViewProfilePage from './_components/profile';
import { sharedViewProfile } from './_actions/viewProfileServerActions';
import { useParams } from 'next/navigation';

const Page = () => {
  return (
    <>
      <SharedViewProfilePage/>
    </>
  )
}
export default Page;

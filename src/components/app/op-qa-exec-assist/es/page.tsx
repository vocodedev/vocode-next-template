'use client'

export const runtime = 'edge';

import dynamic from 'next/dynamic';
import Image from 'next/image'
import Head from 'next/head'

const VocodeAppDynamic = dynamic(() => import('@/components/VocodeApp.client'), { ssr: false });
import ArtisanLogo from '@/components/ArtisanLogo';

import styles from './AndeanHealth.module.css';

export default function AndeanHealthOasisEN() {
  return (
      <main>
        <div className={styles.container}>
          <div className="flex flex-col items-center justify-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto backdrop-blur backdrop-opacity-10 backdrop-invert bg-black/70 bg-opacity-10 rounded-xl p-4 sm:p-0">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-center p-4">
                Andean Health Oasis
              </h1>
            </div>
            <div className="flex flex-row items-center justify-center py-4 flex-wrap">
              <Image src="/images/andean-oasis/andean-oasis-logo.png" alt="Andean Logo" width={150} height={150} className="mx-2"/>
              <ArtisanLogo width={150} height={150}/>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <VocodeAppDynamic defaultBackendUrl="wss://artisan-backend.artisanai.co/andean-oasis/es/recordatorio-medicacion" isInputEditable={false} />
            </div>
          </div>
        </div>
      </main>
  )
}


'use client'

export const runtime = 'edge';

import dynamic from 'next/dynamic';
import Image from 'next/image'
import Head from 'next/head'

// import { Editor } from "novel";


const VocodeAppDynamic = dynamic(() => import('@/components/VocodeApp.client'), { ssr: false });
import ArtisanLogo from '@/components/ArtisanLogo';

import { useState, useEffect } from 'react';

export default function EnglishTutorEN() {
  const [language, setLanguage] = useState('English');
  const [message, setMessage] = useState('Please speak in English');
  const [key, setKey] = useState(0);

  useEffect(() => {
    const languages = ['English', 'Spanish', 'Portuguese'];
    const messages = [
      'Please speak in English',
      'Por favor habla en Español',
      'Por favor fale em Português'
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % languages.length;
      setLanguage(languages[index]);
      setMessage(messages[index]);
      setKey(prevKey => prevKey + 1); // increment key to force re-render
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
      <main>
        <div className="">
          <div className="flex flex-col items-center justify-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto backdrop-blur backdrop-opacity-10 backdrop-invert bg-black/70 bg-opacity-10 rounded-xl p-4 sm:p-0">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center p-4">
                Artisan Investment Memo
              </h1>
            </div>
            <div className="flex flex-row items-center justify-center py-4 flex-wrap">
              <ArtisanLogo width={150} height={150}/>
            </div>
            <div className="flex flex-col justify-center py-4">
              <p>
                Discover the insights of investment with ArtisanLabs Investment Memo, your go-to guide for navigating the complexities of financial investment decisions with ease and confidence
                <br />
                <br />
                You want to change the language?
              </p>
              <p key={key} className={"animate-fade-in-out animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-2xl font-black"}>
                Just Say &quot;{message}&quot;.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <VocodeAppDynamic defaultBackendUrl="wss://artisan-backend.artisanai.co/investment-memo/conversation" isInputEditable={false} />
            </div>
          </div>
        </div>
        {/* <Editor /> */}
      </main>
  )
}


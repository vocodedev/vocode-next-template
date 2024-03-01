'use client'

export const runtime = 'edge';

import dynamic from 'next/dynamic';
import Image from 'next/image'

const VocodeAppDynamic = dynamic(() => import('@/components/vocode-app'), { ssr: false });


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-end">
            <a
              href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvocodedev%2Fvocode-next-template&demo-title=Next.js%2FVercel%20Template%20with%20Vocode's&demo-description=The%20fastest%20way%20to%20build%20Voice%20AI%20application%20with%20Vocode%20and%20Next.js&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fvocodedev%2Fvocode-next-template%2Fmain%2Fpublic%2Freadme_hero.webp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/deploy.svg"
                alt="Deploy with Vercel"
                width={100}
                height={24}
                priority
              />
            </a>
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://docs.vocode.dev?utm_source=vocode-next-vercel-template&utm_medium=vocode-next-vercel-template&utm_campaign=vocode-next-vercel-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                src="/vocode.svg"
                alt="Vocode Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-900 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/vocode.svg"
          alt="Vocode Logo"
          width={280}
          height={37}
          priority
        />
        <a className="text-2xl px-6">/</a>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <p className="text-lg text-center font-semibold dark:text-white">
        The fastest way to build Voice AI application with 
        <a href="https://vocode.dev" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline dark:text-blue-300 dark:hover:underline"> Vocode</a> and 
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline dark:text-blue-300 dark:hover:underline"> Next.js</a>
      </p>
      <div className="flex flex-col items-center justify-center py-4">
        <VocodeAppDynamic defaultBackendUrl={(window.location.protocol === 'https:' ? 'wss:' : 'ws:') + "//" + window.location.host + "/api/python/conversation"} isInputEditable={false} />
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>

    </main>
  );
}

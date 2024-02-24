'use client'

export const runtime = 'edge'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Head from 'next/head'

const VocodeAppDynamic = dynamic(() => import('@/components/VocodeApp.client'), { ssr: false })
import ArtisanLogo from '@/components/ArtisanLogo'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { useState } from 'react'

export default function DialogDealPage() {
  const [crm, setCrm] = useState('SalesForce')

  return (
    <main>
      <Head>
        <title>Artisan DialogDeal AI</title>
      </Head>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-2/6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-center">
              Artisan DialogDeal AI
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <ArtisanLogo width={200} height={200} />
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            {/* <VocodeAppDynamic defaultBackendUrl={`wss://artisan-backend.artisanai.co/dialgdeal/conversation/${crm}`} isInputEditable={false} /> */}
            <VocodeAppDynamic defaultBackendUrl={`wss://artisan-backend.artisanai.co/salesforce/en`} isInputEditable={false} />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-4/6 items-center justify-center">
          <Image src={`/images/DialogDeal/DialogDeal_${crm}_resized.png`} alt="Dashboard Image" width={1024} height={500} />
          <div className="flex flex-col items-center justify-center p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select CRM</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>CRM</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={crm} onValueChange={setCrm}>
                    <DropdownMenuRadioItem value="SalesForce">SalesForce</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="SuiteCRM">SuiteCRM</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Odoo">Odoo</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </main>
  )
}


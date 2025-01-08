import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { LoaderSpinnerBot } from '@/components/loader/loader-spinner-bot/LoaderSpinnerBot'
import { useAuthStore } from '@/stores'

import { Form, SideBox } from './components'

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" />

  return (
    <section className="flex items-center w-full h-screen overflow-auto bg-background">
      {/* Sidebox  */}
      <SideBox />

      <div
        className={`relative m-auto flex w-[480px] flex-col gap-6 rounded-md px-10 py-10 ${loading ? 'pointer-events-none opacity-70' : ''}`}
      >
        {/* Loader */}
        {loading && <LoaderSpinnerBot className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-80" />}

        <header className="flex flex-col items-center gap-3">
          <h1 className="text-xl font-bold text-primary">Inicia sesión con tu cuenta</h1>
          <p className="flex gap-1 text-sm text-secondary">
            <span>¿Solo buscas objetos de pre-producción?</span>
            <Link to="/aligment" className="text-palette-primary-main hover:underline">
              Empieza aquí
            </Link>
          </p>
        </header>

        {/* Formulario */}
        <Form loading={loading} setLoading={setLoading} />
      </div>
    </section>
  )
}

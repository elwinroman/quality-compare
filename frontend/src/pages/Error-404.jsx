import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Error404 as Error404Icon } from '@/icons'

export function Error404() {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/')
  }

  return (
    <section className="grid w-full h-screen place-content-center ">
      <article className="w-full max-w-[448px] flex flex-col text-center items-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-['Barlow'] text-3xl">Lo sentimos, ¡página no encontrada!</h3>
          <p className="text-secondary">No hemos podido encontrar la página que buscas. ¿Quizás has escrito mal la URL?</p>
        </div>

        <Error404Icon />

        <div>
          <Button onClick={handleHome}>Home</Button>
        </div>
      </article>
    </section>
  )
}

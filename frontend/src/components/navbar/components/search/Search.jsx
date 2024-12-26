import { useEffect } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { SearchResult } from './components/search-result/SearchResult'
import { SearchTrigger } from './components/SearchTrigger'
import { useSearch } from './hooks/useSearch'

export function Search() {
  const { open, updateOpen, updateSearch, type, reset, debounceGetSuggestions } = useSearch()

  // detection del input caracter por caracter
  const onInput = (e) => {
    updateSearch(e.target.value)
    debounceGetSuggestions(e.target.value, type.name)
  }

  // bindea CTRL+J para abrir el buscador y resetea los estados de la búsqueda
  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'j') | (e.key === 'J') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        updateOpen((open) => !open)
        reset()
      }
    }

    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [reset, updateOpen, open])

  return (
    <li>
      {/* Abre el dialog de búsqueda */}
      <SearchTrigger reset={reset} updateOpen={updateOpen} />

      {/* Dialog de búsqueda */}
      <Dialog open={open} onOpenChange={updateOpen}>
        <DialogContent className="bg-background-paper shadow-custom-dialog flex h-auto max-h-[50%] min-h-[40%] flex-col gap-1 overflow-hidden p-0">
          <DialogHeader>
            <DialogDescription />
            <DialogTitle className="flex flex-col pt-3.5">
              <span className="bg-background-neutral mx-3.5 w-fit rounded-sm px-1.5 py-0.5 text-xs font-bold text-secondary">
                {type.name}
              </span>
              <input
                className="flex h-10 w-full rounded-sm bg-transparent px-4 font-semibold text-primary file:bg-transparent placeholder:font-normal placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-5"
                placeholder="Busca tu objeto aquí"
                onInput={onInput}
                spellCheck={false}
              />
            </DialogTitle>
          </DialogHeader>

          {/* Separador */}
          <div className="-mx-1 h-px bg-border"></div>

          {/* Body card */}
          <SearchResult />

          {/* <footer className="h-10">Footer</footer> */}
        </DialogContent>
      </Dialog>
    </li>
  )
}

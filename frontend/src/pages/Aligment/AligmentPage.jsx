import { EditorCodeAligment, HeaderEditor, MenuSidebar } from './components'

export function AligmentPage() {
  // const widthPage = '200px'
  // const handleChange = (value) => updateTheme(value)

  return (
    <section className="flex h-screen w-full flex-row">
      <MenuSidebar className="hidden min-w-[200px] max-w-[350px] basis-[30%] flex-col bg-baselayer sm:flex" />

      {/* overflow: hidden fixea bug de autorezise de monaco-editor */}
      <main className="flex w-auto flex-auto flex-col overflow-hidden">
        {/* Cabecera editor */}
        <HeaderEditor />

        {/* Editor code */}
        <EditorCodeAligment />

        <footer className="grid h-10 place-content-center text-sm text-secondary">
          <span>Departamento de Aseguramiento de Calidad 🚀 Developed by aroman</span>
        </footer>
      </main>
    </section>
  )
}

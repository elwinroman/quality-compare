// import { version } from '~/package.json'

export function Footer({ className }) {
  return (
    <footer className={`flex h-20 shrink-0 flex-col items-center justify-center gap-2 ${className}`}>
      <p className="flex flex-col items-center gap-1 text-sm text-secondary">
        <span>Departamento de Aseguramiento de Calidad</span>
        <span>Developed by aroman 🚀 2025</span>
        {/* <span className="text-xs text-amber-400"> v.{version} (beta)</span> */}
      </p>
    </footer>
  )
}

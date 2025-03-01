export function Card({ children, title, className }) {
  return (
    <article className={`flex h-auto w-full flex-col gap-1 overflow-y-auto overflow-x-hidden rounded-sm py-2 ${className}`}>
      <span className="px-4 text-sm font-medium text-secondary">{title}</span>
      <ul className="flex flex-col">{children}</ul>
    </article>
  )
}

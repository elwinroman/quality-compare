import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ClockHour5 as ClockHour5Icon } from '@/icons/clock-hour-5'
import { useAuthStore } from '@/stores/auth.store'
import { useSQLDefinitionStore } from '@/stores/sqldefinition.store'
import { useUserTableStore } from '@/stores/usertable.store'

export function SessionExpiredAlert() {
  const clearAuthStore = useAuthStore((state) => state.clearAuthStore)
  const resetSQLDefinitionStore = useSQLDefinitionStore((state) => state.reset)
  const resetUsertTableStore = useUserTableStore((state) => state.reset)

  const handleClick = () => {
    clearAuthStore()
    resetSQLDefinitionStore()
    resetUsertTableStore()
    useSQLDefinitionStore.persist.clearStorage()
    useUserTableStore.persist.clearStorage()
  }

  return (
    <div>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex items-center gap-2">
            <i className="text-rose-500">
              <ClockHour5Icon width={28} height={28} />
            </i>
            <span>
              Su sesión ha expirado. Por favor, inicia sesión de nuevo.
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <button className="Button mauve" onClick={handleClick}>
                Iniciar sesión
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

import AppWrapper from '@/components/shared/app-wrapper'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <AppWrapper>
        <div>
        <Outlet />
    </div>
    </AppWrapper>
  )
}

export default AppLayout
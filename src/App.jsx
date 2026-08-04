import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { AppRoutes } from './AppRoutes'
import { PageLoadTransition } from './components/PageLoadTransition'

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig initial={false}>
        <PageLoadTransition>
          <AppRoutes />
        </PageLoadTransition>
      </MotionConfig>
    </LazyMotion>
  )
}

export default App

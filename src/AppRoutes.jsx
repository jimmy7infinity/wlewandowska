import { Navigate, Route, Routes } from 'react-router-dom'
import { BeyondTheDumpCaseStudy } from './components/BeyondTheDumpCaseStudy'
import { BosleyMDCaseStudy } from './components/BosleyMDCaseStudy'
import { PeterPizzeriaCaseStudy } from './components/PeterPizzeriaCaseStudy'
import { ScrollToTop } from './components/ScrollToTop'
import { PROJECT_ROUTES } from './data/projectRoutes'
import { CaseStudyPageLayout } from './pages/CaseStudyPageLayout'
import { HomePage } from './pages/HomePage'

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path={PROJECT_ROUTES.beyondTheDump}
          element={
            <CaseStudyPageLayout backHref="/#media" backLabel="← Back to media projects">
              <BeyondTheDumpCaseStudy />
            </CaseStudyPageLayout>
          }
        />
        <Route
          path={PROJECT_ROUTES.peterPizzeria}
          element={
            <CaseStudyPageLayout backHref="/#consultancy" backLabel="← Back to consultancy projects">
              <PeterPizzeriaCaseStudy />
            </CaseStudyPageLayout>
          }
        />
        <Route
          path={PROJECT_ROUTES.bosleyMD}
          element={
            <CaseStudyPageLayout backHref="/#consultancy" backLabel="← Back to consultancy projects">
              <BosleyMDCaseStudy />
            </CaseStudyPageLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

import BonsaiApp from "~pages/_app"
import NewTabPage from "~pages/newtab"

const HomeTab = () => {
  return <BonsaiApp children={<NewTabPage />} />
}

export default HomeTab

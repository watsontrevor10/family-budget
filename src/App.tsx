import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { supabase } from "./supabaseClient"
import { Redirect, Route } from "react-router-dom"
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import {
  barChartOutline,
  listOutline,
  add,
  personCircleOutline,
} from "ionicons/icons"
import Summary from "./pages/Summary"
import Transactions from "./pages/Transactions"
import Add from "./pages/Add"
import Account from "./pages/Account"
import { Login } from "./pages/Login"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

setupIonicReact()

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null)
  
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              exact
              path="/"
              render={() => {
                return session ? <Redirect to="/summary" /> : <Login />
              }}
            />
            <Route exact path="/summary">
              <Summary />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="summary" href="/summary">
              <IonIcon icon={barChartOutline} />
              <IonLabel>Summary</IonLabel>
            </IonTabButton>
            <IonTabButton tab="transactions" href="/transactions">
              <IonIcon icon={listOutline} />
              <IonLabel>Transactions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="add" href="/add">
              <IonIcon icon={add} />
              <IonLabel>Add</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon icon={personCircleOutline} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App

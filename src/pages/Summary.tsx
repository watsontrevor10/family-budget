import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react"
import "./Summary.css"

const Summary: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Primary Note</IonLabel>
          <IonLabel slot="end" color="primary">
            99
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}

export default Summary

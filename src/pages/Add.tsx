import React, { useEffect, useState } from "react"
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  useIonLoading,
  useIonToast,
} from "@ionic/react"
import { supabase } from "../supabaseClient"

import "./Add.css"

const Add: React.FC = () => {
  const [showLoading, hideLoading] = useIonLoading()
  const [showToast] = useIonToast()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString())
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    console.log("get categories")

    await showLoading()
    try {
      let { data: rawCategories, error } = await supabase
        .from("categories")
        .select("*")

      if (error) {
        throw error
      }

      if (rawCategories) {
        console.log(rawCategories)
        setCategories(rawCategories)
      }
    } catch (error: any) {
      showToast({ message: error.message, duration: 5000 })
    } finally {
      await hideLoading()
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Transaction</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="fixed">Amount</IonLabel>
            <IonInput
              type="number"
              placeholder="amount"
              value="amount"
              autofocus={true}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Category</IonLabel>
            <IonSelect
              value={category}
              placeholder="Select One"
              onIonChange={(e) => setCategory(e.detail.value)}
            >
              {categories.map((category) => (
                <IonSelectOption value={category.name}>
                  {category.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Date</IonLabel>
            <IonDatetime
              presentation="date"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Notes</IonLabel>
            <IonInput placeholder="notes" value="notes"></IonInput>
          </IonItem>

          <IonButton>Submit</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Add

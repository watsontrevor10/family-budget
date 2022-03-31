import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react"
import "./Transactions.css"
import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const Transactions: React.FC = () => {
  const [showLoading, hideLoading] = useIonLoading()
  const [showToast] = useIonToast()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    console.log("get transactions")
    await showLoading()
    try {
      let { data: rawTransactions, error } = await supabase
        .from("transactions")
        .select("*")

      if (error) {
        throw error
      }

      if (rawTransactions) {
        console.log(rawTransactions)
        setTransactions(rawTransactions)
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
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          <IonGrid>
            <IonRow class="ion-justify-content-start">
              <IonCol size="3">Category</IonCol>
              <IonCol size="3">Amount</IonCol>
              <IonCol size="3">Date</IonCol>
              <IonCol size="3">Notes</IonCol>
            </IonRow>
            {transactions.map((transaction) => (
              <IonRow class="ion-justify-content-start" key={transaction.id}>
                <IonCol size="3">{transaction.category}</IonCol>
                <IonCol size="3">{transaction.amount}</IonCol>
                <IonCol size="3">{transaction.date}</IonCol>
                <IonCol size="3">{transaction.notes}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  )
}

export default Transactions

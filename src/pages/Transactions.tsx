import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
  IonItem,
  IonLabel,
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
        <IonItem>
          <IonLabel position="fixed">Category</IonLabel>
          <IonLabel position="fixed">Date</IonLabel>
          <IonLabel position="fixed">Amount</IonLabel>
        </IonItem>
        {transactions.map((transaction) => (
          <IonItem>
            <IonLabel position="fixed">{transaction.category}</IonLabel>
            <IonLabel position="fixed">{transaction.date}</IonLabel>
            <IonLabel
              position="fixed"
              color={transaction.isExpense ? `danger` : `success`}
            >
              {transaction.amount}
            </IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  )
}

export default Transactions

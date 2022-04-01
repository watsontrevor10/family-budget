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
  const initialState = {
    amount: "",
    date: new Date().toISOString(),
    category: "",
    note: "",
  }
  const [transaction, setTransaction] = useState(initialState)
  const [showLoading, hideLoading] = useIonLoading()
  const [showToast] = useIonToast()
  const [categories, setCategories] = useState([])

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

  const submitTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await showLoading()

    try {
      const { data, error } = await supabase.from("transactions").insert([
        {
          category: transaction.category,
          amount: transaction.amount,
          date: transaction.date,
          notes: transaction.note,
        },
      ])

      if (error) {
        throw error
      }

      if (data) {
        console.log(data)
        setTransaction(initialState)
        await hideLoading()
        showToast({ message: "Transaction Added", duration: 2000 })
      }
    } catch (error: any) {
      console.log(error)
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
          <form onSubmit={submitTransaction}>
            <IonItem>
              <IonLabel position="fixed">Amount</IonLabel>
              <IonInput
                type="text"
                inputMode="decimal"
                required={true}
                value={transaction.amount}
                autofocus={true}
                onIonChange={(e) =>
                  setTransaction({ ...transaction, amount: e.detail.value! })
                }
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Category</IonLabel>
              <IonSelect
                value={transaction.category}
                placeholder="Select One"
                onIonChange={(e) =>
                  setTransaction({ ...transaction, category: e.detail.value! })
                }
              >
                {categories.map((category) => (
                  <IonSelectOption value={category.name} key={category.id}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Date</IonLabel>
              <IonDatetime
                presentation="date"
                value={transaction.date}
                onIonChange={(e) =>
                  setTransaction({ ...transaction, date: e.detail.value! })
                }
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Notes</IonLabel>
              <IonInput
                placeholder="notes"
                value={transaction.note}
                onIonChange={(e) =>
                  setTransaction({ ...transaction, note: e.detail.value! })
                }
                spellCheck={true}
              ></IonInput>
            </IonItem>

            <IonButton type="submit" color="primary">
              Submit
            </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Add

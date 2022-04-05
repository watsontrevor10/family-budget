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

import "./AddTransaction.css"

const AddTransaction: React.FC = () => {
  const [showLoading, hideLoading] = useIonLoading()
  const [showToast] = useIonToast()
  const [date, setDate] = useState(new Date().toISOString())
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

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
      const { data, error } = await supabase
        .from("transactions")
        .insert([
          { category: category, amount: amount, date: date, notes: note },
        ])

      if (error) {
        throw error
      }

      if (data) {
        console.log(data)

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
                value={amount}
                autofocus={true}
                onIonChange={(e) => setAmount(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Category</IonLabel>
              <IonSelect
                value={category}
                placeholder="Select One"
                onIonChange={(e) => setCategory(e.detail.value!)}
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
                value={date}
                onIonChange={(e) => setDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Notes</IonLabel>
              <IonInput
                placeholder="notes"
                value={note}
                onIonChange={(e) => setNote(e.detail.value!)}
                spellCheck={true}
              ></IonInput>
            </IonItem>

            <IonButton type="submit" fill="clear">
              Submit
            </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default AddTransaction

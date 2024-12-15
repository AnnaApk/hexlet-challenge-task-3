"use client"
import AddDocumentForm from "@/components/AddDocumentForm";
import styles from "./page.module.css";
import KanbanBoard from "@/components/KanbanBoard";
import { Provider } from "react-redux";
import { store } from "../app/store/store";

export default function Home() {
  return (
    <Provider store={store}>
    <div className={styles.page}>
      <main>
        <AddDocumentForm />
        <KanbanBoard />
      </main> 
    </div>
    </Provider>
  );
}

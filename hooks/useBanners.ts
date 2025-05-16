// src/hooks/useBanners.ts
import { firestore } from "@/utils/firebaseConfig";
import {
  collection,
  DocumentData,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export interface Banner {
  id: number;
  src: string;
}

export function useBanners(): Banner[] {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    // listen in real-time to your "appConfig" collection
    const q = query(collection(firestore, "appConfig"), orderBy("id", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const d = doc.data();
            return { id: d.id as number, src: d.src as string };
          }
        );
        setBanners(data);
      },
      (error: FirestoreError) => {
        console.warn("❌ failed to fetch banners:", error);
      }
    );

    return unsubscribe;
  }, []);

  return banners;
}

// src/hooks/useBanners.ts
import { firestore } from "@/utils/firebaseConfig";
import {
  collection,
  DocumentData,
  Firestore,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export interface Banner {
  id: number | string;
  src: string;
}

export function useBanners(): Banner[] {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔍 Starting to fetch banners from Firebase...");

    try {
      // listen in real-time to your "appConfig" collection
      const q = query(
        collection(firestore as Firestore, "appConfig"),
        orderBy("id", "asc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(
            "📥 Received Firestore snapshot with",
            snapshot.docs.length,
            "documents"
          );
          const data = snapshot.docs.map(
            (doc: QueryDocumentSnapshot<DocumentData>) => {
              const d = doc.data();
              console.log("📄 Banner document data:", d);
              return { id: d.id, src: d.src as string };
            }
          );
          console.log("✅ Processed Firebase banners:", data);
          setBanners(data);
          setError(null);
        },
        (error: FirestoreError) => {
          console.error(
            "❌ Failed to fetch banners from Firebase:",
            error.code,
            error.message
          );
          setError(error.message);
          setBanners([]);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error("❌ Error setting up Firebase banner listener:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      return () => {};
    }
  }, []);

  // If there's an error, log it to help with debugging
  useEffect(() => {
    if (error) {
      console.error("🚨 Banner loading error:", error);
    }
  }, [error]);

  return banners;
}

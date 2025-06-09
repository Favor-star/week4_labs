import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../config/";
import type { ReviewProps } from "..";
import type { LoaderFunctionArgs } from "react-router";

const db = getFirestore(app);
export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(classNames));
};

export const addReviewToFirebase = async ({
  movieId,
  reviewId,
  reviewMessage,
  dateAdded,
  rating,
  reviewerName,
}: ReviewProps) => {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      movieId,
      reviewId,
      reviewMessage,
      rating,
      reviewerName,
      dateAdded,
    });
    console.log("Document written with ID: ", docRef.id);
    return { status: true, message: "Added successfully", docId: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { status: false, message: "Not added", docId: null };
  }
};
export const getReviewsFromFirebase = async (movieId: string) => {
  const q = query(collection(db, "reviews"), where("movieId", "==", movieId));
  const querySnapshot = await getDocs(q);
  let data: ReviewProps[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data() as ReviewProps);
    // console.log(doc.id, " => ", doc.data());
  });
  return data;
};

export async function movieReviewLoader({ params }: LoaderFunctionArgs) {
  const id = params.id ? params.id : "";
  const response = getReviewsFromFirebase(id);

  return response;
}

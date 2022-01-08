import {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";

export interface IFirebaseStoreService {
  getDocuments: (
    collectionName: string,
    orderBy?: string
  ) => Promise<{ [key: string]: any }>;
}

export class FirebaseStoreService implements IFirebaseStoreService {
  private firebaseStore: Firestore;
  constructor(firebaseStore: Firestore) {
    this.firebaseStore = firebaseStore;
  }

  public async getDocuments(collectionName: string, _orderBy?: string) {
    const querySnapshot = await getDocs(
      query(
        collection(this.firebaseStore, collectionName),
        ...(_orderBy ? [orderBy(_orderBy)] : [])
      )
    );
    const docs = querySnapshot.docs;
    const res: { [key: string]: any } = {};
    docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      res[doc.id] = data;
    });
    return res;
  }
}

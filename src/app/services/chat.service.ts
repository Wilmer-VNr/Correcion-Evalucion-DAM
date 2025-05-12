import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Message {
  name: string;
  lastName: string;
  age: number;
  email: string;
  pass: string;
  telf: number;
  direccion: string;
  fechaNacimiento: string;
  colorFavorito: string[];
  createdAt: number;
  sender: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  getMessages(): Observable<Message[]> {
    const messagesRef = collection(this.firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }

  sendMessage(
    name: string,
    lastName: string,
    age: number,
    email: string,
    pass: string,
    telf: number,
    direccion: string,
    fechaNacimiento: string,
    colorFavorito: string[],
    sender: string
  ) {
    const messagesRef = collection(this.firestore, 'messages');
    const message: Message = {
      name,
      lastName,
      age,
      email,
      pass,
      telf,
      direccion,
      fechaNacimiento,
      colorFavorito,
      createdAt: Date.now(),
      sender
    };
    return addDoc(messagesRef, message);
  }
}

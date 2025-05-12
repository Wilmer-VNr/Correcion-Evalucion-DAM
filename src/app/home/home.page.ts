import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from '../services/chat.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, ReactiveFormsModule, IonItem, IonLabel,
    IonInput, IonButton, IonSelect, IonSelectOption, IonToast
  ]
})
export class HomePage implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  messages: Message[] = [];

  // Formulario de evento
  eventForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    pass: ['', Validators.required],
    telf: [0, Validators.required],
    direccion: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    colorFavorito: [[], Validators.required],  
    sender: ['Wilmer Vargas', Validators.required]
  });

  constructor(private chatService: ChatService) {addIcons({});}

  ngOnInit() {
    this.chatService.getMessages().subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;

      // Aseguramos que fechaNacimiento sea un string válido
      if (eventData.fechaNacimiento) {
        eventData.fechaNacimiento = new Date(eventData.fechaNacimiento).toISOString();
      } else {
        eventData.fechaNacimiento = '';  // Asignamos un valor por defecto si no se proporciona
      }

      this.chatService.sendMessage(
  eventData.name!,
  eventData.lastName!,
  eventData.age!,
  eventData.email!,
  eventData.pass!,
  eventData.telf!,
  eventData.direccion!,
  eventData.fechaNacimiento,
  eventData.colorFavorito!, // 👈 este argumento faltaba
  eventData.sender!
);

      // Reseteamos el formulario después de enviar el mensaje
      this.eventForm.reset();
    }
  }
}

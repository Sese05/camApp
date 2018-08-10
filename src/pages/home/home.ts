import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Flashlight } from '@ionic-native/flashlight';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public photos : any;
public base64Image : string;



  constructor(public navCtrl: NavController, private camera:Camera, private alertCtrl:AlertController,private flash:Flashlight) {
  
  }
 
  ngOnInit() {
    this.photos = [];
  }
 
  takePhoto(switchOn){
    const options : CameraOptions = {
      quality: 50, 
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      saveToPhotoAlbum:true
    }
 
    this.camera.getPicture(options) .then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
}

deletePhoto(index) {
    this.photos.splice(index, 1);
  let confirm =this.alertCtrl.create({
    title: 'Sure you want to delete this photo?',
    message:'',
    buttons:[
      {
        text: 'No',
        handler: () => {
          console.log('Disagree clicked');
        }
      },{
        text: 'Yes',
        handler: () =>{
          console.log('Agree clicked');
              this.photos.splice(index, 1);
        }
      }
    ]
  });
  confirm.present();
 }
 accessGallery(){
  const options : CameraOptions = {
    quality: 100, 
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    saveToPhotoAlbum:true
  }
  this.camera.getPicture(options) .then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;
    this.photos.push(this.base64Image);
    this.photos.reverse();
  }, (err) => {
    console.log(err);
  });
  }
  toggle()
  {
  this.flash.toggle();
  }
}
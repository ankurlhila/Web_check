import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-aud',
  templateUrl: './aud.component.html',
  styleUrls: ['./aud.component.css']
})
export class AudComponent implements OnInit {
  // title = 'record-app';
  // isRecording = false;
  // private record!: RecordRTC.StereoAudioRecorder;
  // // private url;
  // private urls = [];
  // private error!: string;

  // constructor(private domSanitizer: DomSanitizer) {
  // }
  // startRecording() {
  //   this.isRecording = true;
  //   let mediaConstraints = {
  //     video: false,
  //     audio: true
  //   };
  //   navigator.mediaDevices
  //     .getUserMedia(mediaConstraints)
  //     .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  // }

  // successCallback(stream: MediaStream) {
  //   var options = {
  //     mimeType: "audio/wav",
  //     numberOfAudioChannels: 1
  //   };

  //   //Start Actuall Recording
  //   var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  //   this.record = new StereoAudioRecorder(stream, options);
  //   this.record.record();
  // }

  // stopRecording() {
  //   this.isRecording = false;
  //   this.record.stop(this.processRecording.bind(this));
  // }

  // processRecording(blob: Blob | MediaSource) {
  //   this.urls.push(URL.createObjectURL(blob))  ;
  // }

  // sanitize(url: string) {
  //   return this.domSanitizer.bypassSecurityTrustUrl(url);
  // }

  // errorCallback(error: any) {
  //   this.error = 'Can not play audio in your browser';
  // }
  audioContext!: AudioContext;
  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];

  ngOnInit() {
    this.audioContext = new AudioContext();
  }

  async startRecording() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaStreamSource = this.audioContext.createMediaStreamSource(mediaStream);
      const options = { mimeType: 'audio/webm' };
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(mediaStream, options);
      this.mediaRecorder.addEventListener('dataavailable', (event) => this.handleDataAvailable(event));
      this.mediaRecorder.start();
      console.log('Recording started.');
    } catch (error) {
      alert( error);
    }}

  handleDataAvailable(event: BlobEvent) {
    if (event.data.size > 0) {
      this.recordedChunks.push(event.data);
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.mediaRecorder.removeEventListener('dataavailable', event => this.handleDataAvailable(event));
    console.log('Recording stopped.');
  }

  playRecording() {
   try{ 
    const recordedBlob = new Blob(this.recordedChunks, { type: 'audio/webm' });
    const audioElement = new Audio();
    audioElement.src = URL.createObjectURL(recordedBlob);
    audioElement.controls = true;
    audioElement.play();}
    catch(error)
      {
        alert(error);
      }
  }


}

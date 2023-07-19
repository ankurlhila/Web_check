import {   Component,  ViewChild,  OnInit,  ElementRef} from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-vid',
  templateUrl: './vid.component.html',
  styleUrls: ['./vid.component.css']
})
export class VidComponent {
  panelOpenState = false;
  videoElement!: HTMLVideoElement;
    recordVideoElement!: HTMLVideoElement;
    mediaVideoRecorder: any;
    videoRecordedBlobs!: Blob[];
    isRecording: boolean = false;
    downloadVideoUrl!: string;
    stream!: MediaStream;
    @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef;
    @ViewChild('liveVideo') videoElementRef!: ElementRef;
    constructor() {}
    async ngOnInit() {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 480
            }
        }).then(stream => {
            this.videoElement = this.videoElementRef.nativeElement;
            this.recordVideoElement = this.recordVideoElementRef.nativeElement;
            this.stream = stream;
            this.videoElement.srcObject = this.stream;
        });
    }
    startVideoRecording() {
        this.videoRecordedBlobs = [];
        let options: any = {
            mimeType: 'video/webm'
        };
        try {
            this.mediaVideoRecorder = new MediaRecorder(this.stream, options);
        } catch (err) {
            alert("Please Check Permissions");
        }
        this.mediaVideoRecorder.start();
        this.isRecording = !this.isRecording;
        this.onDataAvailableVideoEvent();
        this.onStopVideoRecordingEvent();
    }
    stopVideoRecording() {
        this.mediaVideoRecorder.stop();
        this.isRecording = !this.isRecording;
    }
    playRecording() {
        if (!this.videoRecordedBlobs || !this.videoRecordedBlobs.length) {
            return;
        }
        this.recordVideoElement.play();
    }
    onDataAvailableVideoEvent() {
        try {
            this.mediaVideoRecorder.ondataavailable = (event: any) => {
                if (event.data && event.data.size > 0) {
                    this.videoRecordedBlobs.push(event.data);
                }
            };
        } catch (error) {
            alert(error);
        }
    }
    onStopVideoRecordingEvent() {
        try {
            this.mediaVideoRecorder.onstop = (event: Event) => {
                const videoBuffer = new Blob(this.videoRecordedBlobs, {
                    type: 'video/webm'
                });
                this.downloadVideoUrl = window.URL.createObjectURL(videoBuffer);
                this.recordVideoElement.src = this.downloadVideoUrl;
            };
        } catch (error) {
            alert(error);
        }
    }
    

}




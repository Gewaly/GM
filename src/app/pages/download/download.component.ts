import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
  inputData: String = "";
  uploadFileNames: string[] = [];
  fileUrl = "https://api.escuelajs.co/api/v1/files/upload";
  fileNameUrl = "https://api.escuelajs.co/api/v1/files/";
  constructor(private http: HttpClient) { }













  onFileChange(event: any) {
    const file = event.currentTarget.files[0];
    if (file.type.startsWith('image/')) {
      const formObj = new FormData();
      formObj.append('file', file);
      this.http.post(this.fileUrl, formObj).subscribe((res: any) => {

        console.log(res);
        this.uploadFileNames.push(res.filename);
        console.log(this.uploadFileNames);
      })
      this.inputData = "";
    }
    else {

      alert('Please select a valid file')
    }

  }
  downloadFile(filename: string) {

  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { extractInfo, FileUploadInfo, IsFileSmallerThan } from '../../../tools/upload-file';

@Component({
  selector: 'app-class-chat-input',
  templateUrl: './class-chat-input.component.html',
  styleUrls: ['./class-chat-input.component.scss'],
})
export class ClassChatInputComponent implements OnInit {

  @ViewChild('inputFile')
  inputFile: ElementRef<HTMLInputElement>;

  chatForm: FormGroup;

  messageInput: FormControl = new FormControl('');
  fileInput: FormControl = new FormControl(
    [] as FileUploadInfo[],
    [Validators.maxLength(5)],
  );

  isReadingFile = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  sendChatMessage() {

  }

  getValue($event: KeyboardEvent) {
    const domInput = $event.target as HTMLDivElement;
    this.messageInput.setValue(domInput.innerText);
    console.dir(this.messageInput.value);
  }

  fileUpload(fileEvent: Event) {
    const target = fileEvent.target as HTMLInputElement;
    if (target.files.length > 0) {
      if (target.files.length > 5 || target.files.length + this.fileInput.value.length > 5) {
        return this.outputFileUploadError('5 File is the maximum upload each time.');
      }

      const fileLength = target.files.length;
      this.isReadingFile = true;
      for (let i = 0; i < fileLength; i++) {
        if (!IsFileSmallerThan(target.files.item(i), 3000)) {
          return this.outputFileUploadError('File must be smaller than 3MB each.');
        }
        const fileInfo = extractInfo(target.files.item(i));
        if (!fileInfo) {
          return this.outputFileUploadError('File upload format is not allowed.');
        }
        const currentFiles = this.fileInput.value as FileUploadInfo[];
        currentFiles.push(fileInfo);
      }
    }
  }

  outputFileUploadError(message: string) {
    // TODO Output error
    console.log(message);
    this.inputFile.nativeElement.value = null;
  }
}

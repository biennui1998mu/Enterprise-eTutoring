import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { extractInfo, FileUploadInfo, getPreviewBase64, IsFileSmallerThan } from '../../../tools';
import { Classroom } from '../../../interface/Classroom';
import { MessageService } from '../../../services/state/classroom-message';
import { UserQuery } from '../../../services/state/user';
import { Message } from '../../../interface/Message';
import { FileService } from '../../../services/state/classroom-file';
import { UserInterfaceService } from '../../../services/state/user-interface';

@Component({
  selector: 'app-class-chat-input',
  templateUrl: './class-chat-input.component.html',
  styleUrls: ['./class-chat-input.component.scss'],
})
export class ClassChatInputComponent implements OnInit {
  @Input()
  classroom: Classroom;

  @ViewChild('inputFile')
  inputFile: ElementRef<HTMLInputElement>;

  @ViewChild('chatInput')
  chatInput: ElementRef<HTMLDivElement>;

  chatForm: FormGroup;

  contentInput: FormControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(1)],
  );

  isFileUploading = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private fileService: FileService,
    private uiStateService: UserInterfaceService,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      classroom: [this.classroom._id, [Validators.required]],
      byUser: [this.userQuery.getValue()._id, [Validators.required]],
      content: this.contentInput,
    });
  }

  sendChatMessage() {
    if (this.chatForm.valid) {
      const message: Message<any, any> = this.chatForm.value;
      this.messageService.sendMessage(message).subscribe(
        () => {
          this.contentInput.setValue('');
          this.chatInput.nativeElement.innerHTML = '';
        },
      );
    }
    return;
  }

  getValue($event: KeyboardEvent) {
    const domInput = $event.target as HTMLDivElement;
    this.contentInput.setValue(domInput.innerText);
  }

  fileUpload(fileEvent: Event) {
    const target = fileEvent.target as HTMLInputElement;
    if (target.files.length > 0) {
      if (target.files.length > 1) {
        // Limit 1 files upload each time
        return this.outputFileUploadError('1 files is the maximum upload each time.');
      }
      this.isFileUploading = true;

      if (!IsFileSmallerThan(target.files.item(0), 3000)) {
        return this.outputFileUploadError('File must be smaller than 3MB each.');
      }

      const fileInfo = extractInfo(target.files.item(0));
      if (!fileInfo) {
        return this.outputFileUploadError('File upload format is not allowed.');
      }

      if (fileInfo.type === 'image' && fileInfo.extension !== 'svg') {
        getPreviewBase64(fileInfo.selfInstance).then(base64 => {
          if (base64) {
            this.outputFileUploadSuccess(fileInfo, base64);
          } else {
            this.outputFileUploadError('Cannot preview the files.');
          }
        });
      } else {
        this.outputFileUploadSuccess(fileInfo);
      }
    }
  }

  outputFileUploadError(message: string) {
    this.isFileUploading = false;
    this.inputFile.nativeElement.value = null;
    this.uiStateService.setError(message);
  }

  outputFileUploadSuccess(file: FileUploadInfo, base64?: string) {
    this.inputFile.nativeElement.value = null;
    const formData = new FormData();
    formData.append('classroom', this.classroom._id);
    formData.append('file', file.selfInstance, file.filename);
    this.fileService.uploadFile(formData).subscribe(fileResponse => {
      this.isFileUploading = false;
      console.log(fileResponse);
    });
  }
}

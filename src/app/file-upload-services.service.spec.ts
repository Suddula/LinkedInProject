import { TestBed } from '@angular/core/testing';

import { FileUploadServicesService } from './file-upload-services.service';

describe('FileUploadServicesService', () => {
  let service: FileUploadServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

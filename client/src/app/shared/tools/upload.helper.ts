export enum StorageUnit {
  // 1 byte = 8 bits
  byte,
  // 8 bits = 1 byte
  bit,
  // KiloBytes
  KB,
  // KiloBits
  Kb,
  // MegaBytes
  MB,
  // MegaBits
  Mb,
}

export function ByteToKB(byte: number) {
  return byte / 1000;
}

export function KBToMB(kilobytes: number) {
  return kilobytes / 1000;
}

export interface FileUploadInfo {
  filename: string;
  size: number;
  extension: string;
  type: string;
  selfInstance: File;
}

/**
 * Available font for upload
 * Taken from: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export const mimeMapper = Object.freeze({
  image: {
    gif: {
      type: 'image',
      extension: 'gif',
    },
    png: {
      type: 'image',
      extension: 'png',
    },
    jpeg: {
      type: 'image',
      extension: 'jpeg',
      pseudoExtension: true,
    },
    jpg: {
      type: 'image',
      extension: 'jpeg',
      pseudoExtension: true,
    },
    svg: {
      type: 'image',
      extension: 'svg',
    },
    webp: {
      type: 'image',
      extension: 'webp',
    },
  },
  application: {
    msword: {
      type: 'Microsoft Word',
      extension: 'doc',
    },
    'vnd.openxmlformats-officedocument.wordprocessingml.document': {
      type: 'Microsoft Word',
      extension: 'docx',
    },
    'vnd.ms-excel': {
      type: 'Microsoft Excel',
      extension: 'xls',
    },
    'vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      type: 'Microsoft Excel',
      extension: 'xlsx',
    },
    'vnd.ms-powerpoint': {
      type: 'Microsoft Powerpoint',
      extension: 'ppt',
    },
    'vnd.openxmlformats-officedocument.presentationml.presentation': {
      type: 'Microsoft Powerpoint',
      extension: 'pptx',
    },
    'vnd.rar': {
      type: 'RAR Archive',
      extension: '.rar',
    },
    zip: {
      type: 'ZIP archive',
      extension: '.zip',
    },
    'x-7z-compresse': {
      type: '7-zip archive',
      extension: '.7z',
    },
    xml: {
      type: 'XML',
      extension: '.xml',
    },
    json: {
      type: 'JSON format',
      extension: '.json',
    },
  },
  audio: {
    mpeg: {
      type: 'MP3 audio',
      extension: '.mp3',
    },
  },
});

/**
 * get the information of the files
 * @param file
 * @param option
 */
export function extractInfo(file: File, option?: {
  sizeUnit?: StorageUnit
  specifiedType?: 'image' | 'application'
}): FileUploadInfo {
  const filename = file.name;
  const fileSizeRaw = file.size;
  let size = ByteToKB(fileSizeRaw);

  if (option && option.sizeUnit) {
    switch (option.sizeUnit) {
      case StorageUnit.MB:
        size = KBToMB(size);
        break;
    }
  }
  const mimeInfo = extractMimeInfo(file.type);

  let { type, extension, pseudoExtension } = mimeInfo;
  if (option?.specifiedType) {
    if (type !== option.specifiedType) {
      return null;
    }
  }

  if (pseudoExtension) {
    const fileSplit = filename.split('.');
    extension = fileSplit[fileSplit.length - 1];
  }

  return {
    filename,
    type,
    size,
    extension,
    selfInstance: file,
  };
}

export function extractMimeInfo(fileType: string):
  { type: string, extension: string, pseudoExtension?: boolean } {
  const splitMime = fileType.split('/');
  if (splitMime.length < 2) {
    // MIME part is not correct format
    // must be <type>/<identify>
    return null;
  }
  const typeFile = mimeMapper[splitMime[0]];
  if (!typeFile) {
    return null;
  }
  const mimeInfo = typeFile[splitMime[1]];
  if (!mimeInfo) {
    return null;
  }
  return mimeInfo;
}

/**
 * If the file is smaller than the specified size
 * @param file
 * @param sizeKb
 * @constructor
 */
export function IsFileSmallerThan(file: File, sizeKb: number = 3000) {
  const fileSize = ByteToKB(file.size);
  return fileSize < sizeKb;
}

/**
 * get the base64 string buffer to preview the (image) files
 * @param file
 */
export function getPreviewBase64(
  file: File,
): Promise<string> {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = function (progressEvent) {
      resolve(progressEvent.target.result as string);
    };
    fileReader.onerror = function (progressEvent) {
      console.log(progressEvent);
      resolve(null);
    };
    fileReader.readAsDataURL(file);
  });
}

export function isValidImage(base64: string): Promise<boolean> {
  const image = new Image();
  return new Promise(resolve => {
    image.onload = function (loadEvent) {
      const target = loadEvent.target as HTMLImageElement;
      resolve(!(target.height === 0 && target.width === 0));
    };
    image.onerror = function (loadEvent) {
      console.error(loadEvent);
      resolve(false);
    };
    image.src = base64;
  });
}

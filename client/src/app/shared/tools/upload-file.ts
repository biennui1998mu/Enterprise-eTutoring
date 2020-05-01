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
 * get the information of the file
 * @param file
 * @param option
 */
export function extractInfo(file: File, option?: {
  sizeUnit?: StorageUnit
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
  const splitMime = file.type.split('/');
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

  let { type, extension, pseudoExtension } = mimeInfo;

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

export function IsFileSmallerThan(file: File, sizeKb: number) {
  const fileSize = ByteToKB(file.size);
  return fileSize < sizeKb;
}

/**
 * get the base64 string buffer to preview the (image) file
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
    fileReader.readAsDataURL(file);
  });
}

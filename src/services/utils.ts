export const formatFileSize = (sizeInBytes : number) => {
    if (sizeInBytes < 1024) {
        return sizeInBytes + " B";
    } else if (sizeInBytes < 1024 * 1024) {
        return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
        return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
}


export const  getLastElementUppercase = (name : string) => {
    const parts = name.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.toUpperCase();
}




export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file as base64 string.'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };
  

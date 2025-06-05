export function blobToObject(blob:Blob) {
    return blob.arrayBuffer().then((buffer)=>{
        const view = new Uint8Array(buffer);
        const decoder = new TextDecoder();
        const jsonString = decoder.decode(view);
        const obj = JSON.parse(jsonString);
        return obj;
    })
  }
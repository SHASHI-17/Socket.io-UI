

const fileFormat = (url = '') => {
    const fileExt = (url.split(".").pop()).split('?')[0];
    console.log(fileExt.split('?')[0]);
    if (fileExt === 'mp4' || fileExt === 'ogg' || fileExt === 'webm') return "video"
    if (fileExt === 'mp3' || fileExt === 'wav') return "audio"
    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg'
        || fileExt === 'webp' || fileExt === 'gif') return "image"

    return 'file'
}

const transformImage = (url = '',width=100) => url

export { fileFormat, transformImage }
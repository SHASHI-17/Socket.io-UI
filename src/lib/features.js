import moment from "moment";


const fileFormat = (url = '') => {
    const fileExt = (url.split(".").pop()).split('?')[0];
    console.log(fileExt.split('?')[0]);
    if (fileExt === 'mp4' || fileExt === 'ogg' || fileExt === 'webm') return "video"
    if (fileExt === 'mp3' || fileExt === 'wav') return "audio"
    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg'
        || fileExt === 'webp' || fileExt === 'gif') return "image"

    return 'file'
}

const transformImage = (url = '', width = 100) => {

    const newUrl=  url.replace("upload/",`upload/dpr_auto/w_${width}/`)

    return newUrl;
}

const getLast7Days = () => {
    const currentDate=moment();
    const last7Days=[];
    for(let i=0;i<7;i++){
        const dayDate=currentDate.clone().subtract(i,'days');
        const dayName=dayDate.format("dddd");
        last7Days.unshift(dayName);
    }
    return last7Days
}

export { fileFormat, transformImage, getLast7Days }
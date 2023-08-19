//图片资源处理
//将获取到的头像转为url
function imageToUrl(imgData,avatar_type){
    let blob = null;
    if(/^data:.*;base64,/.test(imgData)){
        //将base图片转为二进制图片
        const byteCharacters = atob(imgData.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        blob = new Blob([new Uint8Array(byteNumbers)], {type: `image/${avatar_type}`});
    }else{
        // 假设 imgData 为 JPG 图片的二进制数据
        blob = new Blob([imgData], { type: `image/${avatar_type}`});
    }
    //返回引用地址
    let imageUrl = null;
    imageUrl = window.URL.createObjectURL(blob);
    // 生成图片的url地址
    return imageUrl;
}

export default imageToUrl;
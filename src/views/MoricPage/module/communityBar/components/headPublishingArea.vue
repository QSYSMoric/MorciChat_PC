<template>
    <header class="postUpdates">
        <div class="updatesPrompt">
            <i></i>
            <span>
                发布动态
            </span>
        </div>
        <div class="updateText">
            <div class="textareaSuround">
                <textarea 
                placeholder="有什么要分享的吗..."
                :style="{ height: textareaHeight }"
                v-model="inputText.value"
                ref="textareaNode">
                </textarea> 
                <ul class="dynamicPhotoArea">
                    <li v-for="(imgData,key) in displayUploadImg" :key="key">
                        <div class="deleteImg" @click="deleteUpdatePicture(key)" key="2">
                            
                        </div>
                        <img :src="imgData" :alt="key">
                    </li>
                    <li class="uploadPictures" @click.capture="upDatesImg" v-if="displayUploadImg.length">
                        <span></span>
                    </li>
                </ul>
            </div>
            <div class="selectionArea">
                <ul class="functionSelection">
                    <li>
                        
                    </li>
                    <li @click.self.capture="upDatesImg">
                        
                        <input type="file" 
                        title="headSculpture" 
                        id="updateImg" 
                        ref="updateImg">
                    </li>
                </ul>
                <div class="updateright">
                    <span>
                         {{inputText.value.length}}/200
                    </span>
                    <button class="publishUpdate" @click="publishMoments">
                        发表
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
  
<script setup> 
    import { ref,computed, reactive  } from "vue";
    import Prompt from "@/components/GlobalPrompt/index";
    import MoricMoments from "../scripts/MoricMoments";
    const textareaNode = ref("");
    const updateImg = ref(null);
    const inputText = reactive({
        value:"",
    });
    const displayUploadImg = ref([]);
    const UploadImgData = new FormData();
    //点击触发图片上传函数
    function upDatesImg(){
        // 创建一个新的FormData对象
        const fileNode = updateImg.value;
        fileNode.click();
        getUserUpdateImages(fileNode).then(()=>{
            console.log("文件上传成功");
        }).catch((err)=>{
            Prompt(err,false,1500);
        });
        console.log("被点击");
    }
    //异步执行用户上传图片的获取
    async function getUserUpdateImages(fileNode){
        return new Promise((resolve,reject)=>{
            fileNode.addEventListener("change",function hand(){
                const files = fileNode.files;
                // 遍历每个文件
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    displayUploadImg.value.push(window.URL.createObjectURL(file));
                    // 检查文件类型为图片
                    if (!file.type.startsWith('image/')) {
                        reject(new Error('只能上传图片文件'));
                        return;
                    }
                    // 将图片转换为 base64
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const base64Img = reader.result;
                        // 在这里进行 base64 存储操作
                        const length = Array.from(UploadImgData.entries()).length;
                        UploadImgData.append(`img${length}`,base64Img);
                        // ...
                    };
                }
                resolve(files);                
            },{once: true});
        });
    }
    //发布朋友圈
    function publishMoments(){
        //获取图片列表
        let formImgDataArray = Array.from(UploadImgData.values());
        //获取文字列表
        let formTextData = inputText.value;
        if(!formImgDataArray.length && !formTextData){
            Prompt("没有东西分享噢",false,1500);
            return;
        }
        let userMoments = new MoricMoments(formTextData,formImgDataArray);
        userMoments.publish().then((data)=>{
            Prompt("发布成功",true,1500);
        });
    }
    //删除指定照片
    function deleteUpdatePicture(key){
        displayUploadImg.value.splice(key,1);
        UploadImgData.delete(`img${key}`);
    }
    //自动增加高
    const textareaHeight = computed(()=>{
        return inputText.value ? `${textareaNode.value.scrollHeight}px` : '2em';
    });
</script>
  
<style>
    .postUpdates{
        width: 100%;
        padding: 20px; 
        /* background: rgba(255,255,255,0.8); */
        background: #ffffff;
        backdrop-filter: blur(30px);
        border-radius: 15px;
    }
    .updatesPrompt{
        cursor: default;
        width: max-content;
        font-size: 10pt;
        padding: 5pt 8pt;
        border-radius: 1em;
        color: #8f8e94;
        background: #f0eff5;
    }
    .updatesPrompt i{
        font-style: normal;
    }
    .updateText{
        min-height: 3em;
        padding: 5pt 0;
    }
    .textareaSuround{
        padding: 8pt 3px;
        width: 100%;
        min-height: 1em;
    }
    .dynamicPhotoArea{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill,92px);
        grid-auto-rows: 92px;
        gap: 10px;
    }
    .dynamicPhotoArea li{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .deleteImg{
        color: #ffffff;
        font-size: 10pt;
        cursor: pointer;
        padding: 3px;
        background: rgba(0, 0, 0, .6);
        border-radius: 50%;
        position: absolute;
        top: 5px;
        transition: all .2s linear;
        transform-origin: center;
        right: 10px;
    }
    .deleteImg:hover{
        transform: scale(1.1);
    }
    .dynamicPhotoArea li img{
        border-radius: 10px;
        object-fit: cover;
        object-position: center;
        width: 92px;
        height: 92px;
    }
    .uploadPictures{
        border-style: dashed;
        border-width: 2px;
        border-color: rgb(200, 199, 205);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        cursor: pointer;
    }
    .updateText textarea{
        appearance: none;
        border: none;
        background: transparent;
        outline: none;
        width: 100%;
        height: 1em;
        box-sizing: border-box;
        resize: none;
        overflow: hidden;
        font-size: .8em;
    }
    .updateText textarea::placeholder{
        font-size: 1em;
        font-family: 'IOS';
    }
    .selectionArea{
        width: 100%;
        height: 20pt;
        display: flex;
        justify-content: space-between;
    }
    .functionSelection{
        display: flex;
        height: 100%;
        justify-content: space-between;
    }
    .functionSelection li{
        cursor: pointer;
        width: 20pt;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 12pt;
        transition: transform .2s linear;
    }
    .functionSelection li:hover{
        color: #157efb;
        transform:scale(1.2);
    }
    #updateImg{
        width: 100%;
        height: 100%;
        opacity: 0;
        display: none;
    }
    .updateright{
        width: max-content;
    }
    .updateright span{
        font-size: 12pt;
        margin-right: 1em;
        color: #8f8e94;
    }
    .publishUpdate{
        cursor: pointer;
        background: none;
        padding: 5px 20px;
        background: #157efb;
        color: #ffffff;
        transition: transform .2s linear;
        border-radius: 5px;
        /* font-size: 12pt; */
    }
    .publishUpdate:hover{
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .publishUpdate:active{
        transform: translateY(-1px) scale(1.1);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
</style>
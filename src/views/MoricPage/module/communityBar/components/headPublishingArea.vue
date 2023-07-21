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
          </div>
          <div class="selectionArea">
              <ul class="functionSelection">
                  <li>
                      
                  </li>
                  <li @click="upDatesImg">
                      
                      <input type="file" 
                      title="headSculpture" 
                      id="updateImg" 
                      ref="updateImg" multiple>
                  </li>
              </ul>
              <div class="updateright">
                  <span>
                       {{inputText.value.length}}/200
                  </span>
                  <button class="publishUpdate">
                      发表
                  </button>
              </div>
          </div>
      </div>
    </header>
  </template>
  
  <script setup> 
      import { ref,computed, reactive  } from "vue";
      const textareaNode = ref("");
      const updateImg = ref(null);
      const inputText = reactive({
          value:"",
      });
      function upDatesImg(){
          const fileNode = updateImg.value;
          fileNode.click();
          setTimeout(() => {
              var files = fileNode.files;
              for (let i = 0; i < files.length; i++) {
                  console.log("文件名:", files[i].name);
                  console.log("文件大小:", files[i].size);
                  console.log("-----------------------");
              }
          }, 0);
      }
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
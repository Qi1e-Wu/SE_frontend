<template>
  <div class="container">
    <h1><div><span class="title">Python解释器</span>

      <el-button size="mini" icon="el-icon-document-copy" @click="copyCode" class="titlebutton1">复制代码</el-button>
      <el-button size="mini" icon="el-icon-document-delete" @click="clearCode" class="titlebutton2">清除</el-button>
    </div>
    </h1>
    <div ref="editor" class="editor" style="text-align: left;"></div>
    <el-button type="primary" style="margin-bottom: 10px;" @click="saveToLocal">保存至本地</el-button>
    <el-button type="primary" @click="runCode">运行代码</el-button>
    <div>    
      <el-input
      type="textarea"
      class="editor2"
      :rows="5"
      placeholder="Output will be shown here..."
      v-model="result"
      :readonly="true"
    ></el-input></div>

  </div>
</template>
  
  <script>
  import * as monaco from 'monaco-editor';
  import { postCode } from '@/api/cmdline';
  import { CLInterface } from '@/api/cmdline';
  
  export default {
    data() {
      return {
        editor: null,
        language: '',
        result: null,
      };
    },
    mounted() {
      this.editor = monaco.editor.create(this.$refs.editor, {
      value: '# 这是一段示例代码，用于展示二叉树的中序遍历\nimport random\n\nclass Node:\n\tdef __init__(self, key):\n\t\tself.left = None\n\t\tself.right = None\n\t\tself.val = key\n\ndef insert(root, node):\n\tif root is None:\n\t\troot = node\n\telse:\n\t\tif root.val < node.val:\n\t\t\tif root.right is None:\n\t\t\t\troot.right = node\n\t\t\telse:\n\t\t\t\tinsert(root.right, node)\n\t\telse:\n\t\t\tif root.left is None:\n\t\t\t\troot.left = node\n\t\t\telse:\n\t\t\t\tinsert(root.left, node)\n\ndef inorder(root):\n\tif root:\n\t\tinorder(root.left)\n\t\tprint(root.val)\n\t\tinorder(root.right)\n\nroot = Node(random.randint(1, 100))\n\nfor _ in range(10):\n\tinsert(root, Node(random.randint(1, 100)))\n\nprint(\"Inorder traversal of the tree:\")\ninorder(root)',
      language: 'python',
      });
    },
    beforeDestroy() {
      if (this.editor) {
        this.editor.dispose();
      }
    },
    methods: {
      saveToLocal() {
        const code = this.editor.getValue();
        const blob = new Blob([code], {type: "text/plain;charset=utf-8"});
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'code.py';
        link.click();
      },
      async runCode() {
        const code = this.editor.getValue();
        const encode= encodeURIComponent(code);
        postCode(encode).then(res=>{
          console.log(res)
        }).catch(()=>{
          this.$message.error('保存失败')
        })
        CLInterface('python3 TEMP.py').then(res=>{
          console.log(res)
          this.result=res
        })
      },
      copyCode() {
      const code = this.editor.getValue();
      navigator.clipboard.writeText(code); // Copy code to clipboard
    },
    clearCode() {
      this.editor.setValue(''); // Clear the editor
    },
    },
  };
  </script>
  
  <style scoped>
  .toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
  .editor {
    width: 1000px;
    height: 400px;
    margin: 0 auto;
    margin-bottom: 10px;
    border: 3px solid #ddd;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .editor2 {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 10px;
    border: 3px solid #ddd;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .container h1 {
    text-align: center;
    color: #378ee6;
  }


 .titlebutton2{
margin-left: 10px;
 } 
 .titlebutton1{
margin-left: 215px;
} 
.title{
  margin-left: 390px;
}
  </style>
  
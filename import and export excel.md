# 前端实现解析和导出Excel
1 安装npm的xlsx包
 
 <code>"xlsx": "^0.16.2"</code>
 
2 引用xlsx包

<code>import xlsx, { WorkSheet } from 'xlsx'</code>

3 前端解析excel数据并上传
```html
<input type="file" accept=".xlsx,.xls" onChange="handleUpload">
```
```javascript
function getExcelData(file){
    return new Promise((resolve, reject) => {
      // 使用filereader读取input[type=file]获取到的excel文件
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
        // 获取workbook对象，读取excel主要是通过XLSX.read(data, {type: type});方法来实现，返回一个叫WorkBook的对象
        // type为array是 Uint8Array，8位无符号数组
        const data = new Uint8Array(e.target.result)
        const workbook = xlsx.read(data, { type: 'array' })
        // 获取excel的sheets中第一个sheet的数据
        const sheetName = workbook.Sheets[workbook.SheetNames[0]]
        // 将数据转化为json
        const arrs = xlsx.utils.sheet_to_json(sheetName, { header: 1, raw: false, defval: '', blankrows: false })
        arrs.shift()
        if (arrs.length > 500) {
          reject(new Error('上传数据不能超过500条'))
        }
        console.log('excel origin data', arrs)
        const res = arrs.map((item) => {
          return {
            name: `${item[0]}`,
            age: `${item[1]}`,
            job: `${item[2]}`,
            address: `${item[3]}`,
            tel: `${item[4]}`,
            birthday: `${item[5]}`,
          }
        })
        resolve(res)
      }
      reader.onerror = (err) => {
        reject(err)
      }
    })
  }
// 捕获promise中reject的err函数
const handlePromise = (promise) => promise.then((data) => [null, data]).catch((err) => [err])
// 获取excel的数据并上传
async function handleUpload(e) {
  const file = e.target.files && e.target.files[0]
  const [err, data] = await handlePromise(getExcelData(file))
  await this.uploadData(data)
}
```
4 前端导出excel数据
```javascript
function exportOrderData (arr) {
             // 数据表格
             const table = []
             table.push({
               A: '姓名',
               B: '年龄',
               C: '工作',
               D: '住址',
               E: '电话',
               F: '生日',
             })
             arr.forEach(item => {
               const row = {
                 A: item.name,
                 B: item.age,
                 C: item.job,
                 D: item.address,
                 E: item.tel,
                 F: item.birthday,
               }
               table.push(row)
             })
             // 创建一个excel的sheet表
             const workBook = xlsx.utils.book_new()
             // 创建一个sheet对象
             const worksheet = xlsx.utils.json_to_sheet(table, { header: ['A', 'B', 'C', 'D', 'E', 'F'], skipHeader: true })
             worksheet['!cols'] = [
               { width: 10 },
               { width: 15 },
               { width: 20 },
               { width: 20 },
               { width: 10 },
               { width: 10 },
             ]
             const timestamp = new Date().toLocaleString()
             // sheet表中插入数据
             xlsx.utils.book_append_sheet(workBook, worksheet, 'orders')
             // 生成excel文件
             xlsx.writeFile(workBook, `list-${timestamp}.xlsx`)
           }
```



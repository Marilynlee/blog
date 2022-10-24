## react记录

### 1. Q: 使用antd的form组件时，在validate方法里因处理其它函数导致报错，会导致form的validate方法无法捕获，既不报错，也无法成功提交表单。

 A: 提交form时既不报错也没有提交成功，仔细检查validate里面的逻辑处理，有无异常！

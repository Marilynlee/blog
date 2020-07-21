## SQL语句
    4大基本语句——增删改查
    1. 增  `INSERT INTO 表 (字段列表) VALUES(值);`
        eg: `INSERT INTO user_table (user_name, pwd, online) VALUES('zhangsan', '123456', 0);`
    2. 删  `DELETE FROM 表 WHERE 条件;`
        eg: `DELETE FROM user_table WHERE ID=1;`
    3. 改  `UPDATE 表 字段=新值,字段=新值 WHERE 条件;`
        eg: `UPDATE user_table pwd='666666' WHERE ID=1;`
    4. 查  `SELECT 字段列表 FROM 表 WHERE 条件;`
        eg: `SELECT user_name,online FROM user_table WHERE ID=4;`
## sql语句实例
```mysql
INSERT INTO user_table (user_name, pwd, online) VALUES('hsfg', '555555', 0);
DELETE FROM user_table WHERE id=3;
UPDATE user_table SET pwd='666666',user_name='Lily' WHERE ID=1;
SELECT user_name,id FROM user_table WHERE id>2; 
SELECT * FROM user_table WHERE id>2; 
```

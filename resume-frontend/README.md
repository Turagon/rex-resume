### Getting Started with this app (專案建立)    

1. clone this app from github to your local(下載專案到local電腦)    
2. open terminal and cd to the downloaded directory(開啟終端並進入下載的目錄中)     
3. Because this downloaded app include frontend and backend app, so you need to further cd into resume-frontend and resume-backend directories seperately and install all dependencies according to package.json(由於此下載文件中包含了react前端app及express後端app，所以需要再個別進入到resume-frontend以及resume-backend路徑中，依據package.json文件中的dependencies安裝所需套件)      
4. for resume-backend app, you need to add .env file under resume-backend directory and set variables as below :    
  在resume-backend目錄下，需要建立一個.env檔，並且設置以下參數:     
  * PORT        
  * SESSION_SECRET         
  * TOKEN_SECRET        
  * IMGUR_CLIENT_ID    
5. after setting up, open two terminals one for resume-frontend directory and the other one for resume-backend directory. type 'npm start' and excute in resume-frontend directory, type 'nodemon app.js' and excute in resume-backend directory. If there's port conflict, answer yes to allow react app run in different port. (基本設置完成後，使用兩個終端分別在resume-frontend以及resume-backend目錄中執行程式。建議先執行後端的部分，使用nodemon app.js指令。然後在執行前端app，使用npm start指令。如果遇到port衝突，回覆yes讓react改變執行的port)   
6. Note! this app use proxy setting in react app dev, if your react and express are not running on port 3001 and 3000, please change the proxy setting accordingly.(請注意，此專案中的react app有使用proxy設置，假如你的執行環境中react不是port 3001，express不是3000，請修改react中的proxy設定。)      
7. for backend service, you also need to set up sql database for data storage. please refer to config file in resume-backend for database configuration. run 'npx sequelize db:migrate' and 'npx sequelize db:seed:all' after your database set up.(除了上述之外，請依照resume-backend中的config.js檔案中的參數設置mysql資料庫，資料庫設置完成後，在終端執行'npx sequelize db:migrate' 以及 'npx sequelize db:seed:all')        
8. for initial login ID and password, you can set in the user seeder file in the resume-backend file.(初始登入的帳號密碼，請在resume-backend中的user seeder中設置)    

### functions (功能)      
1. display user profile, skill list, cover letter, resume, portfolios, certificates in user page.(在使用者網頁中顯示個人資料，專長，自薦信，工作經歷，學歷，作品集，證照)     
2. you can manage all above information in admin page(可以在admin page建立以及管理所有以上資料)     
3. please use markdown format when writing cover letter and all descriptions(請使用markdown格式撰寫自薦信以及所有敘述)    
4. you should assign specific ID at cover letter modal in admin page which is same as specific login ID, so that the user can only see the specific cover letter.(請在輸入自薦信時指定ID，使用該ID登入的使用者只能看到該自薦信)
5. please specify langauge while create each data(if the modal has the option), web page will identify the language the user used and display accordingly.(在輸入資料時，如果有語言選項，請輸入相關選項，網頁會依據使用者語言喜好顯示)    
6. if you need more language option, please modify the modal components under resume-frontend -->src -->components -->admin(如果需要增加語言選項，請在resume-frontend -->src -->components -->admin的modal組件中自行增加)    

### contributed by    
Rex     
rexlin6245@gmail.com   
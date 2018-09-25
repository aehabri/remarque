const electron = require("electron");
const {app,BrowserWindow,Menu,ipcMain}=electron;
let mainWindow;
let secwindow;
app.on("ready",()=>{
    mainWindow=new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on("closed",()=>app.quit());

    const mainMenu= Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
function create_window() {
    secwindow= new BrowserWindow({
        width:300,
        height:200,
        title:'add to do'
    });
    secwindow.loadURL(`file://${__dirname}/box.html`);
    secwindow.on('colsed',()=>    secwindow=null);
}
function supprimer(){
    mainWindow.webContents.send("supprimer");

}
function quit(){
    mainWindow.close();
    mainWindow=null;
}
ipcMain.on("todo",(event,val)=>{
    mainWindow.webContents.send("todo",val);
    secwindow.close();
});
const menuTemplate = [ 
    {
        label:"habri",
        submenu:[
            {
                label:"sofiane",
                click(){
                    create_window()
                },
                },
                {
                    label:"supprimer",
                    click(){
                        supprimer()

                    },
                },
                {
                    label:"quiter",
                    click(){
                        quit();
                    }
                }
        ]

    }
];
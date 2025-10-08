import { CronJob } from "cron";

import https from "https";

const url='https://netflix-jo90.onrender.com/'
const cron=new CronJob('0 */14 * * * *',function (){
    https.get(url,(res)=>{
        if(res.statusCode==200){
            console.log('successfuly run')
        }else{
            console.log('Faild to call web site')
        }
    }).on('error',(e)=>{
        console.log('Faild to connect',e.message)
    })
})



export default cron;
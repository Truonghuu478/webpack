import { sum } from "./utils";
import { reject } from "lodash";

console.log(
    'result',
    sum(2,3)
);


console.log(
   Object.values({"name":"truong","name":"vy"})
);

import cv from "./pdfs/Le-Huu-Truong_CV.pdf?page=1"



const domHandler = () => {
    const link = document.createElement('a')
    link.href = cv
    link.textContent = 'CV Trường'
    document.body.appendChild(link)
  }
const handle = ()=>
    new Promise((resolve)=>
        setTimeout(()=>{
            resolve(100)
        },1000)
    )

const main = async ()=>{
    const result = await handle();
    console.log('result',result);
}
main()

domHandler()
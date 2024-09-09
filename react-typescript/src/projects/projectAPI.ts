import { Project } from "./Project";
const baseUrl = "http://localhost:4000"
const url = `${baseUrl}/projects`

//ฟังก์ชันนี้จะรับ status (สถานะ HTTP) เข้ามาและแปลงสถานะนั้นให้เป็นข้อความที่มนุษย์อ่านเข้าใจได้ 
//เช่น ถ้าสถานะเป็น 401 ก็จะแสดงข้อความว่า "Please login again."
const translateStatusToError = (status: number) => { 
    switch(status) {
        case 401:
            return "Please login again.";
        case 403:
            return "You do not have permission to view the project(s).";
        default:
            return "There was an error retrieving the project(s). Please try again."

    }
}

//ฟังก์ชันนี้ตรวจสอบสถานะของ response ที่ได้รับจากการเรียก API
//ถ้า response.ok (หมายความว่า สถานะ HTTP เป็น 200-299) ฟังก์ชันจะส่งคืน response นั้นกลับไป
//ถ้าไม่ใช่ ก็จะสร้าง httpErrorInfo ที่เก็บข้อมูลเกี่ยวกับข้อผิดพลาด แล้วใช้ translateStatusToError เพื่อแปลงสถานะเป็นข้อความ จากนั้นก็โยน (throw) ข้อผิดพลาดออกไป
const checkStatus = (response: any) => { // check status ใช้ฟังชันตัวนี้ในการเช็ค error ของ response
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        }
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`)

        let errorMessage = translateStatusToError(httpErrorInfo.status)
        throw new Error(errorMessage)   

    }
}


//ฟังก์ชันนี้แปลง response ที่ได้รับจาก API ให้เป็น JSON ซึ่งสามารถนำไปใช้ใน JavaScript/TypeScript ได้
const parseJSON = (response: Response) => { // แปลง string ให้เป็น javascripts Object
    return response.json();
}

//ฟังก์ชันนี้ใช้เพื่อหน่วงเวลาการทำงานเป็นจำนวน ms มิลลิวินาที โดยที่ x คือค่าที่จะถูกส่งต่อไปหลังจากที่หน่วงเวลาแล้ว
//เช่น ถ้าใช้ delay(600) ก็จะหน่วงเวลาการทำงานไป 600 มิลลิวินาทีก่อนที่จะดำเนินการขั้นตอนถัดไป
const delay = (ms: number) => { // เอาไว้ delay
    return function(x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    }
} 

//ฟังก์ชัน convertToProjectModels แปลงข้อมูลจาก JSON เป็นอาร์เรย์ของ Project objects โดยการใช้ map เพื่อแปลงแต่ละ item ด้วยฟังก์ชัน convertToProjectModel
const convertToProjectModels = (data: any[]): Project[] => {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects
}

//convertToProjectModel สร้าง instance ใหม่ของ Project โดยใช้ข้อมูลจาก item
const convertToProjectModel = (item: any): Project => {
    return new Project(item);
}


//projectAPI เป็น object ที่รวมฟังก์ชันที่ใช้ในการเรียก API
//ฟังก์ชัน get ใช้ fetch เพื่อดึงข้อมูลโปรเจกต์จาก API โดยสามารถกำหนดหน้า (page) และจำนวนข้อมูล (limit) ที่ต้องการดึงมาได้
//ขั้นตอนที่ then คือการดำเนินการหลังจาก fetch เสร็จสิ้น เช่น หน่วงเวลา เช็คสถานะ แปลง JSON และแปลงข้อมูลเป็น Project objects
//ถ้ามีข้อผิดพลาดในกระบวนการนี้ ข้อผิดพลาดจะถูกจับที่ catch และโยนข้อผิดพลาดใหม่ออกไป
const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
                    // .then(delay(600))
                    .then(checkStatus)
                    .then(parseJSON)
                    .then(convertToProjectModels)
                    .catch((error: TypeError) => {
                        console.log(`log client error ` + error)
                        throw new Error(
                            `There was an error retrieving the projects. Please try again.`
                        )
                    })
    },

    put(project:Project) {
        return fetch(`${url}/${project.id}`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {"Content-Type": "application/json"}
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log("log client error " + error )
            throw new Error(
                "There was an error updating the project, Please try again."
            )
        })
    },
    
    find(id: number) {
        return fetch(`${url}/${id}`)
                .then(checkStatus)
                .then(parseJSON)
                .then(convertToProjectModel)
    }


}

export { projectAPI }
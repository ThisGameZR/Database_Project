import React from 'react'
import axios from 'axios'

export default function EditInfo(e,cid,caddrid) {
    caddrid = caddrid || "nothing";
    let parentId = e.target.id.replaceAll("-edit","");
    if(e.target.innerHTML == "EDIT"){
        e.preventDefault()
        document.getElementById(parentId).disabled = false
        e.target.innerHTML = "SAVE"
        e.target.classList.remove('btn-outline-danger')
        e.target.classList.add('btn-outline-success')
        return new Promise((resolve, reject) => {
                resolve("")
        })
    }else{
        e.preventDefault()
        document.getElementById(parentId).disabled = true
        e.target.innerHTML = "EDIT"
        e.target.classList.add('btn-outline-danger')
        e.target.classList.remove('btn-outline-success')

        let value = document.getElementById(parentId).value
        let name = parentId
        
        if(caddrid == "nothing"){
            let data = {value,name,cid}
            axios.post('/customer/editProfile', data).then(res => {
            })
            return new Promise((resolve, reject) => {
                resolve("SAVE")
            })
        }
        //// Address
        let data = {value,name,caddrid}
        axios.post('/customer/editAddress', data).then(res => {
        })
        return new Promise((resolve, reject) => {
                resolve("SAVE")
        })
        
    }
}

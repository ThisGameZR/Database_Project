import React from 'react'

export default function EditInfo(e) {
    let parentId = e.target.id.replaceAll("-edit","");
    if(e.target.innerHTML == "EDIT"){
        e.preventDefault()
        document.getElementById(parentId).disabled = false
        e.target.innerHTML = "SAVE"
        e.target.classList.remove('btn-outline-danger')
        e.target.classList.add('btn-outline-success')
    }else{
        e.preventDefault()
        document.getElementById(parentId).disabled = true
        e.target.innerHTML = "EDIT"
        e.target.classList.add('btn-outline-danger')
        e.target.classList.remove('btn-outline-success')
    }
}

import React, {useState} from 'react'
import axios from 'axios';
import {Form,Button} from 'react-bootstrap'
import SelectSearch, {fuzzySearch} from 'react-select-search'

export default function InsertProduct() {

    const [supplierOptions, setSupplierOptions] = useState([]);
    const [supplierValue, setSupplierValue] = useState(0);
    const [supplierReady, setSupplierReady] = useState(false);

    axios.get('/products/getSupplier').then( (res) => {
        res.data.map((item,i) => {
            supplierOptions[i] = {name: item.SName, value: item.SID}
        })
        setSupplierReady(true)  
    })
    
    return (
        <div>
            <Form onSubmit={(e) => supplier(e)}>
                <Form.Group>
                    <Form.Control id="sname" placeholder="sname"></Form.Control>
                    <Form.Control id="contact" placeholder="contact"></Form.Control>
                    <Form.Control id="address" placeholder="address"></Form.Control>
                    <Button type="submit">SUBMIT</Button>
                </Form.Group>
            </Form>
            <Form onSubmit={(e) => product(e)}>
                <Form.Group>
                    {console.log(supplierReady)}
                    {supplierReady == true ?
                    <SelectSearch search
                        value={supplierValue}
                        onChange={setSupplierValue} 
                        emptyMessage="Result not found"
                        placeholder="Select Supplier" 
                        options={supplierOptions}
                        filterOptions={fuzzySearch}
                    ></SelectSearch>
                    : null }
                    
                    <Form.Control id="productname" placeholder="productname"></Form.Control>
                    <Form.Control id="unitprice" placeholder="unitprice"></Form.Control>
                    <select id="size">
                        <option selected>Select Size</option>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                        <option value="xl">Extra Large</option>
                        <option value="xxl">Extra+ Large</option>
                    </select>
                    <Form.Control id="stock" placeholder="stock"></Form.Control>
                    <Button type="submit">SUBMIT</Button>
                </Form.Group>
            </Form>
        </div>
    )
    function supplier(e){
        e.preventDefault();
        let request = {
            sname: document.getElementById('sname').value,
            contact: document.getElementById('contact').value,
            address: document.getElementById('address').value,
        }
        axios.post('/insertProduct/supplier',request).then(res =>{
            alert(res.data.message);
            console.log(res.data.sid);
        }).catch(err => {
            console.log(err);
        });
    }
    function product(e){
        e.preventDefault();
        
        let request = {
            sid: supplierValue,
            productname: document.getElementById('productname').value,
            unitprice: document.getElementById('unitprice').value,
            size: document.getElementById('size').value,
            stock: document.getElementById('stock').value
        }
        axios.post('/insertProduct/product',request).then(res =>{
            alert(res.data.message);
            console.log(res.data.pid);
        }).catch(err => {
            console.log(err);
        });
    }
}


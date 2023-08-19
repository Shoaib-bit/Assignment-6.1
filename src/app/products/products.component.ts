import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
v_id = 1;
c_id = 1;
p_id = 1;
deleteId :any;
deleteName : any;
venderName : any;
categoryName : any;
maxPrice : number = 0;
modall1 = false;
modall2 = false;
screen : any;
vender : any = [
  {
    firstName : 'shoaib',
    lastName : 'Khan',
    phoneNumber : '0998776'
  },
  {
    firstName : 'ali',
    lastName : 'Khan',
    phoneNumber : '0998776'
  }
];
category : any = [
  {
    name : 'Sabir',
    status : 'active'
  }
];
products : any = [];
    venderForm !: FormGroup;
    categoryForm !: FormGroup;
    productsForm !: FormGroup;
    
    constructor(public activateRoute : ActivatedRoute) {
        

    }
    get requiredControl() {
        return new FormControl(null, Validators.required)
    }
    ngOnInit(): void {
      
      this.venderForm = new FormGroup(
        {
          firstName : this.requiredControl,
          lastName : this.requiredControl,
          phoneNumber : this.requiredControl
        }
      )
      this.categoryForm = new FormGroup(
        {
          name : this.requiredControl,
          status : this.requiredControl,
        }
      )
      this.productsForm = new FormGroup(
        {
          name : this.requiredControl,
          price : this.requiredControl,
          categoryName : this.requiredControl,
          venderName : this.requiredControl,
        }
      )
      this.activateRoute.paramMap.subscribe((dta) => {
        this.screen = dta.get('name');
        this.categoryForm.reset();
        this.venderForm.reset();
        this.productsForm.reset();
        this.deleteId = ''; 
      this.deleteName = '';
      this.venderName = '';
      this.categoryName = '';
      this.maxPrice = 0;
      })

      
    }
    getVender() {
      let check = true;
      if(this.venderForm.invalid) {
          alert('Please Enter All Fields')
      } else {
          for(let i=0; i<this.vender.length; i++) {
              if(this.vender[i].firstName == this.venderForm.controls['firstName'].value) {
                  check = false;
              }
          }
          if(check) {
            let value= this.venderForm.getRawValue();
            value.id = this.v_id++;
            this.vender.push(value);
            console.log(this.vender);
            this.venderForm.reset();
          } else {
            alert('This vender is avaliable')
          }
          
      }
    }
    getcategory(){
      let check = true;
      if(this.categoryForm.invalid) {
          alert('Please Enter All Fields')
      } else {
          for(let i=0; i < this.category.length; i++) {
              if(this.category[i].name == this.categoryForm.controls['name'].value) {
                  check = false;
              }
          }
          if(check) {
            let value= this.categoryForm.getRawValue();
            value.id = this.c_id++;
            this.category.push(value);
            console.log(this.category);
            this.categoryForm.reset();
          } else {
            alert('This category is avaliable')
          }
          
      }
    }
    getProduct(){
      let check = true;
      if(this.productsForm.invalid) {
          alert('Please Enter All Fields')
      } else {
          for(let i=0; i < this.products.length; i++) {
              if(this.products[i].name == this.productsForm.controls['name'].value) {
                  check = false;
              }
          }
          if(check) {
            let value= this.productsForm.getRawValue();
            value.id = this.p_id++;
            this.products.push(value);
            console.log(this.products);
            this.productsForm.reset();
          } else {
            alert('This Product is avaliable')
          }
          
      }
    }
    deleteById(val :any){
      let check = false;
        if(val.value == '') {
            alert("Please enter any ID")
        } else {
          for(let i=0; i<this.products.length; i++) {
            if(this.products[i].id == val.value) {
                check = true;
                break;     
            }
          }
          if(!check) {
            alert('This Id is not avaliable')
          } else {
            this.deleteId = val.value;
            val.value = '';
            this.modall1 = true;

          }
        }
    }
    deleteByName(val:any){
      let check = false;
        if(val.value == '') {
            alert("Please enter any Name")
        } else {
          for(let i=0; i<this.products.length; i++) {
            if(this.products[i].name == val.value) {
                check = true;
                break;     
            }
          }
          if(!check) {
            alert('This Name is not avaliable')
          } else {
            this.deleteName = val.value;
            val.value = '';
            this.modall2 = true;

          }
        }

    }
    closeModall(){
      this.modall1 = false;
      this.modall2 = false;
    }
    deleteProduct(){
      for(let i=0; i < this.products.length; i++) {
        if(this.products[i].id == this.deleteId) {
            this.products.splice(i,1);
        }
      }
      this.modall1 = false;
      alert('Deleted');
      console.log(this.products);
    }
    deleteProductName() {
      for(let i=0; i < this.products.length; i++) {
        if(this.products[i].name == this.deleteName) {
            this.products.splice(i,1);
        }
      }
      this.modall2 = false;
      alert('Deleted');
      console.log(this.products);
    }
    venderData(dat :any){
      this.venderName = dat.value;
    }
    categoryData(dat : any) {
      this.categoryName = dat.value;
    }
    maxPriceAction(dat : any) {
      this.maxPrice = dat.value;
    }

}

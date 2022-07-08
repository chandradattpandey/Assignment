import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CarDealerService } from '../service/car-dealer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  searchData: any;
  length: any;
  dealerId:any;
  brand: any;
  carData: any;
  editForm: any;
  carList: any;
  carForm: any;
  data: any;
  constructor(private fb: FormBuilder, private modalService: BsModalService, private service: CarDealerService,
    private route: Router) { }

  openCarModal(modalTemplate: TemplateRef<any>) {
    let modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      });
      this.brand = localStorage.getItem('dealerName');
      this.dealerId = localStorage.getItem('dealerId');
      this.carForm.patchValue({
        dealerId:this.dealerId,
        brand:this.brand
      })
  };

  openEditModal(id:any,modalTemplate: TemplateRef<any>) {
    let modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
    this.service.editCar(id).subscribe(result=>{
      this.carData = result;
      this.editForm.patchValue({
        name:this.carData.name,
        modal:this.carData.modal,
        color:this.carData.color,
        price:this.carData.price
      })
      localStorage.setItem('carId', this.carData._id);
    })
  }


  ngOnInit(): void {
    this.carForm = this.fb.group({
      name: [''],
      dealerId:[''],
      brand: [''],
      modal: [''],
      color: [''],
      price: ['']
    });

    this.editForm = this.fb.group({
      name: [''],
      modal: [''],
      color: [''],
      price: ['']
    })

    this.brand = localStorage.getItem('dealerName');
    this.service.readCar(this.brand).subscribe(result => {
      this.data = result;
    })
  }

  saveCar() {
    this.service.addCar(this.carForm.value).subscribe((car: any) => {
      this.carList = car;
      this.carForm.reset();
      this.close();
    })
  };

  carUpdate(){
    let id = localStorage.getItem('carId');
    this.service.updateCar(id,this.editForm.value).subscribe();
    this.editForm.reset();
    this.close();
  }

  deleteOne(id: any) {
    this.service.deleteCar(id).subscribe();
    this.route.navigate(['/view']);
  };

  
  close() {
    this.modalService.hide();
  }

  search(inputKeyword: any) {
    this.service.carSearchApi(inputKeyword.target.value).subscribe(result => {
      this.searchData = result;
      console.log(this.searchData);
    });
  }

}

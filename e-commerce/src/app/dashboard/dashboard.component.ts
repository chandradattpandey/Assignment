import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CarDealerService } from '../service/car-dealer.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dtlData: any;
  cardata: any;
  name: any;
  dealerName: any;
  newdata: any;
  editResult: any;
  searchData: any;
  dealerEditForm: any;
  dealerDetails: any;
  length: any;
  dealerData: any;
  data: any;
  dealerForm: any;
  remainingBudget: any;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private service: CarDealerService,
  private route :Router) { }

  openModal(modalTemplate: TemplateRef<any>) {
    let modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }

  openEditModal(id: any, modalTemplate: TemplateRef<any>) {
    let modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
    this.service.editDealer(id).subscribe(result => {
      this.dealerDetails = result;
      this.dealerEditForm.patchValue({
        dealer_name: this.dealerDetails.dealer_name,
        totalBudget: this.dealerDetails.totalBudget,
        remaining: this.dealerDetails.remaining
      })
      localStorage.setItem('dealerNewId', this.dealerDetails._id);
    })
  }

  ngOnInit(): void {
    this.dealerForm = this.fb.group({
      dealer_name: [''],
      longitude: [''],
      latitude: [''],
      totalBudget: [''],
      remaining: [''],
      first_name: [''],
      last_name: ['']
    });

    this.dealerEditForm = this.fb.group({
      dealer_name: [''],
      totalBudget: [''],
      remaining: ['']
    });

    this.service.readDealer().subscribe(result => {
      this.data = result;
      this.name = this.data[0].dealer_name;

      this.service.readCar(this.name).subscribe(result => {
        this.cardata = result
        this.length = this.cardata.length
      })
    })
  }

  saveDealer() {
    this.service.addDealer(this.dealerForm.value).subscribe(result => {
      this.dealerData = result;
      this.dealerForm.reset();
      this.close();
    })
  }

  close() {
    this.modalService.hide();
  }

  send(dealerName: any, dealerId: any) {
    localStorage.setItem('dealerName', dealerName);
    localStorage.setItem('dealerId', dealerId);
  }

  updateDealer() {
    let dealerNewId = localStorage.getItem('dealerNewId');
    this.service.updateDealer(dealerNewId, this.dealerEditForm.value).subscribe();
    this.dealerEditForm.reset();
    this.close();
  }

  deleteDealer(id: any) {
    this.service.deleteDealer(id).subscribe();
  }

  search(inputKeyword: any) {
    this.service.dealerSearchApi(inputKeyword.target.value).subscribe(result => {
      this.searchData = result;
      console.log(this.searchData);
    });
  }

}

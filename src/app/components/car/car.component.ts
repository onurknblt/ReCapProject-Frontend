import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

 cars:Car[]= [];
 cardetails:CarDetail[]=[];
 currentCarDetail: CarDetail;
 dataLoaded = false;
 baseUrl="https://localhost:44393/";
 filterText="";


 constructor(
  private carService:CarService,
  private cardetailService:CarDetailService,
  private activatedRoute:ActivatedRoute,
  private toastrService:ToastrService,
  private cartService:CartService

  ){}

 ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    if(params["brandId"]){
      this.getCarsByBrand(params["brandId"])
    }
    else if(params["colorId"]){
      this.getCarsByColor(params["colorId"])
    }
    else if(params["carId"]){
      this.getCarDetails(params["carId"])
    }
    else{
      this.getAllCars()
    }
  })
}

getCars() {
  this.carService.getCars().subscribe(response=>{
    this.cars = response.data
    this.dataLoaded = true;
    console.log(this.cars);
  })
  
  
}

getAllCars(){
 this.cardetailService.getAllCars().subscribe(response=>{
  this.cardetails = response.data
  this.dataLoaded = true;
  console.log(this.cardetails);
 })
 
 
}

getCarsByBrand(brandId:number) {
  this.carService.getCarsByBrand(brandId).subscribe(response=>{
    this.cardetails = response.data
    this.dataLoaded = true;
  })
}

getCarsByColor(colorId:number) {
  this.carService.getCarsByColor(colorId).subscribe(response=>{
    this.cardetails = response.data
    this.dataLoaded = true;
  })
}

setCurrentCarDetails(cardetail:CarDetail){
  this.currentCarDetail = cardetail;
  this.toastrService.info("Araç detay sayfasına yönlendirildiniz","",{
    progressBar:true
  })
}

getCurrentCarDetails(){

}

getCarDetails(carId:number) {
  this.carService.getCarDetails(carId).subscribe(response=>{
    this.cardetails = response.data
  })
}

addToCart(carDetail:CarDetail){

  if(carDetail.carId===15){
    this.toastrService.error("Araç sepete eklenemedi", "Araç başkası tarafından kiralanmış durumda",{
      progressBar:true
    })
  }else{
    console.log(carDetail)
    this.cartService.addToCart(carDetail);
    this.toastrService.success("Araç sepete eklendi",carDetail.brandName+" "+carDetail.carName,{
      progressBar:true
    })
  }
}







}

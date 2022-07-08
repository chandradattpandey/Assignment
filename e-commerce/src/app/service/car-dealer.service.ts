import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'

const httpoptions = {
  headers: new HttpHeaders({'Content-type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CarDealerService {

  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  readCar(brand:any): Observable<any> {
    return this.http.get<any>(this.url + '/readCar/' +brand);
  };

  addCar(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/addCar', data);
  };

  deleteCar(id:any): Observable<any>{
    return this.http.delete<any>(this.url + '/deleteCar/' +id )
  };

  updateCar(id:any, data:any):Observable<any>{
    return this.http.put<any>(this.url + '/editCar/' +id,data ,httpoptions)
  };

  editCar(id : any):Observable<any>{
    return this.http.get<any>(this.url + "/carFindById/"+id)
  };

  readDealer(): Observable<any>{
    return this.http.get<any>(this.url + '/readDealer')
  };

  editDealer(id :any):Observable<any>{
    return this.http.get<any>(this.url + "/dealerFindById/"+id)
  };

  carSearchApi(key :KeyboardEvent):Observable<any>{
    return this.http.get<any>(this.url + "/carSearchApi/"+key)
  };

  findDealer(id :any):Observable<any>{
    return this.http.get<any>(this.url + "/dealerFindById/"+id)
  };
  
  addDealer(data:any):Observable<any>{
    return this.http.post<any>(this.url+ '/addDealer',data)
  }

  updateDealer(id:any, data:any):Observable<any>{
    return this.http.put<any>(this.url + '/editDealer/' +id,data ,httpoptions)
  };
  
  deleteDealer(id:any): Observable<any>{
    return this.http.delete<any>(this.url + '/deleteDealer/' +id )
  };

  dealerSearchApi(key :KeyboardEvent):Observable<any>{
    return this.http.get<any>(this.url + "/dealerSearchApi/"+key)
  };

}





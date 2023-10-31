import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMemberInfoByUsername(memberName: string): Observable<any> {
    console.log (this.getMemberInfoByUsername)
    // Utilisez HttpClient pour effectuer une requête GET pour récupérer les informations du membre par nom d'utilisateur
    // Vous devrez ajuster cette URL en fonction de la structure de votre API
    const url = `${this.apiUrl}/profil/${memberName}`;

    return this.http.get(url);
  }

  getMemberInfo(memberId: number): Observable<any> {
    console.log ('getMemberInfo, memberId', memberId,)
    // Utilisez HttpClient pour effectuer une requête GET pour récupérer les informations du membre
    // Vous devrez ajuster cette URL en fonction de la structure de votre API
    const url = `${this.apiUrl}/members/${memberId}`;
  
    return this.http.get(url);
  }

  updateMemberInfo(memberId: number, updatedInfo: any): Observable<any> {
    console.log ('updateMemberInfo, memberId, updateInfo', memberId, updatedInfo)
    // Remplacez 'MEMBER_ID' par l'identifiant du membre actuellement connecté
    // Ceci est un exemple pour mettre à jour les informations du membre en fonction de son ID
    // 'updatedInfo' devrait contenir les nouvelles informations du membre à mettre à jour
    const url = `${this.apiUrl}/members/${memberId}`;

    // Utilisez HttpClient pour effectuer une requête PUT pour mettre à jour les informations du membre
    return this.http.put(url, updatedInfo);
  }
}


// @Injectable({
//     providedIn: 'root'
//   })
//   export class ProfileService {
//     private apiUrl = 'http://localhost:3000';
  
//     constructor(private http: HttpClient, private authService: AuthService) { }
  
//     getMemberInfo(): Observable<any> {
//       // Remplacez 'MEMBER_ID' par l'identifiant du membre actuellement connecté
//       // Ceci est un exemple pour récupérer les informations du membre en fonction de son ID
//       const memberId = 'MEMBER_ID';
  
//       // Utilisez HttpClient pour effectuer une requête GET pour récupérer les informations du membre
//       // Vous devrez ajuster cette URL en fonction de la structure de votre API
//       const url = `${this.apiUrl}/members/${memberId}`;
  
//       return this.http.get(url);
//     }
  
//     updateMemberInfo(memberId: string, updatedInfo: any): Observable<any> {
//       // Remplacez 'MEMBER_ID' par l'identifiant du membre actuellement connecté
//       // Ceci est un exemple pour mettre à jour les informations du membre en fonction de son ID
//       // 'updatedInfo' devrait contenir les nouvelles informations du membre à mettre à jour
//       const url = `${this.apiUrl}/members/${memberId}`;
  
//       // Utilisez HttpClient pour effectuer une requête PUT pour mettre à jour les informations du membre
//       return this.http.put(url, updatedInfo);
//     }
//   }
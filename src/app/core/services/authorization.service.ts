import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    permissionMap = new Map();
    attrExclusionMap = new Map();
    data: any;
    constructor(private toast: ToastrService) {
      const extractedPerm = sessionStorage.getItem("extracted_permissions");
      if (extractedPerm && extractedPerm !== '') {
        this.data = JSON.parse(sessionStorage.getItem("extracted_permissions")).find(v => v.menuLabel === 'ASSOCIATE');
      } else {
        this.toast.warning('User is not having any credit contract related permission', 'PERMISSION DENIED');
        window.location.href = '/login';
      }
    }
  
    setPermissions(entityName) {
      this.permissionMap = new Map();
      this.attrExclusionMap = new Map();
      if (this.data && this.data.childMenu && this.data.childMenu.length > 0) {
        this.data.childMenu.map(item => {
          if (item.menuLabel === 'ASSOCIATE BOOKING') {
            if(item.permissions){  
            item.permissions.map(permission => {
              if (permission.entityName === entityName && permission.channelId === 33) {
                this.setPermissionMap(permission);
                if (permission.attributeExclutionList && permission.attributeExclutionList.length > 0) {
                  this.setAttributeExclusion(permission);
                  console.log(' 1')
                }
              } else if (entityName === 'ALL' && permission.channelId === 33) {
                this.setPermissionMap(permission);
                if (permission.attributeExclutionList && permission.attributeExclutionList.length > 0) {
                  this.setAttributeExclusion(permission);
                  console.log('2')
                }
              }
            });
        } else {
            this.toast.warning('User is not having any credit contract related permission', 'PERMISSION DENIED');
            window.location.href = '/login';
        }
          }
        });
      } else {
        this.toast.warning('User is not having any credit contract related permission', 'PERMISSION DENIED');
        window.location.href = '/login';
        return;
      }
    }
  
    setPermissionMap(permission) {
      let per = this.permissionMap.get(permission.entityName) == null ? [] : this.permissionMap.get(permission.entityName);
      per.push(permission.subEntityName + '_' + permission.permissionType);
      this.permissionMap.set(permission.entityName,  per);
    }
  
    setAttributeExclusion(permission) {
      let attrList = [];
      permission.attributeExclutionList.forEach(element => {
        attrList.push(element.attributeName);
      });
      this.attrExclusionMap.set(permission.subEntityName, attrList);
    }
  
    getPermissions(entityName) {
      if (entityName !== 'ALL' && this.permissionMap.get(entityName)) {
        return this.permissionMap.get(entityName);
      } else if (entityName === 'ALL') {
        return this.permissionMap;
      } else {
        return [];
      }
    }
  
    getExcludedAttributes(subEntityName) {
      
      if (subEntityName !== 'ALL' && this.attrExclusionMap.get(subEntityName)) {
       return this.attrExclusionMap.get(subEntityName);
      //  return this.attrExclusionMap;
      } else if (subEntityName === 'ALL') {
        return this.attrExclusionMap;
      } else {
        return [];
      }
    }
  
  }

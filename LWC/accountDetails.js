import { LightningElement, api, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/AccountDetailsController.getContactList';
export default class AccountDetails extends LightningElement {
    @api recordId;
    @api objectApiName = 'Account';
    fields = ['Name','NumberOfEmployees','My_Field__c','Phone', 'BillingStreet', 'BillingCity', 'BillingState', 'BillingPostalCode'];
    
    custSuccessContacts = [];
    appDevContacts = [];
    contacts = [];
    iterateVal = 0;
    
    columns = [
        { label: 'FirstName', fieldName: 'FirstName' },
        { label: 'Title', fieldName: 'Title'},
    ];
    
    connectedCallback() {        

        getContactList({accId: this.recordId})
            .then(result => {                
                this.contacts = result;
                for(this.iterateVal = 0; this.iterateVal < result.length; this.iterateVal++) {
                    if(result[this.iterateVal].Title == "Application Developer") {
                        this.appDevContacts.push(result[this.iterateVal]);
                    } else if (result[this.iterateVal].Title == "Customer Success") {
                        this.custSuccessContacts.push(result[this.iterateVal]);
                    }

                }
            }).catch(error => { console.log('error:'+error); })
    }
    
    
}

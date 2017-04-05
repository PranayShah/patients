import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
Patients = new Mongo.Collection("patients");
Patients.attachSchema(new SimpleSchema({
  firstName: {
    type: String,
    max: 500
  },
  lastName: {
    type: String,
    max: 500
  },
  age: {
    type: Number,
    max: 110,
    min: 0
  },
  dob: {
    type: Date,
    label: "Date of birth"
  },
  gender: {
    type: String,
    allowedValues: [
         'Male', 'Female'
      ]
    
  },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
}, { tracker: Tracker }));


new Tabular.Table({
  name: "Patients",
  collection: Patients,
  columns: [
    {data: "firstName", title: "First name"},
    {data: "lastName", title: "Last name", searchable: false},
    {data: "age", title: "Age", searchable: false},
    {data: 'dob', title: "Date of birth", searchable: false, 
          render: function (val, type, doc) {
            return moment(val).calendar();
          }},
    {data: 'gender', title: "Gender", searchable: false},
    {data: 'message', title: "Message", searchable: false}
  ]
});
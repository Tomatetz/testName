Propellerhead assignment SPA with REST server
==============================================


Single page application designed on VueJS. 
----
 * Entrypoint- customers list with input for filter by name and sorting buttons: to sort list by customer name or by creation date.
 * After adding new customer, user can edit user directly from the list by clicking edit button. Customer information panel will be expanded and after change and lose focus, save button will be available in customer actions panel.
 * Customer also can be edited or deleted from its page.


### Setup
Pre-requirements:
- install mongo (if necessary)

Run app:
=============

**install node modules**
```bash
& npm i
```
**run mongo**
```bash
& mongod
```
**run express server**
```bash
& npm run express
```
**run app**
```bash
& npm run serve
```

- app will be available on http://localhost:8080/

Tech specs
===============
- server: express

- database: mongodb + mongoose

- JS framework:
  - VueJS with
    - routing
    - mixins
    
- styles:
  - icons: fontawesome
  - pre-processor: scss
  - media queries for styling user list on mobile
  - css-grid to provide responsive design

Unfortunately, I had no time for better design :(

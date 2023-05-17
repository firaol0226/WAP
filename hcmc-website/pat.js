// let storage=[];
const patInfo={};
const showElderlyCheckbox= document.getElementById('chkElderlyPatients');
const patientTable = document.getElementsByClassName('table')[0];
const showOut=document.getElementById('chkShowOutPatients');

function collectData(){
    let names=document.querySelectorAll('input[class="form-control"]');
    for(let i of names){
        patInfo[i.name]=i.value;
    }
    const select = document.getElementById("ddlDepartment");
    patInfo.department=document.getElementById('ddlDepartment')
                        .options[select.selectedIndex].value;

    patInfo.outPatient=document.getElementById('radioIsOutPatientYes')
                .checked?document.getElementById('radioIsOutPatientYes').value:
                document.getElementById('radioIsOutPatientNo').value;
}

function addToTable(event){
    event.preventDefault(); 
    let table=document.getElementById('tbodyPatientsList');
    let row = document.createElement("tr");
    
    for(let info in patInfo){
        let data = document.createElement("td");
        const dataNode = document.createTextNode(patInfo[info]);
        data.appendChild(dataNode);
        row.appendChild(data);
    }
    table.appendChild(row);
}

function showElderPatient(event){
  event.preventDefault();
  const isChecked = showElderlyCheckbox.checked;
  const patientRows = patientTable.getElementsByTagName('tr');
  for (let i = 1; i < patientRows.length; i++) { 
    let ageCell = patientRows[i].getElementsByTagName('td')[4]; 
    let birthDate = new Date(ageCell.textContent);
    const age = calculateAge(birthDate);

    if (isChecked && age >= 65) {
      patientRows[i].style.display = 'table-row';
    } else if (!isChecked) {
      patientRows[i].style.display = 'table-row';
    }
    else{
      patientRows[i].style.display = 'none';
    }
  }
}

function showOutPatientOnly(){
    const isChecked= showOut.checked;
    const patientRows = patientTable.getElementsByTagName('tr');
    for(let i =1; i,patientRows.length;i++){
      let outPatient=patientRows[i].getElementsByTagName('td')[6].innerText;
      if(isChecked&&outPatient=='No'){
        patientRows[i].style.display='none';
      }
      else patientRows[i].style.display='table-row';
    }
}
function calculateAge(birthDate) {
    const age = new Date().getUTCFullYear() - birthDate.getUTCFullYear(); 
    return age;
}

const but=document.getElementById('btnRegisterPatient');

but.addEventListener('click',collectData);
but.addEventListener('click', addToTable);

const chBox=document.getElementById('chkElderlyPatients')
chBox.addEventListener('change',showElderPatient);

const chBoxOutPatient=document.getElementById('chkShowOutPatients')
chBoxOutPatient.addEventListener('change',showOutPatientOnly);










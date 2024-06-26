import React, { useEffect, useState } from "react"; 
import { 
ActivityIndicator, 
TextInput, 
FlatList, 
Text, 
View, 
Button, 
Image, 
} from "react-native"; 

const App = () => { 
const [isLoading, setLoading] = useState(true); 
const [data, setData] = useState([]); 
const [isAdded, setAdded] = useState(false); 
const [isRemoved, setRemoved] = useState(false); 
const [isUpdated, setUpdated] = useState(false); 
const [empId, setEmpId] = useState(""); 
const [emp, setEmp] = useState({ 
name: "", 
phone: "", 
departmentId: "", 
street: "", 
city: "", 
state: "", 
zip: "", 
country: "", 
}); 

const onChangeName = (value) => { 
setEmp({ ...emp, name: value }); 
}; 

const onChangePhone = (value) => { 
setEmp({ ...emp, phone: value }); 
}; 

const onChangeDepartmentId = (value) => { 
setEmp({ ...emp, departmentId: value }); 
}; 

const onChangeStreet = (value) => { 
setEmp({ ...emp, street: value }); 
}; 

const onChangeCity = (value) => { 
setEmp({ ...emp, city: value }); 
}; 

const onChangeState = (value) => { 
setEmp({ ...emp, state: value }); 
}; 

const onChangeZip = (value) => { 
setEmp({ ...emp, zip: value }); 
}; 

const onChangeCountry = (value) => { 
setEmp({ ...emp, country: value }); 
}; 

const addEmployee = () => { 
let newEmployee = {}; 
let d = `name=${emp.name}&phone=${emp.phone}&departmentId=${emp.departmentId}&street=${emp.street}&city=${emp.city}&state=${emp.state}&zip=${emp.zip}&country=${emp.country}`; 

fetch("http://localhost:44350/helloworldWebService1.asmx/AddEmployee", { 
method: "POST", 
headers: { 
"Content-Type": "application/x-www-form-urlencoded", 
}, 
body: d, 
}) 
.then((responseData) => { 
setAdded(true); 
getEmployees(); 
clearFormEmpFields(); 
console.log("Done"); 
}) 
.catch((err) => { 
console.log(err); 
}); 
}; 

const clearFormEmpFields = () => { 
emp.name = ""; 
emp.phone = ""; 
emp.departmentId = ""; 
emp.street = ""; 
emp.city = ""; 
emp.state = ""; 
emp.zip = ""; 
emp.country = ""; 
}; 

const getEmployees = async () => { 
try { 
const response = await fetch( 
"http://localhost:44350/helloworldWebService1.asmx/GetEmployees" 
); 
const json = await response.json(); 
setData(json); 
} catch (error) { 
console.error(error); 
} finally { 
setLoading(false); 
} 
}; 

const deleteEmployee = () => { 
console.log("empId=" + empId); 
let employee = { 
id: empId, 
}; 
let d = `id=${employee.id}`; 

fetch("http://localhost:44350/helloworldWebService1.asmx/DeleteEmployee", { 
method: "POST", 
headers: { 
"Content-Type": "application/x-www-form-urlencoded", 
}, 
body: d, 
}) 
.then((responseData) => { 
setRemoved(true); 
getEmployees(); 
console.log("Done"); 
}) 
.catch((err) => { 
console.log(err); 
}); 
}; 

const updateEmployee = () => { 
let employee = { 
id: empId, 
name: emp.name, 
phone: emp.phone, 
departmentId: emp.departmentId, 
street: emp.street, 
city: emp.city, 
state: emp.state, 
zip: emp.zip, 
country: emp.country, 
}; 

let d = 
`id=${employee.id}&name=${employee.name}&phone=${employee.phone}&departmentId=${employee.departmentId}&street=${employee.street}&city=${employee.city}&state=${employee.state}&zip=${employee.zip}&country=${employee.country}`; 

console.log("d="+d+"$");
fetch("http://localhost:44350/helloworldWebService1.asmx/UpdateEmployee", { 
method: "POST", 
headers: { 
"Content-Type": "application/x-www-form-urlencoded", 
}, 
body: d, 
}) 
.then((responseData) => { 
setUpdated(true); 
getEmployees(); 
console.log("Done"); 
}) 
.catch((err) => { 
console.log(err); 
}); 
}; 

useEffect(() => { 
getEmployees(); 
}, []); 

return ( 
<View style={{ flex: 1, padding: 24 }}> 
{isLoading ? ( 
<ActivityIndicator /> 
) : ( 
<View> 
<Image 
source={require('./ROI.png')} 
style={{ width: 200, height: 100, marginBottom: 20 }} 
/> 

<TextInput 
placeholder={"Employee name"} 
onChangeText={(value) => onChangeName(value)} 
value={emp.name} 
/> 

<TextInput 
placeholder={"Phone"} 
onChangeText={(value) => onChangePhone(value)} 
value={emp.phone} 
/> 

<TextInput 
placeholder={"Department ID"} 
onChangeText={(value) => onChangeDepartmentId(value)} 
value={emp.departmentId} 
/> 

<TextInput 
placeholder={"Street"} 
onChangeText={(value) => onChangeStreet(value)} 
value={emp.street} 
/> 

<TextInput 
placeholder={"City"} 
onChangeText={(value) => onChangeCity(value)} 
value={emp.city} 
/> 

<TextInput 
placeholder={"State"} 
onChangeText={(value) => onChangeState(value)} 
value={emp.state} 
/> 

<TextInput 
placeholder={"Zip"} 
onChangeText={(value) => onChangeZip(value)} 
value={emp.zip} 
/> 

<TextInput 
placeholder={"Country"} 
onChangeText={(value) => onChangeCountry(value)} 
value={emp.country} 
/> 

<Text>{isAdded ? "Added" : ""}</Text> 
<Button title="Add an Employee" onPress={addEmployee} color="#c64c38"></Button> 

<TextInput 
placeholder={"Id to be updated or removed"} 
onChangeText={(value) => setEmpId(value)} 
value={empId} 
/> 
<Text>{isRemoved ? "Removed" : ""}</Text> 
<Button title="Delete an Employee" onPress={deleteEmployee} color="#c64c38"></Button> 

<Button title="Update an Employee" onPress={updateEmployee} color="#c64c38"></Button> 
<Text>{isUpdated ? "Updated" : ""}</Text> 

<FlatList 
data={data} 
keyExtractor={({ Id }) => Id} 
renderItem={({ item }) => ( 
<Text> 
{item.Id}. {item.Name}, Phone: {item.Phone}, Department ID: {item.DepartmentId}, Address: {item.Address.Street}, {item.Address.City}, {item.Address.State}, {item.Address.Zip}, {item.Address.Country} 
</Text> 
)} 
/> 
</View> 
)} 
</View> 
); 
}; 

export default App;
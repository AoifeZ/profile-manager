import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';

function Employee() {
	const apiUrl = 'http://localhost:8000/';
	const photoPath = 'http://localhost:8000/media/';

	const [emps, setEmps] = useState([]);
	const [empid, setEmpid] = useState([]);	
	const [empname, setEmpname] = useState([]);	
	const [empdep, setEmpdep] = useState([]);
	const [empdate, setEmpdate] = useState([]);
	const [photofilename, setEmpphoto] = useState([]);
	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
	const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
	const [selectedEmployeeDepartment, setSelectedEmployeeDepartment] = useState('');
	const [selectedEmployeeDate, setSelectedEmployeeDate] = useState('');
	const [selectedEmployeePhoto, setSelectedEmployeePhoto] = useState('');

	const refreshList = () => {
		fetch(apiUrl + 'employee/')
			.then(response => response.json())
			.then(data => {
				setEmps(data);
			})
			.catch(error => {
				alert(error);
			});
	};

	const handleDelete = (empid) => {
		if (window.confirm('Are you sure?')) {
			fetch(apiUrl + 'employee/' + empid + '/', {
				method: 'DELETE',
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
				.then(response => response.json())
				.then(result => {
					alert(result);
					refreshList();
				})
				.catch(error => {
					alert(error);
				});
		}

	};

	useEffect(() => {
		refreshList();
}, [addModalShow, editModalShow]);

	return (
		<>
			<Table className="mt-5" striped bordered hover size="sm">
				<thead>
					<tr>
						<th>EmployeeId</th>
						<th>EmployeeName</th>
						<th>Department</th>
						<th>Date Joined</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{emps.map(emp =>
						<tr key={emp.EmployeeId}>
							<td>{emp.EmployeeId}</td>
							<td>{emp.EmployeeName}</td>							
							<td>{emp.Department}</td>
							<td>{emp.DateOfJoining}</td>
							<td>
								<ButtonToolbar>
									<Button className="mx-1" variant="info" onClick={() => {
										setEditModalShow(true);
										setSelectedEmployeeId(emp.EmployeeId);
										setSelectedEmployeeName(emp.EmployeeName);										
										setSelectedEmployeeDepartment(emp.Department);
										setSelectedEmployeeDate(emp.DateOfJoining);
										setSelectedEmployeePhoto(emp.PhotoFileName);
									}}>
										Edit
									</Button>
									<Button
										className="mx-1"
										variant="danger"
										onClick={() => handleDelete(emp.EmployeeId)}
									>
										Delete
									</Button>
								</ButtonToolbar>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			<ButtonToolbar>
				<Button variant="primary" onClick={() => setAddModalShow(true)}>Add Employee</Button>
			</ButtonToolbar>

			<AddEmpModal
				show={addModalShow}
				onHide={() => setAddModalShow(false)} />
			<EditEmpModal
				show={editModalShow}
				onHide={() => setEditModalShow(false)} 
				empid={selectedEmployeeId} 
				empname={selectedEmployeeName} 
				empdep={selectedEmployeeDepartment}
				empdate={selectedEmployeeDate}
				photofilename={selectedEmployeePhoto}/>
		</>
	);
}

export default Employee;

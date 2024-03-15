import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddDepModal from './AddDepModal';
import EditDepModal from './EditDepModal';

function Department() {
	const apiUrl = 'http://localhost:8000/';

	const [deps, setDeps] = useState([]);
	const [depid, setDepid] = useState([]);
	const [depname, setDepname] = useState([]);
	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
	const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

	const refreshList = () => {
		fetch(apiUrl + 'department/')
			.then(response => response.json())
			.then(data => {
				setDeps(data);
			})
			.catch(error => {
				alert(error);
			});
	};

	const handleDelete = (depid) => {
		if (window.confirm('Are you sure?')) {
			fetch(apiUrl + 'department/' + depid + '/', {
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
						<th>DepartmentId</th>
						<th>DepartmentName</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{deps.map(dep =>
						<tr key={dep.DepartmentId}>
							<td>{dep.DepartmentId}</td>
							<td>{dep.DepartmentName}</td>
							<td>
								<ButtonToolbar>
									<Button className="mx-1" variant="info" onClick={() => {
										setEditModalShow(true);
										setSelectedDepartmentId(dep.DepartmentId);
										setSelectedDepartmentName(dep.DepartmentName);
									}}>
										Edit
									</Button>
									<Button
										className="mx-1"
										variant="danger"
										onClick={() => handleDelete(dep.DepartmentId)}
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
				<Button variant="primary" onClick={() => setAddModalShow(true)}>Add Department</Button>
			</ButtonToolbar>

			<AddDepModal
				show={addModalShow}
				onHide={() => setAddModalShow(false)} />
			<EditDepModal
				show={editModalShow}
				onHide={() => setEditModalShow(false)} 
				depid={selectedDepartmentId} 
				depname={selectedDepartmentName} />
		</>
	);
}

export default Department;

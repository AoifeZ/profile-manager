import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Department() {
	const apiUrl =  'http://localhost:8000/';
	const photoPath =  'http://localhost:8000/media/';

	const [deps, setDeps] = useState([]);

	const refreshList = () => {
		fetch(apiUrl + 'department/')
			.then(response => response.json())
			.then(data => {
				setDeps(data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	};

	useEffect(() => {
		refreshList();
	}, []);

	return (
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
						<td>Edit / Delete</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
}

export default Department;

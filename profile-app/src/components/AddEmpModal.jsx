import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, Container, Image } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddEmpModal(props) {
	const apiUrl = 'http://localhost:8000/';
	const photoPath = 'http://localhost:8000/media/';
	const defaultPhoto = 'anonymous.png';

	const [deps, setDeps] = useState([]);
	const [imagesrc, setImagesrc] = useState(photoPath + defaultPhoto);
	const [selectedFile, setSelectedFile] = useState(null);

	const [startDate, setStartDate] = useState(new Date());

	useEffect(() => {
		fetchDepartments();
	}, []);

	const fetchDepartments = () => {
		fetch(apiUrl + 'department/')
			.then(response => response.json())
			.then(data => {
				setDeps(data);
			})
			.catch(error => {
				console.error('Error fetching departments:', error);
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const employeeName = formData.get("EmployeeName");
		const employeeDepartment = formData.get("Department");
		const employeeDate = formData.get("DateOfJoining");

		const requestData = {
			EmployeeId: null,
			EmployeeName: employeeName,
			Department: employeeDepartment,
			DateOfJoining: employeeDate,
			PhotoFileName: selectedFile ? selectedFile.name : defaultPhoto,
		};

		fetch(apiUrl + 'employee/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData)
		})
			.then(res => res.json())
			.then((result) => {
				alert(result);
			})
			.catch((error) => {
				alert('Failed');
			});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		const reader = new FileReader();
		reader.onloadend = () => {
			setImagesrc(reader.result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<Container>
			<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Employee
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col sm={6} >
							<Image
								width="200px"
								height="200px"
								src={imagesrc}
							/>
							<Form.Group controlId="formFile" className="w-75">
								<Form.Label>Employee Photo</Form.Label>
								<Form.Control type="file" name="Photo" size="sm" onChange={handleFileChange} />
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="EmployeeName">
									<Form.Label>Employee Name</Form.Label>
									<Form.Control type="text" name="EmployeeName" required placeholder="Employee Name" />
								</Form.Group>
								<Form.Group controlId="Department">

									<Form.Label>Department</Form.Label>
									<Form.Control as="select" name="Department" required>
										{deps.map(dep =>
											<option key={dep.DepartmentId} value={dep.DepartmentName}>{dep.DepartmentName}</option>
										)}
									</Form.Control>
								</Form.Group>

								<Form.Group controlId="DateOfJoining">
									<Form.Label>Date Joined</Form.Label>
									<DatePicker
										selected={startDate}
										onChange={date => setStartDate(date)}
										name="DateOfJoining"
										dateFormat="yyyy-MM-dd"
										className="form-control"
										required
									/>
								</Form.Group>

								<Button variant="primary" type="submit">
									Add Employee
								</Button>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default AddEmpModal;
